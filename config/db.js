// db.js
const mysql = require('mysql2/promise'); 

const pool = mysql.createPool({
  host: 'db',
  user: 'ipdl',
  password: 'passer',
  database: 'gestion_restaurant',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Fonction pour tester la connexion à la base de données// Test de connexion à la base de données
(async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Database connected successfully');
      connection.release(); // Libère la connexion
    } catch (error) {
      console.error('Erreur lors de la connexion à la base de données :', error.message);
    }
  })();
module.exports = pool;
