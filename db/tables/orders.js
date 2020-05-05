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
   * @param {Array} orderItems -
   */
  add(customerId, orderItems) {
    const queryString = `
      INSERT INTO orders (customer_id, order_date_time)
      VALUES ($1, NOW())
      RETURNING id;
    `;
    values = [ customerId ];
    return this.db
      .query(queryString, values)
      .then(res => {
        const orderId = res.rows[0];
        return this.db.orderFoods.add(orderId, orderItems);
      });  // If using catch(), add in route
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
   * @param {Number} orderId
   * @param {Array} orderItems
   */
  update(orderId, orderItems) {
    const queryString = `
      UPDATE orders
      SET order_date_time = NOW()
      WHERE orders.id = $1
      RETURNING id;
    `;
    values = [ orderId ];
    return this.db
      .query(queryString, values)
      .then(res => {
        const orderId = res.rows[0];
        return this.db.orderFoods.update(orderId, orderItems);
      });  // If using catch(), add in route
  }

}

module.exports = OrdersTable;
