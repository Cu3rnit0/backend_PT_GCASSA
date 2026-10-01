const sql = require('mssql');
require('dotenv').config();

const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        console.log('Conexión a SQL Server exitosa');
        return pool;
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
    }
};
module.exports = { sql, getConnection };