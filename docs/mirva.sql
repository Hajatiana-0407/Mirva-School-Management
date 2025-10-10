-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 10 oct. 2025 à 21:14
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mirva`
--

-- --------------------------------------------------------

--
-- Structure de la table `annee_scolaire`
--

CREATE TABLE `annee_scolaire` (
  `id_annee_scolaire` int(11) NOT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `nom` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `isActif` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `classe`
--

CREATE TABLE `classe` (
  `id_classe` int(11) NOT NULL,
  `denomination` varchar(45) DEFAULT NULL,
  `niveau_id_niveau` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `classe_proffesseur_matiere`
--

CREATE TABLE `classe_proffesseur_matiere` (
  `classe_id_classe` int(11) NOT NULL,
  `professeur_id_professeur` int(11) NOT NULL,
  `matiere_id_matiere` int(11) NOT NULL,
  `is_all_matiere` tinyint(1) NOT NULL,
  `heure_semaine` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `depense`
--

CREATE TABLE `depense` (
  `id_depense` int(11) NOT NULL,
  `raison` varchar(45) DEFAULT NULL,
  `montant` decimal(10,2) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `user_id_user` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `droit_inscription`
--

CREATE TABLE `droit_inscription` (
  `id_droit_inscription` int(11) NOT NULL,
  `montant` int(11) NOT NULL,
  `niveau_id_niveau` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `ecolage`
--

CREATE TABLE `ecolage` (
  `id_ecolage` int(11) NOT NULL,
  `montant` decimal(10,2) DEFAULT NULL,
  `niveau_id_niveau` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `eleve`
--

CREATE TABLE `eleve` (
  `id_eleve` int(11) NOT NULL,
  `matricule_etudiant` varchar(50) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `adresse` varchar(45) DEFAULT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `lieu_naissance` varchar(100) NOT NULL,
  `sexe` varchar(45) DEFAULT NULL,
  `maladies` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(200) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nationalite` varchar(50) NOT NULL,
  `pc_pi` text NOT NULL,
  `pc_act_naissance` text NOT NULL,
  `bulletin` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `etablissement`
--

