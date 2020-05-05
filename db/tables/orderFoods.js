// db/tables/orderFoods.js

/**
 * Manages all requests to the orderFoods table of the database.
 */
class OrderFoodsTable {

  constructor(database) {
    this.db = database;
    this.tableName = 'order_foods';
  }

  /**
   * Add a orderFood record.
   * @param {Object} orderFood
   */
  add(orderFood) {
    const queryString = ``;
    values = [];
    return this.db
      .query(queryString, values);
  }

  /**
   * Retrieve a orderFood by its id.
   * @param {Number} id
   */
  get(id) {
    const queryString = ``;
    return this.db
      .query(queryString, [id]);
  }

  /**
   * Update a orderFood.
   * @param {Object} orderFood
   */
  post(orderFood) {
    const queryString = ``;
    values = [];
    return this.db
      .query(queryString, values);
  }

}

module.exports = OrderFoodsTable;
