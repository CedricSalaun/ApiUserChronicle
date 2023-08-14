# ApiUserChronicle

## Table des matières

- [Structure du projet](#)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Endpoints](#endpoints)

## Structure du projet
Le projet est organisé en plusieurs dossiers et fichiers pour suivre une architecture Hexagonale :
<pre>
src
├── adapters
│   ├── inbound
│   │   ├── controllers
│   │   │   ├── notes.controllers.js
│   │   │   └── user.controllers.js
│   │   └── routes
│   │       ├── notes.routes.js
│   │       ├── user.routes.js
│   │       └── routesHandler.js
│   ├── outbound
│   │   ├── infrastructure
│   │   │   ├── repositories
│   │   │   │   ├── base.repository.adapter.js
│   │   │   │   ├── note.repository.adapter.js
│   │   │   │   └── user.repository.adapter.js
│   │   │   └── mongodb.js
│   │   └── services
│   │       └── jwt.js
│   │  
├── domain
│   ├── modules
│   │   ├── notes
│   │   │   ├── notes.outbound.port.js
│   │   │   └── notes.usecase.js
│   │   └── user
│   │       ├── user.outbound.port.js
│   │       └── user.usecase.js
│   ├── services
│   │   └── error.js
│   └── shared
│       └── token.outbound.port.js
├── index.js
└── utils.js
</pre>


## Installation
Pour installer et exécuter l'API en local, suivez les étapes suivantes :

1. Clonez le dépôt :
```sh
git clone git@github.com:CedricSalaun/ApiUserChronicle.git
```

2. Installez les dépendances :
```sh
cd ApiUserChronicle
yarn
```

3. Copiez le fichier `.env.sample` en `.env` et modifiez les valeurs en fonction de votre configuration.


## Configuration
Assurez-vous de configurer correctement les variables d'environnement dans le fichier .env :
- `PORT` : Le port sur lequel l'API sera exposée.
- `MONGODB_URI` : L'URL de la base de données MongoDB.
- `JWT_KEY` : La clé secrète utilisée pour la génération et la validation des tokens JWT.


## Utilisation
Pour démarrer l'API en mode développement avec un rechargement automatique :
```sh
yarn dev
```

Pour démarrer l'API dans un environnement Docker :
```sh
yarn docker-start
```


## Endpoints
L'API propose les endpoints suivants :

- `POST` /signup : Inscription d'un nouvel utilisateur et génération de token JWT.
- `POST` /signin : Authentification d'un utilisateur et génération de token JWT.
- `GET` /notes : Récupération de la liste des notes de l'utilisateur authentifié.
- `PUT` /notes : Création d'une nouvelle note pour l'utilisateur authentifié.
- `PATCH` /notes/:id : Mise à jour d'une note spécifique par son identifiant pour l'utilisateur authentifié.
- `DELETE` /notes/:id : Suppression d'une note spécifique par son identifiant pour l'utilisateur authentifié.
