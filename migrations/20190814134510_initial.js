
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('artists', (table) => {
      table.increments('id').primary()
      table.string('artist_name')
      table.string('genre')
      table.integer('member_count')
      table.integer('year_formed')

      table.timestamps(true, true);
    }),

    knex.schema.createTable('albums', (table) => {
      table.increments('id').primary()
      table.string('album_name')
      table.integer('track_count')
      table.integer('year_released')
      table.integer('artist_id').unsigned()
      table.foreign('artist_id')
        .references("artists.id")
      
      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('albums'),
    knex.schema.dropTable('artists')
  ]);
};
