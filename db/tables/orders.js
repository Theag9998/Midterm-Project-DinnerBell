// db/tables/orders.js

/**
 * Manages all requests to the orders table of the database.
 */
class OrdersTable {

  constructor(database) {
    this.db = database;
    this.tableName = 'orders';
  }

  /**
   * Add an orders record.
   */
  add(order) {
    const queryString = ``;
    values = [];
    return this.db
      .query(queryString, values);
  }

  /**
   * Retrieve an order by its id.
   * @param {Number} id
   */
  get(id) {
    const queryString = ``;
    return this.db
      .query(queryString, [id]);
  }

  /**
   * Update an order.
   * @param {Object} order
   */
  post(order) {
    const queryString = ``;
    values = [];
    return this.db
      .query(queryString, values);
  }

}

module.exports = OrdersTable;
