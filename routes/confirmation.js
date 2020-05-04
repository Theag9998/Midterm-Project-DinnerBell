const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res, next) => {
    res.render('pages/confirmation');
  })

  router.get("/", (req, res, next) => {
    db.query(`SELECT pick_up_date_time FROM orders;`)
      .then(data => {
        const orders = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router;
};
