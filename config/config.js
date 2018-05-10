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
    local: {
        port : process.env.NODE_ENV || 5432,
        client : process.env.CLIENT || 'postgres',
        user : process.env.DB_USER || 'whitneywong',
        host : process.env.HOST || 'localhost',
        database : process.env.DATABASE || 'testdb',
        password : process.env.PASSWORD || '',  
    },
    heroku: {
        port : process.env.PORT || 5432,
        client : process.env.HEROKU_CLIENT || 'pg',
        user : process.env.HEROKU_DB_USER || 'udvarwydbwewdx',
        host : process.env.HEROKU_HOST || 'ec2-54-83-11-247.compute-1.amazonaws.com',
        database : process.env.HEROKU_DATABASE || 'd4kltvr29jig9h',
        password : process.env.HEROKU_PASSWORD || '820cc5f1693678e34b525f8157dedfecbe65d63d97af95f905b30f449e302108',  
    },
    zipcode: {
        port : process.env.PORT || 5432,
        client : process.env.ZIP_CLIENT || 'pg',
        user : process.env.ZIP_DB_USER || 'sanaread',
        host : process.env.ZIP_HOST || 'sanasyn-db.cfslvawilndc.us-east-2.rds.amazonaws.com',
        database : process.env.ZIP_DATABASE || 'sanasyn',
        password : process.env.ZIP_PASSWORD || 'receptordetector',  
    },
    googlemaps: process.env.GOOGLE_KEY || 'AIzaSyBCyRuFxxuSVcYNNDZmVWrBUJgHaoXhLJ0',
    node_env : process.env.NODE_ENV || 'dev',
}