const db = require('../config/db');
const bcrypt = require('bcryptjs');
const Utilisateur = require('../entities/utilisateurEntity');

const UtilisateurModel = {
  async create({ Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role }) {
    const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);
    const query = `
      INSERT INTO Utilisateur (Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [Nom, Prenom, hashedPassword, Email, Sexe, dateNaissance, Role]);
    console.log('Utilisateur créé avec succès, ID:', result.insertId);

    return new Utilisateur({
      Id_Utilisateur: result.insertId,
      Nom,
      Prenom,
      Mot_de_passe: hashedPassword,
      Email,
      Sexe,
      dateNaissance,
      Role
    });
  },

  async findByEmail(Email) {
    const query = 'SELECT * FROM Utilisateur WHERE Email = ?';
    const [rows] = await db.execute(query, [Email]);

    if (rows.length === 0) {
      return null;
    }

    return new Utilisateur(rows[0]);
  },

  async updatePassword(Email, nouveauMotDePasse) {
    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);
    const query = 'UPDATE Utilisateur SET Mot_de_passe = ? WHERE Email = ?';
    await db.execute(query, [hashedPassword, Email]);
    return hashedPassword;
  }
};

module.exports = UtilisateurModel;
