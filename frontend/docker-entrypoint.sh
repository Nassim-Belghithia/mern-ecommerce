#!/bin/sh
# Script de configuration runtime pour injecter l'URL API
# Ce script est exécuté automatiquement par Nginx Alpine au démarrage

# Générer le fichier de configuration JavaScript avec l'URL API
cat > /usr/share/nginx/html/config.js <<EOF
window.REACT_APP_CONFIG = {
  API_URL: '${REACT_APP_API_URL:-http://localhost:5000/api}'
};
EOF

echo "✅ Configuration générée avec API_URL: ${REACT_APP_API_URL:-http://localhost:5000/api}"

