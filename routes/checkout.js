const express = require('express');
const router  = express.Router();


// const client = require ('twilio') (accountSid, authToken);



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
})



  return router
};








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
