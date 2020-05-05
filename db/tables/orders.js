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
   * Add an order record.
   * @param {Number} customerId - Unique id from a user's cookie session.
   */
  add(customerId) {
    const queryString = `
      INSERT INTO orders (customer_id, order_date_time)
      VALUES ($1, NOW())
      RETURNING id;
    `;
    values = [ customerId ];
    return this.db
      .query(queryString, values);
  }

  /**
   * Retrieve an order by its id.
   * @param {Number} id
   */
  get(id) {
    const queryString = `
      SELECT *
      FROM orders
      WHERE id = $1;
    `;
    return this.db
      .query(queryString, [id]);
  }

  /**
   * Update an order.
   * @param {Object} order
   */
  update(order) {
    const queryString = `
      UPDATE orders
      SET order_date_time = NOW()
      WHERE orders.id = $1
      RETURNING id;
    `;
    values = [ order.id ];
    return this.db
      .query(queryString, values);
  }

}

module.exports = OrdersTable;
