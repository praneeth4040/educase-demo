const mysql = require('mysql2');
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection when starting the server
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to MySQL Database:', err.message);
  } else {
    console.log('✅ Connected to MySQL Database');
    connection.release(); // release the connection back to the pool
  }
});

module.exports = pool.promise(); // Export promise-based pool for async/await usage


