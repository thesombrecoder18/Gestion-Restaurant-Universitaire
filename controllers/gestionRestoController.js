// Exemple en mémoire
let gestionRestos = [
    { restaurateurId: 1, restaurantId: 1 },
  ];
  
  // Lier un restaurateur à un restaurant
  const linkUserToRestaurant = (req, res) => {
    const { restaurateurId, restaurantId } = req.body;
    const link = { restaurateurId, restaurantId };
    gestionRestos.push(link);
    res.status(201).json(link);
  };
  
  module.exports = { linkUserToRestaurant };
  