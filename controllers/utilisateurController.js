const bcrypt = require('bcrypt');
const UtilisateurModel = require('../models/utilisateurModel');

exports.register = async (req, res) => {
  const { Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role } = req.body;

  try {
    if (!Nom || !Prenom || !Mot_de_passe || !Email || !Sexe || !dateNaissance || !Role) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const utilisateur = await UtilisateurModel.create({ Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role });
    res.status(201).json({ message: 'Utilisateur enregistré avec succès.', utilisateur });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    } else {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur serveur.', error });
    }
  }
};

exports.login = async (req, res) => {
  const { Email, Mot_de_passe } = req.body;

  try {
    if (!Email || !Mot_de_passe) {
      return res.status(400).json({ message: 'Email et mot de passe sont obligatoires.' });
    }

    const utilisateur = await UtilisateurModel.findByEmail(Email);
    console.log('Utilisateur trouvé controleur:', utilisateur); // Debugging line
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const isMatch = await bcrypt.compare(Mot_de_passe, utilisateur.Mot_de_passe);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    res.status(200).json({ message: 'Connexion réussie.', utilisateur });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie.' });
};

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
    res.status(200).json({ message: 'Mot de passe changé avec succès.', hashedPassword });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};

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

    res.status(200).json({ message: 'Email de récupération envoyé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error });
  }
};
