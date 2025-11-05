# Backend API - E-Commerce

Backend complet pour l'application e-commerce avec authentification, gestion des produits et panier.

## Configuration

1. Installez les dépendances:
```bash
npm install
```

2. Créez un fichier `.env` à la racine du dossier `backend` avec les variables suivantes:
```env
DATABASE_URL=mongodb://localhost:27017/ecommerce
PORT=3001
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

3. Assurez-vous que MongoDB est en cours d'exécution

4. Initialisez les produits dans la base de données:
```bash
node seedProducts.js
```

5. Démarrez le serveur:
```bash
npm start
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - Créer un nouveau compte
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/me` - Obtenir l'utilisateur actuel (requiert authentification)

### Produits
- `GET /api/products` - Obtenir tous les produits
- `GET /api/products?category=men` - Obtenir les produits par catégorie
- `GET /api/products/:id` - Obtenir un produit par ID
- `POST /api/products` - Créer un produit
- `PUT /api/products/:id` - Mettre à jour un produit
- `DELETE /api/products/:id` - Supprimer un produit

### Panier
- `GET /api/cart` - Obtenir le panier de l'utilisateur (requiert authentification)
- `POST /api/cart/add` - Ajouter un produit au panier (requiert authentification)
- `POST /api/cart/remove` - Retirer un produit du panier (requiert authentification)
- `PUT /api/cart/update` - Mettre à jour la quantité d'un produit (requiert authentification)
- `DELETE /api/cart/clear` - Vider le panier (requiert authentification)

## Structure

```
backend/
├── models/
│   ├── User.js       # Modèle utilisateur
│   └── Product.js    # Modèle produit
├── routes/
│   ├── auth.js       # Routes d'authentification
│   ├── products.js   # Routes produits
│   ├── cart.js       # Routes panier
│   └── routes.js       # Routeur principal
├── middleware/
│   └── auth.js       # Middleware d'authentification JWT
├── index.js          # Point d'entrée du serveur
├── seedProducts.js   # Script d'initialisation des produits
└── package.json
```



