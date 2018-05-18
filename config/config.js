module.exports = {
    aact: {
        port : process.env.PORT || 5432,
        client : process.env.CLIENT || 'postgres',
        user : process.env.AACT_DB_USER || 'aact',
        host : process.env.AACT_HOST || 'aact-db.ctti-clinicaltrials.org',
        database : process.env.AACT_DATABASE || 'aact',
        password : process.env.AACT_PASSWORD || 'aact',
        poolMin : process.env.poolMin || '0',
        poolMax : process.env.poolMax || '100',     
        connectionString : process.env.AACT_CONNECTION_AACT || 'postgres://aact:aact@aact-db.ctti-clinicaltrials.org:5432/aact'
    },    
    heroku: {
        port : process.env.PORT || 5432,
        client : process.env.HEROKU_CLIENT || 'pg',
        user : process.env.HEROKU_DB_USER || 'notProvided',
        host : process.env.HEROKU_HOST || 'notProvided',
        database : process.env.HEROKU_DATABASE || 'notProvided',
        password : process.env.HEROKU_PASSWORD || 'notProvided',  
    },
    zipcode: {
        port : process.env.PORT || 5432,
        client : process.env.ZIP_CLIENT || 'pg',
        user : process.env.ZIP_DB_USER || 'sanaread',
        host : process.env.ZIP_HOST || 'notProvided',
        database : process.env.ZIP_DATABASE || 'notProvided',
        password : process.env.ZIP_PASSWORD || 'notProvided',  
    },
    googlemaps: process.env.GOOGLE_KEY || 'notProvided',
    node_env : process.env.NODE_ENV || 'dev',
}
