const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Récupérer tous les menus
router.get('/', menuController.getAllMenus);

// Détails d'un menu spécifique
router.get('/:id', menuController.getMenuById);

// Créer un menu
router.post('/', menuController.createMenu);

// Modifier un menu
router.put('/:id', menuController.updateMenu);

// Supprimer un menu
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
