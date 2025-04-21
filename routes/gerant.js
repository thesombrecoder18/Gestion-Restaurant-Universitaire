const express = require('express');
const router = express.Router();
const gerantController = require('../controllers/gerantController');

// Consulter la recette journalière
router.get('/stats/journalier', gerantController.getRecetteJournalier);

// Consulter la recette mensuelle
router.get('/stats/mensuel', gerantController.getRecetteMensuel);

// Consulter la recette annuelle
router.get('/stats/annuel', gerantController.getRecetteAnnuel);

// Consulter le nombre de tickets vendus
router.get('/tickets-vendus', gerantController.getTicketsVendus);

// Consulter le nombre de plats vendus par rapport aux tickets
router.get('/plats-vendus', gerantController.getPlatsVendus);

module.exports = router;
