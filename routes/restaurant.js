const express = require('express');
const router  = express.Router();


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
  return router;
};