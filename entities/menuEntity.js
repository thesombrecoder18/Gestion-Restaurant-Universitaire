// menuEntity.js

class Menu {
    constructor({ Id_Menu, Nom, Plat, Id_Restaurant }) {
        this.Id_Menu = Id_Menu;
        this.Nom = Nom;
        this.Plat = Plat;
        this.Id_Restaurant = Id_Restaurant;
    }
}

// Cela permet d’exporter la classe pour pouvoir l’utiliser dans d’autres fichiers
module.exports = Menu;
