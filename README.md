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
cd gestion-RH-FrontEnd
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
- Importer la collection (`Gestion-Recette-Categorie.json`) dans postman pour effectuer des tests;



## Endpoints API

### Endpoints Recettes

**Récupérer toutes les utilisateurs**

- URL : http://localhost:5000/users
- Méthode : GET
- Réponse: 

```bash
[
   {
            "id": 1,
            "fullname": "Mohamed Bankole",
            "email": "medbankole97@gmail.com",
            "password": "$2b$10$TuanqEzfpXSDe2VkZUxxOeucgkFxDlz20OVLnJXdXL3uAaZIj5SPm",
            "role": "ADMIN",
            "status": true
        },
        {
            "id": 2,
            "fullname": "Coumba Ahmed Diop",
            "email": "coumbadiop@gmail.com",
            "password": "$2b$10$PAyUWprLGAKEAmZlXGqCIuM4B4hpnWIRbxj4GVtrNJc78vtXMVMuy",
            "role": "EMPLOYE",
            "status": true
        },
]
```

**Créer une nouveau utilisateur**

- URL : http://localhost:5000/users
- Méthode : POST

```bash
 [
    {
   "fullname": "Yacoub Bankolé",
   "email": "yacoub98@gmail.com",
   "password": "pass123",
   "role": "ADMIN"
    
  }
 ]
```

**Récupérer un utilisateur**

- URL : http://localhost:5000/users/3
- Méthode : GET
- Réponse: Détails d'une recette;

```bash
[
  
    {
        "id": 3,
        "fullname": "Abdou Bankole",
        "email": "bankoleabdou00@gmail.com",
        "password": "$2b$10$nsKGLpIGNCToOKc.0w1zROmasLUDdxRM6dcg88X7J6T9NbhiN5NJe",
        "role": "MANAGER",
        "status": true
    }
  
]
```

**Mettre à jour une  information d'un utilisateur**

- URL : http://localhost:5000/users/2
- Méthode : PUT

```bash
{
    "message": "User with ID 2 updated successfully.",
    "user": {
        "id": 2,
        "fullname": "Coumba sidi Diop",
        "email": "sidicoumba98@gmail.com",
        "password": "$2a$10$LwkAv1z0GBMOW5SZ0M0/TOR95C2Lc.pALdchalia7npAvsAVGxpgO",
        "role": "EMPLOYE",
        "status": true
    }
 }
```

 **Supprimer un utilisateur**

- URL :http://localhost:5000/users/2
- Méthode : DELETE
- Réponse: 
  ```bash
  {
    "message": "User with ID 14 deleted successfully."
  }
```

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


