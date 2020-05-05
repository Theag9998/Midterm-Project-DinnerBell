const express = require('express');
const router  = express.Router();

// Example request object
const cart = {
  order_id: 1,
  foods: [
    { food_id: 1, quantity: 1 },
    { food_id: 2, quantity: 99 },
    { food_id: 3, quantity: 1 }
  ]};

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("pages/checkout")
  });

  router.post("/", (req, res) => {
    return db.query (`
      INSERT INTO orders (customer_id, order_date_time)
      VALUES ($1, NOW())
      RETURNING id;
    `, [1]) // req.session.user_id
      .then(res => {
        const orderId = res.rows[0];
        let queryString = `INSERT INTO order_foods(food_id, quantity) VALUES `;
        let values = [];
        let counter = 1;
        for (const food of cart.foods) {
          queryString += `($${counter}, $${counter + 1}, $${counter + 2}), `;
          values = values.concat([ cart.foods.food_id, orderId, cart.foods.quantity]);
          counter += 3;
        }
        queryString += "RETURNING *;"
        db.query(queryString, values)
          .then(() => {
            res.redirect("/confirmation");
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.put("/:id", (req, res) => {
    // UPDATE database
    // redirect to confirmation page.
      return db.query (`
        UPDATE orders
        SET order_date_time = NOW()
        WHERE orders.id = $1
        RETURNING id;
      `, [req.params.id])
        .then(data => {
          const queries = [];
          let values = [];
          let counter = 1;
          for (const food of cart.foods ) {
            queries.push(`UPDATE order_foods SET food_id = $${counter}, order_id = $${counter + 1}, quantity = $${counter + 2} WHERE order_foods.id = $${counter + 3};`);
            values = values.concat([ cart.foods.food_id, data.id, cart.foods.quantity, cart.foods.id]);
            counter += 4;
          }
          const queryString = queries.join('\n');
          return db.query(queryString, values)
            .then(data => res.redirect('/confirmation'));
        });
  });
  return router;
};




// ORIGINAL EXAMPLE BELOW
// router.get("/", (req, res) => {
//   db.query(`SELECT * FROM users;`)
//     .then(data => {
//       const users = data.rows;
//       res.json({ users });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });
// return router;
