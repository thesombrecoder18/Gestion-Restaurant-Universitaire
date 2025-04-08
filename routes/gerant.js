const express = require('express');
const router = express.Router();
const gerantController = require('../controllers/gerantController');

// Consulter la recette journalière
router.get('/:Id_Utilisateur/stats/journalier', gerantController.getRecetteJournalier);

// Consulter la recette mensuelle
router.get('/:Id_Utilisateur/stats/mensuel', gerantController.getRecetteMensuel);

// Consulter la recette annuelle
router.get('/:Id_Utilisateur/stats/annuel', gerantController.getRecetteAnnuel);

// Consulter le nombre de tickets vendus
router.get('/:Id_Utilisateur/tickets-vendus', gerantController.getTicketsVendus);

// Consulter le nombre de plats vendus
router.get('/:Id_Utilisateur/plats-vendus', gerantController.getPlatsVendus);

module.exports = router;
