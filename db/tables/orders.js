// db/tables/orders.js

/**
 * Manages all requests to the orders table of the database.
 */
class OrdersTable {

  constructor(database) {
    this.db = database;
  }

  all(customerId = null) {
  return this.db.query(`
  SELECT orders.id AS order_id, orders.customer_id, orders.order_date_time, orders.pick_up_date_time, foods.*,
  (CASE
    WHEN pick_up_date_time < NOW() THEN true
    WHEN pick_up_date_time > NOW() THEN false
  END) AS complete
  FROM orders
  JOIN order_foods ON orders.id = order_foods.order_id
  JOIN foods ON foods.id = order_foods.food_id
  GROUP BY orders.id, foods.id
  ORDER BY orders.order_date_time DESC
  `)
    .then((data) => {

      const processedOrders = data.map((order) => {
        const {
          order_id,
          customer_id,
          order_date_time,
          pick_up_date_time,
          complete,
          ...food
        } = order;

        return {
          order_id,
          customer_id,
          order_date_time,
          pick_up_date_time,
          complete,
          food
        }
      })

      const groupedOrders = [];
      processedOrders.forEach((order) => {
        // check if order is already in groupedOrder
        // find this order in grouped orders
        const foundOrderIndex = groupedOrders.findIndex((ord) => ord.id === order.order_id)
        if(foundOrderIndex > -1) {
          groupedOrders[foundOrderIndex].foods.push(order.food)
        } else {
          // this order from processedOrders is not already in groupedOrders
          const {
            order_id,
            customer_id,
            order_date_time,
            pick_up_date_time,
            complete,
            food
          } = order;

          groupedOrders.push({
            id: order_id,
            customer_id,
            order_date_time,
            pick_up_date_time,
            complete,
            foods: [food]
          })
        }
      })


      return groupedOrders;
    })
  //   // WHERE orders.id = $1
  };

//Pulling orders into
  // all(customerId = null) {
  //   return this.db.query(`
  //   SELECT * FROM orders
  //   WHERE customer_id = $1
  //   ORDER BY order_date_time DESC
  //   `, [1]);
  // };

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
        const orderId = data[0].id;
        return this.db.orderFoods.increment(orderId, foodId);
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
   * addFood the quantity of an order's food.
   * @param {Number} customerId
   * @param {Number} foodId
   */
  addFood(customerId, foodId) {
    const queryString = `
      SELECT id
      FROM orders
      WHERE customer_id = $1
      AND order_date_time IS NULL;
    `;
    const values = [ customerId ];
    return this.db
      .query(queryString, values)
      .then(data => {
        if (data.length === 0) {
          return this.add(customerId, foodId);
        } else {
          const orderId = data[0].id;
          return this.db.orderFoods.increment(orderId, foodId);
        }
      })
  }

  /**
   * Remove a food item.
   * @param {Number} orderId
   * @param {Number} foodId
   */
  removeFood(customerId, foodId) {
    const queryString = `
      SELECT id
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
          const orderId = data[0].id;
          return this.db.orderFoods.decrement(orderId, foodId);
        }
      })
  }

  /**
   * Submit final order.
   * @param {Number} orderId
   * @param {Array} orderFoods
   */
  submit(orderId, orderFoods) {
    const queryString = `
      UPDATE orders
      SET order_date_time = to_timestamp($1)
      WHERE id = $2;
    `;
    const dateTimeNow = Date.now() / 1000;
    const values = [ dateTimeNow, orderId ];
    return this.db
      .query(queryString, values)
      .then(() => {
        return this.db.orderFoods.update(orderId, orderFoods);
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
      SET pick_up_date_time = to_timestamp($1)
      WHERE orders.id = $2;
    `;
    const estimatedTime = parseInt(minutes) * 60;
    const dateTimeNow = Date.now() / 1000;
    const pickUpTime = dateTimeNow + estimatedTime;
    const values = [ pickUpTime, orderId ];
    return this.db
      .query(queryString, values);
      // If using catch(), add in route
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


