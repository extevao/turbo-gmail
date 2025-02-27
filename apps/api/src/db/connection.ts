import type { Knex } from 'knex';
import knex from 'knex';
import { pg } from 'knexfile';

let knexConnection: Knex;

export function getConnection() {
  if (knexConnection) return knexConnection;

  knexConnection = knex(pg);

  return knexConnection;
}
