const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');

// Acheter un ticket
router.post('/acheter-ticket', etudiantController.acheterTicket);

// Consulter le nombre de tickets
router.get('/tickets', etudiantController.consulterTickets);

// Partager un ticket avec un autre étudiant
router.post('/partager-ticket', etudiantController.partagerTicket);

// Consulter les restaurants disponibles
router.get('/restaurants', etudiantController.consulterRestaurants);

// Consulter le menu d'un restaurant
router.get('/menu/:idRestaurant', etudiantController.consulterMenu);

// Consulter le flux d'un restaurant
router.get('/flux/:idRestaurant', etudiantController.consulterFlux);

// Proposer une idée de menu
router.post('/idee-menu', etudiantController.proposerIdeeMenu);

module.exports = router;
