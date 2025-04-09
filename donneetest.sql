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
