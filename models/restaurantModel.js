const db = require('../config/db');
const Restaurant = require('../entities/restaurantEntity');

const RestaurantModel = {
  async create({ Nom }) {
    const query = `
       INSERT INTO Restaurant (Nom)
       VALUES (?)
    `;

    const [result] = await db.execute(query, [Nom]);
    console.log('restaurant créé avec succès, ID:', result.insertId);

    return new Restaurant({
      Id_Restaurant: result.insertId,
      Nom
    });
  },
  
  async findAll() {
    try {
      const [results] = await db.query('SELECT * FROM Restaurant');
      const restaurants = results.map(row => new Restaurant(row));
      return restaurants;
    } catch (err) {
      console.error("Erreur lors de la récupération des restaurants :", err);
      throw err;
    }
  },
  async findByName(Nom) {
    const [results] = await db.query('SELECT * FROM Restaurant WHERE Nom = ?', [Nom]);
    
    if (results.length === 0) {
      return null; // Aucun restaurant avec ce nom
    }
  
    return new Restaurant(results[0]);
  },
  async findById(id) {
    try {
      const [results] = await db.query('SELECT * FROM Restaurant WHERE Id_Restaurant = ?', [id]);
  
      if (results.length === 0) {
        return null; // Aucun restaurant trouvé
      }
  
      const restaurant = new Restaurant(results[0]);
      return restaurant;
    } catch (err) {
      console.error("Erreur lors de la recherche du restaurant :", err);
      throw err;
    }
  }
};

module.exports = RestaurantModel;



