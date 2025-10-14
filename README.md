💊 PharmaStack
PharmaStack est une application web moderne pour la gestion de produits pharmaceutiques. Elle permet d'afficher, filtrer, créer, modifier et supprimer des produits, avec une interface utilisateur intuitive et une API sécurisée. Le projet inclut également une intégration Stripe pour les paiements.

🚀 Fonctionnalités
Affichage des produits avec image, prix, stock, description

Filtrage dynamique par catégories

Création et modification de produits (admin)

Téléversement d'image via multer

Authentification et autorisation (admin uniquement)

Intégration Stripe (paiement sécurisé)

Backend Express + MongoDB

Frontend React + Tailwind CSS

🧱 Technologies utilisées
Frontend	Backend	Base de données	Paiement
React.js	Node.js / Express	MongoDB + Mongoose	Stripe API
📁 Structure du projet
Code
PharmaStack/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
├── .env
├── .gitignore
└── README.md
⚙️ Installation
1. Clone le projet
   git clone https://github.com/ton-utilisateur/pharmastack.git
   cd pharmastack
2. Backend
   cd backend
   npm install
   touch .env
Ajoute dans .env :
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000
Lance le serveur :
node server.js
3. Frontend
   cd frontend
   npm install
   npm run dev

🔐 Authentification
L'accès aux routes d'administration (création, modification, suppression) est protégé par des middlewares authMiddleware et roleMiddleware. Seuls les utilisateurs avec le rôle admin peuvent effectuer ces actions.
