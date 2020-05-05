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
   * Retrieve orderFoods records by orderId.
   * @param {Number} id
   */
  getByOrder(id) {
    const queryString = `
      SELECT *
      FROM ${this.tableName}
      WHERE order_id = $1;
    `;
    return this.db
      .query(queryString, [id]);
  }

  /**
   * Increment a orderFood.
   * @param {Number} orderId
   * @param {Object} orderFoods
   */
  increment(orderId, foodId) {
    const queryString = `
      INSERT INTO ${this.tableName} (food_id, order_id)
      VALUES ($1, $2)
      RETURNING *
      ON CONFLICT (id) DO
      UPDATE ${this.tableName} SET quantity = quantity + 1 WHERE food_id = $1 AND order_id = $2
      RETURNING *;
      `;
    const values = [ foodId, orderId ];
    return this.db
      .query(queryString, values);
  }  // If using catch(), add in route

}

module.exports = OrderFoodsTable;
