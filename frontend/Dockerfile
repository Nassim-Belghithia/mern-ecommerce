#methode Multi-stages
# Étape 1 : Utiliser Node pour builder le projet React
FROM node:18 AS build

WORKDIR /usr/src/app    
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Servir le build avec Nginx  ( copier l'image statique)
FROM nginx:alpine 

# Copier le build React
COPY --from=build /usr/src/app/build  /usr/share/nginx/html

# Copier le script de configuration dans le répertoire d'entrée de Nginx
# Ce script sera exécuté automatiquement au démarrage du conteneur
COPY docker-entrypoint.sh /docker-entrypoint.d/10-env-config.sh
RUN chmod +x /docker-entrypoint.d/10-env-config.sh

# Copier le fichier config.js par défaut (sera remplacé au runtime)
COPY public/config.js /usr/share/nginx/html/config.js

# Exposer le port 80 pour le frontend
EXPOSE 80

# Nginx Alpine exécute automatiquement les scripts dans /docker-entrypoint.d/
# avant de démarrer Nginx, donc notre script sera exécuté automatiquement
