const Utilisateur = require('./utilisateurEntity');

class Gerant extends Utilisateur {
  constructor({
    Id_Utilisateur,
    Nom,
    Prenom,
    Mot_de_passe,
    Email,
    Sexe,
    dateNaissance,
    Role = 'gerant', // default role
    statistiques = [],
    agents = [],
    etudiants = []
  }) {
    super({ Id_Utilisateur, Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role });
    
    this.statistiques = statistiques; // ex: { ticketsVendus: 100, ticketsRecuperes: 95, platsServis: 90 }
    this.agents = agents; // liste d'ID ou objets agent
    this.etudiants = etudiants; // liste d'ID ou objets étudiant
  }

  // Méthodes pour le gérant
  consulterStatistiques() {
    return this.statistiques;
  }

  ajouterStatistique(nouvelleStat) {
    this.statistiques.push(nouvelleStat);
  }

  ajouterAgent(agent) {
    this.agents.push(agent);
  }

  ajouterEtudiant(etudiant) {
    this.etudiants.push(etudiant);
  }

  listerAgents() {
    return this.agents;
  }

  listerEtudiants() {
    return this.etudiants;
  }
}

module.exports = Gerant;
