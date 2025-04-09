const bcrypt = require('bcrypt');
const UtilisateurModel = require('../models/utilisateurModel');

// Enregistrement d'un utilisateur
exports.register = async (req, res) => {
  const { Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role } = req.body;

  try {
    if (!Nom || !Prenom || !Mot_de_passe || !Email || !Sexe || !dateNaissance || !Role) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const utilisateur = await UtilisateurModel.create({
      Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role
    });

    // Supprimer le mot de passe avant d’envoyer l’utilisateur
    const safeUser = { ...utilisateur };
    delete safeUser.Mot_de_passe;

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.', utilisateur: safeUser });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    } else {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur serveur.', error });
    }
  }
};

// Connexion de l'utilisateur
exports.login = async (req, res) => {
  const { Email, Mot_de_passe } = req.body;

  try {
    if (!Email || !Mot_de_passe) {
      return res.status(400).json({ message: 'Email et mot de passe sont obligatoires.' });
    }

    const utilisateur = await UtilisateurModel.findByEmail(Email);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const isMatch = await bcrypt.compare(Mot_de_passe, utilisateur.Mot_de_passe);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const safeUser = { ...utilisateur };
    delete safeUser.Mot_de_passe;

    res.status(200).json({ message: 'Connexion réussie.', utilisateur: safeUser });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Déconnexion (statique pour l’instant)
exports.logout = (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie.' });
};

// Changement de mot de passe
exports.changePassword = async (req, res) => {
  const { Email, ancienMotDePasse, nouveauMotDePasse } = req.body;

  try {
    if (!Email || !ancienMotDePasse || !nouveauMotDePasse) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const utilisateur = await UtilisateurModel.findByEmail(Email);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const isMatch = await bcrypt.compare(ancienMotDePasse, utilisateur.Mot_de_passe);
    if (!isMatch) {
      return res.status(401).json({ message: 'Ancien mot de passe incorrect.' });
    }

    const hashedPassword = await UtilisateurModel.updatePassword(Email, nouveauMotDePasse);
    res.status(200).json({ message: 'Mot de passe changé avec succès.' });
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe :', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

// Simulation de récupération de compte
exports.recoverAccount = async (req, res) => {
  const { Email } = req.body;

  try {
    if (!Email) {
      return res.status(400).json({ message: 'Email est obligatoire.' });
    }

    const utilisateur = await UtilisateurModel.findByEmail(Email);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // À ce stade tu pourrais générer un token ou envoyer un email
    res.status(200).json({ message: 'Email de récupération envoyé (simulation).' });
  } catch (error) {
    console.error('Erreur lors de la récupération :', error);
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};
