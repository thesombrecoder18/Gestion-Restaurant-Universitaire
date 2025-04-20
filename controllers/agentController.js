const db = require('../config/db');
const AgentModel = require('../models/agentModel');


exports.validerTicket = async (req, res) => {
  const { qrCodeData, Id_Agent } = req.body;

  try {
    if (!qrCodeData || !Id_Agent) {
      return res.status(400).json({ message: 'QR code et ID agent requis.' });
    }

    const venteId = qrCodeData;

    // 1. Vérifier si la vente existe et n’a pas déjà été validée
    const [venteResult] = await db.promise().query(
      'SELECT * FROM VenteTicket WHERE Id_Vente = ?',
      [venteId]
    );

    if (venteResult.length === 0) {
      return res.status(404).json({ message: 'Ticket non trouvé.' });
    }

    const vente = venteResult[0];

    // Vérifier si ce ticket a déjà été validé
    const [validationCheck] = await db.promise().query(
      'SELECT * FROM ValidationTicket WHERE Id_Vente = ?',
      [venteId]
    );

    if (validationCheck.length > 0) {
      return res.status(400).json({ message: 'Ce ticket a déjà été validé.' });
    }

    const idEtudiant = vente.Id_Etudiant;

    // 2. Décrémenter le solde de tickets de l’étudiant
    await db.promise().query(
      'UPDATE Utilisateur SET solde_tickets = solde_tickets - 1 WHERE Id_Utilisateur = ?',
      [idEtudiant]
    );

    // 3. Enregistrer la validation
    await db.promise().query(
      'INSERT INTO ValidationTicket (Id_Vente, Id_Agent, DateValidation) VALUES (?, ?, NOW())',
      [venteId, Id_Agent]
    );

    res.status(200).json({ message: 'Ticket validé avec succès.' });

  } catch (err) {
    console.error('Erreur validation ticket :', err);
    res.status(500).json({ message: 'Erreur serveur.', error: err });
  }
};


exports.creerAgent = async (req, res) => {
  const { Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance } = req.body;

  try {
    const agent = await AgentModel.create({ Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance });
    res.status(201).json({ message: 'Agent créé avec succès.', agent });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

exports.getHistoriqueValidations = async (req, res) => {
  const { Id_Utilisateur } = req.params;

  try {
    const historique = await AgentModel.getHistoriqueValidations(Id_Utilisateur);
    res.status(200).json({ historique });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};
