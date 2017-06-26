import * as Knex from 'knex';
import * as Promise from 'bluebird';

exports.up = (_knex: Knex): Promise<any> => {
  return Promise.all([
    /**
     * NOTE: Create 'users' table
     */
    _knex.schema.createTable('users', (_table: Knex.CreateTableBuilder) => {
      _table.increments('id').unsigned().primary();
      _table.string('username').notNullable();
      _table.string('email').notNullable().unique();
      _table.string('password', 32).notNullable();
      _table.timestamp('created').notNullable().defaultTo(_knex.fn.now());
    }),
    /**
     * NOTE: Create 'links' table
     */
    _knex.schema.createTable('links', (_table: Knex.CreateTableBuilder) => {
      _table.increments('id').unsigned().primary();
      _table.integer('user_id').unsigned().notNullable();
      _table.foreign('user_id').references('users.id');
      /**
       * NODE: Max URL length: https://boutell.com/newfaq/misc/urllength.html
       */
      _table.string('url', 2048).notNullable();
      _table.timestamp('created').notNullable().defaultTo(_knex.fn.now());
    }),
    /**
     * NOTE: Create 'tags' table
     */
    _knex.schema.createTable('tags', (_table: Knex.CreateTableBuilder) => {
      _table.increments('id').unsigned().primary();
      _table.string('tag', 64).notNullable();
      _table.timestamp('created').defaultTo(_knex.fn.now());
    }),
    /**
     * NOTE: Create 'tags_links' table
     */
    _knex.schema.createTable('tags_links', (_table: Knex.CreateTableBuilder) => {
      _table.integer('link_id').unsigned().notNullable();
      _table.foreign('link_id').references('id').inTable('links').onDelete('CASCADE');
      _table.integer('tag_id').unsigned().notNullable();
      _table.foreign('tag_id').references('id').inTable('tags').onDelete('CASCADE');
    }),
  ]);
};

exports.down = (_knex: Knex): Promise<any> => {
  return Promise.all([
    _knex.schema.dropTable('users'),
    _knex.schema.dropTable('links'),
    _knex.schema.dropTable('tags'),
    _knex.schema.dropTable('tags_links'),
  ]);
};
