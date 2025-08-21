# Cahier des charges - Logiciel Web de Gestion d'École

## 1. Introduction
Le présent document décrit les spécifications fonctionnelles et techniques pour le développement d’un logiciel web complet de gestion d’école.  
L’objectif est de centraliser et automatiser la gestion des élèves, du personnel, des emplois du temps, des notes, ainsi que les aspects pédagogiques et organisationnels.

---

## 2. Objectifs du projet
- Digitaliser la gestion de l’école et réduire l’utilisation du papier.  
- Améliorer la communication entre enseignants, élèves, parents et administration.  
- Suivre en temps réel les informations académiques (notes, absences, emplois du temps).  
- Optimiser l’organisation pédagogique et le suivi administratif.  

---

## 3. Utilisateurs cibles
- **Administrateurs** : gestion globale de l’établissement.  
- **Personnel administratif** : gestion des inscriptions, dossiers, ressources humaines.  
- **Enseignants** : gestion des cours, notes, absences, emplois du temps.  
- **Élèves** : consultation des résultats, accès aux cours et aux emplois du temps.  
- **Parents** : suivi des résultats scolaires et de la vie scolaire de leurs enfants.  

---

## 4. Fonctionnalités principales

### 4.1 Gestion des élèves
- Création, modification et suppression du dossier élève (informations personnelles, médicales, responsables légaux, photo d’identité).  
- Inscription et réinscription avec génération automatique d’un numéro matricule unique.  
- Gestion des transferts internes (changement de classe ou de niveau).  
- Historique scolaire complet (notes, classes fréquentées, bulletins générés).  
- Gestion des absences et retards :  
  - Saisie par les enseignants.  
  - Justification par les parents via le portail.  
  - Notification automatique aux parents par email/SMS.  
- Suivi disciplinaire : sanctions, avertissements, exclusions temporaires ou définitives.  
- Export des dossiers élèves (PDF, Excel) pour archivage.  

---

### 4.2 Gestion du personnel
- Enregistrement et suivi des enseignants et du personnel administratif.  
- Gestion des contrats de travail (CDI, CDD, vacataire).  
- Gestion des salaires, primes, congés et absences.  
- Gestion des emplois du temps du personnel administratif.  
- Système d’évaluation du personnel enseignant (observations, performances pédagogiques).  
- Possibilité d’assigner un enseignant principal (professeur titulaire) à une classe.  
- Archivage du dossier d’un employé en cas de départ.  

---

### 4.3 Gestion académique
- Définition des cycles (maternelle, primaire, collège, lycée, université).  
- Création et paramétrage des niveaux, classes et groupes (effectifs, capacité maximale, salle attribuée).  
- Création des matières avec paramètres :  
  - Nom, code, coefficient.  
  - Volume horaire par semaine.  
  - Type de matière (obligatoire, optionnelle).  
- Attribution des matières aux classes et aux enseignants.  
- Planification des emplois du temps :  
  - Génération automatique (éviter chevauchements et surcharge d’enseignant).  
  - Modification manuelle par l’administrateur.  
  - Exportation en PDF.  
- Gestion des examens :  
  - Création des sessions d’examen (trimestriel, semestriel, annuel).  
  - Affectation des surveillants.  
  - Planification des salles.  
  - Émission des convocations pour les élèves.  

---

### 4.4 Gestion des notes et évaluations
- Paramétrage des systèmes de notation (sur 20, sur 100, lettres, compétences).  
- Création de différents types d’évaluations : devoirs, contrôles, projets, examens.  
- Saisie en ligne des notes par les enseignants.  
- Validation des notes par le responsable pédagogique avant publication.  
- Calcul automatique des moyennes par matière, par élève et par classe.  
- Génération automatique des bulletins scolaires avec :  
  - Notes par matière.  
  - Moyennes par trimestre/semestre.  
  - Classement de l’élève.  
  - Appréciations des enseignants.  
- Génération de relevés de notes pour les examens.  
- Statistiques avancées :  
  - Comparaison des résultats par classe, niveau ou matière.  
  - Suivi individuel de l’évolution d’un élève sur plusieurs années.  
  - Taux de réussite global de l’établissement.  

---

### 4.5 Communication et suivi pédagogique
- Notifications automatiques aux parents :  
  - Résultats disponibles.  
  - Absences ou retards.  
  - Paiements en retard (si lié au module financier).  
- Tableau d’affichage numérique avec annonces scolaires (examens, réunions, événements).  
- Messagerie interne entre enseignants, administration et parents.  
- Espace de discussion ou forum pédagogique par classe ou matière.  
- Application mobile (ou PWA) pour consultation des notes, absences et emploi du temps.  

---

### 4.6 Bibliothèque et ressources pédagogiques
- Gestion des ouvrages disponibles (ISBN, auteur, nombre d’exemplaires).  
- Gestion des prêts et retours des livres.  
- Suivi des retards de retour avec alertes automatiques.  
- Mise à disposition de documents numériques (PDF, vidéos, supports pédagogiques).  
- Téléchargement sécurisé de ressources pédagogiques par les élèves.  
- Historique d’utilisation des ressources (consultations et emprunts).  

---

### 4.7 Sécurité et gestion des accès
- Authentification par rôle :  
  - Administrateur.  
  - Enseignant.  
  - Élève.  
  - Parent.  
- Gestion des permissions par module (un enseignant ne peut gérer que ses classes et matières).  
- Journalisation (logs) des actions des utilisateurs.  
- Sauvegarde automatique quotidienne de la base de données.  
- Possibilité de restaurer les données en cas de panne.  
- Sécurisation des mots de passe (hashage avec bcrypt/argon2).  
- Protection contre les attaques courantes (injections SQL, XSS, CSRF).  

---
