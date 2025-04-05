const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

// Créer un compte utilisateur
router.post('/register', utilisateurController.register);

// Se connecter
router.post('/login', utilisateurController.login);

// Se déconnecter
router.post('/logout', utilisateurController.logout);

// Changer mot de passe
router.put('/change-password', utilisateurController.changePassword);

// Récupérer un compte
router.post('/recover', utilisateurController.recoverAccount);

module.exports = router;
