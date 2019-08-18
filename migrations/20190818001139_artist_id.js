
exports.up = function(knex) {
  return knex.schema.table("albums", (table) => {
    table.dropColumn('artist_id')
  })
};

exports.down = function(knex) {
  return knex.schema.table("albums", (table) => {
    table.string('artist_id').unsigned()
    table.foreign('artist_id')
      .references("artists.id")
  })
};
