const db = require('../config/db');
const GerantEntity = require('../entities/gerantEntity');

const GerantModel = {
  // Enregistrer une vente de ticket (table VenteTicket)
  async enregistrerVenteTicket({ idEtudiant, idTicket }) {
    const query = `INSERT INTO VenteTicket (Id_Etudiant, Id_Ticket, DateVente) VALUES (?, ?, NOW())`;
    try {
      const [result] = await db.execute(query, [idEtudiant, idTicket]);
      return result.insertId;
    } catch (err) {
      console.error('Erreur SQL lors de l\'enregistrement de la vente de ticket :', err);
      throw new Error('Erreur lors de l\'enregistrement de la vente de ticket');
    }
  },

  // Enregistrer un plat servi (validation du ticket via la table ValidationTicket)
  async enregistrerPlatServi({ idVente, idAgent }) {
    const query = `INSERT INTO ValidationTicket (Id_Vente, Id_Agent, DateValidation) VALUES (?, ?, NOW())`;
    try {
      const [result] = await db.execute(query, [idVente, idAgent]);
      return result.insertId;
    } catch (err) {
      console.error('Erreur SQL lors de l\'enregistrement du plat servi :', err);
      throw new Error('Erreur lors de l\'enregistrement du plat servi');
    }
  },

  // Obtenir un gérant par son ID
  async getGerantById(id) {
    const query = `SELECT * FROM Gerant WHERE Id_Gerant = ?`;
    try {
      const [rows] = await db.execute(query, [id]);
      if (rows.length === 0) {
        throw new Error('Gérant non trouvé');
      }
      const { Id_Gerant, Nom, Prenom, Email } = rows[0];
      return new GerantEntity(Id_Gerant, Nom, Prenom, Email); // Retourne une instance de GerantEntity
    } catch (err) {
      console.error('Erreur SQL lors de la récupération du gérant :', err);
      throw new Error('Erreur lors de la récupération du gérant');
    }
  },

  // Obtenir tous les gérants
  async getAllGerants() {
    const query = `SELECT * FROM Gerant`;
    try {
      const [rows] = await db.execute(query);
      return rows.map(row => new GerantEntity(row.Id_Gerant, row.Nom, row.Prenom, row.Email)); // Retourne une liste d'entités
    } catch (err) {
      console.error('Erreur SQL lors de la récupération des gérants :', err);
      throw new Error('Erreur lors de la récupération des gérants');
    }
  },

  // Obtenir la recette journalière (somme des prix des tickets vendus aujourd'hui)
  async getRecetteJournalier() {
    const query = `
      SELECT DATE(VT.DateVente) AS jour, SUM(T.Prix) AS recette
      FROM VenteTicket VT
      JOIN Ticket T ON VT.Id_Ticket = T.Id_Ticket
      WHERE DATE(VT.DateVente) = CURDATE()
      GROUP BY jour
    `;
    try {
      const [rows] = await db.execute(query);
      return rows.length ? rows[0] : { jour: new Date().toISOString().slice(0, 10), recette: 0 };
    } catch (err) {
      console.error('Erreur SQL lors de la récupération de la recette journalière :', err);
      throw new Error('Erreur lors de la récupération de la recette journalière');
    }
  },

  // Obtenir la recette mensuelle
  async getRecetteMensuel() {
    const query = `
      SELECT MONTH(VT.DateVente) AS mois, YEAR(VT.DateVente) AS annee, SUM(T.Prix) AS recette
      FROM VenteTicket VT
      JOIN Ticket T ON VT.Id_Ticket = T.Id_Ticket
      WHERE MONTH(VT.DateVente) = MONTH(CURDATE()) AND YEAR(VT.DateVente) = YEAR(CURDATE())
      GROUP BY mois, annee
    `;
    try {
      const [rows] = await db.execute(query);
      return rows.length ? rows[0] : { mois: new Date().getMonth() + 1, recette: 0 };
    } catch (err) {
      console.error('Erreur SQL lors de la récupération de la recette mensuelle :', err);
      throw new Error('Erreur lors de la récupération de la recette mensuelle');
    }
  },

  // Obtenir la recette annuelle
  async getRecetteAnnuel() {
    const query = `
      SELECT YEAR(VT.DateVente) AS annee, SUM(T.Prix) AS recette
      FROM VenteTicket VT
      JOIN Ticket T ON VT.Id_Ticket = T.Id_Ticket
      WHERE YEAR(VT.DateVente) = YEAR(CURDATE())
      GROUP BY annee
    `;
    try {
      const [rows] = await db.execute(query);
      return rows.length ? rows[0] : { annee: new Date().getFullYear(), recette: 0 };
    } catch (err) {
      console.error('Erreur SQL lors de la récupération de la recette annuelle :', err);
      throw new Error('Erreur lors de la récupération de la recette annuelle');
    }
  },

  // Obtenir le nombre total de tickets vendus
  async getTicketsVendus() {
    const query = `SELECT COUNT(*) AS totalTickets FROM VenteTicket`;
    try {
      const [rows] = await db.execute(query);
      return rows[0].totalTickets;
    } catch (err) {
      console.error('Erreur SQL lors de la récupération des tickets vendus :', err);
      throw new Error('Erreur lors de la récupération des tickets vendus');
    }
  },

  // Obtenir le nombre total de plats servis (en se basant sur ValidationTicket)
  async getPlatsVendus() {
    const query = `SELECT COUNT(*) AS platsVendus FROM ValidationTicket`;
    try {
      const [rows] = await db.execute(query);
      return rows[0].platsVendus;
    } catch (err) {
      console.error('Erreur SQL lors de la récupération des plats servis :', err);
      throw new Error('Erreur lors de la récupération des plats servis');
    }
  }
};

module.exports = GerantModel;
