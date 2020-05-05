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
  add(orderFoods) {
    let queryString = `INSERT INTO ${this.tableName} (food_id, quantity) VALUES `;
    let values = [];
    let counter = 1;
    for (const orderFood of orderFoods) {
      queryString += `($${counter}, $${counter + 1}, $${counter + 2}), `;
      values = values.concat([ orderFood.food_id, orderId, orderFood.quantity ]);
      counter += 3;
    }
    queryString += "RETURNING *;"
    return this.db
      .query(queryString, values);
  }

  /**
   * Retrieve orderFoods records by orderId.
   * @param {Number} id
   */
  getByOrder(id) {
    const queryString = `
      SELECT *
      FROM order_foods
      WHERE order_id = $1;
    `;
    return this.db
      .query(queryString, [id]);
  }

  /**
   * Update a orderFood.
   * @param {Object} orderFood
   */
  update(orderFoods) {
    const queries = [];
    let values = [];
    let counter = 1;
    for (const orderFood of orderFoods) {
      queries.push(`UPDATE ${this.tableName} SET food_id = $${counter}, order_id = $${counter + 1}, quantity = $${counter + 2} WHERE order_foods.id = $${counter + 3};`);
      values = values.concat([ orderFood.food_id, data.id, orderFood.quantity, orderFood.id]);
      counter += 4;
    }
    const queryString = queries.join('\n');
    return this.db
      .query(queryString, values);
  }

}

module.exports = OrderFoodsTable;
