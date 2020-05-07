// db/tables/orderFoods.js

/**
 * Manages all requests to the orderFoods table of the database.
 */
class OrderFoodsTable {

  constructor(database) {
    this.db = database;
  }

  /**
   * Retrieves all foods by order.
   * @param {Object} order
   */
  getByOrder(order) {
    const queryString = `
      SELECT foods.id, foods.name, order_foods.quantity
      FROM order_foods
      JOIN foods ON food_id = foods.id
      WHERE order_foods.order_id = $1;
    `;
    const values = [ order.id ];
    return this.db
      .query(queryString, values)
      .then(items => {
        order.items = items;
        return order;
      });
  }

  all(customerId = null) {
    return this.db
    .query(`
    SELECT order_foods.*, foods.*
    FROM order_foods
    JOIN foods ON foods.id = order_foods.order_id
    WHERE order_foods.order_id = $1
    `, [1]);
  }

  /**
   * Increment an order_food record.
   * @param {Object} order
   * @param {Number} foodId
   */
  increment(orderId, foodId) {
    const queryString = `
      INSERT INTO order_foods (food_id, order_id)
      VALUES ($1, $2)
      ON CONFLICT (food_id, order_id)
      DO UPDATE
      SET quantity = order_foods.quantity + 1 WHERE order_foods.food_id = $1 AND order_foods.order_id = $2
      RETURNING *;
      `;
    const values = [ foodId, orderId ];
    return this.db
      .query(queryString, values)
      .then(items => {
        return items[0];
      });
  }  // If using catch(), add in route

  /**
   * Decrement an order_food record.
   * @param {Object} order
   * @param {Number} foodId
   */
  decrement(orderId, foodId) {
    const queryString = `
      UPDATE order_foods
      SET quantity = order_foods.quantity - 1 WHERE order_foods.food_id = $1 AND order_foods.order_id = $2
      RETURNING *;
    `;
    const values = [ foodId, orderId ];
    return this.db
      .query(queryString, values)
      .then(items => {
        return items[0];
      });
  }  // If using catch(), add in route

  /**
   * Update food quantities for an order.
   * @param {*} orderId
   * @param {*} orderFoods
   */
  update(orderId, orderFoods) {
    for (const food of orderFoods) {
      const queryString = `UPDATE order_foods SET quantity = $1 WHERE order_id = $2 AND food_id = $3`;
      const values = [ food.quantity, orderId, food.id ];
      this.db.query(queryString, values);
    }
    return this.db.orders.get(orderId);
  }  // If using catch(), add in route

}

module.exports = OrderFoodsTable;
