const GerantModel = require('../models/gerantModel');

// Recette journalière
exports.getRecetteJournalier = async (req, res) => {
  try {
    const recette = await GerantModel.getRecetteJournalier();
    res.json(recette);
  } catch (error) {
    console.error('Erreur lors du calcul de la recette journalière:', error.message);
    res.status(500).json({ message: 'Erreur serveur lors du calcul de la recette journalière.' });
  }
};

// Recette mensuelle
exports.getRecetteMensuel = async (req, res) => {
  try {
    const recette = await GerantModel.getRecetteMensuel();
    res.json(recette);
  } catch (error) {
    console.error('Erreur lors du calcul de la recette mensuelle:', error.message);
    res.status(500).json({ message: 'Erreur serveur lors du calcul de la recette mensuelle.' });
  }
};

// Recette annuelle
exports.getRecetteAnnuel = async (req, res) => {
  try {
    const recette = await GerantModel.getRecetteAnnuel();
    res.json(recette);
  } catch (error) {
    console.error('Erreur lors du calcul de la recette annuelle:', error.message);
    res.status(500).json({ message: 'Erreur serveur lors du calcul de la recette annuelle.' });
  }
};

// Nombre total de tickets vendus
exports.getTicketsVendus = async (req, res) => {
  try {
    const ticketsVendus = await GerantModel.getTicketsVendus();
    res.json({ totalTickets: ticketsVendus });
  } catch (error) {
    console.error('Erreur lors de la récupération des tickets vendus:', error.message);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des tickets vendus.' });
  }
};

// Nombre total de plats servis
exports.getPlatsVendus = async (req, res) => {
  try {
    const platsVendus = await GerantModel.getPlatsVendus();
    res.json({ totalPlats: platsVendus });
  } catch (error) {
    console.error('Erreur lors de la récupération des plats vendus:', error.message);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des plats vendus.' });
  }
};

// Enregistrer une vente de ticket
exports.enregistrerVenteTicket = async (req, res) => {
  try {
    const { idEtudiant, idTicket } = req.body;
    if (!idEtudiant || !idTicket) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }
    const insertId = await GerantModel.enregistrerVenteTicket({ idEtudiant, idTicket });
    res.status(201).json({ message: 'Vente enregistrée avec succès', id: insertId });
  } catch (error) {
    console.error('Erreur lors de l’enregistrement de la vente :', error.message);
    res.status(500).json({ message: 'Erreur serveur lors de la vente du ticket.' });
  }
};

// Enregistrer un plat servi (validation du ticket)
exports.enregistrerPlatServi = async (req, res) => {
  try {
    const { idVente, idAgent } = req.body;
    if (!idVente || !idAgent) {
      return res.status(400).json({ message: 'Champs requis manquants.' });
    }
    const insertId = await GerantModel.enregistrerPlatServi({ idVente, idAgent });
    res.status(201).json({ message: 'Plat servi enregistré avec succès', id: insertId });
  } catch (error) {
    console.error('Erreur lors de l’enregistrement du plat servi :', error.message);
    res.status(500).json({ message: 'Erreur serveur lors de l’enregistrement du plat.' });
  }
};
