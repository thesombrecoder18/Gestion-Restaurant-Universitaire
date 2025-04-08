// entities/ticketEntity.js

class Ticket {
    constructor({ Id_Ticket, Type, Prix }) {
        this.Id_Ticket = Id_Ticket;
        this.Type = Type;
        this.Prix = Prix;
    }
}

module.exports = Ticket;
