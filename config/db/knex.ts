import * as Knex from 'knex';
import * as knexfile from './../knexfile';

const env = process.env.NODE_ENV || 'development';
const config = knexfile[env];
const knex = Knex(config);

export { knex as Knex };
