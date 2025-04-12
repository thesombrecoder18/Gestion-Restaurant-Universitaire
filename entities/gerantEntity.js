class GerantEntity {
  constructor(id, nom, prenom, email) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
  }

  getFullName() {
    return `${this.prenom} ${this.nom}`;
  }
}

module.exports = GerantEntity;