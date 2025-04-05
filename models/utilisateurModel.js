const db = require('../config/db');
const bcrypt = require('bcrypt');
const Utilisateur = require('../entities/utilisateurEntity');

const UtilisateurModel = {
  async create({ Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role }) {
    const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);
    const query = `
      INSERT INTO utilisateur (Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const result =db.query(query, [Nom, Prenom, hashedPassword, Email, Sexe, dateNaissance, Role], (err, result) => {
      if (err) {
        console.error('Erreur lors de la création de l\'utilisateur :', err);
        return;
      }});
      console.log('Utilisateur créé avec succès, ID:', result.insertId);
    return new Utilisateur({ Id_Utilisateur: result.insertId, Nom, Prenom, Mot_de_passe: hashedPassword, Email, Sexe, dateNaissance, Role });
  },

  async  findByEmail(Email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM utilisateur WHERE Email = ?';
      db.query(query, [Email], (err, results) => {
        if (err) {
          console.error('Erreur SQL :', err);
          return reject(err);
        }
  
        if (results.length === 0) {
          return resolve(null);
        }
  
        const utilisateur = new Utilisateur(results[0]);
        return resolve(utilisateur);
      })});
  },

  async updatePassword(Email, nouveauMotDePasse) {
    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);
    const query = 'UPDATE utilisateur SET Mot_de_passe = ? WHERE Email = ?';
    await db.execute(query, [hashedPassword, Email]);
    return hashedPassword;
  }
};

module.exports = UtilisateurModel;