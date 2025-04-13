CREATE DATABASE IF NOT EXISTS gestion_restaurant;

-- Création de l'utilisateur 'ipdl' avec le mot de passe 'passer'
CREATE USER IF NOT EXISTS 'ipdl'@'%' IDENTIFIED BY 'passer';

-- Donner tous les droits sur la base 'gestion_restaurant' à l'utilisateur
GRANT ALL PRIVILEGES ON gestion_restaurant.* TO 'ipdl'@'%';

-- Appliquer les changements de privilèges
FLUSH PRIVILEGES;

USE gestion_restaurant;

-- Table Utilisateur (Classe parent)
CREATE TABLE Utilisateur (
    Id_Utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(50) NOT NULL,
    Prenom VARCHAR(50) NOT NULL,
    Mot_de_passe VARCHAR(255) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    CONSTRAINT CHK_Email CHECK (Email LIKE '%@ucad.edu.sn'),
    Sexe ENUM('Homme', 'Femme') NOT NULL,
    dateNaissance DATE NOT NULL,
    Role ENUM('Restaurateur', 'Gerant', 'Etudiant', 'Agent') NOT NULL
);

-- Table Ticket
CREATE TABLE Ticket (
    Id_Ticket INT PRIMARY KEY AUTO_INCREMENT,
    Type ENUM('Petit-déjeuner', 'Déjeuner', 'Dîner') NOT NULL,
    Prix INT NOT NULL
);

-- Table Étudiant (Hérite de Utilisateur)
CREATE TABLE Etudiant (
    Id_Etudiant INT PRIMARY KEY AUTO_INCREMENT,
    Id_Utilisateur INT UNIQUE,
    numEtudiant VARCHAR(20) UNIQUE NOT NULL,
    idTicket INT,
    FOREIGN KEY (Id_Utilisateur) REFERENCES Utilisateur(Id_Utilisateur) ON DELETE CASCADE,
    FOREIGN KEY (idTicket) REFERENCES Ticket(Id_Ticket)
);

-- Table Restaurant
CREATE TABLE Restaurant (
    Id_Restaurant INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL
);

-- Relation entre Gérant et Restaurant (1,n)
CREATE TABLE GerantResto (
    Id_Utilisateur INT,
    Id_Restaurant INT,
    PRIMARY KEY (Id_Utilisateur, Id_Restaurant),
    FOREIGN KEY (Id_Utilisateur) REFERENCES Utilisateur(Id_Utilisateur) ON DELETE CASCADE,
    FOREIGN KEY (Id_Restaurant) REFERENCES Restaurant(Id_Restaurant) ON DELETE CASCADE
);

-- Relation entre Restaurateur et Restaurant (1,n)
CREATE TABLE GestionResto (
    Id_Utilisateur INT,
    Id_Restaurant INT,
    PRIMARY KEY (Id_Utilisateur, Id_Restaurant),
    FOREIGN KEY (Id_Utilisateur) REFERENCES Utilisateur(Id_Utilisateur) ON DELETE CASCADE,
    FOREIGN KEY (Id_Restaurant) REFERENCES Restaurant(Id_Restaurant) ON DELETE CASCADE
);

-- Table Menu
CREATE TABLE Menu (
    Id_Menu INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(50) NOT NULL,
    Plat VARCHAR(255) NOT NULL,
    Id_Restaurant INT,
    FOREIGN KEY (Id_Restaurant) REFERENCES Restaurant(Id_Restaurant) ON DELETE CASCADE
);

-- Relation entre Restaurateur et Menu (1,n)
CREATE TABLE RestaurateurMenu (
    Id_Utilisateur INT,
    Id_Menu INT,
    PRIMARY KEY (Id_Utilisateur, Id_Menu),
    FOREIGN KEY (Id_Utilisateur) REFERENCES Utilisateur(Id_Utilisateur) ON DELETE CASCADE,
    FOREIGN KEY (Id_Menu) REFERENCES Menu(Id_Menu) ON DELETE CASCADE
);

-- Relation entre Ticket et Restaurant (n,1)
CREATE TABLE TicketResto (
    Id_Ticket INT,
    Id_Restaurant INT,
    PRIMARY KEY (Id_Ticket, Id_Restaurant),
    FOREIGN KEY (Id_Ticket) REFERENCES Ticket(Id_Ticket) ON DELETE CASCADE,
    FOREIGN KEY (Id_Restaurant) REFERENCES Restaurant(Id_Restaurant) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS VenteTicket (
    Id_Vente INT AUTO_INCREMENT PRIMARY KEY,
    Id_Ticket INT,
    Id_Etudiant INT,
    DateVente DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_Ticket) REFERENCES Ticket(Id_Ticket) ON DELETE CASCADE,
    FOREIGN KEY (Id_Etudiant) REFERENCES Etudiant(Id_Etudiant) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ValidationTicket (
    Id_Validation INT AUTO_INCREMENT PRIMARY KEY,
    Id_Vente INT,
    Id_Agent INT,
    DateValidation DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_Vente) REFERENCES VenteTicket(Id_Vente) ON DELETE CASCADE,
    FOREIGN KEY (Id_Agent) REFERENCES Utilisateur(Id_Utilisateur) ON DELETE CASCADE
);

