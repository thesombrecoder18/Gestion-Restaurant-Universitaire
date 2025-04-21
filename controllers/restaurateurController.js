const bcrypt = require('bcrypt');
const utilisateurController = require('./utilisateurController');
const RestaurateurModel = require('../models/restaurateurModel');
const MenuModel = require('../models/menuModel');


// Reuse des fonctions utilisateurController
exports.login = utilisateurController.login;
exports.logout = utilisateurController.logout;
exports.changePassword = utilisateurController.changePassword;
exports.recoverAccount = utilisateurController.recoverAccount;

// Enregistrement spécifique pour les restaurateurs
exports.register = async (req, res) => {
  req.body.Role = 'Restaurateur'; // Forcer le rôle
  return utilisateurController.register(req, res);
};

// Créer un menu
/*exports.createMenu = async (req, res) => {
    const { Nom, Plat, Id_Restaurant } = req.body;
  
    try {
      if (!Nom || !Plat || !Id_Restaurant) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
      }
  
      const menu = await RestaurateurModel.createMenu({ Nom, Plat, Id_Restaurant });
      res.status(201).json({ message: 'Menu créé avec succès.', menu });
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        res.status(400).json({ message: 'Le restaurant spécifié n\'existe pas.' });
      } else {
        console.error('Erreur lors de la création du menu :', error);
        res.status(500).json({ message: 'Erreur serveur.', error });
      }
    }
  };*/

// Consulter tous les menus du restaurateur connecté
exports.consulterMenus = async (req, res) => {
  const restaurateurId = req.user?.Id_Utilisateur || req.body?.Id_Utilisateur;

  if (!restaurateurId) {
    return res.status(400).json({ message: "Identifiant restaurateur manquant." });
  }

  try {
    const menus = await RestaurateurModel.consulterMenus(restaurateurId);
    res.status(200).json({ success: true, menus });
  } catch (error) {
    console.error("Erreur récupération des menus :", error);
    res.status(500).json({ success: false, message: "Erreur serveur", error: error.message });
  }
};

// Création d’un menu
exports.createMenu = async (req, res) => {
    const { Nom, Plat, Id_Restaurant } = req.body;
  
    console.log("Données reçues :", { Nom, Plat, Id_Restaurant });
  
    if (!Nom || !Plat || !Id_Restaurant) {
      return res.status(400).json({
        success: false,
        message: "Champs requis manquants.",
        required: { Nom: "string", Plat: "string", Id_Restaurant: "number" }
      });
    }
  
    try {
        const menu = await RestaurateurModel.createMenu(req.body);

        console.log("Menu créé :", menu);
        
        res.status(201).json({
          success: true,
          message: "Menu créé avec succès.",
          menuId: menu.Id_Menu,  // Correction ici
          links: {
            self: `/api/menus/${menu.Id_Menu}`,
            restaurateur: `/api/restaurateurs/${Id_Restaurant}`
          }
        });
    } catch (error) {
      console.error("Erreur création menu :", error);
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la création du menu.",
        error: error.message
      });
    }
};
  

// Mise à jour d’un menu existant
exports.mettreAJourMenu = async (req, res) => {
  const { menuId } = req.params;
  const { Nom, Plat } = req.body;

  if (!Nom && !Plat) {
    return res.status(400).json({
      success: false,
      message: "Au moins un champ (Nom ou Plat) doit être fourni."
    });
  }

  try {
    const updated = await RestaurateurModel.mettreAJourMenu(menuId, { Nom, Plat });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Menu non trouvé." });
    }

    res.status(200).json({ success: true, message: "Menu mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur mise à jour menu :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la mise à jour du menu.",
      error: error.message
    });
  }
};