const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get("/", (req, res) => {
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
  });
  return router;
};
// module.exports = (db) => {

//   router.get("/", (req, res) => {
//       db.foods.all().then((data) => {
//         // console.log(data)
//         res.render("pages/menu", { data });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//     })

//   return router;
// };
