// db/tables/orders.js

/**
 * Manages all requests to the orders table of the database.
 */
class OrdersTable {

  constructor(database) {
    this.db = database;
  }

  /**
   * Add an order record.
   * @param {Number} customerId - Unique id from a user's cookie session.
   * @param {Number} foodId -
   */
  add(customerId, foodId) {
    const queryString = `
      INSERT INTO orders (customer_id)
      VALUES ($1)
      RETURNING id;
    `;
    const values = [ customerId ];
    return this.db
      .query(queryString, values)
      .then(data => {
        const order = data[0];
        return this.db.orderFoods.increment(order, foodId);
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
      .query(queryString, [id])
      .then(data => {
        const order = data[0];
        return this.db.orderFoods.getByOrder(order);
      });
  }

  /**
   * Update the quantity of an order's food.
   * @param {Number} orderId
   * @param {Number} foodId
   */
  update(orderId, foodId) {
    return this.db.orderFoods.increment(orderId, foodId);
  }

  /**
   * Remove a food item.
   * @param {Number} orderId
   * @param {Number} foodId
   */
  remove(orderId, foodId) {
    return this.db.orderFoods.decrement(orderId, foodId);
  }

  /**
   * Submit final order.
   * @param {Number} orderId
   * @param {Array} orderFoods
   */
  submit(orderId, orderFoods) {
    const queryString = `
      UPDATE orders
      SET order_date_time = NOW()
      WHERE orders.id = $1
      RETURNING *;
    `;
    const values = [ orderId ];
    return this.db
      .query(queryString, values)
      .then(data => {
        const order = data[0];
        return this.db.orderFoods.update(order, orderFoods);
      });
  }

  /**
   * Update the pick up time for an order.
   * @param {Number} orderId
   * @param {Number} minutes
   */
  confirm(orderId, minutes) {
    const queryString = `
      UPDATE orders
      SET pick_up_date_time = NOW() + $1
      WHERE orders.id = $2
      RETURNING *;
    `;
    const values = [ orderId, minutes * 60 * 1000 ];
    return this.db
      .query(queryString, values)
      .then(data => {
        return data[0];
      });  // If using catch(), add in route
  }

  /**
   * Returns the current unconfirmed order.
   * @param {Number} customerId
   */
  current(customerId) {
    const queryString = `
      SELECT *
      FROM orders
      WHERE customer_id = $1
      AND order_date_time IS NULL;
    `;
    const values = [ customerId ];
    return this.db
      .query(queryString, values)
      .then(data => {
        if (data.length === 0) {
          return null;
        } else {
          const order = data[0];
          return this.db.orderFoods.getByOrder(order);
        }
      });  // If using catch(), add in route
  }

  pending(customerId) {
    const queryString = `
      SELECT *
      FROM orders
      WHERE customer_id = $1
      AND order_date_time IS NOT NULL
      AND pick_up_date_time IS NULL;
    `;
    const values = [ customerId ];
    return this.db
      .query(queryString, values)
      .then(data => {
        return data[0];
      });  // If using catch(), add in route
  }

}

module.exports = OrdersTable;
