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

// HTML Page Input Fields: <input type="hidden" id="something" name="something"></input> --> req.body
// HTML Page Submit Button: <button type="submit"></button>
// In-Page JQuery to assign food_id to hiden form field: $('#something').val(menu_item_id);
// Then redirect to ____ in route
