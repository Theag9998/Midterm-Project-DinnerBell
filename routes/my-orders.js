const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/", (req, res, next) => {
    res.render("pages/my-orders");
  })



  return router;
};
