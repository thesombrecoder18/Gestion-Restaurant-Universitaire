class Etudiant {
  constructor({ Id_Etudiant, Id_Utilisateur, numEtudiant, idTicket }) {
    this.Id_Etudiant = Id_Etudiant;
    this.Id_Utilisateur = Id_Utilisateur;
    this.numEtudiant = numEtudiant;
    this.idTicket = idTicket;
  }
}

module.exports = Etudiant;