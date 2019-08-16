const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const PORT = process.env.PORT || 3000
const app = express();

app.set('port', PORT)
app.get('/', (request, response) => response.send('Hello World'));
app.use(express.json());
app.use(express.static('public'));

// endpoints
// GET artists
app.get('/api/v1/artists', (request, response) => {
  database('artists').select()
  .then((artists) => {
    response.status(200).json(artists)
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

// GET artists by id
app.get('/api/v1/artists/:id', (request, response) => {
  const { id } = request.params;
  database('artists').select()
  .then((artists) => {
    const foundArtist = artists.find(artist => artist.id === parseInt(id));
    if (foundArtist !== undefined) {
      return response.status(200).json(foundArtist);
    } else {
      return response.sendStatus(404);
    }
  })
  .catch((error) => {
    response.status(500).json({ error: error.message });
  })
})

// GET albums
app.get('/api/v1/albums', (request, response) => {
  database('albums').select()
  .then((albums) => {
    response.status(200).json(albums)
  })
  .catch((error) => {
    response.status(500).json({ error: error.message });
  })
})


// GET albums by id
app.get('/api/v1/albums/:id', (request, response) => {
  const { id } = request.params;
  database('albums').select()
  .then((albums) => {
    const foundAlbum = albums.find(album => album.id === parseInt(id));
    if (foundAlbum !== undefined) {
      return response.status(200).json(foundAlbum);
    } else {
      return response.sendStatus(404);
    }
  })
  .catch((error) => {
    response.status(500).json({ error: error.message });
  })
})

// POST artists
app.post('api/v1/albums', (request, response) => {
  const { artist_name, genre, member_count, year_formed } = 
})

// POST albums


// DELETE artist


app.listen(PORT, () => console.log('app is running'));