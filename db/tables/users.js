// db/tables/users.js

/**
 * Manages all requests to the users table of the database.
 */
class UsersTable {

  constructor(database) {
    this.db = database;
    this.tableName = 'users';
  }

  /**
   * Add a user record.
   * @param {Object} user
   */
  add(user) {
    const queryString = ``;
    values = [];
    return this.db
      .query(queryString, values);
  }

  /**
   * Retrieve a user by its id.
   * @param {Number} id
   */
  get(id) {
    const queryString = ``;
    return this.db
      .query(queryString, [id]);
  }

}

module.exports = UsersTable;
