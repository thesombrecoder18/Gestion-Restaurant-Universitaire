// Exemple de base de données en mémoire, à remplacer par une vraie base de données
let restaurants = [
    { id: 1, nom: 'Restaurant Universitaire 1' },
    { id: 2, nom: 'Restaurant Universitaire 2' },
  ];
  
  // Obtenir tous les restaurants
  const getAllRestaurants = (req, res) => {
    res.json(restaurants);
  };
  
  // Ajouter un restaurant
  const createRestaurant = (req, res) => {
    const { nom } = req.body;
    const newRestaurant = { id: restaurants.length + 1, nom };
    restaurants.push(newRestaurant);
    res.status(201).json(newRestaurant);
  };
  
  // Obtenir un restaurant par ID
  const getRestaurantById = (req, res) => {
    const restaurantId = parseInt(req.params.id);
    const restaurant = restaurants.find(r => r.id === restaurantId);
    
    if (!restaurant) {
      return res.status(404).send('Restaurant non trouvé');
    }
  
    res.json(restaurant);
  };
  
  module.exports = { getAllRestaurants, createRestaurant, getRestaurantById };
  