-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 22 juil. 2025 à 03:46
-- Version du serveur : 10.4.25-MariaDB
-- Version de PHP : 8.1.10

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
  `created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `annee_scolaire`
--

INSERT INTO `annee_scolaire` (`id_annee_scolaire`, `date_debut`, `date_fin`, `created_at`) VALUES
(31, '2019-01-07', '1987-08-12', '2025-07-21'),
(32, '2002-05-31', '1977-07-01', '2025-07-21');

-- --------------------------------------------------------

--
-- Structure de la table `classe`
--

CREATE TABLE `classe` (
  `id_classe` int(11) NOT NULL,
  `denomination` varchar(45) DEFAULT NULL,
  `classe_groupe_id_classe_groupe` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `classe`
--

INSERT INTO `classe` (`id_classe`, `denomination`, `classe_groupe_id_classe_groupe`, `created_at`) VALUES
(61, 'Classe aut', 47, '2025-07-21 15:47:19'),
(62, 'Classe quia', 48, '2025-07-21 15:47:19'),
(63, 'Classe sed', 48, '2025-07-21 15:47:19'),
(64, 'Classe at', 50, '2025-07-21 15:47:20');

-- --------------------------------------------------------

--
-- Structure de la table `classe_professeur_matier`
--

CREATE TABLE `classe_professeur_matier` (
  `classe_id_classe` int(11) NOT NULL,
  `professeur_id_professeur` int(11) NOT NULL,
  `matiere_id_matiere` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `classe_professeur_matier`
--

INSERT INTO `classe_professeur_matier` (`classe_id_classe`, `professeur_id_professeur`, `matiere_id_matiere`) VALUES
(62, 73, 76),
(64, 73, 77),
(61, 74, 79),
(63, 76, 79);

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

--
-- Déchargement des données de la table `depense`
--

INSERT INTO `depense` (`id_depense`, `raison`, `montant`, `date`, `user_id_user`, `created_at`) VALUES
(29, 'Aut qui praesentium vel ut.', '3408.98', '1979-09-05', 1, '2025-07-21 15:47:25'),
(30, 'Porro harum quis fugiat.', '2380.90', '2006-02-16', 1, '2025-07-21 15:47:25'),
(31, 'Reiciendis quidem.', '4811.47', '1996-03-07', 1, '2025-07-21 15:47:25'),
(32, 'Possimus sequi.', '2582.98', '2016-05-06', 1, '2025-07-21 15:47:25'),
(33, 'Blanditiis labore cupiditate quidem.', '927.47', '1984-12-30', 1, '2025-07-21 15:47:25');

-- --------------------------------------------------------

--
-- Structure de la table `droit_inscription`
--

CREATE TABLE `droit_inscription` (
  `id_droit_inscription` int(11) NOT NULL,
  `montant` int(11) DEFAULT NULL,
  `classe_groupe_id_classe_groupe` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `droit_inscription`
--

INSERT INTO `droit_inscription` (`id_droit_inscription`, `montant`, `classe_groupe_id_classe_groupe`, `created_at`) VALUES
(0, 71711, 46, '2025-07-21 15:47:20'),
(0, 96243, 47, '2025-07-21 15:47:20'),
(0, 86513, 48, '2025-07-21 15:47:20'),
(0, 87896, 49, '2025-07-21 15:47:20'),
(0, 62238, 50, '2025-07-21 15:47:20'),
(0, 63683, 51, '2025-07-21 15:47:20'),
(0, 76949, 52, '2025-07-21 15:47:20');

-- --------------------------------------------------------

--
-- Structure de la table `ecolage`
--

CREATE TABLE `ecolage` (
  `id_ecolage` int(11) NOT NULL,
  `montant` decimal(10,2) DEFAULT NULL,
  `classe_groupe_id_classe_groupe` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `ecolage`
--

INSERT INTO `ecolage` (`id_ecolage`, `montant`, `classe_groupe_id_classe_groupe`, `created_at`) VALUES
(46, '78413.00', 46, '2025-07-21 15:47:20'),
(47, '65920.00', 47, '2025-07-21 15:47:20'),
(48, '64181.00', 48, '2025-07-21 15:47:20'),
(49, '41363.00', 49, '2025-07-21 15:47:20'),
(50, '64619.00', 50, '2025-07-21 15:47:20'),
(51, '68680.00', 51, '2025-07-21 15:47:21'),
(52, '49553.00', 52, '2025-07-21 15:47:21');

-- --------------------------------------------------------

--
-- Structure de la table `eleve`
--

CREATE TABLE `eleve` (
  `id_eleve` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `adresse` varchar(45) DEFAULT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `parent_id_parent` int(11) NOT NULL,
  `date_naissance` date DEFAULT NULL,
  `sexe` varchar(45) DEFAULT NULL,
  `maladie` varchar(45) DEFAULT NULL,
  `photo` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `eleve`
--

INSERT INTO `eleve` (`id_eleve`, `nom`, `prenom`, `adresse`, `telephone`, `parent_id_parent`, `date_naissance`, `sexe`, `maladie`, `photo`, `created_at`) VALUES
(151, 'Morin', 'Alphonse', '917, place de Barthelemy\n56097 Poulaindan', '+33 (0)9 04 27 83 76', 76, '2021-11-07', 'Femme', 'asperiores', 'default.jpg', '2025-07-21 15:47:21'),
(152, 'Vidal', 'Laurent', '34, rue Rossi\n88364 Rolland-sur-Lambert', '06 98 49 11 28', 76, '1986-09-05', 'Femme', 'praesentium', 'default.jpg', '2025-07-21 15:47:21'),
(153, 'Colas', 'Daniel', '43, rue Lacroix\n14191 Vincentdan', '+33 (0)3 27 91 15 39', 77, '1998-02-05', 'Femme', 'et', 'default.jpg', '2025-07-21 15:47:21'),
(154, 'Baudry', 'Agathe', 'place Auger\n95758 Besson', '+33 7 83 13 14 44', 80, '2012-07-01', 'Femme', 'accusantium', 'default.jpg', '2025-07-21 15:47:21'),
(155, 'Giraud', 'William', 'boulevard Agnès Diallo\n98652 Guillet-les-Bain', '+33 1 93 59 52 65', 76, '2003-03-01', 'Femme', 'veniam', 'default.jpg', '2025-07-21 15:47:22'),
(156, 'Leroux', 'Théodore', '71, avenue de Munoz\n04368 Labbe', '+33 7 76 66 97 44', 80, '1971-04-27', 'Homme', 'in', 'default.jpg', '2025-07-21 15:47:22'),
(157, 'Bonnet', 'Vincent', 'rue Besson\n24106 Dufour', '+33 9 62 70 96 44', 80, '2021-02-16', 'Femme', 'a', 'default.jpg', '2025-07-21 15:47:22'),
(158, 'Legrand', 'Madeleine', '735, place de Leroy\n19086 Hernandez-sur-Hoara', '05 74 40 26 97', 79, '2012-09-12', 'Homme', 'aut', 'default.jpg', '2025-07-21 15:47:22'),
(159, 'Couturier', 'Frédéric', '13, place Costa\n86066 Deschamps', '0599075832', 80, '1990-04-10', 'Femme', 'aperiam', 'default.jpg', '2025-07-21 15:47:22'),
(160, 'Begue', 'Théodore', '283, place Couturier\n54297 Chartier-les-Bains', '+33 4 92 59 77 84', 76, '2016-09-28', 'Homme', 'autem', 'default.jpg', '2025-07-21 15:47:22');

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE `inscription` (
  `id_inscription` int(11) NOT NULL,
  `is_passed` tinyint(1) DEFAULT NULL,
  `date_inscription` date DEFAULT NULL,
  `classe_id_classe` int(11) NOT NULL,
  `annee_scolaire_id_annee_scolaire` int(11) NOT NULL,
  `eleve_id_eleve` int(11) NOT NULL,
  `image` varchar(45) DEFAULT NULL,
  `is_droit_payed` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `inscription`
--

INSERT INTO `inscription` (`id_inscription`, `is_passed`, `date_inscription`, `classe_id_classe`, `annee_scolaire_id_annee_scolaire`, `eleve_id_eleve`, `image`, `is_droit_payed`, `created_at`) VALUES
(66, 0, '1994-12-15', 63, 31, 153, 'default.jpg', 0, '2025-07-21 15:47:24'),
(67, 0, '2012-03-21', 62, 31, 158, 'default.jpg', 0, '2025-07-21 15:47:24'),
(68, 0, '1971-11-18', 62, 32, 154, 'default.jpg', 0, '2025-07-21 15:47:24'),
(69, 0, '2017-07-09', 64, 32, 153, 'default.jpg', 0, '2025-07-21 15:47:24'),
(70, 0, '1991-01-06', 64, 31, 160, 'default.jpg', 0, '2025-07-21 15:47:24');

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

--
-- Déchargement des données de la table `matiere`
--

INSERT INTO `matiere` (`id_matiere`, `denomination`, `abbreviation`, `description`, `couleur`, `created_at`) VALUES
(76, 'Francais', 'FRS', 'Libero velit unde molestiae quo.', '#a51e1e', '2025-07-21 15:47:18'),
(77, 'Malagasy', 'MLG', 'Rerum consectetur magni.', '#f87748', '2025-07-21 15:47:18'),
(78, 'ut', 'EYA', 'Rem non consequatur.', '#01bdac', '2025-07-21 15:47:18'),
(79, 'voluptatibus', 'OPY', 'Aut magnam sit a.', '#d30ee5', '2025-07-21 15:47:18');

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

--
-- Déchargement des données de la table `matiere_niveau`
--

INSERT INTO `matiere_niveau` (`matiere_id_matiere`, `niveau_id_niveau`, `coefficient`, `heure_semaine`) VALUES
(76, 46, 2, 5),
(77, 51, 4, 7),
(78, 48, 2, 7),
(79, 48, 5, 9),
(79, 50, 4, 4);

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

--
-- Déchargement des données de la table `niveau`
--

INSERT INTO `niveau` (`id_niveau`, `niveau`, `cycle`, `description`, `created_at`) VALUES
(46, 'laboriosam 1', 'Primaire', 'Non odit veritatis.', '2025-07-21 15:47:18'),
(47, 'repellendus 6', 'Collège', 'Accusamus beatae eum omnis modi.', '2025-07-21 15:47:18'),
(48, 'qui 2', 'Lycée', 'Est autem eos rerum voluptatum.', '2025-07-21 15:47:18'),
(49, 'ipsum 3', 'Lycée', 'Nisi sint harum.', '2025-07-21 15:47:18'),
(50, 'officiis 1', 'Primaire', 'Quia hic culpa culpa illo.', '2025-07-21 15:47:18'),
(51, 'laboriosam 4', 'Primaire', 'Rerum nostrum est modi quo qui.', '2025-07-21 15:47:18'),
(52, 'Terminal', 'Lycée', 'Ut aut itaque molestiae.', '2025-07-21 15:47:18');

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

--
-- Déchargement des données de la table `note`
--

INSERT INTO `note` (`id_note`, `valeur`, `eleve_id_eleve`, `annee_scolaire_id_annee_scolaire`, `matiere_id_matiere`, `created_at`) VALUES
(111, 2, 158, 32, 78, '2025-07-21 15:47:24'),
(112, 11, 152, 32, 79, '2025-07-21 15:47:24'),
(113, 14, 153, 32, 78, '2025-07-21 15:47:24'),
(115, 16, 156, 32, 77, '2025-07-21 15:47:24'),
(117, 3, 158, 31, 79, '2025-07-21 15:47:24'),
(118, 3, 153, 32, 77, '2025-07-21 15:47:24'),
(120, 4, 151, 32, 78, '2025-07-21 15:47:24');

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

--
-- Déchargement des données de la table `paiement`
--

INSERT INTO `paiement` (`id_paiement`, `date_paiement`, `droit_inscription_id`, `ecolage_id_ecolage`, `mois`, `inscription_id_inscription`, `created_at`) VALUES
(24, '1993-01-28', 0, 47, 'January', 67, '2025-07-21 15:47:25'),
(25, '1983-01-03', 0, 51, 'November', 68, '2025-07-21 15:47:25'),
(26, '1974-05-03', 0, 48, 'June', 66, '2025-07-21 15:47:25'),
(27, '1985-07-15', 0, 47, 'June', 69, '2025-07-21 15:47:25'),
(28, '1989-07-15', 0, 52, 'October', 70, '2025-07-21 15:47:25');

-- --------------------------------------------------------

--
-- Structure de la table `parent`
--

CREATE TABLE `parent` (
  `id_parent` int(11) NOT NULL,
  `nom_pere` varchar(45) DEFAULT NULL,
  `nom_mere` varchar(45) DEFAULT NULL,
  `profession_pere` varchar(45) DEFAULT NULL,
  `profession_mere` varchar(45) DEFAULT NULL,
  `telephone_pere` varchar(45) DEFAULT NULL,
  `telephone_mere` varchar(45) DEFAULT NULL,
  `adresse` varchar(45) DEFAULT NULL,
  `pc_cin_pere` varchar(45) DEFAULT NULL,
  `pc_cin_mere` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `parent`
--

INSERT INTO `parent` (`id_parent`, `nom_pere`, `nom_mere`, `profession_pere`, `profession_mere`, `telephone_pere`, `telephone_mere`, `adresse`, `pc_cin_pere`, `pc_cin_mere`, `type`) VALUES
(76, 'Voisin', 'Hamon', 'Recuiseur', 'Analyste télématique', '+33 (0)8 14 42 08 43', '0898100701', 'boulevard Guibert\n01881 Diaz-sur-Carpentier', '930070469', '942346158', 'Père'),
(77, 'Adam', 'Carlier', 'Testeur informatique', 'Photographe d\'art', '0472035768', '08 95 37 66 48', '45, rue Boulanger\n56215 Le Goff', '460355341', '446686736', 'Père'),
(78, 'Leclerc', 'Meyer', 'Scannériste', 'Mannequin détail', '+33 3 92 18 16 09', '+33 (0)8 91 45 31 68', 'rue Michèle Millet\n74197 AlbertVille', '684230867', '750512271', 'Mère'),
(79, 'Chevalier', 'Bousquet', 'Plisseur', 'Auteur-adaptateur', '+33 (0)9 48 57 99 48', '0513356125', '512, avenue Allain\n26592 Pelletier', '493624668', '351073131', 'Mère'),
(80, 'Riou', 'Herve', 'Pyrotechnicien', 'Stratifieur', '09 16 58 18 44', '0143776393', '91, place de Antoine\n63527 Boulay', '316812789', '058655650', 'Mère');

-- --------------------------------------------------------

--
-- Structure de la table `professeur`
--

CREATE TABLE `professeur` (
  `id_professeur` int(11) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `adresse` varchar(45) DEFAULT NULL,
  `telephone` varchar(45) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  `sexe` varchar(45) DEFAULT NULL,
  `engagement` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pc_cin` varchar(45) DEFAULT NULL,
  `photo` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `professeur`
