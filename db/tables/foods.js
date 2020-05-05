// db/tables/foods.js

/**
 * Manages all requests to the foods table of the database.
 */
class FoodsTable {

  constructor(database) {
    this.db = database;
    this.tableName = 'foods';
  }

  /**
   * Retrieve all foods from database.
   */
  all() {
    const queryString = `SELECT * FROM foods`;
    return this.db
      .query(queryString);
  }

  /**
   * Add a food record.
   * @param {Object} food
   */
  add(food) {
    const queryString = ``;
    values = [];
    return this.db
      .query(queryString, values);
  }

  /**
   * Retrieve a food by its id.
   * @param {Number} id
   */
  get(id) {
    const queryString = ``;
    return this.db
      .query(queryString, [id]);
  }

  /**
   * Update a food.
   * @param {Object} food
   */
  post(food) {
    const queryString = ``;
    values = [];
    return this.db
      .query(queryString, values);
  }

}

module.exports = FoodsTable;
