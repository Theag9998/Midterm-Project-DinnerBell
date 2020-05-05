const express = require('express');
const router  = express.Router();

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
      console.log(data[0]);
      req.session.order_id = data[0].order_id;
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
