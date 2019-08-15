const express = require('express');
const PORT = process.env.PORT || 3000
const app = express();

app.get('/', (request, response) => response.send('Hello World'));

app.listen(PORT, () => console.log('app is running'));

// endpoints
  // GET artists


  // GET artists by id


  // GET albums


  // GET albums by id


  // POST artists


  // POST albums


  // DELETE artist

  