const express = require('express');
const app = express();
const cors = require('cors');
const port = 6001;

// Middleware pour parser les données JSON
app.use(express.json());
app.use(cors());
// Importation des routes
const utilisateurRoutes = require('./routes/utilisateur');
const ticketRoutes = require('./routes/ticket');
const restaurantRoutes = require('./routes/restaurant');
const menuRoutes = require('./routes/menu');
const gestionRestoRoutes = require('./routes/gestionResto');
const gerantRoutes = require('./routes/gerant');

// Utilisation des routes
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/gestion-resto', gestionRestoRoutes);
app.use('/api/gerant', gerantRoutes);
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
