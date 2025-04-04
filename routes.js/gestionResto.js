const express = require('express');
const router = express.Router();
const gestionRestoController = require('../controllers/gestionRestoController');

// Route pour lier un restaurant à un utilisateur (par exemple, un restaurateur)
router.post('/', gestionRestoController.linkUserToRestaurant);

module.exports = router;
