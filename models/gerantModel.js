const db = require('../config/db');
const Gerant = require('../entities/gerantEntity');
const bcrypt = require('bcrypt');

const GerantModel = {
  async create({ Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance }) {
    const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);
    const Role = 'gerant'; // on force le rôle

    const query = `
      INSERT INTO utilisateur (Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [Nom, Prenom, hashedPassword, Email, Sexe, dateNaissance, Role], (err, result) => {
        if (err) {
          console.error('Erreur création gérant :', err);
          return reject(err);
        }

        const gerant = new Gerant({
          Id_Utilisateur: result.insertId,
          Nom,
          Prenom,
          Mot_de_passe: hashedPassword,
          Email,
          Sexe,
          dateNaissance,
          Role
        });

        console.log('Gérant créé avec ID :', result.insertId);
        resolve(gerant);
      });
    });
  },

  async getStatistiquesByGerantId(Id_Utilisateur) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM statistiques WHERE Id_gerant = ?`;
      db.query(query, [Id_Utilisateur], (err, results) => {
        if (err) {
          console.error('Erreur récupération stats :', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  async getAgentsByGerantId(Id_Utilisateur) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM utilisateur WHERE Role = 'agent' AND Id_gerant = ?`;
      db.query(query, [Id_Utilisateur], (err, results) => {
        if (err) {
          console.error('Erreur récupération agents :', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  async getEtudiantsByGerantId(Id_Utilisateur) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM utilisateur WHERE Role = 'etudiant' AND Id_gerant = ?`;
      db.query(query, [Id_Utilisateur], (err, results) => {
        if (err) {
          console.error('Erreur récupération étudiants :', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
};

module.exports = GerantModel;
