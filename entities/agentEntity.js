const Utilisateur = require('./utilisateurEntity');

class Agent extends Utilisateur {
  constructor({
    Id_Utilisateur,
    Nom,
    Prenom,
    Mot_de_passe,
    Email,
    Sexe,
    dateNaissance,
    Role = 'agent',
    historiqueValidations = []
  }) {
    super({ Id_Utilisateur, Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role });
    this.historiqueValidations = historiqueValidations; // liste des tickets validés
  }

  ajouterValidation(validation) {
    this.historiqueValidations.push(validation);
  }

  getHistorique() {
    return this.historiqueValidations;
  }
}

module.exports = Agent;