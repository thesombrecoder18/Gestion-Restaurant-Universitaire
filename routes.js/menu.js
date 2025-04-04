const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Route pour obtenir tous les menus
router.get('/', menuController.getAllMenus);

// Route pour ajouter un menu
router.post('/', menuController.createMenu);

// Route pour obtenir un menu par ID
router.get('/:id', menuController.getMenuById);

module.exports = router;
