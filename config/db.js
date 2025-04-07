const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ipdl',
    password: 'passer',
    database: 'gestion_restaurant'
});

connection.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = connection;