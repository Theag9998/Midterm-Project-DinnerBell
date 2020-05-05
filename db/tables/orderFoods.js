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
   * Retrieves all foods by order.
   * @param {Object} order
   */
  getByOrder(order) {
    const queryString = `
      SELECT *
      FROM ${this.tableName}
      WHERE ${this.tableName}.order_id = $1;
    `;
    const values = [ order.id ];
    return this.db
      .query(queryString, values)
      .then(items => {
        order.items = items;
        return order;
      });
  }

  /**
   * Increment an order_food record.
   * @param {Object} order
   * @param {Number} foodId
   */
  increment(order, foodId) {
    const queryString = `
      INSERT INTO ${this.tableName} (food_id, order_id)
      VALUES ($1, $2)
      ON CONFLICT (food_id, order_id)
      DO UPDATE
      SET quantity = ${this.tableName}.quantity + 1 WHERE ${this.tableName}.food_id = $1 AND ${this.tableName}.order_id = $2
      RETURNING *;
      `;
    const values = [ foodId, order.id ];
    return this.db
      .query(queryString, values)
      .then(items => {
        order.items = items;
        return order;
      });
  }  // If using catch(), add in route

}

module.exports = OrderFoodsTable;
