const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res, next) => {
    res.render('pages/confirmation');
  })

  router.get("/", (req, res, next) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
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
