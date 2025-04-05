const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Récupérer tous les tickets
router.get('/', ticketController.getAllTickets);

// Détails d'un ticket spécifique
router.get('/:id', ticketController.getTicketById);

// Créer un ticket
router.post('/', ticketController.createTicket);

// Modifier un ticket
router.put('/:id', ticketController.updateTicket);

// Supprimer un ticket
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;
