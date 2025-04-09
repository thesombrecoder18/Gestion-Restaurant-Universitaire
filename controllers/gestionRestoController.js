// Exemple en mémoire
// let gestionRestos = [
//   { restaurateurId: 1, restaurantId: 1 },
// ];

// // Lier un restaurateur à un restaurant
// const linkUserToRestaurant = (req, res) => {
//   const { restaurateurId, restaurantId } = req.body;
//   const link = { restaurateurId, restaurantId };
//   gestionRestos.push(link);
//   res.status(201).json(link);
// };

// module.exports = { linkUserToRestaurant };


const GestionRestoModel = require('../models/gestionRestoModel');

exports.linkUserToRestaurant = async (req, res) => {
  const { Id_Utilisateur, Id_Restaurant } = req.body;

  try {
    if (!Id_Utilisateur || !Id_Restaurant) {
      return res.status(400).json({ message: 'Utilisateur et restaurant sont obligatoires.' });
    }

    const gestionResto = await GestionRestoModel.create({ Id_Utilisateur, Id_Restaurant });
    res.status(201).json({ message: 'Utilisateur lié au restaurant avec succès.', gestionResto });
  } catch (error) {
    console.error('Erreur lors de la liaison utilisateur-restaurant :', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};
