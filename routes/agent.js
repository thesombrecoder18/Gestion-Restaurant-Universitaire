const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

// Scanner le QR code
router.post('/scanner-qr', agentController.scannerQRCode);

module.exports = router;
