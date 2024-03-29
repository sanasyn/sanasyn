module.exports = {
  aact: {
      port : process.env.AACT_NODE_ENV || 5432,
      client : process.env.AACT_CLIENT || 'postgres',
      user : process.env.AACT_DB_USER || 'notProvided',
      host : process.env.AACT_HOST || 'notProvided',
      database : process.env.AACT_DATABASE || 'notProvided',
      password : process.env.AACT_PASSWORD || 'notProvided',
      poolMin : process.env.poolMin || '0',
      poolMax : process.env.poolMax || '100',     
      connectionString : process.env.CONNECTION_AACT || 'notProvided'
  },
  heroku: {
      port : process.env.HEROKU_NODE_ENV || 5432,
      client : process.env.HEROKU_CLIENT || 'pg',
      user : process.env.HEROKU_DB_USER || 'notProvided',
      host : process.env.HEROKU_HOST || 'notProvided',
      database : process.env.HEROKU_DATABASE || 'notProvided',
      password : process.env.HEROKU_PASSWORD || 'notProvided',  
  },
  zipcode: {
      port : process.env.ZIP_NODE_ENV || 5432,
      client : process.env.ZIP_CLIENT || 'pg',
      user : process.env.ZIP_DB_USER || 'notProvided',
      host : process.env.ZIP_HOST || 'notProvided',
      database : process.env.ZIP_DATABASE || 'notProvided',
      password : process.env.ZIP_PASSWORD || 'notProvided',  
  },
  googlemaps: process.env.GOOGLE_KEY || 'notProvided',
  node_env : process.env.NODE_ENV || 'prod',
}