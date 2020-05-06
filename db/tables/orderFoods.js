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

  /**
   * Increment an order_food record.
   * @param {Object} order
   * @param {Number} foodId
   */
  increment(order, foodId) {
    const queryString = `
      INSERT INTO order_foods (food_id, order_id)
      VALUES ($1, $2)
      ON CONFLICT (food_id, order_id)
      DO UPDATE
      SET quantity = order_foods.quantity + 1 WHERE order_foods.food_id = $1 AND order_foods.order_id = $2
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

  /**
   * Decrement an order_food record.
   * @param {Object} order
   * @param {Number} foodId
   */
  decrement(order, foodId) {
    const queryString = `
      UPDATE order_foods
      SET quantity = order_foods.quantity - 1 WHERE order_foods.food_id = $1 AND order_foods.order_id = $2
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

  /**
   * Update food quantities for an order.
   * @param {*} orderId
   * @param {*} orderFoods
   */
  update(orderId, orderFoods) {
    const queries = [];
    let values = [];
    let counter = 1;
    for (const food of orderFoods) {
      queries.push(`UPDATE order_foods SET quantity = $${counter} WHERE order_id = $${counter + 1} AND food_id = $${counter + 2};`);
      values = values.concat([ food.quantity, orderId, food.id]);
    }
    return this.db
      .query(queryString, values)
      .then(() => {
        return order;
      });
  }  // If using catch(), add in route

}

module.exports = OrderFoodsTable;
