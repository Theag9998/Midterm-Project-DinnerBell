const express = require('express');
const router  = express.Router();
// const sms = require('../sendsms');


module.exports = (db) => {

  router.get("/", (req, res) => {
    const customerId = 1;
    db.orders
      .current(customerId)
      .then(data => {
        console.log(data);
        if (data) {
          res.render("pages/checkout", { data });
        } else {
          res.redirect('/menu');
        }
      });
  });

  router.post("/", (req, res) => {
    const customerId = 1;
    const foodId = req.body.foodId;
    db.orders
      .addFood(customerId, foodId)
      .then((data) => {
        res.json(data);
      });
    /* .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    }); */
  });

  router.put("/", (req, res) => {
    customerId = 1;
    const orderId = req.body.orderId;
    const orderFoods = req.body;
    return db.orders
      .update(orderId, orderFoods)
      .then(data => {
        // sms.sendMessage(process.env.PHONE, 'Sending to Guest')
        res.redirect('/confirmation');
      })
      /* .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      }); */
  });




  return router;
};
