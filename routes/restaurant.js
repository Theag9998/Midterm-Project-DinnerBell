const express = require('express');
const router  = express.Router();
// const sms = require('../sendsms');

module.exports = (db) => {
  router.get('/', (req, res, next) => {
    return db.orders.all(1)
    .then(data => {
      let orders = {
        completed: data.filter(o => o.complete),
        pending: data.filter(o => !o.complete)
      }
      res.render('pages/restaurant', {orders})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //Route to update time
  router.post('/:id/confirm', (req, res, next) => {
    const orderId = req.params.id;
    const minutes = req.body.estimatedTime;
    db.orders.confirm(orderId, minutes);
    // sms.sendMessage(process.env.PHONE, `Thanks for your order! \nYour order will be ready in ${minute} minute(s).`)
  });

  return router;
};
