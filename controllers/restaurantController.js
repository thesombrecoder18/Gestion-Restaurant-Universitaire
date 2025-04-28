const RestaurantModel = require('../models/restaurantModel');

// Ajouter un restaurant
exports.createRestaurant = async (req, res) => {
  const { Nom } = req.body;

  try {
    if (!Nom) {
      return res.status(400).json({ message: 'Le nom du restaurant est obligatoire.' });
    }

    // Vérification si un restaurant avec le même nom existe déjà
    const existingRestaurant = await RestaurantModel.findByName(Nom);
    if (existingRestaurant) {
      return res.status(400).json({ message: 'Un restaurant avec ce nom existe déjà.' });
    }

    // Si pas trouvé, alors on crée
    const restaurant = await RestaurantModel.create({ Nom });
    res.status(201).json({ message: 'Restaurant créé avec succès.', restaurant });
  } catch (error) {
    console.error('Erreur lors de la création du restaurant :', error);

    // Gestion spéciale pour erreur SQL Duplicate Entry
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Un restaurant avec ce nom existe déjà (via base de données).' });
    }

    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};


// Obtenir tous les restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Erreur lors de la récupération des restaurants :', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};
// Obtenir un restaurant par ID
exports.getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await RestaurantModel.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant non trouvé.' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Erreur lors de la récupération du restaurant :', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};