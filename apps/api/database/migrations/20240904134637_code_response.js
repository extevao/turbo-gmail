/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('credenciais_google', (table) => {
    table.increments('id').primary();
    table.json('code_response').notNullable();
    table.json('tokens').notNullable();
    table.timestamp('expiracao_token').notNullable();
    table.smallint('situacao').nullable();
    table.timestamp('criado_em').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('credenciais_google');
};
