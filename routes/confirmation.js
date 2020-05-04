const express = require('express');
const router  = express.Router();
const pg = require('pg');

module.exports = () => {
  router.get("/", (req, res, next) => {
    res.render('pages/confirmation');
  })

  router.post

  return router;
};
