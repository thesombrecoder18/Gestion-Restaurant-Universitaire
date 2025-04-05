class Utilisateur {
  constructor({ Id_Utilisateur, Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role }) {
    this.Id_Utilisateur = Id_Utilisateur;
    this.Nom = Nom;
    this.Prenom = Prenom;
    this.Mot_de_passe = Mot_de_passe;
    this.Email = Email;
    this.Sexe = Sexe;
    this.dateNaissance = dateNaissance;
    this.Role = Role;
  }
}

module.exports = Utilisateur;