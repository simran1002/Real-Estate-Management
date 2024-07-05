require("dotenv").config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.user,
    host: 'localhost',
    database: 'real_estate_db',
    password: process.env.password,
    port: 5432,
});

module.exports = pool;
