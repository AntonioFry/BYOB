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
app.post('/api/v1/artists', (request, response) => {
  const { artist, albums } = request.body
  database('artists').insert({...artist}, "id")
    .then((artistId) => {
      setAlbumsArtist(artistId, albums);
      response.status(201).json(artist);
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
    })
  // when posting an artist the body will require a artist object and albums object
  // body.artist
    // the artist object will include the data (i.e artist_name, year_formed, etc.) that actually gets pushed to the database
  // body.albums
    // the albums object will include an array of albums that the user enters in manually
    // if the album exists in the albums database the artist id will be asigned to that album's artist_id property
})

// POST albums
app.post('/api/v1/albums', (request, response) => {
  const { artistName, bodyAlbum } = request.body
  getArtistId(artistName)
    .then((artistId) => {
      if (artistId === null) {
        database('albums').insert({...bodyAlbum}, "id");
      } else {
        database('albums').insert({ ...bodyAlbum, artist_id: artistId }, "id")
      }
    })
    .then(() => {
      response.status(201).json(bodyAlbum)
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
    })
  // when posting an album the body will require a artist object and album object
  // body.artist
    // the artist object will include the name of the artist that the user manually enters
    // if the artist exists in the the artists database the id of that artis will be asigned to the album's artist_id property
})

// DELETE albums
app.delete('/api/v1/albums/:id', (request, response) => {
  const { id } = request.params;
  database('albums').where("id", id).del()
    .then(() => {
      response.status(200).json(id)
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
    })
})

// DELETE artists
app.delete('/api/v1/artists/:id', (request, response) => {
  const { id } = request.params;
  database('artists').where("id", id).del()
    .then(() => {
      response.status(200).json(id)
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
    })
})

app.listen(PORT, () => console.log('app is running'));

const setAlbumsArtist = (artistId, albums) => {
  albums.forEach(bodyAlbum => {
    database('albums').select()
      .then(allAlbums => {
        const foundAlbum = allAlbums.find(album => album.album_name === bodyAlbum);
        console.log(foundAlbum)
        if (foundAlbum === undefined) {
          console.log(`The album ${bodyAlbum} is not in the database yet`) 
        } else {
          database('albums').where("id", '=', foundAlbum.id).update({ artist_id: artistId })
        }
      })
      .catch((error) => {
        console.log(error.message)
      })
  })
}

const getArtistId = (artistName) => {
  return database('artists').select()
    .then((allArtists) => {
      const foundArtist = allArtists.find(artist => artist.artist_name === artistName);
      if (foundArtist === undefined) {
        return null
      } else {
        return foundArtist.id;
      }
    })
    .catch((error) => {
      console.log(error.message);
    })
}