FROM node:18-alpine

# Ajoute les dépendances pour build les modules natifs
RUN apk add --no-cache python3 make g++ 
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer nodemon globalement pour le développement (optionnel)
RUN npm install -g nodemon

# Installer les dépendances définies dans package.json
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port sur lequel l'application écoute (ici, 6001)
EXPOSE 6001

# Démarrer l'application via le script start défini dans package.json
CMD ["npm", "start"]
