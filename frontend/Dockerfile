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
COPY --from=build /usr/src/app/build  /usr/share/nginx/html

# Exposer le port 80 pour le frontend
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
