// Exemple de base de données en mémoire, à remplacer par une vraie base de données
let tickets = [
    { id: 1, type: 'Petit-déjeuner', prix: 500 },
    { id: 2, type: 'Déjeuner', prix: 1000 },
  ];
  
  // Obtenir tous les tickets
  const getAllTickets = (req, res) => {
    res.json(tickets);
  };
  
  // Ajouter un ticket
  const createTicket = (req, res) => {
    const { type, prix } = req.body;
    const newTicket = { id: tickets.length + 1, type, prix };
    tickets.push(newTicket);
    res.status(201).json(newTicket);
  };
  
  // Obtenir un ticket par ID
  const getTicketById = (req, res) => {
    const ticketId = parseInt(req.params.id);
    const ticket = tickets.find(t => t.id === ticketId);
    
    if (!ticket) {
      return res.status(404).send('Ticket non trouvé');
    }
  
    res.json(ticket);
  };
  
  module.exports = { getAllTickets, createTicket, getTicketById };
  