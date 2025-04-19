// menuModel.js

const db = require('../config/db');
const Menu = require('../entities/menuEntity');

const MenuModel = {
    async createMenu({ Nom, Plat, Id_Restaurant }) {
        return new Promise((resolve, reject) => {
            const query = `
        INSERT INTO Menu (Nom, Plat, Id_Restaurant)
        VALUES (?, ?, ?)
      `;
            db.query(query, [Nom, Plat, Id_Restaurant], (err, result) => {
                if (err) {
                    console.error('Erreur lors de la création du menu :', err);
                    return reject(err);
                }
                const menu = new Menu({
                    Id_Menu: result.insertId,
                    Nom,
                    Plat,
                    Id_Restaurant
                });
                resolve(menu);
            });
        });
    },

    async findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Menu', (err, results) => {
                if (err) {
                    console.error('Erreur lors de la récupération des menus :', err);
                    return reject(err);
                }
                const menus = results.map(row => new Menu(row));
                resolve(menus);
            });
        });
    },

    async findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Menu WHERE Id_Menu = ?';
            db.query(query, [id], (err, results) => {
                if (err) {
                    console.error('Erreur lors de la récupération du menu :', err);
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                resolve(new Menu(results[0]));
            });
        });
    },

    async update(id, { Nom, Plat, Id_Restaurant }) {
        return new Promise((resolve, reject) => {
            const query = `
        UPDATE Menu
        SET Nom = ?, Plat = ?, Id_Restaurant = ?
        WHERE Id_Menu = ?
      `;
            db.query(query, [Nom, Plat, Id_Restaurant, id], (err, result) => {
                if (err) {
                    console.error('Erreur lors de la mise à jour du menu :', err);
                    return reject(err);
                }
                resolve(result.affectedRows > 0);
            });
        });
    },

    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Menu WHERE Id_Menu = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    console.error('Erreur lors de la suppression du menu :', err);
                    return reject(err);
                }
                resolve(result.affectedRows > 0);
            });
        });
    }
};

module.exports = MenuModel;
