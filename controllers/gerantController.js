const GerantModel = require('../models/gerantModel');

// 💸 Recette du jour
exports.getRecetteJournalier = async (req, res) => {
  const { Id_Utilisateur } = req.params;

  try {
    const stats = await GerantModel.getStatistiquesByGerantId(Id_Utilisateur);
    const today = new Date().toISOString().split('T')[0];

    const recette = stats
      .filter(stat => stat.date_statistique.toISOString().split('T')[0] === today)
      .reduce((total, stat) => total + stat.montant, 0);

    res.status(200).json({ date: today, recette_journalière: recette });
  } catch (err) {
    console.error("Erreur recette journalière:", err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// 📆 Recette du mois
exports.getRecetteMensuel = async (req, res) => {
  const { Id_Utilisateur } = req.params;

  try {
    const stats = await GerantModel.getStatistiquesByGerantId(Id_Utilisateur);
    const now = new Date();
    const moisActuel = now.getMonth();
    const anneeActuelle = now.getFullYear();

    const recette = stats
      .filter(stat => {
        const date = new Date(stat.date_statistique);
        return date.getMonth() === moisActuel && date.getFullYear() === anneeActuelle;
      })
      .reduce((total, stat) => total + stat.montant, 0);

    res.status(200).json({ mois: moisActuel + 1, annee: anneeActuelle, recette_mensuelle: recette });
  } catch (err) {
    console.error("Erreur recette mensuelle:", err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// 📅 Recette annuelle
exports.getRecetteAnnuel = async (req, res) => {
  const { Id_Utilisateur } = req.params;

  try {
    const stats = await GerantModel.getStatistiquesByGerantId(Id_Utilisateur);
    const anneeActuelle = new Date().getFullYear();

    const recette = stats
      .filter(stat => new Date(stat.date_statistique).getFullYear() === anneeActuelle)
      .reduce((total, stat) => total + stat.montant, 0);

    res.status(200).json({ annee: anneeActuelle, recette_annuelle: recette });
  } catch (err) {
    console.error("Erreur recette annuelle:", err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// 🎟️ Tickets vendus
exports.getTicketsVendus = async (req, res) => {
  const { Id_Utilisateur } = req.params;

  try {
    const stats = await GerantModel.getStatistiquesByGerantId(Id_Utilisateur);
    const totalTickets = stats.reduce((total, stat) => total + stat.nb_tickets, 0);

    res.status(200).json({ total_tickets_vendus: totalTickets });
  } catch (err) {
    console.error("Erreur tickets vendus:", err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// 🍽️ Plats vendus
exports.getPlatsVendus = async (req, res) => {
  const { Id_Utilisateur } = req.params;

  try {
    const stats = await GerantModel.getStatistiquesByGerantId(Id_Utilisateur);
    const totalPlats = stats.reduce((total, stat) => total + stat.nb_plats, 0);

    res.status(200).json({ total_plats_vendus: totalPlats });
  } catch (err) {
    console.error("Erreur plats vendus:", err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
