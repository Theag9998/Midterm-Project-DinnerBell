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
   * Increment an order_food record.
   * @param {Number} orderId
   * @param {Number} foodId
   */
  increment(orderId, foodId) {
    console.log(orderId, foodId);
    const queryString = `
      INSERT INTO ${this.tableName} (food_id, order_id)
      VALUES ($1, $2)
      ON CONFLICT (food_id, order_id)
      DO UPDATE
      SET quantity = ${this.tableName}.quantity + 1 WHERE ${this.tableName}.food_id = $1 AND ${this.tableName}.order_id = $2
      RETURNING *;
      `;
    const values = [ foodId, orderId ];
    return this.db
      .query(queryString, values);
  }  // If using catch(), add in route

}

module.exports = OrderFoodsTable;
