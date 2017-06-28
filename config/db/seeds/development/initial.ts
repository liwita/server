import * as Knex from 'knex';

const seed = async (_knex: Knex): Promise<any> => {
  /**
   * NOTE: Clear house...
   */
  await _knex('links_tags').del();
  await _knex('tags').del();
  await _knex('links').del();
  await _knex('authentications').del();
  await _knex('users').del();

  /**
   * NOTE: Add stuff...
   */
  const userId = await _knex('users').insert(
    {
      username: 'impmja',
      firstname: 'Jan',
      lastname: 'Schulte',
      email: 'info@liwita.net'
    },
    'id'
  );
  await _knex('authentications').insert({
    user_id: userId[0],
    type: 'local',
    identifier: '1234567890',
    data: `{ "id": 1234567890 }`
  });

  const linkId = await _knex('links').insert(
    {
      user_id: userId[0],
      url: 'https://github.com/liwita/server'
    },
    'id'
  );
  const tagId = await _knex('tags').insert(
    {
      tag: 'github'
    },
    'id'
  );
  await _knex('links_tags').insert({
    link_id: linkId[0],
    tag_id: tagId[0]
  });
};

export { seed };
