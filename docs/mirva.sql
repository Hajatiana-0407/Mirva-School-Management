-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 01 sep. 2025 à 10:49
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
  `created_at` date DEFAULT NULL
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
-- Structure de la table `classe_professeur_matier`
--

CREATE TABLE `classe_professeur_matier` (
  `classe_id_classe` int(11) NOT NULL,
  `professeur_id_professeur` int(11) NOT NULL,
  `matiere_id_matiere` int(11) NOT NULL,
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

INSERT INTO `etablissement` (`id_etablissement`, `nom`, `code`, `adresse`, `telephone`, `email`, `slogan`, `logo`, `site_web`, `description`, `created_at`, `facebook`, `twitter`, `instagram`, `linkedin`, `youtube`) VALUES
(6, 'Mada School', 'MIRV2024', '123 Rue de l\'Éducation, Ville, Pays', '+1234567890', 'mada.shool@gmail.com', 'Apprendre, Grandir, Réussir', '', 'www.madaschool.com', 'Mada School est un établissement d\'enseignement dédié à l\'excellence académique et au développement global des élèves.', '2025-09-01 08:38:49', 'https://www.facebook.com/madaschool', 'https://www.twitter.com/madaschool', 'https://www.instagram.com/madaschool', 'https://www.linkedin.com/company/madaschool', 'https://www.youtube.com/madaschool');

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
  `sexe` varchar(45) DEFAULT NULL,
  `engagement` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pc_cin` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `id_type_personnel` int(11) NOT NULL,
  `date_embauche` date NOT NULL,
  `salaire_base` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
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
  ADD KEY `fk_classe_classe_groupe1_idx` (`niveau_id_niveau`);

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
  ADD PRIMARY KEY (`id_eleve`,`parent_id_parent`),
  ADD KEY `fk_eleve_parent1_idx` (`parent_id_parent`);

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
  MODIFY `id_annee_scolaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT pour la table `classe`
--
ALTER TABLE `classe`
  MODIFY `id_classe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=234;

--
-- AUTO_INCREMENT pour la table `depense`
--
ALTER TABLE `depense`
  MODIFY `id_depense` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

--
-- AUTO_INCREMENT pour la table `droit_inscription`
--
ALTER TABLE `droit_inscription`
  MODIFY `id_droit_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT pour la table `ecolage`
--
ALTER TABLE `ecolage`
  MODIFY `id_ecolage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=333;

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id_eleve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=561;

--
-- AUTO_INCREMENT pour la table `etablissement`
--
ALTER TABLE `etablissement`
  MODIFY `id_etablissement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `id_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT pour la table `matiere`
--
ALTER TABLE `matiere`
  MODIFY `id_matiere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=487;

--
-- AUTO_INCREMENT pour la table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `id_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=336;

--
-- AUTO_INCREMENT pour la table `note`
--
ALTER TABLE `note`
  MODIFY `id_note` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=441;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id_paiement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT pour la table `parent`
--
ALTER TABLE `parent`
  MODIFY `id_parent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=281;

--
-- AUTO_INCREMENT pour la table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `id_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=403;

--
-- AUTO_INCREMENT pour la table `type_personnel`
--
ALTER TABLE `type_personnel`
  MODIFY `id_type_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

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
  ADD CONSTRAINT `fk_classe_classe_groupe1` FOREIGN KEY (`niveau_id_niveau`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE;

--
-- Contraintes pour la table `classe_professeur_matier`
--
ALTER TABLE `classe_professeur_matier`
  ADD CONSTRAINT `fk_classe_has_professeur_classe1` FOREIGN KEY (`classe_id_classe`) REFERENCES `classe` (`id_classe`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_classe_has_professeur_professeur1` FOREIGN KEY (`professeur_id_professeur`) REFERENCES `personnel` (`id_personnel`) ON DELETE CASCADE,
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
  ADD CONSTRAINT `fk_niveau_droit_inscription` FOREIGN KEY (`niveau_id_niveau`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `ecolage`
--
ALTER TABLE `ecolage`
  ADD CONSTRAINT `fk_ecolage_classe_groupe1` FOREIGN KEY (`niveau_id_niveau`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE;

--
-- Contraintes pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD CONSTRAINT `fk_eleve_parent1` FOREIGN KEY (`parent_id_parent`) REFERENCES `parent` (`id_parent`);

--
-- Contraintes pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `fk_inscription_annee_scolaire` FOREIGN KEY (`annee_scolaire_id_annee_scolaire`) REFERENCES `annee_scolaire` (`id_annee_scolaire`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inscription_classe` FOREIGN KEY (`classe_id_classe`) REFERENCES `classe` (`id_classe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inscription_eleve_correct` FOREIGN KEY (`eleve_id_eleve`) REFERENCES `eleve` (`id_eleve`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Contraintes pour la table `personnel`
--
ALTER TABLE `personnel`
  ADD CONSTRAINT `fx_personne_type` FOREIGN KEY (`id_type_personnel`) REFERENCES `type_personnel` (`id_type_personnel`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
