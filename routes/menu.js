const express = require('express');
const router  = express.Router();


module.exports = (db) => {

  router.get("/", (req, res) => {
      db.foods.all().then((data) => {
        console.log(data)
        res.render("pages/menu", { data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    })

  return router;
};

// data = [ { id: 1, category: 'name', description: '', picture: '', cost: 5.00, size: 's' }, {}, {}... ]

// HTML Page Input Fields: <input type="hidden" id=<%= item.id %> name="something"></input> --> req.body
// HTML Page Submit Button: <button type="submit">View Cart</button>
// In-Page JQuery to assign food_id to hidden form field: $('add-to-cart').click( (event)=> {
  // $('#something').val(menu_item_id);
  // });
// req.body.something
// Then redirect to ____ in route
