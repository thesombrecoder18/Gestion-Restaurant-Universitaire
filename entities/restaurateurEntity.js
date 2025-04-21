const Utilisateur = require('./utilisateurEntity');

class Restaurateur extends Utilisateur {
  constructor({ Id_Utilisateur, Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role }) {
    super({ Id_Utilisateur, Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role });
  }
}

module.exports = Restaurateur;