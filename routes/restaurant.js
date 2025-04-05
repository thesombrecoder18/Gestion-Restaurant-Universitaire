const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// Route pour obtenir tous les restaurants
router.get('/', restaurantController.getAllRestaurants);

// Route pour ajouter un restaurant
router.post('/', restaurantController.createRestaurant);

// Route pour obtenir un restaurant par ID
router.get('/:id', restaurantController.getRestaurantById);

module.exports = router;
