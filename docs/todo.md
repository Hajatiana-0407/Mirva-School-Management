# Todo liste
## Fait 
-  Anné scolaire 
-  Niveau et Classe 
-  Matiere 
-  Parametre  

## En Attent 
- Frais de scolarité   
- Payement
- Emploi du temps 
- Examen et Note  

# TODO 
## GESTION DES COMPTES UTILISATEURS 
### Base de donnée 
- [x] Ajouter les colomnes : 
    - status 
    - created_at
    - last_login
    dans la table users

- [x] Changer la colomne email en identifiant

- [x] Suppression du champ password dans eleve , personnel

- [x] Ajout du champs id_user dans eleve , personnel , parents 
et les lier a users 


- [x] Changer le fixtures 

- [x] Modifier la connexion pour verifier dans users seulement et mettre le status true si connecté et false si non

- [ ] Mettre une systeme de securité stricte au niveau front 

- [ ] Debug du error 401 token expirer dans le front 


### 🎓 Tableau des droits d’accès – Logiciel de gestion d’école

###### 👥 Types d’utilisateurs
- **Admin**
- **Secrétaire**
- **Professeur**
- **Parent**
- **Étudiant**

---

###### 🧭 Droits d’accès par module

| Fonctionnalité / Module | **Admin** | **Secrétaire** | **Professeur** | **Parent** | **Étudiant** |
|--------------------------|:----------:|:---------------:|:---------------:|:-----------:|:-------------:|
| **Tableau de bord (Dashboard)** | 🔹 Voir toutes les statistiques globales | 🔹 Voir les stats administratives | 🔹 Voir ses classes, absences, notes | 🔹 Voir les infos de ses enfants | 🔹 Voir ses propres infos |
| **Gestion des utilisateurs** | 🔹 Créer / modifier / supprimer tous les comptes | ❌ | ❌ | ❌ | ❌ |
| **Gestion des classes** | 🔹 Créer / modifier / supprimer | 🔹 Gérer les inscriptions | 🔹 Voir les classes assignées | 🔹 Voir la classe de son enfant | 🔹 Voir sa classe |
| **Gestion des matières / cours** | 🔹 Créer / assigner / modifier | 🔹 Gérer les affectations | 🔹 Voir et gérer ses matières | ❌ | ❌ |
| **Emploi du temps** | 🔹 Gérer tous les emplois du temps | 🔹 Gérer les horaires | 🔹 Voir ses emplois du temps | 🔹 Voir celui de son enfant | 🔹 Voir le sien |
| **Saisie des notes** | 🔹 Accès complet | ❌ | 🔹 Ajouter / modifier les notes de ses élèves | ❌ | ❌ |
| **Consultation des notes** | 🔹 Voir toutes les notes | 🔹 Voir toutes les notes | 🔹 Voir ses propres notes saisies | 🔹 Voir les notes de ses enfants | 🔹 Voir ses propres notes |
| **Absences et retards** | 🔹 Voir / modifier tous | 🔹 Gérer les absences | 🔹 Enregistrer les absences dans ses cours | 🔹 Voir les absences de son enfant | 🔹 Voir ses absences |
| **Bulletins / relevés** | 🔹 Générer et voir tous | 🔹 Générer et imprimer | 🔹 Voir ceux de ses classes | 🔹 Voir ceux de son enfant | 🔹 Voir le sien |
| **Paiements / frais de scolarité** | 🔹 Gestion globale | 🔹 Gérer les paiements | ❌ | 🔹 Consulter les paiements effectués | ❌ |
| **Communication (messages / notifications)** | 🔹 Envoyer à tous | 🔹 Envoyer aux parents / profs | 🔹 Envoyer aux élèves / parents de sa classe | 🔹 Recevoir et répondre | 🔹 Recevoir |
| **Rapports / statistiques** | 🔹 Tout voir | 🔹 Rapports administratifs | 🔹 Rapports de sa classe | ❌ | ❌ |
| **Documents / fichiers scolaires** | 🔹 Gérer tous les fichiers | 🔹 Ajouter / supprimer | 🔹 Ajouter des documents de cours | 🔹 Télécharger | 🔹 Télécharger |
| **Paramètres du système** | 🔹 Accès complet | ❌ | ❌ | ❌ | ❌ |
| **Profil personnel** | 🔹 Modifier le sien | 🔹 Modifier le sien | 🔹 Modifier le sien | 🔹 Modifier ses infos | 🔹 Modifier ses info


# CONNEXION 
- [x] Creation de la table roles , permission et module ( role_permission)
- [x] Liaisons de la tables user et roles 
- [x] Creation d'une fonction dans fixtures pour le roles 
- [x] Modifcation de lafixtures Users pour les roles
- ### Modification de la connexion 
    - [x] Ajouter les informations sur l'utilisateur dans le authState apres connexion
    - [x] Ajouter les roles dans le authState
    - [x] Modifier la date du dernier connextion a chaque connexion 
    - [x] Modifier le status a chaque connexion et deconnexion 
- [ ] Creation du compte automatique au moment d'ajout personnel , etudiant , parent ( identifiant: Matricule | password : Matricule )
- [ ] 
- [ ] Prendre les information sur l'utilisateur au mement de la connexion ( pas seulement uers mais dans les table qui est liéé a user)
- [ ] 




# LEÇON
- [x] Supprimer une leçon 
- [x] Publié 
- [x] Activé le bouton telechager 
    - Le telechargement seras une dossier dont le nom est le titre et le contenue est le fichier principale , une doc txt pour voir le description du leçcon et le titre et une fichier qui est le fichier de support 

- [ ] Sur Connexion de prof 
    Ce sont les leçon du prof qui s'affiche 
    Possibilité de publié une leçon non publié , supprimer et modifié 
- [ ] sur connxion d'etudiant
    Ce sont les leçon dans liéé a sont niveau d'inscription actuel qui s'affiche 
    Pas d'action possible 
- [ ] Creer une composant pour le voire plus 
    -les prof connecté ne peut voir que ces leçons
    -les etudant ne peut pas faire d'action apart le telechargement 


# Rôle 

- [] Créer un composant pour "Voir toutes les permissions pour ce rôle".

- []  Rendre chaque élément de la liste des rôles cliquable afin d’afficher cette page (modifier uniquement le contenu de la page actuelle, sans redirection vers une autre page).

- []  Ajouter un bouton “Retour” et un titre à cette page.

# Utilisateur 

- [] Créer une page utilisateur permettant la création et l’affichage des informations de la personne liée à cet utilisateur (étudiant, professeur, parent).

- [] Créer un composant pour afficher tous les utilisateurs associés à un rôle.

- [] Rendre toutes les nouvelles pages responsives.
