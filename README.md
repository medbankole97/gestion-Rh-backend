# Gestion des Ressources Humaines (HR Management)

L'application de gestion des ressources humaines permet de gérer les informations des employés, de suivre leur temps de travail, de gérer les types de congés et les demandes de congé. 


# Installation

### Prérequis
- Node.js (version 14.x ou supérieure)
- PostgreSQL
- Prisma
- Express.js (version 4.21 ou supérieure)


### Étapes d'installation

### 1. Clonez le dépôt :

```bash
git clone https://github.com/medbankole97/gestion-Rh-backend.git
```

### 2. Accédez au répertoire du projet :

```bash
cd gestion-Rh-backend
```

### 3. Installez les dépendances :

```bash
 npm install
 ```
### 4. Configurer la base de données

- Assurez-vous que PostgreSQL est en cours d'exécution sur votre machine locale.
- Mettez les paramètres de connexion dans schema.prisma.
- Créez un fichier .env avec la configuration de votre base de données : 

```bash
DATABASE_URL="postgresql://postgres:mot-de-passe@localhost:5432/gestion_rh"

PORT = 5000
```


### 5. Lancez l'application en mode développement :

```bash
 npm start
```

## Endpoints API

- Importer la collection qui se trouve dans postman pour effectuer des tests:
 - `Gestion RH.postman_collection.json`
 



### Tests unitaires

```bash
npm test
```

### Eslint : corriger le code

```bash
npm run lint
```

```bash
npm run lint:fix
```

### Prettier :formater le code

```bash
npm run format
```

##  Auteur
[Mohamed Bankolé](https://github.com/medbankole97)


