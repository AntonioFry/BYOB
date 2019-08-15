const albumsData = require('../../data/albumsData');
const artistsData = require('../../data/artistsData');

const findAlbum = (currentAlbum) => {
  return albumsData.find(album => {
    return album.album_name === currentAlbum;
  })
}

const createAlbum = (knex, album) => {
  return knex("albums").insert(album);
}

const createArtist = (knex, artist) => {
  return knex("artists").insert({
    "artist_name": artist.artist_name,
    "genre": artist.genre,
    "member_count": artist.member_count,
    "year_formed": artist.year_formed
  }, "id")
  .then(artistId => {
    console.log(artistId);
    let albumPromises = [];

    artist.albums.forEach(album => {
      const foundAlbum = findAlbum(album);
      albumPromises.push(
        createAlbum(knex, {
          ...foundAlbum,
          artist_id: artistId[0] 
        })
      )
    });

    return Promise.all(albumPromises);
  })
}


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('albums').del()
    .then(() => knex('artists').del())
  .then(() => {
    let artistPromises = [];

    artistsData.forEach(artist => {
      artistPromises.push(createArtist(knex, artist));
    });

    return Promise.all(artistPromises);
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};
