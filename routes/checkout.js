const express = require('express');
const router  = express.Router();
const sms = require('../sendsms')

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("pages/checkout")
  });

  router.post("/", (req, res) => {
    const customerId = 1;
    const orderId = req.session.order_id || null;
    const foodId = req.body.foodId;

    let promise;
    if (!orderId) {
      promise = db.orders.add(customerId, foodId)
    } else {
      promise = db.orders.update(orderId, foodId)
    }

    promise.then((data) => {
      console.log(data);
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
    const orderId = req.session.order_id;
    const foodId = req.body.foodId;
    return db.orders.update(orderId, foodId)
      .then(data => {
        sms.sendMessage('7788726958', 'Test message')
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