--

INSERT INTO `professeur` (`id_professeur`, `nom`, `prenom`, `adresse`, `telephone`, `date_naissance`, `sexe`, `engagement`, `email`, `password`, `pc_cin`, `photo`, `created_at`) VALUES
(72, 'Gaudin', 'Xavier', 'chemin Timothée Mendes\n94146 Georges', '01 04 52 60 44', '2013-06-19', 'Femme', 'Permanent', 'jduval@techer.com', '$2y$10$nC6eLrvFp6VqS4iCLyuLz.GMLnicAsPn4WFxrPUtJ6YHdm9PN6otG', '407956081', 'default.jpg', '2025-07-21 15:47:22'),
(73, 'Chauvin', 'Joseph', '809, rue de Hardy\n08844 Foucher', '01 07 48 47 03', '1996-07-11', 'Femme', 'Permanent', 'laetitia.pinto@noos.fr', '$2y$10$Tj6E.Vh8VqIP4fgJz.Q94OrjaKJI/hinwHpgUjaa8KsjlRK9oMyyi', '034973412', 'default.jpg', '2025-07-21 15:47:23'),
(74, 'Pascal', 'Jacques', '86, rue de Carlier\n44111 Barbierboeuf', '03 96 57 35 84', '1983-07-06', 'Femme', 'Permanent', 'omarie@orange.fr', '$2y$10$D9sS8K8u6Hip8QG25Ze2Eez4FCkqV2EiKSO3mLUyJt3RNbZORhoyW', '000879555', 'default.jpg', '2025-07-21 15:47:23'),
(75, 'Torres', 'Édith', '56, chemin Théodore Leleu\n05095 Renault', '+33 (0)1 34 56 33 64', '2008-03-07', 'Femme', 'Permanent', 'normand.victor@baron.com', '$2y$10$/qXJqO.lTvmQThLJrtQVLeojyNsn6gYHuJje1iQPzPmMmZaEzNkf6', '558571310', 'default.jpg', '2025-07-21 15:47:23'),
(76, 'Marin', 'Margaud', '27, boulevard Leroy\n08924 LevequeBourg', '0756436499', '2006-07-20', 'Homme', 'Permanent', 'sebastien01@lebrun.com', '$2y$10$AKo2u6QTyNwsSaHAdZxhlOnFyT/fjXtMKHW9BW8dIIAkV72RSN4mO', '343098135', 'default.jpg', '2025-07-21 15:47:23');

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
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `email`, `password`, `role`) VALUES
(1, 'teste', 'teste', 'teste');

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
  ADD KEY `fk_classe_classe_groupe1_idx` (`classe_groupe_id_classe_groupe`);

