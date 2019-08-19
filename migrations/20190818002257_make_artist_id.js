
exports.up = function(knex) {
  return knex.schema.table("albums", (table) => {
    table.integer('artist_id').unsigned()
    table.foreign('artist_id')
      .references("artists.id")
  })
};

exports.down = function(knex) {
  return knex.schema.table("albums", (table) => {
    table.dropColumn('artist_id')
  })
};
