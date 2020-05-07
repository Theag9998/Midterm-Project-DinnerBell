const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    router.get("/", (req, res, next) => {
    res.render('pages/confirmation');
  })

  router.get("/:id", (req, res, next) => {
    db.query(`SELECT * FROM orders WHERE id = $1;`, [req.params.id])
      .then(data => {
        res.json({ pickUpTime: data[0].pick_up_date_time });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router;
};
