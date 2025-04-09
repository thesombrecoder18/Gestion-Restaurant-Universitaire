const db = require('../config/db');
const Etudiant = require('../entities/etudiantEntity');

const EtudiantModel = {
  async create({ Id_Utilisateur, numEtudiant, idTicket }) {
    const query = `
      INSERT INTO Etudiant (Id_Utilisateur, numEtudiant, idTicket)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [Id_Utilisateur, numEtudiant, idTicket]);
    return new Etudiant({ Id_Etudiant: result.insertId, Id_Utilisateur, numEtudiant, idTicket });
  },

  async findById(Id_Etudiant) {
    const query = 'SELECT * FROM Etudiant WHERE Id_Etudiant = ?';
    const [rows] = await db.execute(query, [Id_Etudiant]);
    if (rows.length === 0) return null;
    return new Etudiant(rows[0]);
  },

  async findByUtilisateurId(Id_Utilisateur) {
    const query = 'SELECT * FROM Etudiant WHERE Id_Utilisateur = ?';
    const [rows] = await db.execute(query, [Id_Utilisateur]);
    if (rows.length === 0) return null;
    return new Etudiant(rows[0]);
  },

  async updateTicket(Id_Etudiant, idTicket) {
    const query = 'UPDATE Etudiant SET idTicket = ? WHERE Id_Etudiant = ?';
    await db.execute(query, [idTicket, Id_Etudiant]);
    return idTicket;
  },

  async delete(Id_Etudiant) {
    const query = 'DELETE FROM Etudiant WHERE Id_Etudiant = ?';
    await db.execute(query, [Id_Etudiant]);
    return true;
  }
};

module.exports = EtudiantModel;