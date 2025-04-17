const db = require('../config/db');

exports.validerTicket = async (req, res) => {
  const { qrCodeData, Id_Agent } = req.body;

  try {
    if (!qrCodeData || !Id_Agent) {
      return res.status(400).json({ message: 'QR code et ID agent requis.' });
    }

    // Supposons que le QR code contient un ID de ticket
    const ticketId = qrCodeData;

    // 1. Vérifier si le ticket existe et est valide
    const [tickets] = await db.promise().query(
      'SELECT * FROM tickets WHERE Id_ticket = ? AND est_utilise = 0',
      [ticketId]
    );

    if (tickets.length === 0) {
      return res.status(404).json({ message: 'Ticket invalide ou déjà utilisé.' });
    }

    const ticket = tickets[0];

    // 2. Marquer le ticket comme utilisé
    await db.promise().query(
      'UPDATE tickets SET est_utilise = 1, date_validation = NOW() WHERE Id_ticket = ?',
      [ticketId]
    );

    // 3. Décrémenter le solde de tickets de l’étudiant
    await db.promise().query(
      'UPDATE utilisateurs SET solde_tickets = solde_tickets - 1 WHERE Id_Utilisateur = ?',
      [ticket.Id_etudiant]
    );

    // 4. Ajouter un log de validation dans la table validations
    await db.promise().query(
      'INSERT INTO validations (Id_ticket, Id_agent, date_validation) VALUES (?, ?, NOW())',
      [ticketId, Id_Agent]
    );

    res.status(200).json({ message: 'Ticket validé avec succès.' });

  } catch (err) {
    console.error('Erreur validation ticket :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


const AgentModel = require('../models/agentModel');

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


/*tickets avec :

Id_ticket, Id_etudiant, est_utilise (bool), date_validation

utilisateurs avec :

solde_tickets

validations avec :

Id_validation, Id_ticket, Id_agent, date_validation*/
