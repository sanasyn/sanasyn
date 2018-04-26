module.exports = {
    aact: {
        port : process.env.NODE_ENV || 5432,
        client : process.env.CLIENT || 'postgres',
        user : process.env.DB_USER || 'notProvided',
        host : process.env.HOST || 'notProvided',
        database : process.env.DATABASE || 'notProvided',
        password : process.env.PASSWORD || 'notProvided',
        poolMin : process.env.poolMin || '0',
        poolMax : process.env.poolMax || '100',     
        connectionString : process.env.CONNECTION_AACT || 'postgres://aact:aact@aact-db.ctti-clinicaltrials.org:5432/aact'
    },
    heroku: {
        port : process.env.NODE_ENV || 5432,
        client : process.env.CLIENT || 'pg',
        user : process.env.DB_USER || 'notProvided',
        host : process.env.HOST || 'notProvided',
        database : process.env.DATABASE || 'notProvided',
        password : process.env.PASSWORD || 'notProvided',  
    },
    zipcode: {
        port : process.env.NODE_ENV || 5432,
        client : process.env.CLIENT || 'pg',
        user : process.env.DB_USER || 'notProvided',
        host : process.env.HOST || 'notProvided',
        database : process.env.DATABASE || 'notProvided',
        password : process.env.PASSWORD || 'notProvided',  
    },
    googlemaps: 'notProvided',
    node_env : process.env.NODE_ENV || 'dev',
}