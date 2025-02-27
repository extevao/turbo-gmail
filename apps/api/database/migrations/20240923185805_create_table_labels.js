/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('gmail_labels', (table) => {
    table.increments('id').primary();
    table.string('nome', 255).notNullable();
    table.json('label').notNullable();

    table.timestamp('criado_em').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('gmail_labels');
};
