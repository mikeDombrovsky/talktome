import knex from 'knex';

export const db = knex({
    client:'pg',
    connection:{
        port: procces.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
    }
})

