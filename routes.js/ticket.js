const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Route pour obtenir tous les tickets
router.get('/', ticketController.getAllTickets);

// Route pour ajouter un ticket
router.post('/', ticketController.createTicket);

// Route pour obtenir un ticket par ID
router.get('/:id', ticketController.getTicketById);

module.exports = router;
