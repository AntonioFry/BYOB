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
  // we access the table of artists and then grab all of its contents
  .then((artists) => {
    // .then is used to wait for all of the data we are grabbing to resolve
    response.status(200).json(artists)
    // once all the data is returned, the server sends back a success status code and parsed the data
  })
  .catch(error => {
    // if the attempt to grab the data fails, a status code of 500 is sent back meaning the server messed up
    response.status(500).json({ error })
  })
})

// GET artists by id
app.get('/api/v1/artists/:id', (request, response) => {
  const { id } = request.params;
  // in order to get a specific artist the id from the endpoint is required and can be extracted from request.params
  database('artists').select()
  // the table 'artists' is accessed and select is used to return all of its contents
  .then((artists) => {
    // the data is returned once resolved
    const foundArtist = artists.find(artist => artist.id === parseInt(id));
    // the data is iterated through until is finds the artist with the same id as the id from request.params
    // the id is also parsed to change it into an integer
    if (foundArtist !== undefined) {
      return response.status(200).json(foundArtist);
      // if the artist object from foundArtist isn't undefined the object is parsed and then returned along with a success status code
    } else {
      return response.sendStatus(404);
      // if the artist object is undefined, it means that the artist did not exist and a 'resource not found' status is sent back
    }
  })
  .catch((error) => {
    response.status(500).json({ error: error.message });
    // if the database fails to resolve or grab the data from the 'artists' table a '
    // server failiure' status is sent back aling with an error
  })
})

// GET albums
app.get('/api/v1/albums', (request, response) => {
  database('albums').select()
  // all the data from 'albums' is queried
  .then((albums) => {
    // the data from 'albums' waits to be resolved 
    response.status(200).json(albums)
    // the data is parsed and a success status code is given
  })
  .catch((error) => {
    response.status(500).json({ error: error.message });
    // if the attempt to grab the data fails, a status code of 500 is sent back meaning the server messed up
  })
})


// GET albums by id
app.get('/api/v1/albums/:id', (request, response) => {
  const { id } = request.params;
  // in order to get a specific albums the id from the endpoint is required and can be extracted from request.params
  database('albums').select()
  // all the albums data get queried
  .then((albums) => {
    // the data from the query awaits to be resolved
    const foundAlbum = albums.find(album => album.id === parseInt(id));
    // the data is iterated through until it finds the album id that matches the request params id
    // the id is also parsed to change it into an integer
    if (foundAlbum !== undefined) {
      return response.status(200).json(foundAlbum);
      // if the album object from the find method is not undefined, then the data is parsed and returned with a success status code
    } else {
      return response.sendStatus(404);
      // if the found album object is undefined, then the status of 'resource not found' is sent back
    }
  })
  .catch((error) => {
    response.status(500).json({ error: error.message });
    // if the database fails to resolve or grab the data from the 'albums' table a
    // server failiure' status is sent back aling with an error
  })
})

// POST artists
app.post('/api/v1/artists', (request, response) => {
  const { artist, albums } = request.body
  // when posting an artist the body will require a artist object and albums object
  // body.artist
    // the artist object will include the data (i.e artist_name, year_formed, etc.) that actually gets pushed to the database
  // body.albums
    // the albums object will include an array of albums that the user enters in manually
    // if the album exists in the albums database the artist id will be asigned to that album's artist_id property
  database('artists').insert({...artist}, "id")
  // the artist object from the body is inserted to the artists data and the id is returned
    .then((artistId) => {
      // the id is returned from the .then callback after the insertion of data resolves
      setAlbumsArtist(artistId, albums);
      // this function should update all albums without a artist_id using the albums provided from the body as well as the artistId
      response.status(201).json(artist);
      // the posted data is parsed and the status of 'created' is sent back signifying a new resource was created
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
      // if the database failed to insert data at all a error as well as a status of 'server failiure' is sent back
    })
})

// POST albums
app.post('/api/v1/albums', (request, response) => {
  const { artistName, bodyAlbum } = request.body
  // when posting an album the body will require a artist object and album object
  // body.artist
    // the artist object will include the name of the artist that the user manually enters
    // if the artist exists in the the artists database the id of that artis will be asigned to the album's artist_id property
  // body.album
    // is what will be inserted into the database
  getArtistId(artistName)
  // the artistName is used to get the artist id fro the album's artist_id property
    .then((artistId) => {
      // the result of the function get resolved
      if (artistId === null) {
        // if the artist did not exist, the artistId should be null
        database('albums').insert({...bodyAlbum}, "id");
        // id null the data from the body is inserted into the 'albums' table along without the value of artistId
      } else {
        database('albums').insert({ ...bodyAlbum, artist_id: artistId }, "id")
        // if not null the data is inserted into the 'albums' table along with artist id
      }
    })
    .then(() => {
      // the data is inserted and resolved 
      response.status(201).json(bodyAlbum)
      // the posted data is parsed and the status of 'created' is sent back signifying a new resource was created
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
      // if the database failed to insert data at all a error as well as a status of 'server failiure' is sent back
    })
})

// DELETE albums
app.delete('/api/v1/albums/:id', (request, response) => {
  const { id } = request.params;
  // an id from the endpoint is provide in order to find which album to delete
  database('albums').where("id", id).del()
  // the table 'albums' is queried and finds the id that matches request params id
  // the row that is then found is deleted
    .then(() => {
      // the data gets resolved after the deletion
      response.status(200).json(id)
      // a response with the status of 'success' is sent back along with the id of the deleted album
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
      // if the deletion at all fails, a status of 'server failiure' is sen back along with an error message
    })
})

// DELETE artists
app.delete('/api/v1/artists/:id', (request, response) => {
  const { id } = request.params;
  // an id from the endpoint is provide in order to find which album to delete
  database('artists').where("id", id).del()
   // the table 'artists' is queried and finds the id that matches request params id
  // the row that is then found is deleted
    .then(() => {
       // the data gets resolved after the deletion
      response.status(200).json(id)
      // a response with the status of 'success' is sent back along with the id of the deleted artist
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
      // if the deletion at all fails, a status of 'server failiure' is sen back along with an error message
    })
})

app.listen(PORT, () => console.log('app is running'));

const setAlbumsArtist = (artistId, albums) => {
  albums.forEach(bodyAlbum => {
    // the album names provided from the body are iterated through
    database('albums').select()
    // all the data from the 'albums' table is queried
      .then(allAlbums => {
        // the data is returned once resolved
        const foundAlbum = allAlbums.find(album => album.album_name === bodyAlbum);
        // the data is iterated through until an album of the matching name as the one provided from the body is found
        if (foundAlbum === undefined) {
          console.log(`The album ${bodyAlbum} is not in the database yet`)
          // if an album of the name does not exist a message is logged
        } else {
          database('albums').where("id", '=', foundAlbum.id).update({ artist_id: artistId })
          // if the album does exist, the album's artist_id is updated with the artist's id
        }
      })
      .catch((error) => {
        console.log(error.message)
        // if the code at all fails a message is logged
      })
  })
}

const getArtistId = (artistName) => {
  return database('artists').select()
  // the data from the 'artists' table is queried and selected
    .then((allArtists) => {
      // the data gets resolved and returned
      const foundArtist = allArtists.find(artist => artist.artist_name === artistName);
      // the data is iterated through until an artist of a matching name is found.
      if (foundArtist === undefined) {
        return null
        // if no artist is found null is returned
      } else {
        return foundArtist.id;
        // if an artist is found the artist's id is returned
      }
    })
    .catch((error) => {
      console.log(error.message);
       // if the code at all fails a message is logged
    })
}