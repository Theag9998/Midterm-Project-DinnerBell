const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res, next) => {



    return db.orders.all(1)
    .then(data => {
      let orders = {
        completed: data.filter(o => o.complete),
        pending: data.filter(o => !o.complete)
      }
      // console.log('COMPLETE:',orders.completed)
      // console.log('PENDING:', orders.pending)
      res.render("pages/my-orders", {orders})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  })



  return router;
};
// ;

// getCurrentOrdersByCustomer(id) {
//   const queryString = `
//   SELECT *
//   FROM ${this.tableName}
//   WHERE customer_id = $1 AND complete = $2
//   `;
//   return this.db
//     .query(queryString, [id, false])
// }

// getOldOrdersByCustomer(id) {
//   const queryString = `
//   SELECT *
//   FROM ${this.tableName}
//   WHERE customer_id = $1 AND complete = $2
//   `;
//   return this.db
//     .query(queryString, [id, true])
// }



