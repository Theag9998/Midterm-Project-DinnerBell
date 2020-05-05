const express = require('express');
const router  = express.Router();

//const client = require ('twilio') (accountSid, authToken);

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
    const customerId = 1;
    const orderId = null;
    const foodId = req.body.foodId;
    if (!orderId) {
      return db.orders.add(customerId, foodId)
        .then((data) => {
          console.log(data);
          // TODO: Change redirect to render and pass values?
          res.redirect("/confirmation");
        })
        /* .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        }); */
      } else {
        return db.orders.update(orderId, foodId)
        .then((data) => {
          console.log(data);
          // TODO: Change redirect to render and pass values?
          res.redirect("/confirmation");
        })
        /* .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        }); */
      }
  });

  router.put("/:id", (req, res) => {
    const orderId = req.params.id;
    const orderItems = req.body;
    return db.orders.update(orderId, orderItems)
      .then(data => {
        // TODO: Change redirect to render and pass values?
        res.redirect('/confirmation');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
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
//   });
