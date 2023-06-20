const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  port: 3001,
  user: 'root',
  password: 'password',
  database: 'TalkerDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;