-- Table PlatsServis (Manquante)
CREATE TABLE IF NOT EXISTS PlatsServis (
    Id_PlatServi INT AUTO_INCREMENT PRIMARY KEY,
    Id_Etudiant INT,
    Id_Ticket INT,
    Id_Menu INT,
    DateServi DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_Etudiant) REFERENCES Etudiant(Id_Etudiant) ON DELETE CASCADE,
    FOREIGN KEY (Id_Ticket) REFERENCES Ticket(Id_Ticket) ON DELETE CASCADE,
    FOREIGN KEY (Id_Menu) REFERENCES Menu(Id_Menu) ON DELETE CASCADE
);

-- Table Statistiques (Facultatif)
CREATE TABLE IF NOT EXISTS Statistiques (
    Id_Statistique INT AUTO_INCREMENT PRIMARY KEY,
    DateStat DATE NOT NULL,
    Recette INT NOT NULL,
    PlatsServis INT NOT NULL,
    TicketsVendus INT NOT NULL
);


USE gestion_restaurant;

-- ============================
-- Insertion dans Utilisateur
-- ============================
INSERT INTO Utilisateur (Nom, Prenom, Mot_de_passe, Email, Sexe, dateNaissance, Role) VALUES
('Ka', 'Elimane', 'passer', 'elimane@ucad.edu.sn', 'Homme', '2000-01-15', 'Etudiant'),
('Diop', 'Mamadou', 'passer', 'mamadou@ucad.edu.sn', 'Homme', '1999-04-22', 'Gerant'),
('Ba', 'Fatou', 'passer', 'fatou@ucad.edu.sn', 'Femme', '2001-06-10', 'Restaurateur'),
('Fall', 'Amina', 'passer', 'amina@ucad.edu.sn', 'Femme', '1998-09-30', 'Agent'),
('Sow', 'Aliou', 'passer', 'aliou@ucad.edu.sn', 'Homme', '2000-12-05', 'Etudiant');

-- ============================
-- Insertion dans Ticket
-- ============================
INSERT INTO Ticket (Type, Prix) VALUES
('Petit-déjeuner', 50),
('Déjeuner', 100),
('Dîner', 100);

-- ============================
-- Insertion dans Etudiant
-- ============================
INSERT INTO Etudiant (Id_Utilisateur, numEtudiant, idTicket) VALUES
(1, 'ETD001', 1),
(5, 'ETD002', 2);

-- ============================
-- Insertion dans Restaurant
-- ============================
INSERT INTO Restaurant (Nom) VALUES
('Restaurant ESP'),
('Restaurant ENSETP');

-- ============================
-- Insertion dans GerantResto
-- ============================
INSERT INTO GerantResto (Id_Utilisateur, Id_Restaurant) VALUES
(2, 1);

-- ============================
-- Insertion dans GestionResto
-- ============================
INSERT INTO GestionResto (Id_Utilisateur, Id_Restaurant) VALUES
(3, 1);

-- ============================
-- Insertion dans Menu
-- ============================
INSERT INTO Menu (Nom, Plat, Id_Restaurant) VALUES
('Menu du Lundi', 'Thiéboudienne', 1),
('Menu du Mardi', 'Mafé', 1),
('Menu du Mercredi', 'Yassa Poulet', 1);

-- ============================
-- Insertion dans RestaurateurMenu
-- ============================
INSERT INTO RestaurateurMenu (Id_Utilisateur, Id_Menu) VALUES
(3, 1),
(3, 2),
(3, 3);

-- ============================
-- Insertion dans TicketResto
-- ============================
INSERT INTO TicketResto (Id_Ticket, Id_Restaurant) VALUES
(1, 1),
(2, 1),
(3, 1);

-- ============================
-- Insertion dans VenteTicket
-- ============================
INSERT INTO VenteTicket (Id_Ticket, Id_Etudiant, DateVente) VALUES
(1, 1, NOW()),
(2, 1, NOW()),
(3, 2, NOW());

-- ============================
-- Insertion dans ValidationTicket
-- ============================
INSERT INTO ValidationTicket (Id_Vente, Id_Agent) VALUES
(1, 4),
(2, 4);

-- ============================
-- Insertion dans PlatsServis
-- ============================
INSERT INTO PlatsServis (Id_Etudiant, Id_Ticket, Id_Menu) VALUES
(1, 1, 1),
(1, 2, 2),
(2, 3, 3);

-- ============================
-- Insertion dans Statistiques
-- ============================
INSERT INTO Statistiques (DateStat, Recette, PlatsServis, TicketsVendus) VALUES
(CURDATE(), 250, 3, 3);
