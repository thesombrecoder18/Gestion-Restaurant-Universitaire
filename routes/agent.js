const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

// Créer un agent
router.post('/register', agentController.creerAgent);

// Récupérer l’historique de validation des tickets
router.get('/:Id_Utilisateur/historique', agentController.getHistoriqueValidations);

//valider un ticket via qr code 
router.post('/valider-ticket', agentController.validerTicket);


module.exports = router;

