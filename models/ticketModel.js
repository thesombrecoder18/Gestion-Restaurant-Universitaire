const db = require('../config/db');
const Ticket = require('../entities/ticketEntity');

const TicketModel = {
    // Créer un ticket
    async create({ Type, Prix }) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO Ticket (Type, Prix) VALUES (?, ?)`;
            db.query(query, [Type, Prix], (err, result) => {
                if (err) {
                    console.error("Erreur lors de la création du ticket :", err);
                    return reject(err);
                }

                const ticket = new Ticket({
                    Id_Ticket: result.insertId,
                    Type,
                    Prix,
                });

                resolve(ticket);
            });
        });
    },

    // Récupérer tous les tickets
    async findAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Ticket`;
            db.query(query, (err, results) => {
                if (err) {
                    console.error("Erreur lors de la récupération des tickets :", err);
                    return reject(err);
                }

                const tickets = results.map(row => new Ticket(row));
                resolve(tickets);
            });
        });
    },

    // Récupérer un ticket par ID
    async findById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Ticket WHERE Id_Ticket = ?`;
            db.query(query, [id], (err, results) => {
                if (err) {
                    console.error("Erreur lors de la récupération du ticket :", err);
                    return reject(err);
                }

                if (results.length === 0) {
                    return resolve(null);
                }

                const ticket = new Ticket(results[0]);
                resolve(ticket);
            });
        });
    },

    // Mettre à jour un ticket
    async update(id, { Type, Prix }) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE Ticket SET Type = ?, Prix = ? WHERE Id_Ticket = ?`;
            db.query(query, [Type, Prix, id], (err, result) => {
                if (err) {
                    console.error("Erreur lors de la mise à jour du ticket :", err);
                    return reject(err);
                }

                resolve({ Id_Ticket: id, Type, Prix });
            });
        });
    },

    // Supprimer un ticket
    async delete(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM Ticket WHERE Id_Ticket = ?`;
            db.query(query, [id], (err, result) => {
                if (err) {
                    console.error("Erreur lors de la suppression du ticket :", err);
                    return reject(err);
                }

                resolve({ message: 'Ticket supprimé avec succès', id });
            });
        });
    }
};

module.exports = TicketModel;
