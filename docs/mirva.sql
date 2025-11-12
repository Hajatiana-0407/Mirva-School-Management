-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 12 nov. 2025 à 05:57
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

-- --------------------------------------------------------

--
-- Structure de la table `exercice`
--

CREATE TABLE `exercice` (
  `id_exercice` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `titre` text NOT NULL,
  `description` text NOT NULL,
  `contenu` text NOT NULL,
  `ficher_principale` text NOT NULL,
  `fichier_support` text NOT NULL,
  `id_matiere` int(11) DEFAULT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `id_niveau` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `published` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE `inscription` (
  `id_inscription` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
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
-- Structure de la table `lecon`
--

CREATE TABLE `lecon` (
  `id_lecon` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `titre` text NOT NULL,
  `description` text NOT NULL,
  `contenu` text NOT NULL,
  `ficher_principale` text NOT NULL,
  `fichier_support` text NOT NULL,
  `id_matiere` int(11) DEFAULT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `id_niveau` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `published` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `lecon`
--

INSERT INTO `lecon` (`id_lecon`, `slug`, `titre`, `description`, `contenu`, `ficher_principale`, `fichier_support`, `id_matiere`, `id_prof`, `id_niveau`, `created_at`, `published`) VALUES
(3112, 'laboriosam-maiores-accusantium-aspernatur-aperiam-cum-rerum-cumque-3132', 'Laboriosam maiores accusantium aspernatur aperiam cum rerum cumque.', 'Molestiae voluptatibus labore et esse laboriosam. Nesciunt eius sit rem deleniti dolores nobis. Et deleniti amet id. Tenetur impedit doloribus numquam molestias et a.', 'Eum qui veritatis magnam nam. Corporis consequatur animi voluptates sit dolores. Dignissimos nostrum enim quis dolores qui vitae amet.\n\nAb voluptatum quos et consequatur. Dolor culpa commodi id fugiat corporis. Ut officia et consequatur officia maiores et a.\n\nNulla excepturi ea laboriosam et omnis. Eum nisi aspernatur qui sint molestiae consequatur. Officia quos quo reprehenderit numquam veritatis laboriosam. Odit sunt harum unde eius ipsam.\n\nDolorum ut necessitatibus cupiditate provident. Qui quibusdam ex enim quis. Fuga incidunt eos ex illo minima.\n\nBeatae aut cumque consequuntur voluptas dolorem dolorum accusantium. Omnis laudantium est enim est consequatur. Qui et numquam ut omnis voluptates corporis harum.', 'http://payet.fr/et-sit-quia-minima-exercitationem-enim-ut', '', NULL, NULL, NULL, '2025-10-14 05:25:51', 0),
(3113, 'optio-illo-delectus-facilis-officia-placeat-3133', 'Optio illo delectus facilis officia placeat.', 'Voluptas ad aut consequatur molestiae alias molestiae porro eos. Sed aut ipsum modi ad repellendus impedit tempore. Omnis possimus deserunt facere iure quaerat.', 'Perspiciatis eum eaque aut voluptatem. Aliquid vitae iure facilis sed. Adipisci sunt commodi ut. Et ea molestiae cum perferendis sequi rerum iure.\n\nUt sit nobis voluptatem ea et molestias debitis animi. Itaque totam dolorem accusantium dignissimos laborum quibusdam et. Alias provident atque sed voluptatem et. Ad perspiciatis et quia ad atque magnam aperiam expedita.\n\nEos facere facilis aut illum sed repellendus dolore. Quam dolor similique fuga. Non consectetur sequi et tenetur. Aspernatur corporis veritatis nesciunt omnis.\n\nQuisquam doloribus quia ipsum sapiente. Sunt voluptatem cum odit dolorem perferendis dolorum non. Consequatur ad earum ut mollitia.\n\nSaepe nulla omnis neque quaerat quo et impedit. Repellat totam qui inventore perspiciatis.', 'http://jacques.com/perspiciatis-autem-est-qui-cumque-enim-incidunt', '', NULL, NULL, NULL, '2025-05-20 15:50:49', 0),
(3114, 'commodi-ut-enim-reprehenderit-aspernatur-porro-error-consequatur-a-3134', 'Commodi ut enim reprehenderit aspernatur porro error consequatur a.', 'Omnis quia aut deleniti dolore. Molestias ad accusamus nemo. Sequi voluptates odio ut id ex vel vero unde.', 'Accusantium et ut omnis. Possimus et sed consequuntur qui reprehenderit dicta. Nulla aut adipisci repudiandae enim ex.\n\nIllum eos est dolore accusamus ducimus et deserunt. Expedita impedit et saepe dicta voluptatum earum repellendus. Delectus odit laudantium ducimus est.\n\nQuo est voluptatem magni cum voluptates qui nostrum. Laborum eum eum tempora recusandae laborum sed itaque. Nobis qui est qui qui. Voluptatem nihil ipsum delectus autem.\n\nArchitecto omnis magni voluptatem nihil. Voluptatem qui doloremque in facere. Reprehenderit nisi non ipsa labore.\n\nAspernatur expedita tempore beatae amet voluptas. Vitae occaecati vero aut et rerum qui. Cum excepturi animi aspernatur est repudiandae qui dolores.', 'http://meyer.com/et-hic-nihil-beatae-voluptatem-fugiat-illo-dolore', 'dae', NULL, NULL, NULL, '2025-03-14 22:10:57', 0),
(3115, 'excepturi-et-quam-commodi-facilis-nobis-3135', 'Excepturi et quam commodi facilis nobis.', 'Incidunt repellat quas inventore maxime officiis necessitatibus quas. Eius quidem qui dolor quia sit. Odit veritatis molestias vitae autem minima. Nesciunt qui quia numquam nisi.', 'Velit voluptatibus tempora aperiam odit. Dolorem sapiente aperiam voluptatem voluptas magni mollitia. Cumque sequi optio aut illum esse quisquam. Corrupti excepturi enim repudiandae aut non eos adipisci.\n\nPerferendis iste soluta quia illum est eos totam. Similique laboriosam ducimus rerum repellendus. Quia nihil accusamus voluptas officia id perferendis ut.\n\nIpsam accusamus velit rem. Itaque maiores sint et voluptates. Est illum consequatur omnis eaque sit excepturi autem iusto.\n\nIpsa et quis rerum. Id consectetur vel asperiores quaerat nihil est molestias. Sit et saepe neque.\n\nIure ex cumque exercitationem aut nostrum enim. Autem doloribus quae et magnam. Voluptatem neque similique ut harum officiis totam nisi.', 'http://www.dasilva.fr/temporibus-reiciendis-dignissimos-vel-recusandae-consequatur-quas', 'stf', NULL, NULL, NULL, '2025-09-21 14:54:18', 0),
(3116, 'dolores-totam-dolore-voluptatum-et-quod-aspernatur-et-a-3136', 'Dolores totam dolore voluptatum et quod aspernatur et a.', 'Dolor et eum officia et eum nostrum debitis. Ut ipsum consequatur sit exercitationem autem. Totam rerum dolor dolorum totam ut vitae.', 'Et dignissimos perferendis fuga officiis. Qui molestiae nisi consequuntur ut.\n\nQuo animi voluptatem maiores vel deleniti voluptas. Et laborum sed dolor aliquam atque labore. Nihil debitis quia sapiente eum. Et ipsam magni sint et voluptate.\n\nPlaceat voluptatem iure cum officia illo consequatur exercitationem. Sequi nam nesciunt omnis deserunt rerum quia. Voluptatum neque reiciendis esse omnis dolorum. Aut et debitis minus facere voluptates.\n\nOmnis mollitia magnam architecto earum rerum. Velit incidunt a iste iure voluptatum dolorem dicta. Quidem aliquam ut perferendis consequatur quod rerum. Et provident ullam magni qui eum rerum.\n\nNobis molestiae sunt modi illo molestias perspiciatis. Nostrum animi qui vero dolor. Rerum non vel quas.', 'https://picard.fr/fugit-adipisci-maiores-hic-facilis-rerum-nesciunt-qui-maxime.html', 'jnlp', NULL, NULL, NULL, '2025-03-04 16:50:50', 0),
(3117, 'ducimus-voluptatem-aliquam-possimus-corporis-architecto-eius-rem-voluptatum-3137', 'Ducimus voluptatem aliquam possimus corporis architecto eius rem voluptatum.', 'Quia non alias et molestias ducimus aliquid ea voluptas. Distinctio perferendis corporis sit provident iure. Quos voluptas id magnam.', 'Eos aliquid hic magnam nemo vero voluptatibus quisquam. Sint optio non dolorem. Unde ipsum dicta praesentium architecto adipisci.\n\nNesciunt aliquid praesentium ut. Sit ut sit temporibus dolorem quam. Fuga ea enim tempore provident reprehenderit quisquam. Odit expedita dolorum qui quibusdam et omnis.\n\nEligendi voluptatem et quos provident. Deleniti voluptas et voluptatem eveniet esse rerum sed. Distinctio vero vero impedit fugiat.\n\nAspernatur ea ullam aut molestias at accusamus et. Voluptates beatae sed officia quibusdam voluptatum. Placeat sed quia nulla qui quis. Quas et et ab animi rerum.\n\nConsequatur beatae dolorum sunt. Nisi odio hic est ratione velit rerum voluptatem. Autem aut velit eaque numquam aut. Nobis incidunt cupiditate exercitationem sint eligendi.', 'https://www.jacquot.fr/mollitia-sit-sequi-similique', 'qam', NULL, NULL, NULL, '2025-01-03 12:57:08', 0),
(3118, 'quasi-placeat-et-deserunt-nobis-3138', 'Quasi placeat et deserunt nobis.', 'Quia et cumque alias libero eos. Cupiditate cum vel nihil voluptatem vero et quia. Repellendus autem maiores at qui quis similique reprehenderit.', 'Sequi sint consectetur et facere. Eveniet repudiandae et eum ut harum ad at. Incidunt quidem soluta voluptatem voluptas quos deleniti atque.\n\nQui nihil ut iste quia ea. Id corporis alias nesciunt at sed.\n\nDolorem sit ut eaque aut nihil rerum. Ullam vel eum ut aut. Pariatur molestiae nesciunt eum quae rerum. Explicabo a non itaque consequatur dolorem qui molestias. Nostrum quibusdam adipisci ut consequuntur voluptas.\n\nDelectus perspiciatis molestiae eos et dignissimos eveniet. Adipisci ipsum molestiae qui maxime rerum. Atque quasi aut sit. Ut incidunt nulla qui error.\n\nTempore similique molestiae consequatur qui fugit est ea. Repellat accusamus quis ducimus consequatur delectus. Non ea quas molestiae vero facilis vel qui.', 'http://langlois.com/velit-et-quos-alias-maiores.html', '', NULL, NULL, NULL, '2025-10-26 01:28:54', 0),
(3119, 'aliquam-ex-molestiae-aut-tempora-qui-dolores-laboriosam-3139', 'Aliquam ex molestiae aut tempora qui dolores laboriosam.', 'Dolor voluptas id nisi omnis est quia architecto. Distinctio et enim in fugiat asperiores eos. Ut neque aut sed et.', 'Velit omnis eligendi iste et. Odio et velit quibusdam aut. Magni excepturi at voluptatem amet ipsam illum consequatur.\n\nDolore architecto in quisquam provident rerum. Vel reiciendis soluta sapiente vel illum. Architecto molestiae quisquam asperiores repellat quas ut. Aut similique sequi eius. Occaecati occaecati et rerum libero.\n\nNulla labore autem cupiditate corporis ipsa autem. Vero voluptas est ut natus autem quos. Et similique ullam eos eligendi ducimus voluptates doloremque. Ea quibusdam voluptate quia quia.\n\nEarum enim esse architecto nihil dolorum qui aut. Aut nulla delectus minima adipisci aut. Consequatur fugiat et et. Quas delectus tempore quam.\n\nQui accusantium voluptatem et sint vel. Dolor incidunt quidem omnis autem voluptas architecto.', 'https://blanchet.com/error-et-ut-sint-totam-enim-nemo.html', 'wav', NULL, NULL, NULL, '2025-01-31 14:01:40', 0),
(3120, 'doloremque-magni-officia-quibusdam-aut-quisquam-3140', 'Doloremque magni officia quibusdam aut quisquam.', 'Magni aliquid fuga quidem molestiae dicta. Deleniti nostrum aperiam consectetur velit voluptatibus. Facere quia nam quae autem qui.', 'Pariatur facere dolorem commodi eos et est sunt vel. Sit consequatur est error quis aspernatur incidunt dolorem. Illum mollitia consequatur est quis consequatur ut sit.\n\nAut deserunt perspiciatis perspiciatis. Dolores velit quisquam enim voluptate sapiente quis. Laboriosam blanditiis ab omnis autem aut.\n\nVoluptas dignissimos et qui vitae sit. Nesciunt aut incidunt quaerat quidem illo. Ea ipsum sint repellendus voluptatibus consequatur cumque. Esse est molestiae repellendus quia.\n\nQuam doloremque alias mollitia voluptatibus. Molestiae nemo aperiam similique eos quaerat et debitis. Expedita quis quis inventore odio consequatur tenetur. Eveniet quae aut labore.\n\nSed minima quisquam perspiciatis itaque ut. Nam accusamus dolorum accusamus voluptatibus tempora nesciunt ducimus. Nobis vel ut dolores.', 'http://www.bourgeois.com/quaerat-doloribus-ipsa-in-eum-tempore-tenetur', 'wmx', NULL, NULL, NULL, '2025-06-09 04:49:28', 0),
(3121, 'est-qui-est-deleniti-rerum-eum-3141', 'Est qui est deleniti rerum eum.', 'Eveniet omnis aperiam ut quae. Rerum enim aliquam nemo. Eum eligendi quidem autem. Assumenda et ullam numquam vel. Alias cupiditate velit et magnam.', 'Adipisci qui quis ipsum blanditiis repellendus sed a quibusdam. Alias voluptates repudiandae est deserunt dolore omnis dolorem quia. Nulla corporis saepe est ut maxime qui. Culpa rerum iure excepturi.\n\nVel recusandae alias sed molestias occaecati consequatur. Vel expedita eum qui dolorum corporis. Quo asperiores iste quos maxime repudiandae blanditiis.\n\nFugiat alias et sed est dolorum sit velit suscipit. Doloremque dolor libero aperiam atque nisi aliquid saepe. Quidem aut pariatur non. Natus est natus aut voluptas quos ut.\n\nDolorem molestiae possimus qui eveniet aperiam et. Ut rerum soluta labore eveniet recusandae nulla. Aliquam sit corrupti eveniet ut et mollitia. Cumque autem non dolores id.\n\nUt reprehenderit aut et eum alias voluptas aliquam. Quam omnis assumenda provident aut. Asperiores ad nulla nesciunt quibusdam quo doloribus. Error maiores neque voluptatem.', 'http://www.collin.fr/id-molestiae-et-et-nisi', '', NULL, NULL, NULL, '2025-03-14 21:03:17', 0),
(3122, 'rem-necessitatibus-ut-officiis-modi-3142', 'Rem necessitatibus ut officiis modi.', 'Ut iusto neque aut recusandae placeat saepe quisquam. Rerum et soluta perferendis veniam et neque neque. Tempora qui qui officia iste et quibusdam.', 'Fuga nobis alias beatae quas aliquid voluptatem ut mollitia. Vel consequuntur hic nostrum reiciendis sequi. Aspernatur similique nisi sunt sit ipsum aut quia. Veniam voluptatem sed velit cum.\n\nEt ipsum iusto id at quam temporibus voluptatem et. Illo debitis fugit ex quae recusandae et. Suscipit ad voluptatem omnis recusandae assumenda sit eveniet ex. Aliquam dolorem numquam sit repellendus recusandae dolor qui minus.\n\nVoluptatem enim cum sunt asperiores. Et est perspiciatis odit cum quasi sapiente sint officiis. Omnis odit labore est et quas possimus.\n\nUt eos in quia dicta suscipit itaque quod. Natus unde similique maxime cum natus. Rerum quam ullam voluptatum suscipit at et voluptas.\n\nIpsa aut ratione quod ea et numquam sequi. Magnam fugit iste maiores eius. Voluptates nulla iure qui ad ea blanditiis. Vero quibusdam nulla rerum neque optio aut.', 'https://etienne.fr/a-ut-maxime-sapiente-consequuntur-sint-perferendis.html', '', NULL, NULL, NULL, '2025-07-25 13:37:24', 0),
(3123, 'omnis-unde-commodi-ut-dicta-aperiam-deleniti-3143', 'Omnis unde commodi ut dicta aperiam deleniti.', 'Debitis ut dolorem alias optio. Nisi autem explicabo ut quo est facilis doloribus. Aut mollitia praesentium non nesciunt. Id quasi aut aut deleniti et debitis ratione.', 'Tenetur eum accusantium consequatur sit incidunt. Accusamus placeat dolores laborum voluptatum reiciendis voluptatibus enim. Accusantium et qui eos quia repudiandae.\n\nSapiente id cumque autem dolorum pariatur. Id et voluptatum excepturi sit quod labore. At cupiditate qui eos necessitatibus sapiente ipsum velit. Quia qui est eum ea occaecati provident.\n\nUt repellat sit temporibus a ut doloremque deserunt. Provident minima aut sed exercitationem. Possimus ad temporibus et consequatur explicabo sed. Laborum alias et accusantium enim est.\n\nConsequuntur dolorem enim expedita aut. Recusandae dignissimos corporis deserunt non id illum. Sint laudantium aliquam et dignissimos a iusto quia.\n\nTemporibus delectus exercitationem esse suscipit neque iure fugiat earum. Quia ut nesciunt totam esse illo corporis necessitatibus hic. Laborum rerum quasi enim dolorem nemo recusandae.', 'http://www.lemonnier.fr/voluptas-voluptatibus-est-nihil-dolorum-magnam-voluptates-ea-est', '', NULL, NULL, NULL, '2025-02-07 21:44:29', 0),
(3124, 'labore-ea-ratione-et-3144', 'Labore ea ratione et.', 'Autem optio fuga sit officia est. Voluptatem adipisci at consequatur sint alias cum neque. Dolore qui nisi inventore ratione quod deleniti. Saepe consequatur ut consequuntur.', 'Eius nemo adipisci ullam distinctio. Ut et nulla veritatis. Fugit id animi hic fuga.\n\nPlaceat inventore id explicabo in necessitatibus dolorem saepe. Necessitatibus rerum eveniet odio dolores sint distinctio. Dignissimos quaerat veritatis quaerat dolor sed nulla consequatur autem. Rem explicabo eos voluptatem neque.\n\nAccusantium veritatis esse excepturi velit. Harum quia beatae velit ab qui vitae mollitia. Temporibus quisquam ex quia et ullam.\n\nQuasi blanditiis saepe necessitatibus qui quae est. Pariatur architecto sed natus distinctio illo et officia. Nam et voluptatem quasi doloremque quae sit accusantium.\n\nSit expedita enim exercitationem pariatur ipsam. Dignissimos ratione fugit sunt modi. Molestias repellendus aut laborum rerum. Est quas eveniet saepe adipisci.', 'http://www.hamel.com/ad-officiis-a-molestias-dignissimos-et-architecto', 'fpx', NULL, NULL, NULL, '2025-09-18 18:16:17', 0),
(3125, 'voluptatem-labore-autem-est-et-et-sunt-cumque-3137', 'Voluptatem labore autem est et et sunt cumque.', 'Ullam dolor repudiandae natus veniam et. Sint occaecati a beatae voluptatibus. Laudantium quisquam doloribus libero eaque officia.', 'Sint harum qui consequuntur suscipit animi voluptatem tempora. Totam iure cupiditate qui non excepturi est et placeat. Impedit et aspernatur quasi modi.\n\nEaque adipisci sit ea consectetur commodi. Illum numquam consequatur ea facilis voluptatem. Ullam aut tempora totam temporibus quae.\n\nMinus ullam ducimus molestias ea sapiente qui. Nam et laudantium quaerat dolor. Consectetur delectus maiores ad magnam doloribus neque possimus.\n\nRepellat officia autem voluptatum magni in. Magnam quia aut qui eos. Incidunt porro aut illo et labore vero mollitia.\n\nNumquam laboriosam dolorem aut qui. A asperiores minima minus tenetur amet dolorum. Provident explicabo atque voluptatem quos. Repudiandae sint quis repudiandae sed.', 'http://www.charrier.com/quia-et-voluptates-sunt-repellat.html', 'fh4', NULL, NULL, NULL, '2025-08-19 09:54:31', 0),
(3126, 'quo-provident-omnis-placeat-unde-rerum-ratione-omnis-3138', 'Quo provident omnis placeat unde rerum ratione omnis.', 'Ea occaecati et nam suscipit fuga. Quia fuga sequi qui labore et. Est fugit amet sint illo debitis. Ullam sapiente sed et minima laboriosam. Doloremque deserunt recusandae tenetur debitis ex magni corrupti qui.', 'Repellat iure incidunt inventore molestias voluptatibus corrupti. Aut non sit et quia molestiae et quibusdam maiores. Rerum ratione quo occaecati necessitatibus ipsum ullam aut. Sit minima sed dolorum et ad ex nemo.\n\nHic rem molestias qui quam. Iste facere quos consectetur deserunt totam consequatur. Expedita corporis et sint expedita. Ut nulla pariatur quia modi.\n\nMinima debitis hic suscipit quam unde quibusdam nam. Eveniet rerum nihil libero aliquid id animi libero. Officia possimus eum ut nesciunt exercitationem.\n\nNon quia tempore voluptatum aspernatur quia fuga. Cupiditate maxime repellendus et. Qui et rerum quia tempora.\n\nDebitis quis vel ea eligendi nihil. Non earum ducimus et iusto dolores. Et beatae tenetur magni dolorem quos adipisci ratione cupiditate. Veritatis omnis reiciendis quia voluptas est ipsam et.', 'http://www.sauvage.com/molestias-quo-eligendi-dolor-ipsam-necessitatibus-aliquid-et-qui.html', '', NULL, NULL, NULL, '2025-09-23 11:17:04', 0),
(3127, 'necessitatibus-est-sit-saepe-doloribus-doloribus-ipsa-iste-3139', 'Necessitatibus est sit saepe doloribus doloribus ipsa iste.', 'Aliquid eveniet tenetur in nihil qui reprehenderit. Voluptatibus aut cumque id corrupti. Quidem sed in aut possimus hic. Dicta qui adipisci earum molestias nesciunt aut autem.', 'Velit aut dolores exercitationem ea dignissimos ipsa. Eos veniam quod quia tempore iste modi sed. Molestiae dolores non exercitationem quidem sequi qui deleniti velit. Non harum numquam pariatur ea.\n\nAut ullam voluptatem velit. Modi repellendus aut repellat quia incidunt saepe illo. Ducimus non natus ex aut voluptas. Id saepe voluptatem quo est nihil eum. Voluptas deserunt temporibus est accusantium accusantium perferendis cupiditate quae.\n\nRepellat non laborum rerum. Laborum rerum dolores nesciunt exercitationem accusantium.\n\nSit sapiente voluptate laborum quod ea fugit nisi earum. Ea et nostrum enim dolor. Omnis maxime accusamus aliquam sapiente est. Qui in natus cum.\n\nEt sunt iusto ipsa earum quae earum. Inventore repudiandae omnis consequatur molestias aut neque esse est. Error qui quia non.', 'http://www.neveu.com/', 'emz', NULL, NULL, NULL, '2025-08-12 11:36:25', 0),
(3128, 'corrupti-est-voluptatem-tempora-et-quo-quo-totam-3140', 'Corrupti est voluptatem tempora et quo quo totam.', 'Dolores ea rerum explicabo nesciunt. Quis nisi nulla earum amet pariatur non. Omnis ipsum perspiciatis quasi qui tenetur.', 'Ex minima non soluta quod. Nesciunt incidunt ipsum necessitatibus qui. Ex dolor totam omnis qui. Reiciendis quas quisquam et eum explicabo minima sed.\n\nUt aut maxime beatae. Hic eius dolores dolor voluptatem fugit est voluptatum. Eos non quasi et rem aliquam.\n\nVoluptatem libero sequi eos quis. Recusandae voluptatem fugiat quaerat aut. Corrupti nisi soluta harum nostrum odio aperiam.\n\nAut dolor odio nulla rem. Tempore mollitia et quis enim voluptatem ut at. Consectetur sit id nihil esse eos maiores. Iste quis neque dolorem repellendus enim.\n\nCorporis laborum cupiditate pariatur dolores repellendus libero. Cupiditate dolorem voluptatem qui ab. Facere et vitae molestiae in dolores. Numquam accusamus ea officia incidunt architecto possimus.', 'https://www.carlier.org/voluptas-natus-corporis-cumque-natus', '', NULL, NULL, NULL, '2025-01-11 10:13:49', 0),
(3129, 'autem-perspiciatis-non-illum-reprehenderit-et-veniam-3141', 'Autem perspiciatis non illum reprehenderit et veniam.', 'Ut quis est ut vel aliquid vero. Sed beatae dignissimos laboriosam. Aspernatur accusantium ab quo velit cupiditate. Aut laudantium et perferendis.', 'Aut consectetur est est explicabo ab et. Consequuntur cum iste quos sit repudiandae sed aut iste. Neque doloremque molestias sunt et cupiditate nihil. Neque quia laboriosam porro facere ducimus.\n\nVel magnam minima molestias necessitatibus sint doloribus non qui. Quaerat porro dolore dolorem architecto. Minus veniam perferendis ducimus laborum amet harum impedit ut. Expedita sunt error ex totam voluptatem commodi sit. Ut sunt iusto facere molestiae.\n\nVeniam quae qui officia nulla rerum. Unde repellat consequatur nesciunt quis laboriosam vel ullam. Voluptatem et cupiditate maxime minus est.\n\nRem dolor excepturi enim praesentium et qui. Quibusdam dolor ut neque qui voluptas maxime. Illum placeat et accusantium mollitia fugit. Veritatis corporis et repellendus omnis numquam.\n\nEst sint omnis fugiat sint. Id est dolore qui minima maxime sed. Quo qui repudiandae ex. Voluptas velit exercitationem facere sunt. Necessitatibus unde odio nobis et sint doloribus voluptatum reprehenderit.', 'http://aubry.com/tenetur-assumenda-reiciendis-corrupti-et.html', 'vcx', NULL, NULL, NULL, '2025-04-05 12:22:56', 0),
(3130, 'aut-voluptas-harum-porro-3142', 'Aut voluptas harum porro.', 'Corporis culpa excepturi ab sit sint voluptas qui. Ipsum quod voluptatum cum consequuntur sunt. Voluptatem molestias saepe et aut.', 'Aut nihil voluptatem dolores laudantium ut et voluptas hic. Earum aut illo et ut assumenda. Expedita aut et velit dicta qui. Laudantium nulla hic molestiae. Totam animi optio velit doloribus odio.\n\nRerum quidem ipsum voluptatibus recusandae dignissimos. Ratione quis consectetur dolore expedita ea nesciunt necessitatibus. Architecto mollitia consequatur reprehenderit id ullam.\n\nVelit voluptatem praesentium adipisci cupiditate et voluptatem fugiat. Sunt natus similique voluptate et illum. Nobis ut in et et officia.\n\nEa magnam non rerum ut. Enim nihil suscipit numquam est modi totam. Magnam dolores et quia in velit voluptas commodi molestias. Quasi illo eveniet quis enim.\n\nAut veniam non aliquam laboriosam ea non accusamus. Dolorem et commodi minima eos.', 'http://klein.org/', '', NULL, NULL, NULL, '2025-05-01 02:19:41', 0),
(3131, 'provident-provident-quia-placeat-facilis-velit-magni-et-3143', 'Provident provident quia placeat facilis velit magni et.', 'Dolor id quia beatae voluptas corporis est sit. Aut tempora fugit nemo et consequatur tenetur voluptatem. Neque enim hic quasi modi. Dignissimos a minus autem.', 'Ducimus ab consequatur sint quidem accusantium exercitationem qui. Culpa id mollitia sequi molestiae pariatur. Fugit quia et iure. Laudantium et soluta vel omnis. Sint quis ut quibusdam accusamus et quo autem.\n\nConsequatur in cupiditate excepturi molestiae deserunt. Laboriosam rerum ipsam nihil pariatur voluptatem. Aut et sequi impedit.\n\nNumquam provident quaerat quaerat officia. Nihil at nam eum quis aut neque qui. Nisi perspiciatis neque reprehenderit mollitia culpa sed et.\n\nDolore et ipsam voluptatem voluptatem rerum aut qui excepturi. Aut eum sit itaque sit omnis. Quis pariatur qui dolores molestias.\n\nSed qui aperiam quod. Maxime consectetur aut ipsam debitis corporis id non culpa. Praesentium eos dolorem quae harum quae sint. Deserunt non magnam occaecati aliquam unde accusantium sunt.', 'http://pinto.com/dolore-beatae-illo-fuga-et-et', 'xpi', NULL, NULL, NULL, '2024-11-23 04:01:30', 0),
(3132, 'alias-repellat-sunt-necessitatibus-voluptatem-in-deserunt-3144', 'Alias repellat sunt necessitatibus voluptatem in deserunt.', 'Eum voluptas velit consequuntur sunt. Minima cupiditate dolore aut quod ut quam. Rem sit quo aut veritatis quos quidem labore.', 'Similique ex voluptatum id iure distinctio rerum. Ea totam ratione sit ipsa facilis. Voluptatem voluptatum nisi exercitationem repudiandae nobis et earum corrupti.\n\nEsse eius rerum voluptatem. Omnis eum aut dolor aut voluptas esse. Non autem maiores sit voluptatem mollitia.\n\nEius unde minima similique aut tempora. Laboriosam molestias ut pariatur ut omnis est. Ad atque ipsum fugiat nemo molestiae eos. Dolorum esse consectetur illum eos et ex maiores officia.\n\nNisi molestias est qui facere fugit quo iusto. Voluptatem eligendi similique iusto. Nam iusto labore quo quaerat qui dolorem.\n\nQuia aliquid vitae amet numquam et numquam officiis. Dignissimos iusto rerum et vel. Ut inventore sed fugit harum asperiores atque. Alias eligendi architecto sed et nobis aliquam excepturi. Quo ea ea repudiandae ut sint similique.', 'https://berthelot.net/iste-tempore-voluptatem-et-alias-repellat-perferendis.html', '', NULL, NULL, NULL, '2024-11-27 14:18:48', 0),
(3133, 'iste-ad-ratione-harum-fugiat-necessitatibus-nam-3145', 'Iste ad ratione harum fugiat necessitatibus nam.', 'Facere atque perferendis temporibus quis placeat vel. Blanditiis ratione modi error qui minima. Qui expedita deleniti dolores laboriosam.', 'Vitae iure voluptates inventore natus. Totam temporibus velit vel adipisci magni veritatis. Facilis animi nihil quis modi consequatur quia.\n\nEt dolor nemo molestiae deserunt rerum consequatur excepturi. Voluptates laboriosam ab omnis omnis illum. Dignissimos necessitatibus excepturi et ut qui dolor aliquam.\n\nOdio aliquid sint qui ex omnis sunt praesentium. Itaque odit suscipit voluptatem sint est. Dolore ut tempora voluptas rerum ipsa. Fugit ut nihil sed neque tenetur omnis.\n\nAccusamus reiciendis reprehenderit est distinctio et doloremque. Rerum porro vitae dolores non dignissimos. Et aliquid occaecati iste vero optio deleniti. Ut voluptatem odit officiis maxime rem voluptatem et libero.\n\nCum eos modi voluptatem omnis. Debitis accusantium sunt repellendus perspiciatis qui illo. Totam animi reiciendis aperiam hic at velit.', 'http://giraud.net/porro-adipisci-hic-quia-soluta-voluptas-minima-voluptatem.html', 'ivp', NULL, NULL, NULL, '2025-07-19 14:42:29', 0),
(3134, 'maiores-repellat-doloribus-fugit-3146', 'Maiores repellat doloribus fugit.', 'Neque error ad voluptatem cupiditate ducimus consequatur saepe ullam. Corrupti consequatur voluptas ipsum aperiam quos. Autem cum vero et. Minus molestiae accusamus velit.', 'Et in nisi eligendi quia sint blanditiis. Veritatis eius qui vel voluptatum. Nihil beatae eos est.\n\nIn est rem numquam perferendis corrupti est impedit voluptatem. Qui facere voluptates quae eius. Sed esse eius ratione aut aut provident soluta quibusdam.\n\nOfficia aut iste mollitia animi. Saepe distinctio voluptates eveniet expedita eos quae consequatur. Deleniti id non aut harum voluptatibus. Cumque odio corrupti pariatur porro.\n\nIn facere et est qui quia. Deleniti nobis quasi culpa voluptate recusandae dolore.\n\nNumquam deleniti nam quia et sint. Deserunt tenetur eos consequatur recusandae consectetur odio. Eos autem rerum adipisci ut explicabo.', 'http://simon.com/quis-quam-unde-modi-culpa-quas-nihil-est-blanditiis.html', '', NULL, NULL, NULL, '2025-06-30 05:16:10', 0),
(3135, 'deleniti-iure-fugiat-dolor-dolor-eveniet-sed-3139', 'Deleniti iure fugiat dolor dolor eveniet sed.', 'Velit voluptatum sunt et sit ad ad possimus quia. Est laboriosam quis consequatur ipsa. Facere quis non quidem impedit occaecati. Laboriosam repudiandae nulla voluptatem voluptatem rem aut eius.', 'Quae quia excepturi earum nemo inventore maxime. Eius nihil explicabo enim perspiciatis. Doloremque aut et odit ut non sint quia. Molestias nostrum ipsa exercitationem minima.\n\nSapiente exercitationem quia deserunt amet. Officiis et inventore rerum exercitationem. Aut eligendi tempore et fuga officia magni nihil eius. Est distinctio exercitationem molestiae nobis ad vel.\n\nLaboriosam ut omnis ipsum quaerat harum illum rerum autem. Doloremque praesentium fuga voluptatibus nulla sed quibusdam aliquam. Amet amet cum culpa culpa reiciendis laborum non.\n\nAut recusandae nam laborum dolorem in modi. Mollitia totam eaque qui error minus labore.\n\nFacere et eaque aperiam ducimus magnam. Voluptatem ex inventore debitis possimus necessitatibus est est exercitationem. Doloremque maxime rem perferendis.', 'http://goncalves.com/totam-natus-in-optio-consequatur-animi-et-perferendis', '', NULL, NULL, NULL, '2025-03-06 19:18:17', 0),
(3136, 'distinctio-minima-laborum-quaerat-consequatur-non-3140', 'Distinctio minima laborum quaerat consequatur non.', 'Aut iste et qui non. Molestias nihil repellat et sequi commodi eligendi. Est et fugiat optio voluptatem maiores eaque dolor.', 'Quia alias ut sequi ea occaecati illum. Dicta nulla et ratione voluptatum eligendi veritatis quos. Sint necessitatibus quas totam quidem consequatur sit sapiente. Enim debitis voluptatem asperiores laborum veritatis excepturi.\n\nSint facere voluptatem et recusandae voluptatem pariatur. Blanditiis voluptate id explicabo et non dolorem mollitia. Accusamus et repellat nulla.\n\nNecessitatibus asperiores ipsum amet iusto. Sit corporis omnis dolor modi. Aliquam ratione sit doloribus dolor. Quo sint quos beatae voluptas.\n\nOdit et est aut modi. Quia praesentium nobis dicta vero. Dolores cumque numquam nulla. Recusandae totam quae quis impedit molestias perferendis. Libero at ipsam modi nobis ut.\n\nSapiente ea aut natus sed sint autem sit. At vitae voluptas voluptatem eaque consequatur. Velit cum voluptas iusto qui.', 'http://hubert.fr/', '', NULL, NULL, NULL, '2025-07-28 18:21:10', 0),
(3137, 'suscipit-maxime-nam-illo-quod-temporibus-et-harum-3141', 'Suscipit maxime nam illo quod temporibus et harum.', 'Non earum accusamus nemo quaerat dolores. Amet earum ullam exercitationem suscipit cum et maiores. Ducimus veniam est et temporibus. Dolores ut repellat in iure. Odit sunt facere neque.', 'Molestiae sapiente occaecati nisi ea voluptates accusantium. Et facilis exercitationem quia libero. Nisi beatae aspernatur quo quos vel accusamus. Amet tempora et accusantium nemo.\n\nAlias veritatis consequatur optio. Qui alias magnam rem blanditiis sit quibusdam.\n\nIllum dolor placeat veniam rerum iste excepturi inventore. Dolores qui est et nihil provident necessitatibus. Totam earum quae accusamus. Provident aut beatae dolore in voluptates porro. Accusamus itaque autem enim et reprehenderit dolorem.\n\nSuscipit tenetur nostrum et molestiae dolores. At aut praesentium et ipsam tempora. Voluptatum eum modi id in sapiente.\n\nVoluptatem non corporis aut consequatur cumque sed est. Accusantium ipsam quod harum. Reiciendis cum soluta sit voluptatibus sed.', 'http://www.dacosta.com/', 'wmls', NULL, NULL, NULL, '2025-10-04 15:18:57', 0),
(3138, 'mollitia-ea-aut-iure-velit-sapiente-voluptatem-qui-3142', 'Mollitia ea aut iure velit sapiente voluptatem qui.', 'Et consequatur ea nihil est illum eos. Debitis libero magnam et excepturi. Ipsa tempore non et iure.', 'Et veritatis et exercitationem et officia vitae perspiciatis. Ut placeat qui aut animi perspiciatis deleniti. Consequatur necessitatibus in tenetur sint. Repellendus facilis velit ut natus.\n\nRepellendus accusantium aut tempora aut non. Vitae quis omnis laboriosam nihil vero. Libero amet a et. Corrupti facilis in illo rerum eum sed minus voluptatem.\n\nConsectetur minus accusantium consequuntur sit amet corrupti. Iure sed et ducimus deleniti asperiores sit in. Possimus nobis voluptatem officia. Et error sint exercitationem ea tenetur.\n\nAlias dignissimos culpa numquam vitae voluptatem ipsa blanditiis. Molestias rerum rerum facilis omnis. Et consequatur numquam a rem. Officiis nemo ratione et ipsam quam dolor alias. Fugiat quo sapiente voluptatibus fugiat deserunt officiis.\n\nVoluptate sed non quam amet nihil enim odit. Exercitationem odit quod cupiditate veniam. Quia dolore quos veritatis doloremque. Earum quo non iste commodi et et ut.', 'https://martinez.net/neque-ipsum-nisi-eius-quaerat-ut-amet-et-deserunt.html', 'stw', NULL, NULL, NULL, '2025-04-06 07:42:47', 0),
(3139, 'eum-ab-perspiciatis-voluptate-mollitia-maiores-culpa-ipsum-3143', 'Eum ab perspiciatis voluptate mollitia maiores culpa ipsum.', 'Veritatis dolor molestiae accusamus saepe et sit dolore. Voluptates nam aliquid qui alias. Sint qui nisi ullam doloremque tenetur quos. Illo voluptatem magni suscipit architecto autem quaerat et.', 'Nisi eum nisi nobis rem molestiae eligendi. Itaque sed non et est deserunt. Asperiores et et qui praesentium. Saepe incidunt possimus et inventore. Nostrum aut aut dolore magnam aut.\n\nRepellat recusandae dolores placeat temporibus sunt. Et adipisci possimus velit corrupti harum repellendus ratione. Dolor sed molestiae velit magni eos et et.\n\nSed dolor distinctio rerum incidunt provident sint cumque. Excepturi ex natus et necessitatibus aut numquam voluptas praesentium. Tenetur fuga a est voluptatibus ad id deserunt eveniet. Et porro quam excepturi facilis dolorem enim voluptas.\n\nNeque quo quod aut amet et. Voluptas est ut omnis expedita quidem repellendus. Eius qui quia suscipit neque et. Dolorem aspernatur placeat numquam amet itaque dicta voluptate suscipit.\n\nIpsa nisi nostrum optio magnam. Adipisci minima eos dicta minima consequuntur saepe eos laudantium.', 'http://www.dacosta.org/', '', NULL, NULL, NULL, '2025-08-27 14:45:21', 0),
(3140, 'mollitia-quidem-quo-veniam-quod-ab-3144', 'Mollitia quidem quo veniam quod ab.', 'Optio quaerat odio voluptatem dolore aliquam vel mollitia. Quia ut eum ut fugiat et magni natus earum. Dolore autem commodi reprehenderit exercitationem.', 'Magnam omnis ipsum omnis. Qui et rem labore odit. Cupiditate quia tenetur expedita corrupti nam.\n\nDoloremque fuga iure optio inventore sequi itaque autem quia. Tenetur eaque ipsa et soluta soluta velit eligendi. Ipsa quia enim doloremque adipisci deleniti corporis. Consequatur et blanditiis quibusdam voluptatem dolorum reprehenderit. Dolor dolor sit voluptatem est praesentium.\n\nAspernatur ut ut pariatur molestias. Officia quo excepturi ullam rem. Libero ea recusandae minima occaecati corrupti saepe non fugit.\n\nUt omnis quas dolorum iusto sit iure. Nihil vitae quam qui vel ut sequi. Rem debitis et itaque distinctio quos est.\n\nOmnis doloribus et omnis minima vitae accusamus. Reprehenderit corporis doloremque pariatur praesentium cumque pariatur. Quia labore eaque temporibus consequatur. Fugiat eos et et.', 'http://www.guillon.com/', '', NULL, NULL, NULL, '2024-11-22 00:21:26', 0),
(3141, 'est-impedit-debitis-temporibus-error-excepturi-voluptas-neque-voluptatem-3145', 'Est impedit debitis temporibus error excepturi voluptas neque voluptatem.', 'Quia eum vel non voluptatum dolor et eaque. Sequi tempora aperiam fuga temporibus suscipit ut et dolorum. Et temporibus sit modi sed expedita maiores nulla.', 'Non quia dolorum quia est at et inventore. Omnis ut culpa quos atque praesentium. Tempore voluptatem sapiente a excepturi doloremque dolor expedita. Voluptatem voluptates est ea.\n\nNulla repellendus quis voluptas et. Pariatur inventore cumque et. Harum dolorum sunt tempore quasi sapiente dolorem.\n\nFacilis tenetur fugit rerum in pariatur in voluptatem ipsam. Alias odit debitis nesciunt aut exercitationem sit.\n\nTemporibus aut doloremque aut voluptatibus in aut non. Nisi odit consequatur voluptatem non. Reiciendis explicabo quae eligendi fuga qui aut et. Non quibusdam velit odit sit dolorum.\n\nEt odit quidem possimus architecto sunt fuga praesentium sint. Pariatur fugit eaque nesciunt dolores qui numquam. Est sit cum reprehenderit non sit. Illo inventore praesentium qui aliquam est voluptas ut eius.', 'http://www.roux.org/quo-laboriosam-qui-ut-qui-qui-quae', '', NULL, NULL, NULL, '2025-03-03 01:17:10', 0),
(3142, 'enim-consectetur-dicta-nisi-aliquam-sequi-3146', 'Enim consectetur dicta nisi aliquam sequi.', 'Qui voluptates voluptas neque nesciunt mollitia itaque vero. Ex nostrum ad voluptas cumque assumenda nam tempore. Vel eligendi non eaque vel consectetur ea ut.', 'Cumque nostrum porro perspiciatis aperiam. Eos qui in quis soluta. Quos ex saepe molestiae nostrum dolore. Nesciunt fugit eaque voluptatem autem velit necessitatibus at.\n\nVitae suscipit rerum ut sed. Quis consectetur tenetur sit impedit ducimus corrupti. Ducimus qui unde commodi aut.\n\nIllo accusantium blanditiis nemo minima qui. Deleniti eos optio cupiditate quidem consequatur labore. Et saepe esse laborum soluta et. Iusto vel quis officiis et.\n\nA alias voluptatum dolores et. Magni nostrum libero explicabo aut. Harum quis minus animi ut.\n\nSunt cumque laudantium quisquam. Sequi quaerat vel ea eveniet deserunt accusantium quos. Quibusdam vel nemo dolore. Neque nesciunt enim ex reprehenderit illum. Sed quisquam aut sequi sint vel.', 'https://www.lemonnier.com/saepe-qui-eveniet-quidem-fugit-cumque-quia-voluptates', 'wvx', NULL, NULL, NULL, '2025-06-12 13:55:05', 0),
(3143, 'voluptatum-voluptas-et-quis-dolore-3147', 'Voluptatum voluptas et quis dolore.', 'Ut et sit itaque porro asperiores. Consequatur voluptatem provident harum velit. Consequatur molestiae sit nobis occaecati.', 'Facere et ut ea odit eligendi. Tenetur quod quibusdam quo laudantium.\n\nAb nesciunt quas fugit non. Deleniti minima nisi sapiente in. Voluptate et asperiores a dolores eos in placeat. Ab id et laboriosam et quia.\n\nIusto aut quod odit sunt aut veritatis nisi. Provident vel temporibus in est provident quis amet. Exercitationem minus autem odit qui in quis eum. Dolores aperiam aut sit occaecati porro iste.\n\nVel aut illum omnis dolore eius. Itaque quisquam est ut. Sint iure vel perferendis quo qui quis. Velit unde ad laudantium.\n\nAut cupiditate distinctio et veritatis et. Ut aut odio a. Rerum necessitatibus explicabo rem iusto.', 'http://baron.fr/quibusdam-excepturi-eum-qui-impedit-vero-quia', '', NULL, NULL, NULL, '2025-10-03 12:24:37', 0),
(3144, 'dolorem-occaecati-cumque-praesentium-fugiat-explicabo-est-at-3148', 'Dolorem occaecati cumque praesentium fugiat explicabo est at.', 'Est architecto dolores voluptates provident aut autem. Vel consequuntur et voluptatem eius dolores illum. Reiciendis quod quia praesentium natus at officiis.', 'Vitae sapiente voluptas culpa voluptatem et ullam. Sit veniam qui asperiores nemo nihil. Voluptas repellat itaque nesciunt voluptatem dolorem quo.\n\nAliquam quam error dignissimos. Ducimus qui ducimus in id repudiandae qui. Deserunt odit voluptatem consectetur dolores modi ut.\n\nDelectus temporibus itaque est voluptatibus quidem. Quo aut reiciendis nesciunt sed rerum et quisquam. Molestiae ex similique voluptatum voluptatem ea sunt. Suscipit blanditiis voluptas ut mollitia odit beatae.\n\nAspernatur aut sit et nam suscipit itaque omnis. Sed pariatur sed veniam autem. Dolorum non tempore assumenda quo officiis et magni repellendus.\n\nDolorum totam consequatur et molestiae debitis quos sed omnis. Nihil veniam at sint reprehenderit aut. Veritatis dolor iure expedita velit animi.', 'http://www.meunier.com/', 'itp', NULL, NULL, NULL, '2025-07-18 17:31:55', 0),
(3145, 'dolores-quia-qui-officia-quia-aperiam-nesciunt-3149', 'Dolores quia qui officia quia aperiam nesciunt.', 'Illo est et aut placeat. Animi commodi illo atque sint ut commodi repellat architecto. Voluptatem molestiae deserunt quisquam aliquid quia ut.', 'Optio unde corporis quis ullam temporibus earum nihil. Optio tenetur qui quisquam quaerat facere. Voluptas consequatur consequatur officiis velit fugit eius laborum nulla. Ut voluptatem corporis unde minus hic nam.\n\nTenetur error consequuntur accusantium omnis voluptatem vel ipsa. Aliquid pariatur laudantium est. Animi eum quos consequuntur eum.\n\nAperiam laborum praesentium sed. Commodi labore adipisci et reprehenderit. Voluptates rem dolorem nemo minima reprehenderit aut. Aut vel id omnis alias occaecati officiis. Natus voluptas dolorem eligendi quo molestias saepe.\n\nEnim ullam veniam repudiandae temporibus nobis laboriosam provident qui. Sapiente et voluptatem ea soluta. Voluptatem dolorem tempora sit possimus sapiente. Impedit omnis repudiandae minima velit maiores fugit voluptatem.\n\nEt sed eveniet tenetur eum minus enim. Praesentium eveniet ea dolorem enim dolorem eos molestias. Perspiciatis animi aspernatur dolor qui occaecati. Eum et adipisci libero earum sed est.', 'http://www.paris.com/possimus-nulla-sint-numquam-autem-et-officiis.html', 'dsc', NULL, NULL, NULL, '2025-07-21 10:43:43', 0),
(3146, 'aliquid-accusantium-asperiores-ea-architecto-eum-rerum-autem-3150', 'Aliquid accusantium asperiores ea architecto eum rerum autem.', 'Et dicta magni sapiente quam. Voluptates recusandae perspiciatis fuga dolorum qui delectus repellat. Molestiae beatae dicta exercitationem.', 'Officiis eveniet sunt minus autem est id. Sed ex et qui voluptatibus animi hic quisquam. Est earum qui dolores modi quis assumenda et incidunt. Et id aut quod aperiam voluptatem sit.\n\nFuga exercitationem sed ab velit. Ad nam dignissimos aut quisquam eos voluptas tempore. Quia optio pariatur rerum fuga numquam fugit magni ea.\n\nAliquid a delectus omnis iure. Officiis ut natus nisi facere vitae. Et facere repellendus temporibus qui ut quis. Expedita perferendis sit possimus libero voluptatem. At ad alias velit ut commodi.\n\nSequi alias rerum consectetur labore. Quam pariatur incidunt molestiae et ut id. Nesciunt quia deleniti occaecati aut quisquam libero.\n\nQui cum aut dolorem recusandae et nostrum maiores non. Doloribus necessitatibus id ea voluptatibus deleniti corporis.', 'http://giraud.org/rerum-excepturi-perspiciatis-nesciunt-totam', '', NULL, NULL, NULL, '2024-12-25 01:56:03', 0),
(3147, 'excepturi-sint-tenetur-aut-ex-sed-minima-3151', 'Excepturi sint tenetur aut ex sed minima.', 'Officia totam et incidunt cum. Et dolorem accusamus corrupti alias debitis dolores perspiciatis. Laboriosam ad quam molestiae alias deserunt. Rem culpa voluptatibus aspernatur similique minus aspernatur ipsa.', 'Cum nisi eveniet doloribus odit eos beatae voluptas illum. Sed iste dolorem nemo ut. Dolorem deserunt fugiat sunt mollitia consequatur. Enim ut amet voluptate dolor.\n\nSunt impedit dolore repellendus unde omnis dignissimos quas. Esse reprehenderit animi voluptas suscipit quia. Eum dolor tempore alias labore est ipsa ut reiciendis. Vitae tempore ut consequatur sit rem qui et. Est laboriosam consequatur laboriosam earum in voluptas.\n\nFuga quod quis ut natus quia. Magni eaque qui ducimus.\n\nAliquam saepe repellendus quia ducimus explicabo iusto saepe. Architecto dolorum vel saepe nemo ratione veritatis sit. Rerum eaque quidem omnis et natus corrupti est. Dignissimos maiores ullam nesciunt.\n\nAssumenda et consequatur ipsum et cupiditate. Repellat ipsa sed et quia a dolores. Rem sed quos dicta harum alias.', 'http://www.vaillant.fr/non-doloremque-et-nihil-provident-non-inventore-sunt.html', '', NULL, NULL, NULL, '2024-12-17 02:30:19', 0),
(3148, 'quia-voluptatum-expedita-quod-ut-3152', 'Quia voluptatum expedita quod ut.', 'Voluptate iure et provident et corporis et ex. Quo aut dolorem enim est quam maxime.', 'Fuga exercitationem eum excepturi assumenda beatae voluptatem. Minus facere nisi omnis consequatur omnis nulla ut. Molestiae deserunt ullam tenetur repudiandae nemo.\n\nQuo deserunt eligendi ab illum voluptatem. Rerum suscipit unde ratione voluptatum.\n\nVoluptates sapiente eos nisi laudantium qui sit. Odit nostrum praesentium non est et aperiam. Non sit illum numquam ab labore iusto ex nesciunt. Quo non expedita ratione eveniet doloremque.\n\nSit accusamus magnam dicta quia culpa. Ipsam dolorem quod pariatur consequatur minima. Et officia itaque sequi cumque amet nihil magnam alias.\n\nQuia occaecati quos esse velit. Praesentium voluptatem fuga ut quia debitis soluta dolor quis. Ullam a dolorem vel voluptas.', 'http://ferrand.org/ab-aliquam-et-rerum-sint-qui.html', '', NULL, NULL, NULL, '2024-11-16 03:44:21', 0),
(3149, 'eveniet-non-est-dolorem-numquam-nihil-doloremque-3153', 'Eveniet non est dolorem numquam nihil doloremque.', 'Vitae vitae veniam architecto eos praesentium earum. Explicabo quae quia ipsum.', 'Nisi ad rerum placeat quis. Quia reiciendis voluptas nisi et quia. Nihil at ipsa repudiandae minima ut. Voluptatem est aperiam quis quaerat nihil. Eaque ducimus iusto iure quia.\n\nLaborum dolore facere aspernatur. Et consectetur voluptatibus nobis nihil sit ea. Et sunt voluptate illo magnam. Quia unde laborum veniam nesciunt nobis.\n\nDeleniti incidunt praesentium quo quas ea. Dolorum similique aut autem totam porro quod. Nam corporis dolor fugit suscipit ipsa alias. Incidunt aspernatur eveniet culpa consequuntur ut fugit.\n\nOdit et nostrum qui rerum et nobis est asperiores. Accusamus explicabo ut praesentium. Autem dolorem veritatis maiores quod quaerat autem. Qui aut vitae similique eos enim quo quis consequuntur.\n\nVoluptatem nam aperiam unde cum voluptatem dignissimos. Similique aut sit suscipit esse. Sit maiores aut amet ea omnis asperiores tempora.', 'http://traore.org/sed-est-quas-tenetur-ut-laudantium', 'rdf', NULL, NULL, NULL, '2024-12-25 00:30:37', 0),
(3150, 'in-animi-commodi-est-consequuntur-maiores-3146', 'In animi commodi est consequuntur maiores.', 'Exercitationem est tenetur voluptate nostrum repellendus. Labore dolores fugit aut magni et natus. Est adipisci id distinctio fugiat sed.', 'Soluta assumenda aliquam qui expedita. Enim perferendis itaque et non. Numquam non eos repellat cupiditate non numquam et. Quisquam eos voluptatem ut alias sunt optio non non.\n\nEst beatae esse sunt optio laborum laborum ratione. Et ut doloremque quod labore.\n\nIpsa eligendi quisquam at sint assumenda illum voluptate. Quo delectus aperiam inventore sunt quia accusamus sunt et. Voluptatem laudantium ut possimus.\n\nVitae accusamus ad ut. Ullam placeat aut rerum harum. Delectus qui minima repudiandae cum. Quidem nostrum ea ut voluptatibus et vel libero.\n\nSunt cumque aut nostrum hic et tempore. Aut voluptatibus at beatae maiores enim enim porro vel. Voluptatem fugit reiciendis aut dignissimos ut ea.', 'http://leclerc.fr/aut-sunt-rem-deleniti-et-mollitia', '', NULL, NULL, NULL, '2025-06-09 21:48:11', 0),
(3151, 'cumque-deleniti-accusamus-atque-sed-porro-dolor-3147', 'Cumque deleniti accusamus atque sed porro dolor.', 'Qui voluptatem itaque pariatur quasi. Beatae dolorem voluptas quos occaecati amet accusantium ea voluptas. Tenetur qui natus non non ut quod. Et tempore neque dicta nihil in.', 'Deleniti omnis sed aut ut aliquam iusto sit. Facere ab commodi omnis laboriosam. Fugit deleniti corrupti quia.\n\nVoluptas atque corrupti optio ea eos aut. Qui libero sit reprehenderit explicabo. Quibusdam in voluptatibus ut officia deleniti debitis aut. Autem omnis occaecati corrupti distinctio.\n\nDolorem veniam possimus natus eos omnis at praesentium est. Porro sit tempore quos explicabo blanditiis voluptatum iste et. Magnam voluptate et expedita culpa maxime voluptatem commodi. Nihil consequuntur aspernatur deleniti itaque.\n\nEarum molestiae ut accusantium asperiores fuga velit harum dolore. Dolorem nulla sunt ipsam facere cum dolorum et est. Autem perferendis et officia vel nobis neque. Sed fuga est provident dolorem vel nihil dignissimos et.\n\nUt quo nobis eos ipsum. Sed necessitatibus voluptatem quia ut iste. Praesentium accusantium quis quidem et quasi.', 'http://www.moulin.com/et-hic-magni-voluptas-esse-et-expedita', 'sxi', NULL, NULL, NULL, '2025-09-30 07:08:26', 0),
(3152, 'nihil-in-quis-et-amet-3148', 'Nihil in quis et amet.', 'Facilis incidunt et voluptas distinctio quis suscipit. Beatae quia quae sapiente saepe et. Doloribus dignissimos rerum assumenda nobis est maiores et.', 'Magnam tempora quaerat adipisci tempore amet laboriosam. Quaerat ut maxime voluptatem. Aliquam quia corporis minima quisquam quas.\n\nEst nesciunt non nulla veniam ad culpa ut. Qui voluptatem fugiat velit. Ullam vel aut et quia dolore expedita.\n\nVoluptatibus voluptas molestiae molestiae unde et. Eaque illum dolores et dolore. Vel dolor nostrum rerum ullam molestiae a ullam.\n\nAdipisci quia soluta optio consequatur officia minima molestiae rem. Quod quia sint voluptatibus fugiat ratione eaque. Veniam minus deserunt sunt est molestiae officiis velit ut.\n\nQuod perferendis dicta error nihil. Cupiditate reiciendis fuga et eveniet ut exercitationem. Dolores id molestiae illum rerum. Quam numquam eligendi ad sunt non laboriosam.', 'http://www.didier.com/iure-dolor-cum-nobis-dolorem-et-velit-est', '', NULL, NULL, NULL, '2025-07-20 01:47:23', 0),
(3153, 'distinctio-est-harum-blanditiis-aut-suscipit-rerum-nostrum-3149', 'Distinctio est harum blanditiis aut suscipit rerum nostrum.', 'Inventore dolorem odit dolores vel sed. Repellendus et at mollitia eos aut. Enim quia veritatis quia quia.', 'A eos in hic amet molestiae iste. Et eius rerum accusantium et aut. Earum ipsum et ut beatae eligendi cumque. Animi et qui repellendus accusantium tempore accusantium doloribus quibusdam.\n\nVelit ipsam perspiciatis et sint. Ut at culpa molestiae praesentium fuga voluptatem. Nihil et voluptatem ut vitae dolorem iste. Distinctio omnis expedita veniam quo placeat quam.\n\nNon doloremque ut aliquam enim aliquid ut. Odit eos eligendi libero quos. Veniam ad totam laudantium voluptatum aut autem sapiente quae. Temporibus aut voluptatem aut sed.\n\nEt qui eveniet nobis voluptatem neque. Nobis aperiam autem alias. Itaque ut ullam occaecati. Placeat aut itaque incidunt placeat et quia sit.\n\nNam facilis perspiciatis aut illum eligendi. Nemo officia consequatur aliquam et. Nisi nesciunt vel laborum doloremque.', 'http://www.guillou.com/vel-asperiores-ipsam-aut-itaque', '', NULL, NULL, NULL, '2025-03-29 13:42:20', 0);
INSERT INTO `lecon` (`id_lecon`, `slug`, `titre`, `description`, `contenu`, `ficher_principale`, `fichier_support`, `id_matiere`, `id_prof`, `id_niveau`, `created_at`, `published`) VALUES
(3154, 'voluptas-voluptatibus-libero-iusto-cumque-ut-3150', 'Voluptas voluptatibus libero iusto cumque ut.', 'Quidem facere aspernatur sed quod. Dolorum facilis porro aperiam officiis dolore dignissimos ducimus. Ad labore vero in reprehenderit molestiae. Aut quia beatae blanditiis nobis.', 'Rem soluta molestiae esse veritatis. Repellat consectetur veniam beatae provident hic. Rerum et voluptas sunt odio quia voluptas velit sequi.\n\nFacere doloremque nostrum facere repellat dolor atque. Est qui non dolore voluptatibus ab. Ducimus odit omnis sit necessitatibus suscipit ad. Quia occaecati sint laboriosam quisquam. Dolorem fugiat sit quasi enim vitae aut.\n\nUt et officia qui enim maiores adipisci rerum. Cumque perspiciatis sed in quo iure doloribus. Consectetur nisi quo est consequuntur ut quis voluptatem.\n\nEt aliquam eveniet aut error ullam odit repellendus rerum. Debitis sit voluptatem dolorem ut. Impedit et fugit sunt voluptatem voluptas.\n\nQuis alias doloremque reprehenderit. Fugit qui corporis saepe. Aperiam possimus ut eius qui id.', 'http://www.gauthier.fr/temporibus-sunt-animi-placeat-voluptatem-deserunt-molestiae-corrupti-odio', '', NULL, NULL, NULL, '2025-03-26 06:46:53', 0),
(3155, 'ipsam-ipsum-debitis-molestias-qui-veritatis-sunt-sint-voluptates-3151', 'Ipsam ipsum debitis molestias qui veritatis sunt sint voluptates.', 'Quia cum aut optio doloribus vitae. Ea aliquid laudantium voluptatem corrupti. Et aut delectus ratione et ullam voluptas maxime.', 'Porro reiciendis expedita voluptas enim consequuntur praesentium expedita odit. Autem tempore eveniet eum officiis dicta odio. Cum maxime modi optio sit dolor pariatur fuga. Aut eos ad dolore explicabo qui dicta.\n\nEt ea et amet repellendus assumenda officia totam. Fugit est at amet ad.\n\nMagni nisi nemo omnis eum facere dolores. Magnam laborum quam porro. Debitis expedita iste est sunt. Dolorem et in consectetur quisquam quod at.\n\nDeserunt et incidunt impedit dolorem. Aspernatur in ducimus est quo ea est est. Illum consequatur omnis voluptate aut. Inventore qui vel et qui ipsa.\n\nMolestias ut aperiam earum saepe delectus animi error quis. Consequatur tenetur aut consequatur eligendi et excepturi sed.', 'http://clement.com/', '', NULL, NULL, NULL, '2025-07-24 04:08:55', 0),
(3156, 'excepturi-dicta-dolorem-excepturi-ipsa-3152', 'Excepturi dicta dolorem excepturi ipsa.', 'Repellat consequatur magni ratione magni officiis rem et porro. Eum accusamus illum nihil nemo aliquid ea. Et nihil autem pariatur voluptates sit.', 'Sunt fugit sint qui excepturi. Nesciunt qui sequi voluptates officia veniam. Et rerum laudantium debitis quidem alias provident voluptatem.\n\nMaiores explicabo dicta blanditiis omnis facilis qui. Ducimus reiciendis voluptatem dolore dolor laudantium et voluptatem. Voluptatem odio voluptatibus ut rerum.\n\nRerum dolor temporibus autem. Maiores et qui impedit dolore. Voluptas porro illum corrupti consequuntur ratione.\n\nHic qui sapiente molestiae totam maiores aut. Perspiciatis voluptatem commodi sapiente saepe quia. Beatae sint sequi ducimus praesentium. Qui aperiam cumque facilis in omnis enim.\n\nAspernatur quis debitis voluptatum autem quos qui dolor. Ut sit provident voluptas rerum laudantium. Qui quaerat dolore amet repudiandae est nesciunt et ratione. Sed natus magnam consequatur dolor eaque ut.', 'http://alves.fr/fugiat-ipsa-nihil-est-quisquam-qui-harum-eaque-amet.html', 'xenc', NULL, NULL, NULL, '2025-02-18 17:22:39', 0),
(3157, 'odio-est-optio-sequi-ipsa-harum-ad-corporis-architecto-3153', 'Odio est optio sequi ipsa harum ad corporis architecto.', 'Aspernatur commodi quia deleniti ipsum rerum. A dolores maxime perspiciatis perspiciatis consectetur porro. Molestiae dicta quidem officiis nostrum saepe.', 'Sapiente placeat dolor odio inventore. Quia reprehenderit necessitatibus ducimus. Sint temporibus est ea.\n\nPerferendis quas rem sequi excepturi deserunt autem possimus. Doloribus accusantium tempora quasi sed reprehenderit. Possimus nobis id officia voluptatem dolores laboriosam possimus.\n\nUt quae nemo et et nihil deleniti tempore. Vel minus magni explicabo ea repellendus et. Et aliquid reiciendis voluptas quae quam iure. Et eveniet est accusantium autem.\n\nVitae dolor repudiandae reprehenderit facere fuga earum. Nulla itaque hic magnam dolores. Ipsa est quae et autem esse.\n\nAut eum aut vero quia. Commodi similique placeat porro quod dolores. Et harum dignissimos animi quos quos.', 'http://www.imbert.fr/consequatur-molestias-quia-rem-corporis-aperiam-libero', '', NULL, NULL, NULL, '2025-01-04 11:44:42', 0),
(3158, 'suscipit-minus-quia-dolor-ea-3154', 'Suscipit minus quia dolor ea.', 'Nihil temporibus iste aliquam doloremque facere. Est nobis quidem veniam qui. Quod dolorem enim molestiae sed omnis dolores.', 'Impedit quis autem odit velit. Adipisci id mollitia adipisci ducimus. Dicta dolores atque dolorem at sint et. Ea qui laboriosam reprehenderit doloremque non.\n\nRerum voluptas eveniet a ipsum. Explicabo deserunt soluta unde sunt rerum ut voluptas corporis. Voluptatem laborum repellendus dolorem reiciendis impedit.\n\nMolestias suscipit molestiae quas ducimus. Et rerum quae laudantium quod quas occaecati et. Minus laudantium exercitationem neque non sit ab similique.\n\nNesciunt ratione quia et sint quia sunt quo. Rerum vero beatae sed facilis cum enim accusantium. Dolores neque mollitia sed minus vel est neque reprehenderit.\n\nDucimus expedita nobis sit officia. Velit inventore rerum animi iure ut adipisci et. Possimus enim vitae quidem aut.', 'http://allain.fr/vel-inventore-ratione-qui-facilis-unde-et.html', '', NULL, NULL, NULL, '2025-04-24 01:51:52', 0),
(3159, 'et-consequatur-cum-dolore-3155', 'Et consequatur cum dolore.', 'Voluptatibus quibusdam aspernatur unde quis eaque error. Voluptatum est pariatur et recusandae autem laboriosam quo. Ducimus eius sit ipsa laudantium ipsa error. Ratione fugit voluptatibus itaque sunt alias impedit.', 'Eius maiores omnis sit sit. Vitae voluptas sint totam non magnam. Ea ipsum repudiandae corporis rerum dolorum officia perspiciatis. Nesciunt corrupti corrupti molestiae non ut facere dolores aut.\n\nRepudiandae et qui occaecati quis incidunt natus nam. Voluptates odio est vel consequatur aliquam qui. Similique corporis vel neque ducimus exercitationem quos. Cupiditate ab officiis minus quia aliquam doloremque.\n\nVoluptas natus itaque ipsam repellat neque qui asperiores quibusdam. Explicabo dolore vel dolores nesciunt id ratione consequatur. Officia enim voluptas aut eum. Ut voluptas dicta reiciendis reiciendis.\n\nDicta sunt id sed doloremque dignissimos non. Et cupiditate voluptas est id voluptatum. Perspiciatis dolor ipsum enim et modi suscipit qui. Porro et voluptate explicabo rem est minima. Assumenda nisi ad rerum non.\n\nNesciunt non sed ut possimus. Aut vel eveniet dolores accusamus. Sed illum eius minima magnam dolorum ut quaerat. Non eligendi omnis ex.', 'https://reynaud.net/provident-perferendis-repellendus-et-dolores-velit-optio-et.html', 'wgt', NULL, NULL, NULL, '2025-08-27 02:01:30', 0),
(3160, 'quia-et-cumque-soluta-3156', 'Quia et cumque soluta.', 'Voluptas hic dolores eveniet in adipisci vero quaerat sapiente. Et facere natus nesciunt enim rem dolor beatae. Vel sed eum dolore unde maxime quo.', 'Quia distinctio ipsam qui et ea dolor. Iste sit illum odit. Odio non labore repudiandae excepturi qui et laboriosam maxime.\n\nDolor sed velit voluptatem corporis porro reprehenderit. At magnam aut commodi mollitia voluptas. Voluptas accusamus tempore illum. Sed aut repellendus tempore quia similique voluptate.\n\nVelit architecto sint illum eum velit repellat. Ducimus rerum quos inventore illum id rerum fuga. Et eum nihil qui unde. Qui sed odit debitis nemo quaerat.\n\nEnim ducimus dolorum recusandae ut ut adipisci. Velit autem doloribus quo sit magni aut. Asperiores nihil corporis quam unde ut qui in. Nobis fugiat qui sint autem totam quia.\n\nEst omnis alias velit. Et et eos earum repellat dolorem illum facere. Reprehenderit quia doloribus et vero nam placeat.', 'http://www.mallet.fr/', 'curl', NULL, NULL, NULL, '2025-07-29 10:36:19', 0),
(3161, 'ut-porro-voluptas-sequi-tenetur-ullam-suscipit-3157', 'Ut porro voluptas sequi tenetur ullam suscipit.', 'Amet sint eos blanditiis aut tempora. Suscipit voluptatem in ducimus et quam eveniet rerum. Exercitationem exercitationem sequi iste similique ut voluptatem. Deleniti reprehenderit et possimus corporis.', 'Enim sint ab autem dolores. Repellat sed corporis inventore autem aperiam. Natus molestias saepe amet fugit ut nostrum temporibus autem.\n\nNostrum quae ducimus omnis. Voluptatem quibusdam sit distinctio at reprehenderit repellendus. Voluptatem magnam quia qui tenetur tempore at.\n\nSit consequatur quasi perspiciatis sunt iusto. Officia nam maiores perferendis illo perspiciatis natus omnis. Culpa et quisquam reprehenderit.\n\nQui enim voluptate et quam assumenda natus neque. Quae omnis delectus quaerat ullam placeat nihil recusandae. Aliquid consequuntur repellat et expedita non omnis.\n\nVoluptas dolorum hic doloribus minima sint eligendi. Aliquid odit sit placeat ea at. Eius omnis ut animi blanditiis sed neque corrupti.', 'http://lemaitre.com/et-ratione-eum-omnis-aliquid-ipsam-eaque-aliquam', '', NULL, NULL, NULL, '2025-10-24 21:01:29', 0),
(3162, 'occaecati-enim-dolores-deleniti-quam-debitis-3158', 'Occaecati enim dolores deleniti quam debitis.', 'Eveniet recusandae et rerum quaerat tempore. Recusandae nesciunt omnis neque sit saepe non rerum. Consequuntur laudantium beatae quae laudantium.', 'Rem doloribus totam aut quod explicabo. Repellendus fugiat maxime cupiditate molestiae tenetur. Eum ea cumque ea numquam laboriosam id voluptatem.\n\nPerferendis nisi nulla similique distinctio fuga. Eos assumenda ut doloremque harum dicta modi. Velit est dolorum occaecati dolorum est. Quas ex velit facere quidem. Vitae unde ad veniam quaerat excepturi.\n\nOccaecati dolores sint commodi optio adipisci id ut. Est asperiores molestias molestiae rem repellat molestias distinctio. Minima et quo saepe molestias assumenda voluptatem. Consequatur rerum quo alias vero. Et similique eligendi neque voluptate aliquid sint.\n\nDignissimos et perferendis debitis eos iusto. Pariatur expedita consectetur cum repellendus. Possimus qui quis occaecati delectus inventore qui.\n\nCorrupti voluptate porro deserunt officia. Cupiditate consectetur et aliquam ea. Tenetur qui quia in quae quas.', 'http://morvan.com/', 'mathml', NULL, NULL, NULL, '2025-04-08 00:57:26', 0);

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
-- Structure de la table `modules`
--

CREATE TABLE `modules` (
  `id_module` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `label` text NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_section` tinyint(1) NOT NULL,
  `is_for_all` tinyint(1) NOT NULL
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
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id_role` int(11) NOT NULL,
  `identification` varchar(200) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_restrict` tinyint(1) NOT NULL,
  `couleur` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id_role_permission` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `id_module` int(11) NOT NULL,
  `id_permission` int(11) NOT NULL,
  `can_read` tinyint(1) NOT NULL,
  `can_create` tinyint(1) NOT NULL,
  `can_update` tinyint(1) NOT NULL,
  `can_delete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_activite_prescolaire`
--

CREATE TABLE `site_activite_prescolaire` (
  `id_activite` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `icone` varchar(100) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_actualite`
--

CREATE TABLE `site_actualite` (
  `id_actualite` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` text NOT NULL,
  `date_publication` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `publie` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_evenement`
--

CREATE TABLE `site_evenement` (
  `id_evenement` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date_evenement` date DEFAULT NULL,
  `lieu` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `publie` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_galerie`
--

CREATE TABLE `site_galerie` (
  `id_image` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `categorie` varchar(100) DEFAULT NULL,
  `id_evenement` int(11) DEFAULT NULL,
  `publie` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_hero_slide`
--

CREATE TABLE `site_hero_slide` (
  `id_slide` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `soustitre` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `cta` varchar(255) DEFAULT NULL,
  `cta_link` varchar(255) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_installation`
--

CREATE TABLE `site_installation` (
  `id_installation` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_message_contact`
--

CREATE TABLE `site_message_contact` (
  `id_message` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `date_message` date DEFAULT NULL,
  `lu` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_notre_histoire`
--

CREATE TABLE `site_notre_histoire` (
  `id_histoire` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `reconnaissance_par` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_pilier_educatif`
--

CREATE TABLE `site_pilier_educatif` (
  `id_pilier` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icone` varchar(100) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_presentation`
--

CREATE TABLE `site_presentation` (
  `id_presentation` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `nombre_eleves` int(11) DEFAULT 0,
  `nombre_professeurs` int(11) DEFAULT 0,
  `annees_experience` int(11) DEFAULT 0,
  `taux_reussite` decimal(5,2) DEFAULT 0.00,
  `actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_programme_pedagogique`
--

CREATE TABLE `site_programme_pedagogique` (
  `id_point` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `ordre` int(11) DEFAULT 0,
  `actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_slogan`
--

CREATE TABLE `site_slogan` (
  `id_slogan` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icone` varchar(100) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `site_valeur`
--

CREATE TABLE `site_valeur` (
  `id_valeur` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icone` varchar(100) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
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

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `id_role` int(11) DEFAULT NULL,
  `identifiant` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `id_parent` int(11) DEFAULT NULL,
  `id_eleve` int(11) DEFAULT NULL,
  `id_personnel` int(11) DEFAULT NULL
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
-- Index pour la table `exercice`
--
ALTER TABLE `exercice`
  ADD PRIMARY KEY (`id_exercice`),
  ADD KEY `fk_lesson_matiere` (`id_matiere`),
  ADD KEY `fk_lesson_niveau` (`id_niveau`),
  ADD KEY `fk_lesson_prof` (`id_prof`);

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
-- Index pour la table `lecon`
--
ALTER TABLE `lecon`
  ADD PRIMARY KEY (`id_lecon`),
  ADD KEY `fk_lesson_matiere` (`id_matiere`),
  ADD KEY `fk_lesson_niveau` (`id_niveau`),
  ADD KEY `fk_lesson_prof` (`id_prof`);

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
-- Index pour la table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id_module`),
  ADD UNIQUE KEY `name` (`nom`);

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
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`),
  ADD UNIQUE KEY `name` (`nom`);

--
-- Index pour la table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id_role_permission`),
  ADD UNIQUE KEY `id_role` (`id_role`,`id_module`,`id_permission`),
  ADD KEY `id_module` (`id_module`),
  ADD KEY `id_permission` (`id_permission`);

--
-- Index pour la table `site_activite_prescolaire`
--
ALTER TABLE `site_activite_prescolaire`
  ADD PRIMARY KEY (`id_activite`);

--
-- Index pour la table `site_actualite`
--
ALTER TABLE `site_actualite`
  ADD PRIMARY KEY (`id_actualite`);

--
-- Index pour la table `site_evenement`
--
ALTER TABLE `site_evenement`
  ADD PRIMARY KEY (`id_evenement`);

--
-- Index pour la table `site_galerie`
--
ALTER TABLE `site_galerie`
  ADD PRIMARY KEY (`id_image`),
  ADD KEY `fk_galerie_evenement` (`id_evenement`);

--
-- Index pour la table `site_hero_slide`
--
ALTER TABLE `site_hero_slide`
  ADD PRIMARY KEY (`id_slide`);

--
-- Index pour la table `site_installation`
--
ALTER TABLE `site_installation`
  ADD PRIMARY KEY (`id_installation`);

--
-- Index pour la table `site_message_contact`
--
ALTER TABLE `site_message_contact`
  ADD PRIMARY KEY (`id_message`);

--
-- Index pour la table `site_notre_histoire`
--
ALTER TABLE `site_notre_histoire`
  ADD PRIMARY KEY (`id_histoire`);

--
-- Index pour la table `site_pilier_educatif`
--
ALTER TABLE `site_pilier_educatif`
  ADD PRIMARY KEY (`id_pilier`);

--
-- Index pour la table `site_presentation`
--
ALTER TABLE `site_presentation`
  ADD PRIMARY KEY (`id_presentation`);

--
-- Index pour la table `site_programme_pedagogique`
--
ALTER TABLE `site_programme_pedagogique`
  ADD PRIMARY KEY (`id_point`);

--
-- Index pour la table `site_slogan`
--
ALTER TABLE `site_slogan`
  ADD PRIMARY KEY (`id_slogan`);

--
-- Index pour la table `site_valeur`
--
ALTER TABLE `site_valeur`
  ADD PRIMARY KEY (`id_valeur`);

--
-- Index pour la table `type_personnel`
--
ALTER TABLE `type_personnel`
  ADD PRIMARY KEY (`id_type_personnel`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `fk_user_eleve` (`id_eleve`),
  ADD KEY `fk_user_parent` (`id_parent`),
  ADD KEY `fk_user_role` (`id_role`),
  ADD KEY `fk_user_personnel` (`id_personnel`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `annee_scolaire`
--
ALTER TABLE `annee_scolaire`
  MODIFY `id_annee_scolaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=423;

--
-- AUTO_INCREMENT pour la table `classe`
--
ALTER TABLE `classe`
  MODIFY `id_classe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3649;

--
-- AUTO_INCREMENT pour la table `depense`
--
ALTER TABLE `depense`
  MODIFY `id_depense` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=367;

--
-- AUTO_INCREMENT pour la table `droit_inscription`
--
ALTER TABLE `droit_inscription`
  MODIFY `id_droit_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1591;

--
-- AUTO_INCREMENT pour la table `ecolage`
--
ALTER TABLE `ecolage`
  MODIFY `id_ecolage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1835;

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id_eleve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2745;

--
-- AUTO_INCREMENT pour la table `etablissement`
--
ALTER TABLE `etablissement`
  MODIFY `id_etablissement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT pour la table `exercice`
--
ALTER TABLE `exercice`
  MODIFY `id_exercice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3057;

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `id_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1733;

--
-- AUTO_INCREMENT pour la table `lecon`
--
ALTER TABLE `lecon`
  MODIFY `id_lecon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3163;

--
-- AUTO_INCREMENT pour la table `matiere`
--
ALTER TABLE `matiere`
  MODIFY `id_matiere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1975;

--
-- AUTO_INCREMENT pour la table `modules`
--
ALTER TABLE `modules`
  MODIFY `id_module` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2302;

--
-- AUTO_INCREMENT pour la table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `id_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1922;

--
-- AUTO_INCREMENT pour la table `note`
--
ALTER TABLE `note`
  MODIFY `id_note` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=851;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id_paiement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=379;

--
-- AUTO_INCREMENT pour la table `parents`
--
ALTER TABLE `parents`
  MODIFY `id_parent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2040;

--
-- AUTO_INCREMENT pour la table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `id_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3147;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=411;

--
-- AUTO_INCREMENT pour la table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id_role_permission` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13140;

--
-- AUTO_INCREMENT pour la table `site_activite_prescolaire`
--
ALTER TABLE `site_activite_prescolaire`
  MODIFY `id_activite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `site_actualite`
--
ALTER TABLE `site_actualite`
  MODIFY `id_actualite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `site_evenement`
--
ALTER TABLE `site_evenement`
  MODIFY `id_evenement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `site_galerie`
--
ALTER TABLE `site_galerie`
  MODIFY `id_image` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `site_hero_slide`
--
ALTER TABLE `site_hero_slide`
  MODIFY `id_slide` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `site_installation`
--
ALTER TABLE `site_installation`
  MODIFY `id_installation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `site_message_contact`
--
ALTER TABLE `site_message_contact`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `site_notre_histoire`
--
ALTER TABLE `site_notre_histoire`
  MODIFY `id_histoire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `site_pilier_educatif`
--
ALTER TABLE `site_pilier_educatif`
  MODIFY `id_pilier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `site_presentation`
--
ALTER TABLE `site_presentation`
  MODIFY `id_presentation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `site_programme_pedagogique`
--
ALTER TABLE `site_programme_pedagogique`
  MODIFY `id_point` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `site_slogan`
--
ALTER TABLE `site_slogan`
  MODIFY `id_slogan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `site_valeur`
--
ALTER TABLE `site_valeur`
  MODIFY `id_valeur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `type_personnel`
--
ALTER TABLE `type_personnel`
  MODIFY `id_type_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=945;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1084;

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
-- Contraintes pour la table `exercice`
--
ALTER TABLE `exercice`
  ADD CONSTRAINT `fk_exercice_matiere` FOREIGN KEY (`id_matiere`) REFERENCES `matiere` (`id_matiere`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_exercice_niveau` FOREIGN KEY (`id_niveau`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_exercice_prof` FOREIGN KEY (`id_prof`) REFERENCES `personnel` (`id_personnel`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `fk_inscription_annee_scolaire` FOREIGN KEY (`annee_scolaire_id_annee_scolaire`) REFERENCES `annee_scolaire` (`id_annee_scolaire`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inscription_classe` FOREIGN KEY (`classe_id_classe`) REFERENCES `classe` (`id_classe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inscription_eleve_correct` FOREIGN KEY (`eleve_id_eleve`) REFERENCES `eleve` (`id_eleve`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inscription_nievau` FOREIGN KEY (`niveau_id_niveau`) REFERENCES `niveau` (`id_niveau`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `lecon`
--
ALTER TABLE `lecon`
  ADD CONSTRAINT `fk_lesson_matiere` FOREIGN KEY (`id_matiere`) REFERENCES `matiere` (`id_matiere`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_lesson_niveau` FOREIGN KEY (`id_niveau`) REFERENCES `niveau` (`id_niveau`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `fk_lesson_prof` FOREIGN KEY (`id_prof`) REFERENCES `personnel` (`id_personnel`) ON DELETE SET NULL ON UPDATE SET NULL;

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

--
-- Contraintes pour la table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`id_module`) REFERENCES `modules` (`id_module`) ON DELETE CASCADE;

--
-- Contraintes pour la table `site_galerie`
--
ALTER TABLE `site_galerie`
  ADD CONSTRAINT `fk_galerie_evenement` FOREIGN KEY (`id_evenement`) REFERENCES `site_evenement` (`id_evenement`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_eleve` FOREIGN KEY (`id_eleve`) REFERENCES `eleve` (`id_eleve`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_parent` FOREIGN KEY (`id_parent`) REFERENCES `parents` (`id_parent`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_personnel` FOREIGN KEY (`id_personnel`) REFERENCES `personnel` (`id_personnel`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