--
-- Index pour la table `classe_professeur_matier`
--
ALTER TABLE `classe_professeur_matier`
  ADD PRIMARY KEY (`classe_id_classe`,`professeur_id_professeur`),
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
  ADD PRIMARY KEY (`id_droit_inscription`,`classe_groupe_id_classe_groupe`),
  ADD KEY `fk_droit_inscription_classe_groupe1_idx` (`classe_groupe_id_classe_groupe`);

--
-- Index pour la table `ecolage`
--
ALTER TABLE `ecolage`
  ADD PRIMARY KEY (`id_ecolage`),
  ADD KEY `fk_ecolage_classe_groupe1_idx` (`classe_groupe_id_classe_groupe`);

--
-- Index pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD PRIMARY KEY (`id_eleve`,`parent_id_parent`),
  ADD KEY `fk_eleve_parent1_idx` (`parent_id_parent`);

--
-- Index pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD PRIMARY KEY (`id_inscription`),
  ADD KEY `fk_inscription_classe1_idx` (`classe_id_classe`),
  ADD KEY `fk_inscription_annee_scolaire1_idx` (`annee_scolaire_id_annee_scolaire`),
  ADD KEY `fk_inscription_eleve_idx` (`eleve_id_eleve`);

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
-- Index pour la table `parent`
--
ALTER TABLE `parent`
  ADD PRIMARY KEY (`id_parent`);

