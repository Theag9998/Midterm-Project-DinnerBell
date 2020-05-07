const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    router.get("/", (req, res, next) => {
    res.render('pages/confirmation');
  })

  router.get("/:id", (req, res, next) => {
    db.query(`SELECT pick_up_date_time FROM orders WHERE id = $1`, [req.params.id])
      .then(data => {
        console.log('data :>> ', data);
        res.json({ orders: data.rows[0] });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router;
};
