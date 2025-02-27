/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('emails', (table) => {
    table.increments('id').primary();
    table.text('assunto');
    table.text('para');
    table.text('mensagem');
    table.string('gmail_message_id', 255);
    table.string('gmail_thread_id', 255);
    table.string('tipo_mensagem', 255);
    table.timestamp('criado_em').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('emails');
};