--
-- Index pour la table `professeur`
--
ALTER TABLE `professeur`
  ADD PRIMARY KEY (`id_professeur`);

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
  MODIFY `id_annee_scolaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `classe`
--
ALTER TABLE `classe`
  MODIFY `id_classe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `depense`
--
ALTER TABLE `depense`
  MODIFY `id_depense` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `ecolage`
--
ALTER TABLE `ecolage`
  MODIFY `id_ecolage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id_eleve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `id_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT pour la table `matiere`
--
ALTER TABLE `matiere`
  MODIFY `id_matiere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT pour la table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `id_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `note`
--
ALTER TABLE `note`
  MODIFY `id_note` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id_paiement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `parent`
--
ALTER TABLE `parent`
  MODIFY `id_parent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT pour la table `professeur`
--
ALTER TABLE `professeur`
  MODIFY `id_professeur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `classe`
--
ALTER TABLE `classe`
  ADD CONSTRAINT `fk_classe_classe_groupe1` FOREIGN KEY (`classe_groupe_id_classe_groupe`) REFERENCES `niveau` (`id_niveau`);

--
-- Contraintes pour la table `classe_professeur_matier`
--
ALTER TABLE `classe_professeur_matier`
  ADD CONSTRAINT `fk_classe_has_professeur_classe1` FOREIGN KEY (`classe_id_classe`) REFERENCES `classe` (`id_classe`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_classe_has_professeur_professeur1` FOREIGN KEY (`professeur_id_professeur`) REFERENCES `professeur` (`id_professeur`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_classe_professeur_matier_matiere1` FOREIGN KEY (`matiere_id_matiere`) REFERENCES `matiere` (`id_matiere`) ON DELETE CASCADE;

--
-- Contraintes pour la table `depense`
--
ALTER TABLE `depense`
  ADD CONSTRAINT `fk_depense_user1` FOREIGN KEY (`user_id_user`) REFERENCES `users` (`id_user`);

--
-- Contraintes pour la table `droit_inscription`
--
ALTER TABLE `droit_inscription`
  ADD CONSTRAINT `fk_droit_inscription_classe_groupe1` FOREIGN KEY (`classe_groupe_id_classe_groupe`) REFERENCES `niveau` (`id_niveau`);

--
-- Contraintes pour la table `ecolage`
--
ALTER TABLE `ecolage`
  ADD CONSTRAINT `fk_ecolage_classe_groupe1` FOREIGN KEY (`classe_groupe_id_classe_groupe`) REFERENCES `niveau` (`id_niveau`);

--
-- Contraintes pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD CONSTRAINT `fk_eleve_parent1` FOREIGN KEY (`parent_id_parent`) REFERENCES `parent` (`id_parent`);

--
-- Contraintes pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `fk_inscription_annee_scolaire` FOREIGN KEY (`annee_scolaire_id_annee_scolaire`) REFERENCES `annee_scolaire` (`id_annee_scolaire`),
  ADD CONSTRAINT `fk_inscription_classe` FOREIGN KEY (`classe_id_classe`) REFERENCES `classe` (`id_classe`),
  ADD CONSTRAINT `fk_inscription_eleve_correct` FOREIGN KEY (`eleve_id_eleve`) REFERENCES `eleve` (`id_eleve`);

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
  ADD CONSTRAINT `fk_paiement_droit_inscription1` FOREIGN KEY (`droit_inscription_id`) REFERENCES `droit_inscription` (`id_droit_inscription`),
  ADD CONSTRAINT `fk_paiement_ecolage1` FOREIGN KEY (`ecolage_id_ecolage`) REFERENCES `ecolage` (`id_ecolage`),
  ADD CONSTRAINT `fk_paiement_inscription1` FOREIGN KEY (`inscription_id_inscription`) REFERENCES `inscription` (`id_inscription`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
