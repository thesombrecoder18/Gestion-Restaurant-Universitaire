// controllers/menuController.js

const MenuModel = require('../models/menuModel');

// Créer un menu
exports.createMenu = async (req, res) => {
  const { Nom, Plat, Id_Restaurant } = req.body;

  try {
    if (!Nom || !Plat || !Id_Restaurant) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const menu = await MenuModel.create({ Nom, Plat, Id_Restaurant });
    res.status(201).json({ message: 'Menu créé avec succès.', menu });
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      res.status(400).json({ message: 'Le restaurant spécifié n\'existe pas.' });
    } else {
      console.error('Erreur lors de la création du menu :', error);
      res.status(500).json({ message: 'Erreur serveur.', error });
    }
  }
};

// Récupérer tous les menus
exports.getAllMenus = async (req, res) => {
  try {
    const menus = await MenuModel.findAll();
    res.status(200).json(menus);
  } catch (error) {
    console.error('Erreur lors de la récupération des menus :', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Récupérer un menu par son ID
exports.getMenuById = async (req, res) => {
  const { id } = req.params;

  try {
    const menu = await MenuModel.findById(id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu non trouvé.' });
    }
    res.status(200).json(menu);
  } catch (error) {
    console.error('Erreur lors de la récupération du menu :', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Mettre à jour un menu
exports.updateMenu = async (req, res) => {
  const { id } = req.params;
  const { Nom, Plat, Id_Restaurant } = req.body;

  try {
    if (!Nom || !Plat || !Id_Restaurant) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const updated = await MenuModel.update(id, { Nom, Plat, Id_Restaurant });
    if (!updated) {
      return res.status(404).json({ message: 'Menu non trouvé ou non mis à jour.' });
    }

    res.status(200).json({ message: 'Menu mis à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du menu :', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Supprimer un menu
exports.deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await MenuModel.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Menu non trouvé.' });
    }

    res.status(200).json({ message: 'Menu supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression du menu :', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};
