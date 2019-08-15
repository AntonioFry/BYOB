
const createArtist = (knex, paper) => {

}

const createAlbum = (knex, album) => {

}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('albums').del()
    .then(() => knex('artists').del())
};
