module.exports = {
    aact: {
        port : process.env.AACT_NODE_ENV || 5432,
        client : process.env.AACT_CLIENT || 'postgres',
        user : process.env.AACT_DB_USER || 'aact',
        host : process.env.AACT_HOST || 'aact-db.ctti-clinicaltrials.org',
        database : process.env.AACT_DATABASE || 'aact',
        password : process.env.AACT_PASSWORD || 'aact',
        poolMin : process.env.poolMin || '0',
        poolMax : process.env.poolMax || '100',     
        connectionString : process.env.CONNECTION_AACT || 'postgres://aact:aact@aact-db.ctti-clinicaltrials.org:5432/aact'
    },
    heroku: {
        port : process.env.HEROKU_NODE_ENV || 5432,
        client : process.env.HEROKU_CLIENT || 'pg',
        user : process.env.HEROKU_DB_USER || 'notprovided',
        host : process.env.HEROKU_HOST || 'notprovided',
        database : process.env.HEROKU_DATABASE || 'notprovided',
        password : process.env.HEROKU_PASSWORD || 'notprovided',  
    },
    zipcode: {
        port : process.env.ZIP_NODE_ENV || 5432,
        client : process.env.ZIP_CLIENT || 'pg',
        user : process.env.ZIP_DB_USER || 'sanaread',
        host : process.env.ZIP_HOST || 'notprovided',
        database : process.env.ZIP_DATABASE || 'notprovided',
        password : process.env.ZIP_PASSWORD || 'notprovided',  
    },
    googlemaps: process.env.GOOGLE_KEY || 'notprovided',
    node_env : process.env.NODE_ENV || 'prod',
}
