const db = require('../config/db');
const GestionResto = require('../entities/gestionRestoEntity');

const GestionRestoModel = {
    async create({ Id_Utilisateur, Id_Restaurant }) {
        return new Promise((resolve, reject) => {
            const query = `
        INSERT INTO GestionResto (Id_Utilisateur, Id_Restaurant)
        VALUES (?, ?)
      `;
            db.query(query, [Id_Utilisateur, Id_Restaurant], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'association restaurateur-restaurant :', err);
                    return reject(err);
                }
                console.log('Association Restaurateur-Restaurant ajoutée avec succès.');
                resolve(new GestionResto({ Id_Utilisateur, Id_Restaurant }));
            });
        });
    }
};

module.exports = GestionRestoModel;
