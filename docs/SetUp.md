# Mirva School Management - Guide d'installation

## Table des matières
1. Prérequis
2. Cloner le dépôt
3. Configurer XAMPP / WAMP
4. Installer les dépendances PHP
5. Configurer la base de données
6. Configurer les URLs
7. Installer les dépendances JavaScript
8. Lancer l'application
9. Accéder à l'application

---

## Prérequis

- XAMPP ou WAMP (Apache + MySQL)
- PHP 7.4 ou supérieure (inclus dans XAMPP/WAMP)
- Node.js 14 ou supérieure
- Composer
- npm ou pnpm

---

## Cloner le dépôt

git clone https://github.com/Hajatiana-0407/Mirva-School-Management.git  
cd Mirva-School-Management

---

## Configurer XAMPP / WAMP

1. Placez le dossier `Server` dans `htdocs` (XAMPP) ou `www` (WAMP)  
   Exemple :  
   - XAMPP : `C:\xampp\htdocs\Mirva-School-Management\Server`  
   - WAMP : `C:\wamp64\www\Mirva-School-Management\Server`
2. Démarrez Apache et MySQL via le panneau de contrôle.
3. Ajustez les ports si nécessaire.

---

## Installer les dépendances PHP

cd Server  
composer install

---

## Configurer la base de données

1. Créez une base via phpMyAdmin : `http://localhost/phpmyadmin`  
2. Importez le fichier `.sql` si disponible  
3. Modifiez la configuration (`.env` ou `config.php`) :

DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=  
DB_NAME=mirva

---

## Configurer les URLs

1. Client `src/utils/api.ts` :  
const API_URL = 'http://localhost/NOM_DU_PROJET/Server/api'

2. Serveur `.htaccess` :  
<IfModule mod_rewrite.c>  
    RewriteEngine On  
    RewriteBase /NOM_DU_PROJET/Server/  
</IfModule>

3. `hooks/Cors.php` de CodeIgniter :  
class Cors  
{  
    public function enable()  
    {  
        $allowed_origins = ['http://localhost:5173'];  
        ...  
    }  
}

---

## Installer les dépendances JavaScript

cd ../Client  
npm install

---

## Lancer l'application

### Serveur PHP

Apache doit déjà être lancé. L'API sera accessible :  
http://localhost/NOM_DU_PROJET/Server

### Serveur Node.js

cd ../Client  
npm start

---

## Accéder à l'application

- Client : http://localhost:3000  
- API / Serveur : http://localhost/NOM_DU_PROJET/Server


## Fixtures 
 cd ./Server 
 <!-- Pour les données du back office  -->
 php index.php AppFixtures loadFixtures

 <!-- Pour les donnée du site web  -->
 php index.php AppFixtures loadSiteFixtures

 <!-- Pour supprimer touts les données ( Back office et Site internet ) -->
 php index.php AppFixtures cleanUp
 