CREATE TABLE `etablissement` (
  `id_etablissement` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `code` varchar(200) NOT NULL,
  `adresse` text NOT NULL,
  `telephone` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `slogan` text NOT NULL,
  `logo` text NOT NULL,
  `site_web` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `prefix` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `facebook` varchar(200) NOT NULL,
  `twitter` varchar(200) NOT NULL,
  `instagram` varchar(200) NOT NULL,
  `linkedin` varchar(200) NOT NULL,
  `youtube` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `etablissement`
--

INSERT INTO `etablissement` (`id_etablissement`, `nom`, `code`, `adresse`, `telephone`, `email`, `slogan`, `logo`, `site_web`, `description`, `prefix`, `created_at`, `facebook`, `twitter`, `instagram`, `linkedin`, `youtube`) VALUES
(18, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-18 13:08:40', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(19, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-18 17:43:44', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(20, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-19 09:10:12', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(21, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-19 14:08:50', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(22, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-19 14:17:35', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(23, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-19 16:05:07', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(24, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-20 03:15:41', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(25, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-22 13:05:29', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(26, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-22 16:39:55', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(27, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-22 16:40:27', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(28, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-22 16:45:37', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(29, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-22 16:45:50', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(30, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-23 02:04:06', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(31, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-23 02:04:44', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(32, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-23 02:04:54', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(33, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-23 02:10:14', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(34, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-23 02:12:13', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(35, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-23 02:12:39', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(36, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-23 02:13:58', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(37, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-09-28 02:47:10', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(38, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-02 09:30:36', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(39, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-02 09:31:23', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(40, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-02 09:32:58', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(41, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-02 18:03:10', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(42, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-03 02:58:02', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(43, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-03 11:37:17', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(44, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-03 19:34:05', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(45, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-04 03:07:11', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(46, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', 'public/uploads/etablissement//1759548943_file_68e0960fb930c5.14000815.gif', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-04 03:35:43', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(47, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-08 02:52:09', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(48, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', 'public/uploads/etablissement//1759897746_file_68e5e892ad9f25.13317393.png', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-08 04:29:06', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(49, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-08 07:11:35', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(50, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-08 07:13:12', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(51, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-08 07:13:51', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(52, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-08 07:14:32', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(53, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', 'public/uploads/etablissement//1759943140_file_68e699e4d7e7f1.75152388.png', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-08 17:05:40', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(54, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-09 16:59:46', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool'),
(55, 'Mirva School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '', '2025-10-09 18:30:10', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool');

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE `inscription` (
  `id_inscription` int(11) NOT NULL,
  `date_inscription` date DEFAULT NULL,
  `niveau_id_niveau` int(11) DEFAULT NULL,
  `classe_id_classe` int(11) NOT NULL,
  `annee_scolaire_id_annee_scolaire` int(11) NOT NULL,
  `eleve_id_eleve` int(11) NOT NULL,
  `is_droit_payed` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ancienne_ecole` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `matiere`
--

CREATE TABLE `matiere` (
  `id_matiere` int(11) NOT NULL,
  `denomination` varchar(45) DEFAULT NULL,
  `abbreviation` varchar(45) DEFAULT NULL,
  `description` varchar(150) NOT NULL,
  `couleur` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `matiere_niveau`
--

CREATE TABLE `matiere_niveau` (
  `matiere_id_matiere` int(11) NOT NULL,
  `niveau_id_niveau` int(11) NOT NULL,
  `coefficient` int(11) DEFAULT NULL,
  `heure_semaine` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

CREATE TABLE `niveau` (
  `id_niveau` int(11) NOT NULL,
  `niveau` varchar(45) DEFAULT NULL,
  `cycle` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `note`
--

CREATE TABLE `note` (
  `id_note` int(11) NOT NULL,
  `valeur` int(11) DEFAULT NULL,
  `eleve_id_eleve` int(11) NOT NULL,
  `annee_scolaire_id_annee_scolaire` int(11) NOT NULL,
  `matiere_id_matiere` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

CREATE TABLE `paiement` (
  `id_paiement` int(11) NOT NULL,
  `date_paiement` date DEFAULT NULL,
  `droit_inscription_id` int(11) NOT NULL,
  `ecolage_id_ecolage` int(11) NOT NULL,
  `mois` varchar(45) DEFAULT NULL,
  `inscription_id_inscription` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `parents`
--

CREATE TABLE `parents` (
  `id_parent` int(11) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `adresse` text DEFAULT NULL,
  `profession` varchar(100) DEFAULT NULL,
  `employeur` varchar(100) DEFAULT NULL,
  `telephone_travail` varchar(20) DEFAULT NULL,
  `contact_urgence` tinyint(1) DEFAULT 0,
  `pc_cin` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `parents_eleves`
--

CREATE TABLE `parents_eleves` (
  `parent_id_parent` int(11) NOT NULL,
  `eleve_id_eleve` int(11) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `personnel`
--

CREATE TABLE `personnel` (
  `id_personnel` int(11) NOT NULL,
  `matricule_personnel` varchar(50) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `addresse` varchar(45) DEFAULT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `lieu_naissance` varchar(100) NOT NULL,
  `sexe` varchar(45) DEFAULT NULL,
  `engagement` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pc_cin` varchar(255) DEFAULT NULL,
  `numero_cin` varchar(200) NOT NULL,
  `nationalite` varchar(50) NOT NULL,
  `type_contrat` varchar(50) NOT NULL,
  `specialisation` text NOT NULL,
  `certification` text NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `id_type_personnel` int(11) NOT NULL,
  `date_embauche` date NOT NULL,
  `salaire_base` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `urgence_nom` varchar(200) NOT NULL,
  `urgence_lien` varchar(100) NOT NULL,
  `urgence_tel` varchar(20) NOT NULL,
  `urgence_email` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `type_personnel`
--

CREATE TABLE `type_personnel` (
  `id_type_personnel` int(11) NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `type_personnel`
--

INSERT INTO `type_personnel` (`id_type_personnel`, `type`, `description`) VALUES
(201, 'Enseignant', 'Placeat tenetur nemo rerum consequatur ad ducimus.'),
(202, 'Secrétaire', 'Qui voluptatem unde impedit dolor.'),
(203, 'Gardin', 'In occaecati fugit quisquam modi quia accusantium incidunt.'),
(204, 'Surveillant', 'Nostrum quo error nemo et quaerat aliquid qui exercitationem.'),
(205, 'Agent d’entretien', 'Eveniet non fugit consequuntur labore molestiae.'),
(206, 'Bibliothécaire', 'Quis odit occaecati error repellendus fugiat.'),
(207, 'Comptable', 'Rem in fugit ipsam.'),
(208, 'Chauffeur', 'Rerum deserunt incidunt sunt asperiores assumenda et officiis iure.');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `annee_scolaire`
--
ALTER TABLE `annee_scolaire`
  ADD PRIMARY KEY (`id_annee_scolaire`);

--
-- Index pour la table `classe`
--
ALTER TABLE `classe`
  ADD PRIMARY KEY (`id_classe`),
  ADD KEY `fk_classe_classe_groupe1_idx` (`niveau_id_niveau`);

--
-- Index pour la table `classe_proffesseur_matiere`
--
ALTER TABLE `classe_proffesseur_matiere`
  ADD PRIMARY KEY (`classe_id_classe`,`professeur_id_professeur`,`matiere_id_matiere`),
  ADD KEY `fk_classe_has_professeur_professeur1_idx` (`professeur_id_professeur`),
  ADD KEY `fk_classe_has_professeur_classe1_idx` (`classe_id_classe`),
  ADD KEY `fk_classe_professeur_matier_matiere1_idx` (`matiere_id_matiere`);

--
-- Index pour la table `depense`
--
ALTER TABLE `depense`
  ADD PRIMARY KEY (`id_depense`),
  ADD KEY `fk_depense_user1_idx` (`user_id_user`);

--
-- Index pour la table `droit_inscription`
--
ALTER TABLE `droit_inscription`
  ADD PRIMARY KEY (`id_droit_inscription`),
  ADD KEY `fk_niveau_droit_inscription` (`niveau_id_niveau`);

--
-- Index pour la table `ecolage`
--
ALTER TABLE `ecolage`
  ADD PRIMARY KEY (`id_ecolage`),
  ADD KEY `fk_ecolage_classe_groupe1_idx` (`niveau_id_niveau`);

--
-- Index pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD PRIMARY KEY (`id_eleve`);

--
-- Index pour la table `etablissement`
--
ALTER TABLE `etablissement`
  ADD PRIMARY KEY (`id_etablissement`);

--
-- Index pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD PRIMARY KEY (`id_inscription`),
  ADD KEY `fk_inscription_classe1_idx` (`classe_id_classe`),
  ADD KEY `fk_inscription_annee_scolaire1_idx` (`annee_scolaire_id_annee_scolaire`),
  ADD KEY `fk_inscription_eleve_idx` (`eleve_id_eleve`),
  ADD KEY `fk_inscription_nievau` (`niveau_id_niveau`);

--
-- Index pour la table `matiere`
--
ALTER TABLE `matiere`
  ADD PRIMARY KEY (`id_matiere`);

--
-- Index pour la table `matiere_niveau`
--
ALTER TABLE `matiere_niveau`
  ADD PRIMARY KEY (`matiere_id_matiere`,`niveau_id_niveau`),
  ADD KEY `fk_matiere_has_classe_groupe_classe_groupe1_idx` (`niveau_id_niveau`),
  ADD KEY `fk_matiere_has_classe_groupe_matiere1_idx` (`matiere_id_matiere`);

--
-- Index pour la table `niveau`
--
ALTER TABLE `niveau`
  ADD PRIMARY KEY (`id_niveau`);

--
-- Index pour la table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id_note`),
  ADD KEY `fk_note_eleve1_idx` (`eleve_id_eleve`),
  ADD KEY `fk_note_annee_scolaire1_idx` (`annee_scolaire_id_annee_scolaire`),
  ADD KEY `fk_note_matiere1_idx` (`matiere_id_matiere`);

--
-- Index pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD PRIMARY KEY (`id_paiement`,`droit_inscription_id`,`ecolage_id_ecolage`,`inscription_id_inscription`),
  ADD KEY `fk_paiement_droit_inscription1_idx` (`droit_inscription_id`),
  ADD KEY `fk_paiement_ecolage1_idx` (`ecolage_id_ecolage`),
  ADD KEY `fk_paiement_inscription1_idx` (`inscription_id_inscription`);

--
-- Index pour la table `parents`
--
ALTER TABLE `parents`
  ADD PRIMARY KEY (`id_parent`);

--
-- Index pour la table `parents_eleves`
--
ALTER TABLE `parents_eleves`
  ADD PRIMARY KEY (`parent_id_parent`,`eleve_id_eleve`),
  ADD KEY `fk_to_eleve` (`eleve_id_eleve`);

--
-- Index pour la table `personnel`
--
ALTER TABLE `personnel`
  ADD PRIMARY KEY (`id_personnel`),
  ADD KEY `fx_personne_type` (`id_type_personnel`);

--
-- Index pour la table `type_personnel`
--
ALTER TABLE `type_personnel`
  ADD PRIMARY KEY (`id_type_personnel`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `annee_scolaire`
--
ALTER TABLE `annee_scolaire`
  MODIFY `id_annee_scolaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=221;

--
-- AUTO_INCREMENT pour la table `classe`
--
ALTER TABLE `classe`
  MODIFY `id_classe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=671;

--
-- AUTO_INCREMENT pour la table `depense`
--
ALTER TABLE `depense`
  MODIFY `id_depense` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=367;

--
-- AUTO_INCREMENT pour la table `droit_inscription`
--
ALTER TABLE `droit_inscription`
  MODIFY `id_droit_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=457;

--
-- AUTO_INCREMENT pour la table `ecolage`
--
ALTER TABLE `ecolage`
  MODIFY `id_ecolage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=719;

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id_eleve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=973;

--
-- AUTO_INCREMENT pour la table `etablissement`
--
ALTER TABLE `etablissement`
  MODIFY `id_etablissement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `id_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=465;

--
-- AUTO_INCREMENT pour la table `matiere`
--
ALTER TABLE `matiere`
  MODIFY `id_matiere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=977;

--
-- AUTO_INCREMENT pour la table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `id_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=736;

--
-- AUTO_INCREMENT pour la table `note`
--
ALTER TABLE `note`
  MODIFY `id_note` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=841;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id_paiement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=374;

--
-- AUTO_INCREMENT pour la table `parents`
--
ALTER TABLE `parents`
  MODIFY `id_parent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=347;

--
-- AUTO_INCREMENT pour la table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `id_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1257;

--
-- AUTO_INCREMENT pour la table `type_personnel`
--
ALTER TABLE `type_personnel`
  MODIFY `id_type_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `classe`
--
ALTER TABLE `classe`
  ADD CONSTRAINT `fk_classe_classe_groupe1` FOREIGN KEY (`niveau_id_niveau`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE;

--
-- Contraintes pour la table `classe_proffesseur_matiere`
--
ALTER TABLE `classe_proffesseur_matiere`
  ADD CONSTRAINT `fk_classe_has_professeur_classe1` FOREIGN KEY (`classe_id_classe`) REFERENCES `classe` (`id_classe`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_classe_has_professeur_professeur1` FOREIGN KEY (`professeur_id_professeur`) REFERENCES `personnel` (`id_personnel`) ON DELETE CASCADE;

--
-- Contraintes pour la table `depense`
--
ALTER TABLE `depense`
  ADD CONSTRAINT `fk_depense_user1` FOREIGN KEY (`user_id_user`) REFERENCES `users` (`id_user`);

--
-- Contraintes pour la table `droit_inscription`
--
ALTER TABLE `droit_inscription`
  ADD CONSTRAINT `fk_niveau_droit_inscription` FOREIGN KEY (`niveau_id_niveau`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `ecolage`
--
ALTER TABLE `ecolage`
  ADD CONSTRAINT `fk_ecolage_classe_groupe1` FOREIGN KEY (`niveau_id_niveau`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE;

--
-- Contraintes pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `fk_inscription_annee_scolaire` FOREIGN KEY (`annee_scolaire_id_annee_scolaire`) REFERENCES `annee_scolaire` (`id_annee_scolaire`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inscription_classe` FOREIGN KEY (`classe_id_classe`) REFERENCES `classe` (`id_classe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inscription_eleve_correct` FOREIGN KEY (`eleve_id_eleve`) REFERENCES `eleve` (`id_eleve`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inscription_nievau` FOREIGN KEY (`niveau_id_niveau`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `matiere_niveau`
--
ALTER TABLE `matiere_niveau`
  ADD CONSTRAINT `fk_matiere_has_classe_groupe_classe_groupe1` FOREIGN KEY (`niveau_id_niveau`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_matiere_has_classe_groupe_matiere1` FOREIGN KEY (`matiere_id_matiere`) REFERENCES `matiere` (`id_matiere`) ON DELETE CASCADE;

--
-- Contraintes pour la table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `fk_note_annee_scolaire1` FOREIGN KEY (`annee_scolaire_id_annee_scolaire`) REFERENCES `annee_scolaire` (`id_annee_scolaire`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_note_eleve1` FOREIGN KEY (`eleve_id_eleve`) REFERENCES `eleve` (`id_eleve`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_note_matiere1` FOREIGN KEY (`matiere_id_matiere`) REFERENCES `matiere` (`id_matiere`) ON DELETE CASCADE;

--
-- Contraintes pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD CONSTRAINT `fk_paiement_droit_inscription1` FOREIGN KEY (`droit_inscription_id`) REFERENCES `droit_inscription` (`id_droit_inscription`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_paiement_ecolage1` FOREIGN KEY (`ecolage_id_ecolage`) REFERENCES `ecolage` (`id_ecolage`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_paiement_inscription1` FOREIGN KEY (`inscription_id_inscription`) REFERENCES `inscription` (`id_inscription`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `parents_eleves`
--
ALTER TABLE `parents_eleves`
  ADD CONSTRAINT `fk_to_eleve` FOREIGN KEY (`eleve_id_eleve`) REFERENCES `eleve` (`id_eleve`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_to_parent` FOREIGN KEY (`parent_id_parent`) REFERENCES `parents` (`id_parent`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `personnel`
--
ALTER TABLE `personnel`
  ADD CONSTRAINT `fx_personne_type` FOREIGN KEY (`id_type_personnel`) REFERENCES `type_personnel` (`id_type_personnel`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
