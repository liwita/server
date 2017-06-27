import * as Knex from 'knex';
import * as Promise from 'bluebird';

exports.seed = (_knex: Knex): Promise<any> => {
  return _knex('links_tags')
    .del()
    .then(() => {
      return _knex('tags').del();
    })
    .then(() => {
      return _knex('links').del();
    })
    .then(() => {
      return _knex('authentications').del();
    })
    .then(() => {
      return _knex('users').del();
    })
    .then(() => {
      return _knex('users').insert(
        {
          username: 'impmja',
          firstname: 'Jan',
          lastname: 'Schulte',
          email: 'info@liwita.net'
        },
        'id'
      );
    })
    .then((_userId: number[]) => {
      return _knex('authentications').insert(
        {
          user_id: _userId[0],
          type: 'local',
          identifier: '1234567890',
          data: `{ "id": 1234567890 }`
        },
        'user_id'
      );
    })
    .then((_userId: number[]) => {
      return _knex('links')
        .insert(
          {
            user_id: _userId[0],
            url: 'https://github.com/liwita/server'
          },
          'id'
        )
        .then((_linkId: number[]) => {
          return _knex('tags')
            .insert(
              {
                tag: 'github'
              },
              'id'
            )
            .then((_tagId: number[]) => {
              return _knex('links_tags').insert({
                link_id: _linkId[0],
                tag_id: _tagId[0]
              });
            });
        });
    });
};
