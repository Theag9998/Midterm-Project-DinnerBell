const express = require('express');
const router  = express.Router();

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
    const orderId = req.session.order_id;
    const foodId = req.body.foodId;
    return db.orders
      .update(orderId, foodId)
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
