-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 12 nov. 2025 à 04:20
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
-- Structure de la table `activite_prescolaire`
--

CREATE TABLE `activite_prescolaire` (
  `id_activite` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `icone` varchar(100) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `actualite`
--

CREATE TABLE `actualite` (
  `id_actualite` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` text NOT NULL,
  `date_publication` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `publie` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Structure de la table `evenement`
--

CREATE TABLE `evenement` (
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
-- Structure de la table `galerie`
--

CREATE TABLE `galerie` (
  `id_image` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `categorie` varchar(100) DEFAULT NULL,
  `id_evenement` int(11) DEFAULT NULL,
  `publie` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `hero_slide`
--

CREATE TABLE `hero_slide` (
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
-- Structure de la table `installation`
--

CREATE TABLE `installation` (
  `id_installation` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
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
(3083, 'quas-in-tempore-nihil-dolores-illum-et-in-officia-3112', 'Quas in tempore nihil dolores illum et in officia.', 'Consectetur dolorum incidunt numquam assumenda voluptatem. Voluptates et cum iusto harum sint. Labore suscipit nihil consequuntur natus mollitia aliquid eveniet.', 'Est aut laboriosam omnis harum non et. Quis distinctio optio occaecati. Deserunt sequi molestiae officiis quos placeat. Tenetur sunt labore repellat aspernatur.\n\nVoluptas sapiente doloribus itaque illum. Illo rerum dolor est quisquam corporis.\n\nFacilis reprehenderit deserunt deserunt rerum est. Non molestiae doloribus distinctio quo. Eius vitae dolorem expedita aliquam praesentium quo.\n\nTenetur eos natus impedit earum voluptas sed. Qui assumenda aliquid enim sit. Ex voluptatem et sit deserunt mollitia. Cum porro hic vel cumque assumenda dolore.\n\nAsperiores id nulla est quod qui iure et. Animi hic vel unde placeat earum voluptatem.', 'http://www.dias.com/quaerat-nam-nemo-omnis-ut-iste-illo-possimus', 'fdf', NULL, NULL, NULL, '2024-12-17 15:18:51', 0),
(3084, 'reprehenderit-voluptas-odio-totam-in-sit-autem-3113', 'Reprehenderit voluptas odio totam in sit autem.', 'Id quia id accusamus enim ut. Ut quasi deserunt ullam dignissimos rerum at officia. Laudantium nesciunt nam dolorem consequatur minima. Ut vitae eos reiciendis sit quas enim harum.', 'Accusamus iure doloribus autem ut. Et ipsa nemo ut ea amet error est. Tempore voluptate fugiat nam assumenda sed voluptate. Placeat dignissimos quos sunt quibusdam voluptate aliquid. Amet porro id voluptatem explicabo voluptates aut odit.\n\nAdipisci voluptatum tempore consequatur odit non. Aut sed dolorem aliquam sint. Magni quisquam voluptates eveniet. Et autem voluptate quaerat eos.\n\nMagni atque natus ut et ea non. Aperiam magni explicabo iusto quibusdam sed nihil.\n\nQuisquam earum laboriosam et veniam ratione. Molestiae distinctio nam alias ullam sit. Voluptatibus quia sed pariatur dolorem nobis. Ut voluptate tenetur soluta est.\n\nAperiam vitae et nesciunt placeat. Et id non officiis provident labore et laborum dolores. Quo sapiente illo explicabo sed. Dolorum eius fugit repudiandae nihil.', 'http://www.henry.net/similique-similique-quae-ut-sed-numquam-autem', 'n3', NULL, NULL, NULL, '2025-09-11 05:21:29', 0),
(3085, 'ut-ipsam-et-quos-illum-aut-quas-voluptatem-3114', 'Ut ipsam et quos illum aut quas voluptatem.', 'Est soluta et asperiores sint excepturi consequatur ipsa. Et culpa ipsam dolorum enim earum. Non et voluptate et doloribus velit.', 'Rerum voluptatem facere saepe architecto. Perferendis deleniti repellendus odit autem quisquam ad molestiae. Voluptas et aut quod sunt praesentium esse.\n\nDolorum accusantium optio enim officiis. Ullam perspiciatis et voluptatibus sunt nisi qui. Nostrum minima atque ut. Dolores quia consectetur sunt dolorem.\n\nUt et qui et magni suscipit architecto. Voluptas velit ea occaecati aperiam.\n\nVoluptas aut ipsa excepturi saepe expedita quibusdam. Occaecati nam natus aspernatur et temporibus. Quidem accusantium iste repellat. Rerum velit rerum suscipit asperiores dolore illum ut.\n\nDelectus illo ipsum et esse maxime. Ipsam nihil doloremque temporibus voluptatem. Labore suscipit ab sapiente rem inventore optio omnis. Aut atque itaque ut temporibus unde ea expedita.', 'http://www.deschamps.com/culpa-dignissimos-exercitationem-maxime', '', NULL, NULL, NULL, '2024-12-13 01:57:00', 0),
(3086, 'ad-quos-nihil-omnis-reprehenderit-3115', 'Ad quos nihil omnis reprehenderit.', 'Omnis facere quis voluptas hic laudantium modi ipsa. Ut sed eos rerum aliquid corrupti. Aut libero quam consequuntur.', 'Et nobis nisi omnis fuga possimus. Ut excepturi vel laboriosam id quisquam. Sed et et culpa ipsa nostrum.\n\nBlanditiis modi dolorum alias amet ut. Ut ut et consequuntur dolorem molestiae.\n\nEa autem ut voluptate et vitae magnam labore. Nemo inventore corrupti repudiandae sit.\n\nEa sapiente eius sapiente eligendi ipsum qui. Totam cupiditate ullam corporis quo.\n\nQuaerat culpa voluptatem id consequuntur impedit reprehenderit harum. Eum aliquid maxime aspernatur cupiditate eius ipsum. Temporibus dolorum vero dolores perspiciatis. In veritatis temporibus velit quibusdam voluptatem voluptates aut.', 'https://samson.fr/autem-qui-voluptatum-velit-id-sunt-delectus.html', '', NULL, NULL, NULL, '2025-05-26 12:18:41', 0),
(3087, 'alias-maxime-adipisci-est-assumenda-soluta-3116', 'Alias maxime adipisci est assumenda soluta.', 'Porro ut ut id rerum ex repellat. Tenetur totam dolorem ipsum quia ratione occaecati et. Quod animi porro quo deserunt voluptates. Eveniet praesentium ea accusantium nostrum sit voluptatibus quos. Ut illo doloremque ea dicta sed accusamus hic.', 'Quia nemo dolore voluptatem quaerat eum dolor molestiae commodi. Est corrupti et dolores mollitia molestiae eum possimus. Ut earum voluptatem delectus exercitationem ad assumenda. Non et dolorum aperiam voluptatum.\n\nCum quod pariatur et nesciunt porro. In quia enim temporibus quasi est numquam molestias. Hic molestias praesentium quia incidunt doloremque omnis.\n\nConsequatur voluptates perspiciatis illo beatae labore et. Harum reprehenderit non et exercitationem et autem. Quam ab expedita consequatur ut fugit.\n\nTempora natus natus et mollitia. Quis qui dicta iusto adipisci magnam exercitationem aut. Nulla sit modi maxime in numquam enim.\n\nQui libero eveniet voluptatibus autem. Qui placeat cum ratione omnis velit unde. Possimus enim quis dolorem accusantium eaque.', 'http://garnier.com/illo-qui-quae-ut-ab', 'kia', NULL, NULL, NULL, '2025-10-02 09:22:41', 0),
(3088, 'ducimus-recusandae-consequuntur-nesciunt-mollitia-et-suscipit-3117', 'Ducimus recusandae consequuntur nesciunt mollitia et suscipit.', 'Debitis perferendis voluptas earum vitae magni. Magni vel aut dolore ipsam corporis assumenda rem. Repudiandae voluptatem sequi occaecati dolores dolorem.', 'Error ut ut qui eligendi quia deserunt. Saepe dignissimos dolore ut ratione. Quo est qui nisi deserunt quos quisquam. Quidem odit eum aut ipsa qui numquam unde.\n\nDoloremque voluptatibus et blanditiis deleniti consequatur error alias. Porro vel dolor doloremque quis officiis porro. Repellendus natus voluptas harum qui eligendi aut sed. Ad et dignissimos adipisci enim amet molestiae. Vitae eius aut non quod et in illo.\n\nQuis est dolore voluptas dolor vel. Sed aperiam consequatur repellat sint. Quisquam minima magni rerum rerum. Possimus accusantium hic provident eum sit eius.\n\nIpsum aut ratione magnam ad eaque. Cumque quis autem totam nam vero deleniti. Qui alias voluptas et tempora modi et eos.\n\nSimilique aut maiores qui suscipit inventore dolor consequatur. Ea voluptatem praesentium sit.', 'https://www.maillard.org/impedit-ipsum-incidunt-temporibus-fugit-nemo-non-repudiandae', '', NULL, NULL, NULL, '2025-02-20 05:40:46', 0),
(3089, 'sit-est-illum-commodi-veniam-3118', 'Sit est illum commodi veniam.', 'Quos cum nam non magnam error. Beatae eaque et cum eum. Dolorem non enim et.', 'Ducimus ut nihil sint in ut. Laboriosam ad esse laborum placeat illum quisquam. Laudantium est quis quia beatae voluptates suscipit. Nihil sed sed enim quasi.\n\nVoluptatibus velit quam aut soluta eos facere. Eum temporibus nisi omnis sapiente sequi illum aspernatur. Quisquam ut illo dignissimos sunt laudantium voluptatibus odit. Quia molestias ducimus consequatur ut animi vitae. In accusamus quo quia excepturi.\n\nDolorem saepe adipisci at deserunt recusandae porro nesciunt. Illo aut ab repellendus eum eaque velit fugit reiciendis. Ea tempora voluptas necessitatibus officia quibusdam exercitationem. Ducimus nulla commodi veritatis ipsam atque necessitatibus maiores molestiae.\n\nMagni debitis dolorem voluptatum libero quia. Dignissimos sint aut corporis illum et beatae ipsum. Et provident dolorem cumque. Quod quia quia et aspernatur sint ullam odio odio.\n\nLaudantium qui et voluptates accusantium. At corrupti harum velit officiis ut. Non maiores natus recusandae aliquam. Ut itaque reprehenderit et ut qui.', 'http://charrier.com/minus-consectetur-iste-at-totam', '', NULL, NULL, NULL, '2025-07-06 19:10:17', 0),
(3090, 'tempore-ullam-soluta-animi-sint-enim-temporibus-aut-iste-3119', 'Tempore ullam soluta animi sint enim temporibus aut iste.', 'Sed aperiam ut ut non. Provident vel eum et consequatur nemo laboriosam. Fuga minus voluptate soluta nulla architecto quasi nihil quo. Cum quo et occaecati delectus non impedit harum non.', 'Velit at beatae recusandae eius suscipit ea aut. Corrupti et autem accusamus numquam eos suscipit.\n\nPossimus est non nam deserunt ut. Et recusandae omnis eveniet ad. Ut molestiae consectetur natus.\n\nSed et nemo omnis illo quia. Non qui repellat non numquam et labore. Veritatis ducimus reprehenderit ut asperiores.\n\nAutem molestiae eos tempora et et. Eaque iste provident sequi facere asperiores voluptatibus. Debitis ut nobis deleniti reiciendis ut aut minima odio.\n\nNon aspernatur commodi aspernatur. Perspiciatis et sunt quo qui rerum dicta. Consequatur fuga alias quam adipisci cumque molestiae nostrum placeat. Corporis magnam consequuntur ducimus possimus.', 'http://humbert.net/neque-molestiae-velit-error-est-eum', '', NULL, NULL, NULL, '2025-09-23 06:49:49', 0),
(3091, 'reiciendis-mollitia-beatae-et-ut-quam-et-3120', 'Reiciendis mollitia beatae et ut quam et.', 'Voluptatem aut tempore mollitia voluptatem qui enim. Harum ut corrupti ullam et consectetur. Natus odio tempora quo vero dicta voluptates. Maxime velit facilis labore iure quo iste aut. Aspernatur placeat animi animi nihil et soluta in.', 'Recusandae rerum vero aliquid consectetur voluptatem et quod sed. Nemo architecto cupiditate velit omnis in inventore voluptatem. Dignissimos sit architecto expedita sint laboriosam aut.\n\nVelit qui et eaque fugit dolores. Omnis esse et commodi ad dignissimos vel hic. Quisquam et vel quis eaque omnis maiores deserunt.\n\nAd eveniet accusamus aspernatur eveniet quia voluptate. In sit quod eaque eius. Est quasi cum optio minima. Aspernatur nam eos unde voluptatum et ad sint placeat. Qui magnam vero odio quos amet laborum ad iure.\n\nFugiat eligendi temporibus necessitatibus qui omnis atque harum. Repellendus rerum quis qui ipsum. Quia debitis excepturi quas libero corrupti quisquam officia.\n\nAb nostrum aliquam temporibus saepe quia nostrum. Quis omnis dolorem tenetur id perferendis. At placeat consequuntur deserunt deleniti ex. Omnis consequuntur et veniam. Consequatur reprehenderit ut doloribus corrupti.', 'https://petit.com/ut-et-doloremque-id-impedit-libero-velit.html', 'bed', NULL, NULL, NULL, '2024-12-17 21:37:43', 0),
(3092, 'corporis-unde-cupiditate-corporis-aut-3121', 'Corporis unde cupiditate corporis aut.', 'Quasi qui omnis labore excepturi repellat. Labore iste autem qui deserunt sit est. Dignissimos esse nihil aut consequatur voluptates et. Cupiditate voluptatem qui provident et.', 'Consectetur et quo placeat sit soluta vero omnis. Necessitatibus debitis eos ut dolorum quasi fugit rerum. Rerum inventore natus qui doloribus similique et.\n\nEt sit sed quo a quibusdam animi quas. Et velit ad eaque aut commodi quo culpa sint. Et cupiditate vel tenetur et voluptatum.\n\nCorporis qui eum consequuntur accusantium atque. Maiores expedita ab ipsam dolor ut. Autem ab exercitationem consequatur nihil omnis. Quia nobis ut repellat cumque aliquam enim nihil.\n\nMollitia qui sunt culpa placeat. Perspiciatis dolorem occaecati eius dolorem in. Suscipit ut est et maiores nesciunt est commodi quos.\n\nQuia possimus impedit inventore ut asperiores et est. Dolorem omnis odit est ducimus aut exercitationem facere. Modi earum cum distinctio aut accusantium distinctio. Asperiores sed ducimus veritatis placeat laboriosam.', 'https://www.verdier.net/sed-illo-dolorem-qui-ea', '', NULL, NULL, NULL, '2025-04-01 05:52:18', 0),
(3093, 'mollitia-enim-beatae-officia-eligendi-sit-commodi-3122', 'Mollitia enim beatae officia eligendi sit commodi.', 'Et quo voluptas animi qui reiciendis. Velit voluptatibus aliquam at perspiciatis repellendus. Minus enim aperiam et ipsa reiciendis ut recusandae qui.', 'Nesciunt iure ut aut eos quae aut quidem iste. Aut et fugit ea odit sit dolor. Accusamus qui rerum sit cum alias at dolores.\n\nMollitia ea nihil repellendus quia nostrum aut. Consectetur inventore atque temporibus qui. Qui quas ipsum atque soluta porro.\n\nEos modi quos non rerum possimus. Beatae inventore qui amet eaque et voluptatem nihil maiores. Odio velit quibusdam qui cupiditate aliquam corporis. Recusandae laudantium et aliquid sapiente qui sequi voluptatibus.\n\nAt ut saepe a nisi quam. Dolor eos deserunt illum illo. Deleniti deserunt quibusdam praesentium consequatur sed incidunt voluptas.\n\nEx vitae tempore ducimus corporis. Vitae vel hic eius vel sequi eveniet placeat. Voluptas aut omnis et facere et in qui.', 'http://dossantos.net/ducimus-dolor-nulla-eius-minima', '', NULL, NULL, NULL, '2025-07-29 04:15:17', 0),
(3094, 'quo-ea-ut-sed-est-dolor-architecto-3123', 'Quo ea ut sed est dolor architecto.', 'Soluta recusandae odio fuga minus at ab excepturi qui. Laudantium odit reiciendis quia vel at eos. Nemo corporis rerum deserunt repellat quisquam eos iure.', 'At aut quasi culpa eligendi aut aut. Eius quam aliquam eius voluptatum. Explicabo porro et aut et.\n\nQuod dolore est iusto dolor sit distinctio. Qui enim aut et excepturi itaque error dolorem tempora. Voluptatem et voluptatem minima minima cupiditate praesentium.\n\nNisi libero saepe voluptas eaque cupiditate magnam pariatur id. Sunt voluptates labore eum nostrum rerum repellendus. Animi et labore reprehenderit.\n\nQuia ut quos natus. Qui voluptatem optio ea at cupiditate. Consequuntur aliquam harum praesentium veritatis sed.\n\nUt doloremque hic vel exercitationem maxime nam. Ratione quos aliquid et. Sed vitae harum voluptas. Quo ducimus repellat ea ut quia voluptatem expedita consequatur. Est et dolorum ipsa veritatis in facere.', 'http://www.poirier.fr/', '', NULL, NULL, NULL, '2025-11-02 16:15:27', 0),
(3095, 'rerum-blanditiis-qui-sapiente-cupiditate-voluptas-ea-laudantium-magni-3124', 'Rerum blanditiis qui sapiente cupiditate voluptas ea laudantium magni.', 'Accusantium vero quaerat numquam nemo vitae quia. Sit ut consequatur et alias aliquid assumenda sunt non. Sapiente quia officiis reiciendis labore in autem iste. Atque qui officiis est quia quaerat quasi impedit.', 'Eius natus a inventore sint. Magni laudantium error ea nihil aut beatae. Et sit ut quia. Delectus recusandae vel natus similique rerum est placeat.\n\nTotam dolorem minima sed alias. Deserunt esse magnam ducimus voluptatibus ipsa quibusdam unde veniam. Eos occaecati voluptatem earum ut.\n\nMagni consequatur ipsam dolore et. Perferendis dolorem quod praesentium error delectus quos. Temporibus doloribus enim unde culpa qui. Sunt deleniti ut voluptatibus eius aut quis inventore eius.\n\nNecessitatibus laboriosam quis eos amet. Aliquam dignissimos qui dolorum adipisci atque vel. Maxime at soluta dolorem odit explicabo. Modi consequuntur doloremque soluta est delectus.\n\nRerum et nostrum sunt possimus a asperiores ut. At enim ut beatae cumque expedita saepe harum. Aut earum amet officiis alias similique.', 'http://bouvet.fr/harum-eos-quis-omnis.html', '', NULL, NULL, NULL, '2025-07-29 12:17:06', 0),
(3096, 'et-quis-illum-est-consequuntur-nostrum-eaque-3125', 'Et quis illum est consequuntur nostrum eaque.', 'Laborum qui molestiae veritatis soluta sequi adipisci. Autem nihil velit deleniti nemo omnis iste dolorem. Consequuntur vel et eum quam alias cupiditate.', 'Odio sint quis quidem et. Qui dolorem doloremque ducimus delectus.\n\nEt error neque et laborum quasi. Aut aut voluptas tempora. Animi voluptatem corporis est consequuntur.\n\nDolor nihil quibusdam iste. Voluptatibus odit omnis voluptatibus sunt perferendis sint sapiente. Aut minus hic provident aut voluptate. Vel qui ut quaerat dicta non cum iusto.\n\nRerum perspiciatis ratione adipisci. Dolor et aut id vel est. Vitae ipsum totam modi et.\n\nAliquam est fugiat ullam sequi perferendis placeat. Est non temporibus iste non neque ut et aut. Eum velit laudantium mollitia fuga amet numquam. Ut ipsum ullam iure et.', 'http://www.dacosta.fr/minima-fuga-officiis-officiis-harum-culpa', '', NULL, NULL, NULL, '2025-11-04 07:28:28', 0),
(3097, 'in-quis-sit-quia-distinctio-deserunt-iusto-3126', 'In quis sit quia distinctio deserunt iusto.', 'Et et eum quis tempore. Sed accusantium sed quia soluta accusantium cum minus aliquam. Qui maiores ipsum minima eius in.', 'Unde nihil exercitationem commodi debitis. Labore totam officiis accusantium provident excepturi.\n\nEnim perspiciatis et quia sequi distinctio. Necessitatibus est officia vel eveniet ut qui. Sed eos illum accusamus assumenda qui odio saepe. Necessitatibus enim pariatur corrupti explicabo qui quis cupiditate.\n\nSit mollitia dolor est excepturi provident. Ut aperiam quae atque ad architecto quos minima. Dignissimos dolorem id voluptas ut dolore. Iure libero eos consectetur quia voluptatem numquam eum. Aliquid a magnam officiis commodi nihil.\n\nIpsum quae ipsam expedita exercitationem aspernatur placeat nemo. Fugit aut cumque et qui.\n\nAnimi atque consequatur sequi quia numquam provident voluptates. Impedit aut natus quasi fuga dolor esse pariatur. Omnis molestiae quia non quo.', 'http://www.bazin.com/sit-atque-quam-ea-sequi', '', NULL, NULL, NULL, '2025-07-18 04:49:07', 0),
(3098, 'aliquam-et-eius-animi-adipisci-3127', 'Aliquam et eius animi adipisci.', 'Optio vitae laborum qui aut adipisci reprehenderit. Ea consequatur autem quidem ea labore totam.', 'Incidunt provident esse similique minima harum possimus omnis. Molestias ullam minima mollitia porro.\n\nAnimi explicabo sint tempora ut magnam iusto quia quos. Deleniti et rerum odio. Laboriosam odio iusto accusamus facere.\n\nVoluptate delectus excepturi animi fugit animi. Libero illo quis aut placeat possimus. Laboriosam harum quaerat eum et.\n\nSint ea delectus qui aut soluta necessitatibus atque. Molestias dolores quisquam eligendi ex. Voluptates iure accusantium inventore repellendus. Eligendi temporibus quod dolore enim blanditiis modi.\n\nDolorem illo rem enim dolor molestias eos. Eum minima at voluptates recusandae nobis autem nulla quibusdam. Asperiores earum ipsa in et nisi sit et iusto. Accusamus assumenda aliquam asperiores. Alias iusto dignissimos quibusdam in maiores officia minima.', 'http://www.dubois.fr/atque-neque-assumenda-a-voluptates-impedit-quis-provident', '', NULL, NULL, NULL, '2025-01-03 17:54:13', 0),
(3099, 'aut-voluptate-labore-consequatur-consequuntur-aut-non-3128', 'Aut voluptate labore consequatur consequuntur aut non.', 'Mollitia eaque porro perspiciatis laudantium et quia deserunt velit. Non eveniet et maiores. Est quibusdam dolorem dolores nesciunt rerum non.', 'Corporis et quas tempore doloremque et. Ut natus est eius molestias. Autem non quos numquam qui et fugiat. Consectetur dignissimos placeat quia. Dolorum saepe occaecati labore.\n\nIpsam quos qui debitis quibusdam mollitia est asperiores. Ut dolor aut consequatur similique et illo. Quos perferendis voluptas assumenda et quia excepturi rerum. Magni dolorem blanditiis quaerat suscipit.\n\nCorrupti delectus repellat error veritatis nobis. Dolores iure optio nesciunt libero reprehenderit. Voluptate sed ex commodi quae. Explicabo et officiis omnis aut.\n\nFugit quia labore voluptatem rerum provident aut rem. Est necessitatibus velit qui libero dicta dolore omnis. Rem nisi pariatur aut et temporibus aliquam enim. Id saepe qui ea.\n\nNon debitis hic voluptates consequatur rerum. Repudiandae dolorum animi consequatur sit. Consequuntur eaque suscipit eligendi ut neque quo. Sunt dolores quidem dolores inventore nisi mollitia sed. Et laborum deserunt enim iure ullam quasi dolorem.', 'https://blin.com/voluptates-repellendus-dolor-velit-qui-placeat-quia-sit.html', 'mag', NULL, NULL, NULL, '2024-12-05 16:34:16', 0),
(3100, 'et-rerum-illum-eos-qui-3129', 'Et rerum illum eos qui.', 'Quis eligendi distinctio dolore ipsa assumenda hic veniam. Dolores maxime veritatis voluptate quo ipsa aut excepturi. Qui numquam vel dolorum dolores labore error quo.', 'Sed qui enim beatae tempora. Libero earum assumenda dolor sit repellat repellat. Cupiditate rerum et molestiae voluptate. Voluptates facilis quas porro dolore ipsam.\n\nDelectus et perspiciatis est reiciendis. Deleniti deserunt tempore aut alias laudantium quibusdam occaecati. Qui eum dolorum totam deleniti.\n\nOdio dolor sequi natus nostrum ex cupiditate facilis. Assumenda pariatur accusantium exercitationem sit non illo nostrum. Dolores hic occaecati ab rem eos.\n\nSed ipsum numquam explicabo ea quasi voluptate. Nemo ab in occaecati doloribus. Laudantium voluptas esse quis inventore aliquam sequi. Iusto totam porro quam aut odio est nisi nemo.\n\nEt ut quo ut at. Non magni fugiat sed sunt. Minima ea earum at beatae ipsam. Dolores suscipit explicabo pariatur in assumenda eligendi.', 'http://www.maurice.net/', '', NULL, NULL, NULL, '2025-05-05 16:01:36', 0),
(3101, 'laboriosam-quia-aut-eligendi-nam-similique-et-3130', 'Laboriosam quia aut eligendi nam similique et.', 'Fuga dolor consequatur sunt aut. Est soluta blanditiis quos quam. Tempora est nobis quisquam sit aut quod amet at. Sit aut ea odit natus alias molestiae.', 'Labore alias suscipit asperiores inventore odio ad dolores incidunt. Et vitae omnis consequatur et est. Voluptates sequi distinctio et minima quisquam aperiam. Necessitatibus debitis dolores ut omnis.\n\nUt minus laudantium adipisci iste quod molestiae culpa. Fugit et quia alias rerum fuga nulla.\n\nVoluptas dolores quisquam quae laboriosam voluptates occaecati voluptas. Autem non impedit velit. Laudantium fugit quia dolores reprehenderit ea eaque maxime. Veniam ut quam odit vel.\n\nDebitis consequuntur debitis alias consequatur est velit. Accusantium rerum ipsa et facere. Dignissimos quo blanditiis labore et fugiat sequi. Harum natus itaque vel officiis ea.\n\nRepudiandae voluptas sapiente dolore consectetur. Libero omnis qui aut laudantium qui non ut. Id ab at optio incidunt.', 'http://www.diaz.fr/', 'bed', NULL, NULL, NULL, '2024-12-27 09:44:00', 0),
(3102, 'aspernatur-et-voluptatibus-qui-accusamus-3131', 'Aspernatur et voluptatibus qui accusamus.', 'Qui autem quia velit velit sequi quia. Nostrum animi cumque qui possimus odit impedit quas. Ullam error repellat est.', 'Exercitationem saepe blanditiis perspiciatis et. Rerum et nobis beatae et quidem. Quisquam necessitatibus dolorum et et.\n\nVoluptate ullam aut eum blanditiis ea. Tempore autem at est culpa omnis. Soluta laboriosam quibusdam at ea in rerum.\n\nVoluptatem explicabo repellendus ad ullam commodi. Eaque a ducimus non vero ullam. Voluptates nisi tenetur nihil ducimus autem ut quasi earum.\n\nUt autem qui deleniti maiores. Iure est quia dolores ut. A quia reiciendis veniam. Quasi laudantium quibusdam eaque iste qui.\n\nQuas ut laudantium excepturi ut iste. Aut recusandae autem velit voluptatibus aliquam eos. Magni qui deleniti aperiam quia ratione beatae vitae. Architecto veritatis est repellat cum.', 'https://www.philippe.fr/quis-quis-velit-sed-aut-quo', '', NULL, NULL, NULL, '2024-11-11 02:55:42', 0),
(3103, 'voluptas-eius-ipsa-itaque-dolor-molestiae-eum-3132', 'Voluptas eius ipsa itaque dolor molestiae eum.', 'Qui quo aut veniam ea et blanditiis voluptatem. Autem dolores expedita recusandae optio voluptatum officiis. Aut sunt voluptatem officiis repudiandae. Non provident nisi aut in.', 'Recusandae beatae sit ea assumenda. Fugit distinctio vero autem repellendus est. Temporibus enim aut nobis nemo.\n\nConsequuntur aut sit eum cum et. Necessitatibus animi voluptatem deserunt laborum voluptas et. Quo fugit et enim numquam quibusdam voluptatem molestiae ut. Excepturi sint sequi qui.\n\nTempora voluptatibus autem doloribus suscipit earum nobis quisquam. Sit beatae eum autem aperiam. Hic accusamus fugiat quibusdam sint. Facilis corporis ut suscipit est itaque sint.\n\nConsequatur est voluptatem eaque quia. Eius sit dolorum odit voluptatem esse eos voluptatem.\n\nMolestias nihil quaerat quisquam ullam est. Cum et necessitatibus tempora doloribus qui vel. Earum dolorem aspernatur perferendis voluptas laboriosam delectus.', 'https://weber.fr/officiis-sed-explicabo-natus-beatae.html', 'class', NULL, NULL, NULL, '2025-08-06 19:49:53', 0),
(3104, 'illo-assumenda-est-animi-3133', 'Illo assumenda est animi.', 'Velit magnam vel cum. Minus culpa est est dolores sit. Quasi inventore voluptatibus enim incidunt possimus facere.', 'Illo ratione earum consequatur rerum occaecati quia inventore in. Ullam deleniti nisi sint alias. Exercitationem facilis dolor commodi est.\n\nCommodi qui vitae deleniti ipsum error earum inventore aut. Enim qui ut et et autem necessitatibus nostrum. Delectus modi aliquid est necessitatibus. Sed pariatur laudantium quia aliquid esse et sed. Debitis aut at velit aut rerum velit tempora cum.\n\nEnim nesciunt ab laborum eum vel. Nam dicta ad dolores et omnis. Necessitatibus minima vel ut voluptas. Quasi sint at aut autem ad.\n\nQuisquam omnis aliquam provident pariatur possimus tempora nihil. Earum odit perspiciatis ipsum. Est nihil nesciunt numquam qui eveniet voluptatibus ut laudantium.\n\nDolor accusamus culpa nobis qui molestiae quia quis. Vel quas magni consequuntur perspiciatis asperiores non. Culpa qui enim neque harum et magni dolores. Amet minima omnis praesentium.', 'http://www.gautier.com/magnam-ut-in-sapiente-odit-et', 'gph', NULL, NULL, NULL, '2025-07-17 11:16:12', 0),
(3105, 'quisquam-quia-tempore-a-mollitia-3134', 'Quisquam quia tempore a mollitia.', 'Numquam consequatur sed enim accusantium deleniti fugiat quod. Dolorum quae quia similique nobis qui nam laborum. In qui impedit nihil hic amet vel.', 'Eveniet et eum et tempora. Aut veritatis dolores provident vero fugiat nihil vel. Molestias nihil dolores eligendi commodi est.\n\nSimilique qui fuga aut explicabo et qui possimus. Quia neque tempora nobis quas. Maiores in animi consequatur adipisci eveniet maxime. Commodi et voluptas aut in cumque quo sapiente.\n\nQuos delectus et autem sed voluptates. Est qui totam eligendi ipsa facere quisquam. Exercitationem sit quaerat nulla facilis.\n\nAt quibusdam et omnis assumenda fugit sed. Eum illum quia nihil autem nam suscipit magni. Expedita aliquam quia qui fugiat dolore. Cumque quaerat minus aut vel quidem corporis aperiam aut. Modi debitis necessitatibus nisi dolorem veritatis et.\n\nEa est quia perspiciatis deleniti autem distinctio ea temporibus. Et harum saepe ut consectetur sed recusandae. Ipsam officia cumque asperiores culpa animi possimus.', 'https://www.regnier.net/consequatur-ut-molestias-adipisci-a-expedita-doloremque-officia-et', 'gif', NULL, NULL, NULL, '2025-08-11 09:45:50', 0),
(3106, 'eum-distinctio-sit-officiis-3135', 'Eum distinctio sit officiis.', 'Eius pariatur sint numquam accusantium. Et debitis similique ut vel voluptatem natus. Aliquam voluptatem quo quis fuga in. Eligendi aspernatur qui iste rerum ea.', 'Assumenda sunt est tenetur voluptas. Quas assumenda sequi consequatur exercitationem perferendis ducimus. Cupiditate tempore occaecati placeat numquam est eius natus consequatur.\n\nOmnis dolore eos porro et consequatur voluptatem repellat. Occaecati nihil in nobis veritatis suscipit voluptatibus. Nemo et a quaerat sit.\n\nIllum dolorem nam consequatur est. Labore ducimus eaque iure laboriosam amet vel et. Voluptate voluptate consequatur consequatur qui. Aspernatur consequatur est ipsum sed ex repellendus. Corporis eum alias deserunt facilis eum eos.\n\nConsequatur sunt est commodi necessitatibus autem autem aperiam sunt. Quo consequuntur vero non dolorem. Illum omnis impedit explicabo sint omnis. Voluptatem voluptas totam culpa molestiae incidunt perferendis eum aliquid.\n\nEt ut reiciendis aliquam eveniet exercitationem. Nostrum est aspernatur possimus quod alias.', 'https://peltier.fr/sed-neque-sunt-dolores-tenetur.html', 'mseed', NULL, NULL, NULL, '2025-02-20 15:05:52', 0),
(3107, 'consequuntur-maxime-distinctio-ipsum-nam-error-3136', 'Consequuntur maxime distinctio ipsum nam error.', 'Est deleniti similique reiciendis saepe incidunt quasi. Sed possimus sed aut aut ex facere architecto. Quasi quis et eum quo exercitationem rerum praesentium.', 'Deserunt numquam temporibus et est. At aspernatur modi iusto qui laudantium. Aut quisquam non pariatur praesentium aut qui.\n\nId voluptatem saepe sit vitae corporis. Id occaecati eius deleniti dolores provident quis sit. Omnis sed in nesciunt necessitatibus.\n\nEst deserunt dolores aut tempore sed maxime. Ad ipsa ipsam quisquam nobis laboriosam repellat debitis. Dicta laudantium quo non harum. Necessitatibus qui dignissimos libero accusantium hic non est.\n\nRem tenetur praesentium facilis ut. Aut ut et inventore reiciendis. Aliquid reiciendis minima cum odio accusantium labore. Modi assumenda distinctio adipisci numquam exercitationem harum.\n\nVoluptates eos fugiat consequatur consequatur voluptas exercitationem. Numquam voluptas assumenda aliquam consequatur tempore.', 'http://www.buisson.fr/dolorum-eos-voluptatem-velit-suscipit-et-corporis-labore', '', NULL, NULL, NULL, '2024-12-27 18:46:49', 0),
(3108, 'et-iusto-ex-commodi-atque-et-est-qui-3137', 'Et iusto ex commodi atque et est qui.', 'Et aliquam eos minus in est. Aut ea minus sed ut voluptatem.', 'Et minus ex pariatur. Aliquid sunt illo commodi non ipsum animi ut rerum. Nihil dolores ipsum est quod repudiandae amet eum. Nam ducimus recusandae dolorem et.\n\nFugit quia et nemo id pariatur omnis. Suscipit commodi vero aliquid non. Enim consequuntur sunt possimus iste ducimus ad. Sed nulla debitis aliquam voluptatem et ipsa magni. Doloribus eius aut qui culpa laudantium voluptatibus qui.\n\nEos quas ut necessitatibus maxime tempore. Et dolor accusamus sunt numquam odit dicta officiis laboriosam. Autem officia nihil eum consequatur sunt deleniti sit dolores.\n\nSed vel repudiandae incidunt nostrum porro. Ipsum sed corrupti autem voluptatibus. Quis eaque sed est et deserunt eaque neque sit.\n\nMaiores assumenda magnam aut optio. Ipsa id distinctio corporis distinctio id quos ea est. Consequatur dolores quae molestiae aut vel nihil eveniet enim. Qui rerum et ipsum voluptatum.', 'http://www.julien.fr/', '', NULL, NULL, NULL, '2025-10-01 04:59:45', 0),
(3109, 'et-sequi-saepe-sit-porro-in-3138', 'Et sequi saepe sit porro in.', 'Minus maiores error non tempora. Repellat at aliquid quo impedit labore ex. Adipisci dolorem non velit autem sed. Omnis est sit modi delectus cumque sed.', 'Aut rerum perspiciatis expedita eum voluptas neque nihil ad. Assumenda occaecati aperiam corrupti illum quia dolor laborum.\n\nAperiam dolores et nihil molestiae et tenetur. Ducimus temporibus incidunt et.\n\nRerum reiciendis dolor aspernatur et quaerat. Ad corporis omnis ea officia officia saepe ut. Et illo suscipit voluptatem optio. Animi aut dolor id sit beatae.\n\nQuisquam qui esse nihil minus laudantium. Tenetur autem dolor voluptatum quidem ullam explicabo maiores. Culpa quis dicta quasi quas. Cumque voluptas omnis debitis et est eveniet.\n\nIure vel ut eius quaerat. Nesciunt repudiandae in ea voluptate excepturi et deleniti. Voluptatem maiores adipisci enim vitae nisi laudantium alias. Voluptatem sed vero ullam tempora quo et.', 'http://www.lopes.com/optio-eum-quis-tempore-dignissimos-eos', '', NULL, NULL, NULL, '2025-06-01 20:45:52', 0),
(3110, 'laboriosam-perferendis-voluptatem-sed-delectus-eaque-nemo-3139', 'Laboriosam perferendis voluptatem sed delectus eaque nemo.', 'Quas nam quia aut delectus est placeat sint. Dicta tempora libero nihil recusandae magni ipsam. Nemo consequatur iste eum distinctio ducimus totam. Quo quibusdam repellat sed consequatur incidunt. Ullam voluptas iusto ut velit eligendi.', 'Dolorem aut omnis nesciunt non nisi rerum. Nostrum est ut et quos.\n\nVoluptatem nihil et autem dolorem. Maiores aut minima voluptas. Et ducimus qui repudiandae et officia repudiandae inventore.\n\nAt omnis maiores voluptatibus repudiandae. Quas odit ut est quae occaecati adipisci voluptatum libero. Laborum quas ut voluptatem maiores et illum debitis. Officiis architecto sit sint labore omnis neque aperiam. Quo atque possimus earum.\n\nVoluptate ex aut ut quo ratione voluptatem eos. Id consequuntur excepturi nisi tempore. Sunt sed dolorem quidem et est consequatur laboriosam.\n\nCorporis facere quam vel aliquid neque aliquam. Fuga iure beatae totam magnam provident nostrum. Aliquid ipsam praesentium aliquid omnis dolores sed omnis. Amet non dolorum voluptatem et doloribus ut eius.', 'http://berthelot.net/', 'sxw', NULL, NULL, NULL, '2025-02-23 03:59:27', 0),
(3111, 'rerum-vel-sed-sit-ipsam-quos-et-in-3140', 'Rerum vel sed sit ipsam quos et in.', 'Laudantium incidunt rerum rerum cupiditate qui hic. Repudiandae tempore distinctio expedita architecto qui cumque. Necessitatibus vel hic deserunt.', 'Delectus veritatis veniam architecto qui sequi hic repudiandae. Nihil atque sint nisi ut odio consequatur rerum. Ducimus similique dolores aut provident. Cupiditate voluptas sed minus corrupti sunt excepturi.\n\nNihil consequatur eos ab. Aliquid impedit ipsum qui nisi aut. Ipsam fugiat doloribus molestias quo repudiandae natus. Consequuntur consequatur impedit et ipsam fugit nostrum.\n\nTemporibus repellendus et nostrum voluptatum autem nemo harum. Et nihil nesciunt aspernatur similique sequi. Quae sed sed dicta voluptatibus iusto. Ea nostrum non dignissimos nobis ad velit doloribus sequi.\n\nCum atque voluptatem voluptas eveniet quisquam. Sed unde cum dolorem eos ex reprehenderit est dolorem. Sequi aut minus ipsam.\n\nNulla saepe non excepturi aut inventore corrupti. Hic iusto et aut officiis veniam. Quis mollitia necessitatibus sunt eos voluptatem repellendus enim.', 'http://www.fabre.net/illo-quae-molestias-ab-pariatur-voluptatibus-nemo', '', NULL, NULL, NULL, '2024-11-28 22:15:08', 0);

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
-- Structure de la table `message_contact`
--

CREATE TABLE `message_contact` (
  `id_message` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `date_message` date DEFAULT NULL,
  `lu` tinyint(1) DEFAULT 0
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
-- Structure de la table `notre_histoire`
--

CREATE TABLE `notre_histoire` (
  `id_histoire` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `reconnaissance_par` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
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
-- Structure de la table `pilier_educatif`
--

CREATE TABLE `pilier_educatif` (
  `id_pilier` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icone` varchar(100) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `presentation`
--

CREATE TABLE `presentation` (
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
-- Structure de la table `programme_pedagogique`
--

CREATE TABLE `programme_pedagogique` (
  `id_point` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `ordre` int(11) DEFAULT 0,
  `actif` tinyint(1) DEFAULT 1
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
-- Structure de la table `slogan`
--

CREATE TABLE `slogan` (
  `id_slogan` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
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

-- --------------------------------------------------------

--
-- Structure de la table `valeur`
--

CREATE TABLE `valeur` (
  `id_valeur` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icone` varchar(100) DEFAULT NULL,
  `actif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activite_prescolaire`
--
ALTER TABLE `activite_prescolaire`
  ADD PRIMARY KEY (`id_activite`);

--
-- Index pour la table `actualite`
--
ALTER TABLE `actualite`
  ADD PRIMARY KEY (`id_actualite`);

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
-- Index pour la table `evenement`
--
ALTER TABLE `evenement`
  ADD PRIMARY KEY (`id_evenement`);

--
-- Index pour la table `exercice`
--
ALTER TABLE `exercice`
  ADD PRIMARY KEY (`id_exercice`),
  ADD KEY `fk_lesson_matiere` (`id_matiere`),
  ADD KEY `fk_lesson_niveau` (`id_niveau`),
  ADD KEY `fk_lesson_prof` (`id_prof`);

--
-- Index pour la table `galerie`
--
ALTER TABLE `galerie`
  ADD PRIMARY KEY (`id_image`),
  ADD KEY `fk_galerie_evenement` (`id_evenement`);

--
-- Index pour la table `hero_slide`
--
ALTER TABLE `hero_slide`
  ADD PRIMARY KEY (`id_slide`);

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
-- Index pour la table `installation`
--
ALTER TABLE `installation`
  ADD PRIMARY KEY (`id_installation`);

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
-- Index pour la table `message_contact`
--
ALTER TABLE `message_contact`
  ADD PRIMARY KEY (`id_message`);

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
-- Index pour la table `notre_histoire`
--
ALTER TABLE `notre_histoire`
  ADD PRIMARY KEY (`id_histoire`);

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
-- Index pour la table `pilier_educatif`
--
ALTER TABLE `pilier_educatif`
  ADD PRIMARY KEY (`id_pilier`);

--
-- Index pour la table `presentation`
--
ALTER TABLE `presentation`
  ADD PRIMARY KEY (`id_presentation`);

--
-- Index pour la table `programme_pedagogique`
--
ALTER TABLE `programme_pedagogique`
  ADD PRIMARY KEY (`id_point`);

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
-- Index pour la table `slogan`
--
ALTER TABLE `slogan`
  ADD PRIMARY KEY (`id_slogan`);

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
-- Index pour la table `valeur`
--
ALTER TABLE `valeur`
  ADD PRIMARY KEY (`id_valeur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activite_prescolaire`
--
ALTER TABLE `activite_prescolaire`
  MODIFY `id_activite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `actualite`
--
ALTER TABLE `actualite`
  MODIFY `id_actualite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `annee_scolaire`
--
ALTER TABLE `annee_scolaire`
  MODIFY `id_annee_scolaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=421;

--
-- AUTO_INCREMENT pour la table `classe`
--
ALTER TABLE `classe`
  MODIFY `id_classe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3620;

--
-- AUTO_INCREMENT pour la table `depense`
--
ALTER TABLE `depense`
  MODIFY `id_depense` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=367;

--
-- AUTO_INCREMENT pour la table `droit_inscription`
--
ALTER TABLE `droit_inscription`
  MODIFY `id_droit_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1579;

--
-- AUTO_INCREMENT pour la table `ecolage`
--
ALTER TABLE `ecolage`
  MODIFY `id_ecolage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1823;

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id_eleve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2735;

--
-- AUTO_INCREMENT pour la table `etablissement`
--
ALTER TABLE `etablissement`
  MODIFY `id_etablissement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT pour la table `evenement`
--
ALTER TABLE `evenement`
  MODIFY `id_evenement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `exercice`
--
ALTER TABLE `exercice`
  MODIFY `id_exercice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3006;

--
-- AUTO_INCREMENT pour la table `galerie`
--
ALTER TABLE `galerie`
  MODIFY `id_image` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `hero_slide`
--
ALTER TABLE `hero_slide`
  MODIFY `id_slide` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `id_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1728;

--
-- AUTO_INCREMENT pour la table `installation`
--
ALTER TABLE `installation`
  MODIFY `id_installation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `lecon`
--
ALTER TABLE `lecon`
  MODIFY `id_lecon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3112;

--
-- AUTO_INCREMENT pour la table `matiere`
--
ALTER TABLE `matiere`
  MODIFY `id_matiere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1965;

--
-- AUTO_INCREMENT pour la table `message_contact`
--
ALTER TABLE `message_contact`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `modules`
--
ALTER TABLE `modules`
  MODIFY `id_module` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2278;

--
-- AUTO_INCREMENT pour la table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `id_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1910;

--
-- AUTO_INCREMENT pour la table `note`
--
ALTER TABLE `note`
  MODIFY `id_note` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=851;

--
-- AUTO_INCREMENT pour la table `notre_histoire`
--
ALTER TABLE `notre_histoire`
  MODIFY `id_histoire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id_paiement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=379;

--
-- AUTO_INCREMENT pour la table `parents`
--
ALTER TABLE `parents`
  MODIFY `id_parent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2021;

--
-- AUTO_INCREMENT pour la table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `id_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3127;

--
-- AUTO_INCREMENT pour la table `pilier_educatif`
--
ALTER TABLE `pilier_educatif`
  MODIFY `id_pilier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `presentation`
--
ALTER TABLE `presentation`
  MODIFY `id_presentation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `programme_pedagogique`
--
ALTER TABLE `programme_pedagogique`
  MODIFY `id_point` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=407;

--
-- AUTO_INCREMENT pour la table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id_role_permission` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13044;

--
-- AUTO_INCREMENT pour la table `slogan`
--
ALTER TABLE `slogan`
  MODIFY `id_slogan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `type_personnel`
--
ALTER TABLE `type_personnel`
  MODIFY `id_type_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=937;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1073;

--
-- AUTO_INCREMENT pour la table `valeur`
--
ALTER TABLE `valeur`
  MODIFY `id_valeur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- Contraintes pour la table `galerie`
--
ALTER TABLE `galerie`
  ADD CONSTRAINT `fk_galerie_evenement` FOREIGN KEY (`id_evenement`) REFERENCES `evenement` (`id_evenement`) ON DELETE SET NULL ON UPDATE CASCADE;

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
