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

  router.delete("/", (req, res) => {
    const customerId = 1;
    const foodId = req.body.foodId;
    db.orders
      .removeFood(customerId, foodId)
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
    const orderFoods = [];
    for (const i in Object.keys(req.body)) {
      const key = Object.keys(req.body)[i];
      const orderFood = {
        id: key,
        quantity: req.body[key]
      }
      orderFoods.push(orderFood);
    }
    db.orders
      .current(customerId)
      .then(order => {
        return db.orders
          .submit(order.id, orderFoods)
          .then(data => {
            // console.log("ORDERFOODS", order.id)
            // sms.sendMessage(process.env.PHONE, 'Incoming Order: bla bla bla')
            res.render('pages/confirmation', { data });
          })
      /* .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      }); */
    });
  });

  return router;
};
