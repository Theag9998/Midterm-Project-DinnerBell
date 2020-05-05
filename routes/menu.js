const express = require('express');
const router  = express.Router();


module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("pages/menu")
  })

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM foods`)
      .then(data => {
        const foods = data.rows;

        res.json({ foods });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
