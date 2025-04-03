# Gestion-Restaurant-Universitaire
-- Créer la base de données
CREATE DATABASE gestion_restaurant;

-- Créer l'utilisateur avec mot de passe
CREATE USER 'ipdl'@'localhost' IDENTIFIED BY 'passer';

-- Accorder les privilèges sur la base de données
GRANT ALL PRIVILEGES ON gestion_restaurant.* TO 'ipdl'@'localhost';

-- Appliquer les changements
FLUSH PRIVILEGES;

-- Se connecter avec l'utilisateur créé
mysql -u ipdl -p

-- Utiliser la base de données
USE gestion_restaurant;

-- Importer le fichier SQL
SOURCE C:/cheminvers/gestionRestau.sql;

pour commencer faire
npm install
