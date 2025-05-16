/* eslint-disable @typescript-eslint/no-require-imports */
const dotenv = require('dotenv');
dotenv.config();

// Update with your config settings.
/**
 * @type { import("knex").Knex.Config }
 */
const pg = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 0,
    max: 2,
  },
  migrations: {
    tableName: '_knex_migrations',
    directory: './database/migrations',
  },
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: pg,
  pg: pg,
};
