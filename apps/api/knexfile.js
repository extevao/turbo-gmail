// Update with your config settings.
/**
 * @type { import("knex").Knex.Config }
 */
const pg = {
  client: 'pg',
  connection:
    'postgresql://postgres:postgrilo1010@localhost:5432/turbo-gmail?schema=public',
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
