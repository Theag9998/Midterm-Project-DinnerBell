const express = require('express');
const router  = express.Router();
// const sms = require('../sendsms');


module.exports = (db) => {

  router.get("/", (req, res) => {
    const orderId = req.session.order_id;
    db.orders
      .get(orderId)
      .then(data => {
        res.render("pages/checkout", { data });
      });

  });

  router.post("/", (req, res) => {
    const customerId = 1;
    const orderId = req.session.order_id || null;
    const foodId = req.body.foodId;

    let promise;
    if (!orderId) {
      promise = db.orders
        .add(customerId, foodId)
    } else {
      promise = db.orders
        .update(orderId, foodId)
    }

    promise.then((data) => {
      // console.log(data);
      req.session.order_id = data.id;
    })
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
    console.log(orderFoods);
    db.orders
      .current(customerId)
      .then(order => {
        return db.orders
          .submit(order.id, orderFoods)
          .then(data => {
            console.log(data);
            // sms.sendMessage(process.env.PHONE, 'Sending to Guest')
            res.render('pages/confirmation', { data });
          })
      /* .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
