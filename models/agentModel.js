const db = require('../config/db');
const bcrypt = require('bcrypt');
const Agent = require('../entities/agentEntity');

const AgentModel = {
  async create({ Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance }) {
    const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);
    const Role = 'agent';

    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO utilisateur (Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(query, [Nom, Prenom, hashedPassword, Email, Sexe, dateNaissance, Role], (err, result) => {
        if (err) {
          console.error('Erreur création agent :', err);
          return reject(err);
        }

        const agent = new Agent({
          Id_Utilisateur: result.insertId,
          Nom,
          Prenom,
          Mot_de_passe: hashedPassword,
          Email,
          Sexe,
          dateNaissance,
          Role
        });

        resolve(agent);
      });
    });
  },

  async getHistoriqueValidations(Id_Utilisateur) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ValidationTicket WHERE Id_Agent = ?`;
      db.query(query, [Id_Utilisateur], (err, results) => {
        if (err) {
          console.error('Erreur récupération historique :', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
} 
module.exports = AgentModel;