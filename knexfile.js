// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: 'postgres://localhost/music',
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds/dev'
    }
  }

};
