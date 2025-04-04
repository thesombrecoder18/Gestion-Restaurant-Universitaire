const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

// Route pour obtenir tous les utilisateurs
router.get('/', utilisateurController.getAllUsers);

// Route pour ajouter un utilisateur
router.post('/', utilisateurController.createUser);

// Route pour obtenir un utilisateur par ID
router.get('/:id', utilisateurController.getUserById);

module.exports = router;
