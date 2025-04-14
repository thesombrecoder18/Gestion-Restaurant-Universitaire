const express = require('express');
const router = express.Router();
const restaurateurController = require('../controllers/restaurateurController');

// Création de compte restaurateur
router.post('/register', restaurateurController.register);

// Connexion
router.post('/login', restaurateurController.login);

// Déconnexion
router.post('/logout', restaurateurController.logout);

// Changement de mot de passe
router.put('/change-password', restaurateurController.changePassword);

// Récupération de compte
router.post('/recover', restaurateurController.recoverAccount);


// Consulter les menus du restaurateur
router.get('/menus', restaurateurController.consulterMenus);

// Créer un menu
router.post('/menus', restaurateurController.createMenu);

// Mettre à jour un menu
router.put('/menus/:menuId', restaurateurController.mettreAJourMenu);

module.exports = router;