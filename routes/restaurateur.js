const express = require('express');
const router = express.Router();
const restaurateurController = require('../controllers/restaurateurController');

// Mettre à jour le menu
router.put('/menu', restaurateurController.mettreAJourMenu);

// Consulter les idées de menus reçues
router.get('/idees-menus', restaurateurController.consulterIdeesMenus);

module.exports = router;
