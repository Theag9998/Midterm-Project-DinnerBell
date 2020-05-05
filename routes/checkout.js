const express = require('express');
const router  = express.Router();
const accountSid = 'AC374bb6cd27fbae9a937c7526526c433e';
const authToken = '965169039fd80dbc5f4ef68bbaab44d5';

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

  // router.post("/", (req, res) => {
  //   // SMS to Customer
  //   client.messages.create({
  //   to: process.env.twilio_account_sid, 
  //   from: '+17739455987',
  //   body: 'Order received. Your order will be ready in 30 minutes. Please pick up at Papa Joe\'s Restaurant at 7:30pm.'
  //   })
  //   .then((message) => console.log(message.sid));

  //   //SMS to Restaurant
  //   client.messages.create({
  //   to: process.env.twilio_account_sid, 
  //   from: '+17739455987',
  //   body: 'New order received!'
  // })
  //   .then((message) => console.log(message.sid));
//})

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
//   });
