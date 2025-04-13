const EtudiantModel = require('../models/etudiantModel');
const UtilisateurModel = require('../models/utilisateurModel');
const bcrypt = require('bcryptjs');

exports.acheterTicket = async (req, res) => {
  const { idEtudiant, idTicket } = req.body;

  try {
    if (!idEtudiant || !idTicket) {
      return res.status(400).json({ message: 'idEtudiant et idTicket sont obligatoires.' });
    }

    const etudiant = await EtudiantModel.findById(idEtudiant);
    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }

    await EtudiantModel.updateTicket(idEtudiant, idTicket);
    res.status(200).json({ message: 'Ticket acheté avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

exports.consulterTickets = async (req, res) => {
  const { idEtudiant } = req.params;

  try {
    const etudiant = await EtudiantModel.findById(idEtudiant);
    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }

    res.status(200).json({ message: 'Tickets restants consultés.', ticket: etudiant.idTicket });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

exports.partagerTicket = async (req, res) => {
  const { idEtudiantSource, idEtudiantCible, idTicket } = req.body;

  try {
    if (!idEtudiantSource || !idEtudiantCible || !idTicket) {
      return res.status(400).json({ message: 'idEtudiantSource, idEtudiantCible et idTicket sont obligatoires.' });
    }

    const etudiantSource = await EtudiantModel.findById(idEtudiantSource);
    const etudiantCible = await EtudiantModel.findById(idEtudiantCible);

    if (!etudiantSource || !etudiantCible) {
      return res.status(404).json({ message: 'Étudiant source ou cible non trouvé.' });
    }

    // Transférer le ticket
    await EtudiantModel.updateTicket(idEtudiantSource, null); // Retirer le ticket de l'étudiant source
    await EtudiantModel.updateTicket(idEtudiantCible, idTicket); // Ajouter le ticket à l'étudiant cible

    res.status(200).json({ message: 'Ticket partagé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

exports.consulterRestaurants = async (req, res) => {
    try {
      const restaurants = await EtudiantModel.getAllRestaurants();
      res.status(200).json({ message: 'Restaurants disponibles consultés.', restaurants });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.', error });
    }
  };

  exports.consulterMenu = async (req, res) => {
    const { idRestaurant } = req.params;
  
    try {
      const menu = await EtudiantModel.getMenuByRestaurantId(idRestaurant);
      if (!menu) {
        return res.status(404).json({ message: 'Menu non trouvé pour ce restaurant.' });
      }
  
      res.status(200).json({ message: 'Menu consulté avec succès.', menu });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.', error });
    }
  };

exports.consulterFlux = (req, res) => {
    // Implémentation de la consultation du flux du restaurant
};

exports.proposerIdeeMenu = (req, res) => {
    // Implémentation de la proposition d'une idée de menu
};


exports.createEtudiant = async (req, res) => {
  const { Id_Utilisateur, numEtudiant, idTicket } = req.body;

  try {
    if (!Id_Utilisateur || !numEtudiant) {
      return res.status(400).json({ message: 'Id_Utilisateur et numEtudiant sont obligatoires.' });
    }

    const etudiant = await EtudiantModel.create({ Id_Utilisateur, numEtudiant, idTicket });
    res.status(201).json({ message: 'Étudiant créé avec succès.', etudiant });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

exports.getEtudiantById = async (req, res) => {
  const { id } = req.params;

  try {
    const etudiant = await EtudiantModel.findById(id);
    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }

    res.status(200).json(etudiant);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

exports.getEtudiantByUtilisateurId = async (req, res) => {
  const { utilisateurId } = req.params;

  try {
    const etudiant = await EtudiantModel.findByUtilisateurId(utilisateurId);
    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }

    res.status(200).json(etudiant);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

exports.updateEtudiantTicket = async (req, res) => {
  const { id } = req.params;
  const { idTicket } = req.body;

  try {
    if (!idTicket) {
      return res.status(400).json({ message: 'idTicket est obligatoire.' });
    }

    await EtudiantModel.updateTicket(id, idTicket);
    res.status(200).json({ message: 'Ticket mis à jour avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

exports.deleteEtudiant = async (req, res) => {
  const { id } = req.params;

  try {
    await EtudiantModel.delete(id);
    res.status(200).json({ message: 'Étudiant supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};