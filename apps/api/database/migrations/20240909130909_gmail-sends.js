/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('gmail_sends_logs', (table) => {
    table.increments('id').primary();
    table.json('request_data').notNullable();
    table.json('response_data').notNullable();

    table
      .integer('id_email')
      .notNullable()
      .references('id')
      .inTable('emails')
      .onDelete('CASCADE');

    table.timestamp('criado_em').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('gmail_sends_logs');
};
