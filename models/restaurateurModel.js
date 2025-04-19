const db = require('../config/db');
const bcrypt = require('bcrypt');
const Restaurateur = require('../entities/restaurateurEntity');
const MenuModel = require('../models/menuModel');  

const RestaurateurModel = {
  async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Utilisateur WHERE Email = ? AND Role = 'Restaurateur'";
      db.query(query, [email], (err, results) => {
        if (err) {
          console.error('Erreur lors de la récupération du restaurateur :', err);
          return reject(err);
        }

        if (results.length === 0) {
          return resolve(null);
        }

        const restaurateur = new Restaurateur(results[0]);
        resolve(restaurateur);
      });
    });
  },

  /*async createMenu({ Nom, Plat, Id_Restaurant }) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Menu (Nom, Plat, Id_Restaurant)
        VALUES (?, ?, ?)
      `;
      console.log("DEBUG INSERT:", Nom, Plat, Id_Restaurant);

      db.query(query, [Nom, Plat, Id_Restaurant], (err, result) => {
        if (err) {
          console.error('Erreur lors de la création du menu :', err);
          return reject(err);
        }
        const menu = {
          Id_Menu: result.insertId,
          Nom,
          Plat,
          Id_Restaurant
        };
        resolve(menu);
      });
    });
  },
  */
  async createMenu({ Nom, Plat, Id_Restaurant }) {
    const query = "INSERT INTO Menu (Nom, Plat, Id_Restaurant) VALUES (?, ?, ?)";

    try {
      const [result] = await db.execute(query, [Nom, Plat, Id_Restaurant]);
      return { id: result.insertId, Nom, Plat, Id_Restaurant };
    } catch (error) {
      console.error('Erreur SQL lors de la création du menu :', error);
      throw error;
    }
  },

  /*async consulterMenus(idRestaurateur) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT m.* 
        FROM Menu m
        JOIN RestaurateurMenu rm ON m.Id_Menu = rm.Id_Menu
        WHERE rm.Id_Utilisateur = ?
      `;
      db.query(query, [idRestaurateur], (err, results) => {
        if (err) {
          console.error('Erreur lors de la récupération des menus :', err);
          return reject(err);
        }

        resolve(results); // Liste des menus associés à ce restaurateur
      });

    })
  },*/

  async consulterMenus(idRestaurateur) {
    const query = `
      SELECT m.* 
      FROM Menu m
      JOIN RestaurateurMenu rm ON m.Id_Menu = rm.Id_Menu
      WHERE rm.Id_Utilisateur = ?
    `;
  
    try {
      const [rows] = await db.execute(query, [idRestaurateur]);
      return rows; // retourne tous les menus liés à ce restaurateur
    } catch (error) {
      console.error('Erreur SQL lors de la consultation des menus :', error);
      throw error;
    }
  },
  
    
  

  async mettreAJourMenu(idMenu, nouvellesInfos) {
    const query = 'UPDATE Menu SET Nom = ?, Plat = ? WHERE Id_Menu = ?';
    const { Nom, Plat } = nouvellesInfos;
  
    try {
      const [result] = await db.execute(query, [Nom, Plat, idMenu]);
  
      // On peut vérifier si une ligne a été modifiée
      if (result.affectedRows === 0) {
        return { success: false, message: 'Aucun menu mis à jour. Vérifiez l\'ID.' };
      }
  
      return { success: true, message: 'Menu mis à jour avec succès.' };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du menu :", error);
      throw error;
    }
  }
  
};

module.exports = RestaurateurModel;