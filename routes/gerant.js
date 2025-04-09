const express = require('express');
const router = express.Router();
const gerantController = require('../controllers/gerantController');

// Statistiques
router.get('/stats/journalier', gerantController.getRecetteJournalier);
router.get('/stats/mensuel', gerantController.getRecetteMensuel);
router.get('/stats/annuel', gerantController.getRecetteAnnuel);
router.get('/tickets-vendus', gerantController.getTicketsVendus);
router.get('/plats-vendus', gerantController.getPlatsVendus);

// Insertion de données
router.post('/vente-ticket', gerantController.enregistrerVenteTicket);
router.post('/plat-servi', gerantController.enregistrerPlatServi);

module.exports = router;
