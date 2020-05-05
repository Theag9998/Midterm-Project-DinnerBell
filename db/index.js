// db/index.js

const { Pool } = require("pg");

// Import database table objects
// const ...

/**
 * Manages all interactions with the database.
 */
class DatabaseConnection {

  constructor() {
    this.pool = new Pool(this._parameters());

    // Connected database tables
    // this...
  }

  /**
   * Sets database connection parameters from environmental variables.
   */
  _parameters() {
    return process.env.DATABASE_URL ? {
      connectionString: process.env.DATABASE_URL
    } : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    };
  }

  /**
   * Execute an SQL query against the connected database.
   * @param {String} text - A valid SQL query string.
   * @param {Object} params - Query parameters.
   */
  // ▼ Async prefix forces this method to run asynchronously
  async query(text, params) {

    // Fetch client object from pool
    const client = await this.pool.connect();
    // ▲ Await pauses an asynchronous function until a response is returned.

    // Execute query to database
    const response = await client.query(text, params);

    // Return client to pool for another request to use.
    client.release();

    // Return rows from database response
    return response.rows;
  }
  // ▲ Took this whole chunk from pg's documentation on using Pool.connect().
  // https://node-postgres.com/api/pool#pool.connect
}

// Instantiate the database connection
const databaseConnection = new DatabaseConnection();
// This is in order to use the "singleton" pattern, where there is
// only ever one instance of the DatabaseConnection class.

// Freeze the database connection object
// (This prevents other modules from accidently modifying properties of the class object.)
Object.freeze(databaseConnection);

// Export the database connection
module.exports = databaseConnection;
