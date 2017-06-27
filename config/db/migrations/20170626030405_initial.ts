import * as Knex from 'knex';
import * as Promise from 'bluebird';

exports.up = (_knex: Knex): Promise<any> => {
  return Promise.all([
    /**
     * NOTE: Add a function to update the `modified` column automatically...
     * LINK: See http://www.revsys.com/blog/2006/aug/04/automatically-updating-a-timestamp-column-in-postgresql/ for more details
     */
    _knex.raw(
      `CREATE OR REPLACE FUNCTION update_modified_column()
       RETURNS TRIGGER AS $$
       BEGIN
           NEW.modified = now();
           RETURN NEW;
       END;
       $$ language 'plpgsql';`
    )
  ])
    .then(() => {
      return Promise.all([
        /**
         * NOTE: Create 'users' table
         */
        _knex.schema.createTable('users', (_table: Knex.CreateTableBuilder) => {
          _table.increments('id').unsigned().primary();
          _table.string('username', 64).notNullable();
          _table.string('firstname', 64).nullable();
          _table.string('lastname', 64).nullable();
          /**
           * NOTE: See http://www.dominicsayers.com/isemail/ about max-length
           */
          _table.string('email', 256).nullable();
          _table.timestamp('modified').nullable();
          _table.timestamp('created').notNullable().defaultTo(_knex.fn.now());
        }),
        /**
         * NOTE: Create 'authentications' table
         */
        _knex.schema.createTable('authentications', (_table: Knex.CreateTableBuilder) => {
          _table.increments('id').unsigned().primary();
          _table.integer('user_id').unsigned().notNullable();
          _table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
          _table.enum('type', ['local', 'github', 'twitter', 'facebook']).notNullable();
          _table.string('identifier', 64).notNullable();
          /**
           * NOTE: See https://stackoverflow.com/questions/5881169/what-column-type-length-should-i-use-for-storing-a-bcrypt-hashed-password-in-a-d  about max-length
           */
          _table.binary('password').nullable();
          _table.json('data').nullable();
          _table.timestamp('modified').nullable();
          _table.timestamp('created').notNullable().defaultTo(_knex.fn.now());
        }),
        /**
         * NOTE: Create 'links' table
         */
        _knex.schema.createTable('links', (_table: Knex.CreateTableBuilder) => {
          _table.increments('id').unsigned().primary();
          _table.integer('user_id').unsigned().notNullable();
          _table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
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
          _table.string('tag', 64).notNullable().index('tag_idx');
          _table.timestamp('created').notNullable().defaultTo(_knex.fn.now());
        }),
        /**
         * NOTE: Create 'links_tags' table
         */
        _knex.schema.createTable('links_tags', (_table: Knex.CreateTableBuilder) => {
          _table.integer('link_id').unsigned().notNullable();
          _table.foreign('link_id').references('id').inTable('links').onDelete('CASCADE');
          _table.integer('tag_id').unsigned().notNullable();
          _table.foreign('tag_id').references('id').inTable('tags').onDelete('CASCADE');
        })
      ]);
    })
    .then(() => {
      return Promise.all([
        /**
         * NOTE: Add trigger to update the `modified` column automatically...
         * LINK: See http://www.revsys.com/blog/2006/aug/04/automatically-updating-a-timestamp-column-in-postgresql/ for more details
         */
        _knex.raw(
          `CREATE TRIGGER update_users_modified
           BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_modified_column();`
        ),
        _knex.raw(
          `CREATE TRIGGER update_authentications_modified
           BEFORE UPDATE ON authentications FOR EACH ROW EXECUTE PROCEDURE update_modified_column();`
        )
      ]);
    });
};

exports.down = (_knex: Knex): Promise<any> => {
  return Promise.all([
    _knex.schema.dropTable('links_tags'),
    _knex.schema.dropTable('tags'),
    _knex.schema.dropTable('links'),
    _knex.schema.dropTable('authentications'),
    _knex.schema.dropTable('users')
  ]);
};
