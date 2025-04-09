// exports.getAllTickets = (req, res) => {
//   // Implémentation de la récupération de tous les tickets
// };

// exports.getTicketById = (req, res) => {
//   // Implémentation de la récupération des détails d'un ticket
// };

// exports.createTicket = (req, res) => {
//   // Implémentation de la création d'un ticket
// };

// exports.updateTicket = (req, res) => {
//   // Implémentation de la mise à jour d'un ticket
// };

// exports.deleteTicket = (req, res) => {
//   // Implémentation de la suppression d'un ticket
// };

const TicketModel = require('../models/ticketModel');

// Créer un ticket
exports.createTicket = async (req, res) => {
  const { Type, Prix } = req.body;

  try {
    if (!Type || Prix === undefined) {
      return res.status(400).json({ message: 'Type et prix sont obligatoires.' });
    }

    const ticket = await TicketModel.create({ Type, Prix });
    res.status(201).json({ message: 'Ticket créé avec succès.', ticket });
  } catch (error) {
    console.error("Erreur lors de la création du ticket :", error);
    res.status(500).json({ message: "Erreur serveur.", error });
  }
};

// Récupérer tous les tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await TicketModel.findAll();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Erreur lors de la récupération des tickets :", error);
    res.status(500).json({ message: "Erreur serveur.", error });
  }
};

// Récupérer un ticket par ID
exports.getTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await TicketModel.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket non trouvé.' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Erreur lors de la récupération du ticket :", error);
    res.status(500).json({ message: "Erreur serveur.", error });
  }
};

// Mettre à jour un ticket
exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { Type, Prix } = req.body;

  try {
    if (!Type || Prix === undefined) {
      return res.status(400).json({ message: 'Type et prix sont obligatoires.' });
    }

    const updatedTicket = await TicketModel.update(id, { Type, Prix });
    res.status(200).json({ message: 'Ticket mis à jour avec succès.', updatedTicket });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du ticket :", error);
    res.status(500).json({ message: "Erreur serveur.", error });
  }
};

// Supprimer un ticket
exports.deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await TicketModel.delete(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la suppression du ticket :", error);
    res.status(500).json({ message: "Erreur serveur.", error });
  }
};
