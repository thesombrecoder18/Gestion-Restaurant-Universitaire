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
