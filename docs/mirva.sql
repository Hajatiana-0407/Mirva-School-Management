-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : sam. 08 nov. 2025 à 07:03
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
(2943, 'minus-adipisci-at-voluptas-eum-qui-praesentium-3007', 'Minus adipisci at voluptas eum qui praesentium.', 'Quam ducimus natus soluta non perspiciatis. Soluta officiis et quod velit natus ab et qui. Sint accusantium rerum molestiae vitae. Perferendis eum dolor maiores natus et molestiae.', 'Non hic molestiae ad et quam debitis. Reprehenderit deserunt cupiditate iste non iste. Cupiditate voluptatem est voluptates facilis quis enim blanditiis reiciendis.\n\nEt aut alias iste veritatis alias quis dolorem. Quos sit qui accusamus mollitia voluptas enim in. Quisquam sunt ut corporis soluta. Nihil ut quos sint qui sit deserunt.\n\nConsequatur et repudiandae consequatur ratione quam officiis. Fugiat non nesciunt iste ut reprehenderit porro. Quibusdam assumenda temporibus est. Voluptas sint ea dolor aliquid sed harum.\n\nNihil nihil eveniet eveniet numquam. Ratione consectetur nisi quia et vel vel autem sapiente. Ut et omnis deserunt in molestiae voluptas. Velit enim eius adipisci earum illo ipsa similique.\n\nEt dolorem necessitatibus qui. Reprehenderit nulla sit reiciendis provident. Sunt magni et laboriosam.', 'http://www.marty.com/', 'sh', NULL, NULL, NULL, '2025-07-13 00:33:32', 0),
(2944, 'adipisci-sed-ipsam-quos-perspiciatis-3008', 'Adipisci sed ipsam quos perspiciatis.', 'Ipsam debitis quis similique porro. Animi ut nulla ratione nihil. Veritatis temporibus nulla eos similique magnam.', 'Tempora reprehenderit a aut expedita provident iusto est. Deserunt magni ut aut totam dicta. Ut rerum aspernatur dolores cupiditate vero ducimus. Voluptatibus voluptatem natus quibusdam. In qui voluptatem aut non.\n\nMagni architecto odit dicta rerum eum voluptas ea expedita. Eaque ut labore maiores aliquid qui quia possimus veniam. Alias voluptatem autem culpa et magnam ducimus. Quo velit tempore molestiae non officia libero quia qui.\n\nIn non quos est. Ut nesciunt saepe voluptatem quae mollitia omnis facilis.\n\nVeritatis cupiditate omnis sint non possimus non. Voluptatibus nihil nemo possimus sit. Fuga est eius quia.\n\nEos illum quae odio at et voluptatem adipisci. Illum voluptatum adipisci odio eum nihil perspiciatis. Illo sint aut rerum vero consequuntur magnam nisi. Itaque aspernatur voluptatem velit fugiat cum quod.', 'http://www.launay.com/', '', NULL, NULL, NULL, '2025-02-03 08:57:32', 0),
(2945, 'sunt-fugit-itaque-quia-3009', 'Sunt fugit itaque quia.', 'Beatae esse numquam et vitae sit. Sint odit aut architecto id. Dolor sint sit aut ratione unde et.', 'Sunt sed labore laborum qui. Occaecati nesciunt ut aut est voluptates. Omnis eum voluptatum molestiae quia necessitatibus. Odio deleniti sunt voluptas quos minima et exercitationem repudiandae.\n\nEt corrupti hic ipsum maxime explicabo. Ut natus quam est laborum qui dolores ullam error. Tempore accusamus quo eum est et adipisci minima ex.\n\nAd molestiae aut quia temporibus quas qui voluptatem. At non consequuntur qui rerum explicabo. Nobis provident in beatae.\n\nPraesentium et necessitatibus totam vero repellendus reprehenderit. Est eum est veritatis exercitationem voluptatem. Ut labore quo recusandae et.\n\nId non incidunt unde veniam consequuntur et placeat. Minus voluptatem consequatur rerum. Officiis exercitationem tenetur maxime aut velit debitis ut.', 'http://www.raynaud.com/commodi-asperiores-tempore-deserunt-ut-omnis-aliquid-necessitatibus.html', '', NULL, NULL, NULL, '2025-05-28 17:26:39', 0),
(2946, 'fugit-ipsa-magni-dolorem-consequatur-aut-odit-3010', 'Fugit ipsa magni dolorem consequatur aut odit.', 'Fuga quis et incidunt omnis asperiores alias id ipsa. Dolor quia occaecati delectus occaecati. Adipisci harum consequatur consequatur deserunt vero ratione. Molestiae est velit et.', 'Fugit qui suscipit voluptatem quam et eum. Vitae aut consequatur voluptatem autem. Est aut deserunt autem ab vero. Vel quis pariatur aut voluptas atque sunt error quis.\n\nAnimi sapiente corrupti dicta voluptates nihil recusandae itaque. Autem doloribus accusamus molestiae. Rerum quas ullam nulla laboriosam iste quia.\n\nDolores consequatur autem quia sequi est voluptas eum maiores. Dolorum inventore architecto aliquid placeat. Neque et modi optio doloremque aut excepturi.\n\nConsectetur sunt quis cumque sapiente. Unde fugiat eius commodi ut et amet. Eum quidem corporis at porro labore at.\n\nEt consequatur ducimus eum commodi et ipsam aut. Voluptas dolorum dolorum unde officiis dolorum. Iste quia et omnis illo exercitationem voluptates totam.', 'http://www.lefevre.fr/perspiciatis-autem-optio-consequatur-qui-quos', 'xlsm', NULL, NULL, NULL, '2025-03-14 16:55:51', 0),
(2947, 'quisquam-ut-dolor-tempore-sapiente-quam-voluptatem-possimus-dolor-3011', 'Quisquam ut dolor tempore sapiente quam voluptatem possimus dolor.', 'Rem esse beatae molestias neque. Aperiam consequatur dolores in optio consequuntur molestias. Ad dicta aut non cumque dolores.', 'Omnis sapiente quia nulla. Aut doloremque eum doloremque qui. Consequatur distinctio perspiciatis ipsa eum a et. Velit tempore numquam dolorem velit.\n\nBeatae ad distinctio vel nostrum sed quasi. Atque corrupti et porro. Porro facilis vel beatae atque ut.\n\nCulpa voluptatum rerum hic dolores quasi asperiores commodi esse. Officiis rerum rem iste ipsum officia aut corrupti. Voluptatem qui est beatae. Dolor omnis minima incidunt nobis exercitationem. Labore aliquid voluptatem iusto quo.\n\nIure similique aut odit. Iure enim dolores ratione soluta accusamus velit. Reprehenderit consequuntur vitae in nihil eos. Voluptates earum expedita eum nobis dolorum quisquam.\n\nNeque minus minima rerum consectetur rerum rerum ut quas. Id laborum molestias ullam quia molestiae vero maiores tempore.', 'https://www.blondel.com/dolorum-iste-in-autem-doloribus-ratione', '', NULL, NULL, NULL, '2025-10-07 02:16:05', 0),
(2948, 'autem-temporibus-eveniet-quas-praesentium-eveniet-tenetur-3012', 'Autem temporibus eveniet quas praesentium eveniet tenetur.', 'Dicta quae qui id laborum. Quo velit quasi itaque id sed. Accusamus quas qui sed qui. Iste accusantium dolore non fugit.', 'Non incidunt ut atque ut sed sint earum. Unde perspiciatis voluptate quae nulla necessitatibus.\n\nAutem non unde veniam sint explicabo ipsam quibusdam. Dolorum quas velit sapiente impedit. Vero velit cum doloribus esse. Voluptatem repellat neque doloribus placeat sed ipsum.\n\nQuibusdam maiores voluptate eligendi minus asperiores. Voluptates non illo sunt sequi sed rerum. Et id placeat velit. Voluptas ipsum distinctio tempora animi autem. Corporis culpa et aut et.\n\nNihil et voluptate dolor. Illum dolores et quis ea. Earum error quas itaque. Autem ex consequuntur similique in in.\n\nOfficia laudantium est pariatur accusantium consequuntur adipisci vero ea. Quia doloribus pariatur vero illum. Perspiciatis magnam culpa neque neque magnam quis labore et.', 'http://www.thibault.fr/occaecati-assumenda-dolorem-at-est-voluptas-iste.html', 'mdi', NULL, NULL, NULL, '2025-08-09 05:03:44', 0),
(2949, 'qui-autem-soluta-laboriosam-vero-accusantium-nisi-3013', 'Qui autem soluta laboriosam vero accusantium nisi.', 'Sapiente sequi quasi placeat accusantium quia incidunt consequuntur corporis. Possimus molestiae adipisci et et numquam officiis. Eum molestias at nemo quasi est non sequi. Tenetur voluptatem provident voluptatem odit culpa omnis.', 'Accusantium voluptas sed et rerum fuga rem enim blanditiis. Voluptate dolor quod et sit. Labore nesciunt reprehenderit sapiente laudantium voluptatem et recusandae. Est culpa voluptatum in quaerat. Consequatur nihil non ut corrupti ducimus ut neque a.\n\nSaepe dolore quam eveniet. Possimus qui delectus repellendus nam ducimus est aperiam.\n\nVelit similique voluptate amet sunt fuga aut maiores error. Consequatur aut temporibus est labore minima sequi veniam aliquam. Suscipit quasi ut repellat vitae amet beatae. Maxime sed aspernatur quibusdam consequatur.\n\nNemo amet earum fuga quia consequatur eius exercitationem. Magnam illo rerum iure sed. Quo tempora accusamus voluptatem.\n\nVoluptas at quia possimus exercitationem tempore blanditiis quos error. Odit totam placeat iusto accusantium facilis cum sit. Sapiente accusantium nemo reiciendis consequatur magni. Tempore sequi est perferendis reprehenderit.', 'http://www.henry.com/ut-et-alias-repudiandae-eum.html', '', NULL, NULL, NULL, '2025-11-06 20:27:33', 0),
(2950, 'adipisci-molestiae-fugit-id-incidunt-eum-qui-3014', 'Adipisci molestiae fugit id incidunt eum qui.', 'A omnis et accusantium quo ut voluptatum. Quia aut fuga tempore. Soluta aut quidem voluptatem aut et. Nam voluptatem praesentium consequatur qui dolores ut dolorem.', 'Rem qui quo eum vel qui porro. Et ullam accusamus dolor est beatae. Quasi dolores et illo ut suscipit. Qui minima recusandae corporis quas molestiae.\n\nEos consectetur exercitationem qui quia neque ex enim. Aut ducimus quis aut sed.\n\nQui aspernatur placeat reiciendis molestiae rerum. Minus eos beatae dolor sint. Qui aliquam numquam ipsam eos. Corrupti velit dolores eius.\n\nReprehenderit perferendis dolorem quae aut aliquid pariatur laboriosam. Pariatur aliquam voluptatem magni recusandae unde. Quos nemo est placeat atque sit.\n\nEt quos assumenda consequatur illo esse qui fugit. Reprehenderit distinctio soluta dolorem ipsa nostrum. Incidunt quas iste velit debitis ab omnis.', 'http://www.laurent.fr/quos-voluptate-fugit-ut-qui-sunt', '', NULL, NULL, NULL, '2025-09-08 18:09:07', 0),
(2951, 'autem-ipsam-veritatis-non-nihil-voluptatem-optio-laboriosam-3015', 'Autem ipsam veritatis non nihil voluptatem optio laboriosam.', 'Commodi aut ipsa ea vel cupiditate magnam. Est similique repellat reiciendis. Temporibus illo maxime corporis magnam quidem.', 'Voluptatibus nesciunt et perferendis sed quae inventore. Ut et itaque ad aperiam repudiandae dolores nihil. Ex quia eius cumque quidem ratione.\n\nEt consequatur repellendus placeat ut sunt possimus quidem. Laudantium perferendis animi non officia. Dolorum dolores commodi vel suscipit quas.\n\nMinima non adipisci tenetur minima quia. Et dolorum aut voluptatem tenetur enim. Esse et dolor dolore rem quia. Et aliquid quasi earum.\n\nQuis in laboriosam mollitia doloribus hic ipsa. Cumque atque voluptatem totam aperiam. Eos molestiae soluta aspernatur. Aut dolorem culpa sed placeat fuga accusantium.\n\nAutem quos et eos iste excepturi quia quibusdam ut. Assumenda consequuntur nam dicta alias fuga. Voluptates aut aspernatur recusandae est.', 'http://voisin.fr/eos-error-natus-eos-in-quia-illo-quas.html', 'std', NULL, NULL, NULL, '2025-05-12 09:13:49', 0),
(2952, 'nostrum-ullam-excepturi-nostrum-quos-accusantium-maxime-3016', 'Nostrum ullam excepturi nostrum quos accusantium maxime.', 'Ut quia unde perspiciatis ea in molestiae dolor fugit. Nihil laboriosam earum totam excepturi rerum provident velit. Fugit doloremque ipsa deserunt ipsum earum inventore qui explicabo. Repudiandae eligendi suscipit delectus ab excepturi dicta. Aliquid et mollitia odit beatae.', 'Dolore similique eum laboriosam non fugit saepe. Odio odio et cumque enim.\n\nLibero voluptate sed error et voluptates. Et aperiam deserunt quidem.\n\nSapiente corrupti rerum repudiandae itaque voluptas a quisquam nemo. Dignissimos dicta sunt minima neque est. Saepe velit sint repellat consequatur nostrum consectetur voluptatibus.\n\nEt voluptatum qui dolorem. Doloribus harum ut accusantium quaerat. Sit rerum iusto voluptates adipisci aperiam.\n\nAliquid quia mollitia repellat quia nostrum. Officiis quisquam aut blanditiis amet sapiente voluptatem voluptatem quia. Doloremque quia exercitationem qui iure ullam quos ab et. Nam omnis deleniti qui sit quia impedit aut. Iste distinctio omnis quisquam ex.', 'http://martel.org/consequatur-sit-sunt-voluptatem', 'docm', NULL, NULL, NULL, '2025-05-15 22:12:26', 0),
(2953, 'exercitationem-quaerat-eum-accusantium-distinctio-nobis-3017', 'Exercitationem quaerat eum accusantium distinctio nobis.', 'Minus sunt asperiores quibusdam quisquam voluptates quia id. Qui beatae molestiae inventore beatae. Maxime maxime facilis incidunt et quaerat commodi architecto vel.', 'Et nesciunt est ut deserunt nobis. Nihil nihil rerum dolore voluptatem sed qui. Eum delectus saepe aut vel laudantium distinctio. Nobis earum sint rerum officia vel voluptatibus blanditiis libero.\n\nAsperiores odio dolor sint quia odit. Est officia voluptatem at sed fugiat saepe soluta. Alias magni assumenda animi qui aperiam rerum. Eos sapiente veniam et quam et. Ab harum temporibus ut mollitia aut perspiciatis molestias.\n\nDelectus quia aut assumenda autem minima ea perferendis. Itaque reiciendis non et hic. Voluptatibus alias veritatis temporibus illum quia.\n\nMinima est enim odit quidem ut. Accusamus officia necessitatibus eum voluptates eaque. Porro hic error totam ut cumque.\n\nAutem exercitationem aspernatur quis voluptatem ad nihil. Aut quae praesentium exercitationem aut eum aut.', 'http://www.legros.net/', '', NULL, NULL, NULL, '2025-06-24 07:48:56', 0),
(2954, 'ut-praesentium-ullam-error-labore-eum-mollitia-et-3018', 'Ut praesentium ullam error labore eum mollitia et.', 'Et ipsa sint impedit delectus nobis ducimus. Quia at iste adipisci aut. Facilis doloremque consequatur dolorum quam odio.', 'Eum modi exercitationem saepe molestias error. Nisi distinctio rerum aperiam rem necessitatibus. Perferendis aut voluptatem et.\n\nAut doloribus aliquam unde exercitationem ipsa illo totam. Aut nisi aut voluptas aut ea. Architecto qui ea consequatur doloremque nostrum rerum.\n\nDelectus perspiciatis omnis qui odit. Expedita aliquam vel facere voluptatibus facere earum voluptatem. Distinctio voluptatem cupiditate rerum magni.\n\nNulla aut aliquid quia illum et et. Vel corporis molestiae sint repellat velit quasi fugit. Ratione cumque ut sed itaque tempore.\n\nIste nemo quisquam voluptatem velit ea nihil error. Quae ut laboriosam iure non. Illo omnis accusantium laudantium corrupti dolore incidunt. Sint iste est deleniti natus modi sit temporibus.', 'http://garcia.com/', '', NULL, NULL, NULL, '2025-10-22 05:51:52', 0),
(2955, 'eum-dolorum-iusto-quidem-nemo-laboriosam-vel-nesciunt-3019', 'Eum dolorum iusto quidem nemo laboriosam vel nesciunt.', 'Eveniet nostrum est nisi quis animi ad. Officiis cum quisquam cumque officia consequatur. Nesciunt tempora sed quia animi.', 'Odit modi quis eius est voluptates excepturi repudiandae. Corporis facere odit cum magni omnis qui. Delectus enim et quos libero praesentium quam.\n\nEt deserunt consequatur aut odio. Sint quia expedita dolor suscipit quis. Dolor maiores quia non id.\n\nQuas est animi id est voluptatibus. Incidunt neque dignissimos voluptas dolor. Eum recusandae quasi et recusandae saepe.\n\nEsse vero culpa delectus et facilis a eos. Eius quia quo consequatur facere est quia. Perspiciatis ut doloribus occaecati esse. Itaque reprehenderit facilis dolorem sed temporibus.\n\nIllo et illum dolor ad nam facere. Eaque sint in ut quia. Esse eum qui vitae omnis fuga. Dolores excepturi et omnis et nulla quia.', 'http://descamps.fr/', 'lostxml', NULL, NULL, NULL, '2025-01-15 19:15:19', 0),
(2956, 'qui-natus-odio-velit-qui-quidem-3020', 'Qui natus odio velit qui quidem.', 'Quia a dolor optio molestias velit. Quia ut est omnis maxime dolorem qui. Est et ratione esse porro voluptatem in modi. Quia voluptatem enim voluptatem quis itaque ut.', 'Beatae ut corporis vel. Officia facere vero necessitatibus minus vel omnis. Harum consectetur nostrum ratione corporis quia voluptas quod.\n\nUt ut et nobis veritatis hic amet. Asperiores et asperiores sapiente rerum eum mollitia eum. Rerum ut perferendis autem omnis. Velit incidunt voluptatem quia ducimus fuga deleniti.\n\nAtque quidem rem nulla omnis et. Labore sunt modi sit ut quidem.\n\nVoluptates autem distinctio error sit. Explicabo ad repellendus reiciendis. Excepturi error laudantium sed placeat laboriosam magni. Maiores vero culpa dignissimos soluta.\n\nSoluta ipsa qui autem vel sequi error minima. Totam fuga commodi qui distinctio fugiat. Amet maxime odit voluptas est non possimus incidunt. Asperiores harum iusto temporibus harum voluptate rem.', 'http://www.legrand.fr/non-voluptatem-quae-nihil-sunt-harum.html', 'dae', NULL, NULL, NULL, '2025-05-20 18:15:32', 0),
(2957, 'aliquid-numquam-sunt-id-3021', 'Aliquid numquam sunt id.', 'Ullam quis vitae totam harum qui. Deleniti impedit sunt quibusdam animi adipisci. Voluptas asperiores maiores vitae eum.', 'Qui incidunt sequi ut. Eos est vitae harum aut alias.\n\nVoluptatum amet praesentium repudiandae. Modi sapiente eligendi voluptas atque sed maxime. Perferendis iure et provident.\n\nNihil ratione ea ex eligendi perferendis ut aut. Occaecati reprehenderit unde voluptas sapiente et saepe explicabo.\n\nTenetur rerum porro culpa aut illum. Doloribus et quos in ipsa. Assumenda architecto sit quidem voluptatem tenetur dolorem doloribus qui. Amet qui esse vel rem.\n\nQuae esse dolor rerum et et quaerat. Assumenda ut maiores impedit aut ut tempora. Ut quo hic molestias possimus et et. Qui molestiae voluptatem commodi sed et.', 'http://www.allain.fr/numquam-esse-maiores-libero-dolorem-vitae', 'ods', NULL, NULL, NULL, '2024-12-10 06:28:11', 0),
(2958, 'amet-magnam-voluptas-enim-maxime-3022', 'Amet magnam voluptas enim maxime.', 'Alias quis id ipsa voluptates beatae. Voluptatem autem nulla quia quod eveniet.', 'Autem illum dolorem ducimus voluptatem. Atque aperiam molestiae ipsam aut voluptas natus est. A provident qui qui sint esse.\n\nHic pariatur et voluptatem et aut harum. Ab accusamus quisquam perspiciatis nemo. Facilis autem quisquam officia assumenda sunt.\n\nPerspiciatis ducimus et velit qui quisquam. Non ullam illo nihil et eos error magnam similique. Odit voluptatum voluptas eum minus aliquid id minima ratione. Perspiciatis occaecati asperiores tenetur enim.\n\nDolorem velit quis omnis ea amet sint autem. Officiis veritatis similique id dolorem voluptas omnis labore. Cum sed porro similique quis voluptatem soluta. Praesentium est est quia aspernatur eveniet.\n\nEius quibusdam non eos explicabo et. Ea totam nisi eum ab deleniti. Et molestias ut architecto quia blanditiis sequi. Veritatis omnis praesentium ab veritatis non.', 'http://caron.com/ipsum-tempora-similique-quo-non-id-ab', '', NULL, NULL, NULL, '2025-07-01 22:23:09', 0),
(2959, 'ea-est-et-voluptatem-nostrum-ea-earum-3023', 'Ea est et voluptatem nostrum ea earum.', 'Ex ut nisi sed eveniet consectetur. Est voluptatem officiis delectus voluptatem ut aliquid. Optio et amet recusandae beatae qui tenetur aspernatur. Qui rem aperiam quaerat consequatur qui.', 'Minima sit unde labore quidem. Qui consequatur cum adipisci aut et perspiciatis. Aliquam iusto quo et ut aut. Saepe consequatur tenetur sequi velit impedit delectus pariatur.\n\nHarum nisi aperiam ut consequatur minima fugiat. Quasi tenetur sunt dolor reprehenderit. Veniam aspernatur vel quia sed. Repellendus voluptatem assumenda vitae sed et atque cum non.\n\nSit laboriosam unde est numquam quae. Rerum aut vel voluptas voluptatem.\n\nDucimus dolorem natus numquam nemo. Quidem voluptatum occaecati molestiae quo.\n\nAut quae neque sed et facere iure. Dolores et enim est quia et. Vitae voluptatem mollitia repellat placeat.', 'https://www.monnier.fr/officiis-ab-sint-eum-quia-dolorem-laudantium-sit', '', NULL, NULL, NULL, '2025-07-24 20:25:03', 0),
(2960, 'sequi-ducimus-accusantium-voluptatem-mollitia-numquam-dolore-3024', 'Sequi ducimus accusantium voluptatem mollitia numquam dolore.', 'Velit in quia eius ut. Ipsum repellat omnis non commodi dolor voluptate ad. Corrupti sit cum nostrum.', 'Itaque ut iure modi ut. Dolorum non quisquam tenetur velit perspiciatis. Et molestiae ut magnam minima dolor vel.\n\nDicta natus porro quo nostrum omnis ea. Eum quibusdam quia et sunt ullam totam odit.\n\nEum inventore et aut doloribus velit dolores. Dignissimos fuga sit maiores inventore atque. Officiis dicta dolores consequatur sit est.\n\nVeritatis deserunt perferendis corporis aut repudiandae tempora reiciendis. Aliquid consequatur reiciendis placeat quia natus ipsam. Molestiae adipisci quibusdam voluptatum vero dolores eius quis. Deleniti voluptatem assumenda iusto itaque sit qui nihil.\n\nQuia cupiditate reiciendis porro recusandae est. Cupiditate dolorem et iure tenetur. Quaerat omnis qui expedita consequatur. Ullam quo architecto et ad aut quia.', 'http://daniel.fr/molestias-magni-dolorem-qui-est-molestiae-repellat-nam-odio', '', NULL, NULL, NULL, '2025-07-09 12:56:20', 0),
(2961, 'praesentium-vel-possimus-nihil-alias-molestias-ut-3025', 'Praesentium vel possimus nihil alias molestias ut.', 'Doloremque ab quis et. Impedit exercitationem odit et enim nobis numquam. Iure suscipit a dolores deserunt voluptatum sed ut.', 'Quisquam deserunt modi consectetur omnis assumenda nobis voluptatem. Sit ipsam aut necessitatibus in suscipit eveniet. Sequi dolores adipisci expedita in illum sunt dignissimos rerum.\n\nAccusantium eius harum omnis eum. Beatae quam autem illo voluptates inventore. Sequi omnis quaerat maxime et quo aut sed est. Eveniet quo inventore quo est.\n\nOmnis aliquam nihil nisi consequuntur ut. Laborum ipsum et debitis ea. Error quis et explicabo quidem reprehenderit quia.\n\nQuaerat dolor quod est aut nam veniam aliquam. Vitae omnis animi omnis. Quia laudantium repellat aspernatur esse aut expedita consectetur sequi. A vero illo doloribus recusandae a eius voluptates.\n\nVoluptas voluptas esse ut odio unde. Voluptatibus voluptatum voluptatem natus aut odit asperiores reiciendis. Eaque aut esse molestias dolorum officia incidunt omnis alias.', 'http://www.jourdan.com/incidunt-enim-ut-esse-dolorem-non-adipisci-quae', 'xml', NULL, NULL, NULL, '2024-12-11 04:02:01', 0),
(2962, 'debitis-sed-dolore-dolores-et-unde-dolores-voluptas-maiores-3026', 'Debitis sed dolore dolores et unde dolores voluptas maiores.', 'Voluptas accusantium sunt voluptate earum nam distinctio consequatur hic. Id sunt alias deserunt sequi voluptatem. Velit delectus et quos. Dolorem harum et ipsa qui voluptatem veniam maxime.', 'Occaecati quaerat et voluptatem omnis. Minima quas reprehenderit totam libero accusantium eligendi officiis provident. Illo iure illo quo omnis non.\n\nUt et nisi in. Voluptatem molestiae dolor doloremque soluta ut et quae. Voluptas rerum at porro enim non voluptatum.\n\nEt voluptatem quia quibusdam magnam in. Consequatur id eos explicabo alias natus voluptatem. Quis ut dicta est quia.\n\nRerum dignissimos a est non omnis in. Neque porro non similique tempore sint debitis. Et aut eveniet qui rem vitae repellendus reiciendis aperiam. Magni est rem magnam velit laboriosam vero.\n\nMagnam quia blanditiis velit quia iusto ut dolores harum. Eos magnam dolore nesciunt soluta aliquid quis qui. Soluta nihil voluptatum sit dolore dolor. Sit natus voluptatum autem earum.', 'http://wagner.fr/aut-expedita-magnam-ut-distinctio.html', '', NULL, NULL, NULL, '2025-04-20 08:30:45', 0),
(2963, 'dicta-nostrum-sapiente-aut-consequatur-aperiam-3027', 'Dicta nostrum sapiente aut consequatur aperiam.', 'Qui et non perspiciatis vel quod ut. Dolor non eos provident dolores consectetur nam. Ab qui dignissimos odit rem minus optio.', 'Ipsum et officiis fuga maiores numquam praesentium. Porro quo dolorem eos alias quos.\n\nNam id ipsa commodi vitae. Consequatur cum molestias iusto cum suscipit. Dignissimos velit ea accusamus.\n\nExcepturi ut quibusdam rerum impedit quaerat. Aut in saepe nostrum explicabo enim minus. Aut et quia adipisci aut dolores. Explicabo perspiciatis qui iste nihil voluptate ipsam.\n\nVel aut libero inventore laboriosam quidem recusandae. Et qui rerum recusandae aut laborum sunt perspiciatis illo. Quia reprehenderit dignissimos et. Aliquam nihil molestias pariatur sunt quis atque fugiat distinctio.\n\nAd voluptatem quia ut voluptates ea in molestias. Aliquid ea impedit quod eos iste sint laborum. Porro dicta dolorem quod aspernatur sunt et. In dolore enim necessitatibus commodi possimus quia aspernatur.', 'https://ollivier.org/voluptas-omnis-laboriosam-ipsa-facere-eum-alias-odio.html', 'ppm', NULL, NULL, NULL, '2024-12-12 18:45:36', 0),
(2964, 'autem-numquam-blanditiis-voluptatem-natus-rerum-3016', 'Autem numquam blanditiis voluptatem natus rerum.', 'Corporis provident necessitatibus deleniti ut quo sed. Numquam et deserunt laudantium et. Facere iure a itaque. Quaerat nostrum aliquam sint voluptas eos.', 'A vel impedit molestiae beatae alias odio. Animi voluptatem molestiae non est ut. Aut tenetur omnis aut ea corrupti rerum eos.\n\nNam in omnis soluta voluptas voluptatibus est. Unde maxime ullam et temporibus commodi laudantium veritatis. Commodi esse minus deleniti voluptate ducimus. Eum sed et et dolores ea.\n\nAd ipsa sapiente voluptatem quasi sunt. Sit natus doloremque molestiae ut. Et commodi ipsa rerum sit odit dolores. Debitis magnam harum consectetur aut tenetur vitae unde. Sit qui voluptatem odit odio quas itaque tempore.\n\nSequi accusamus incidunt a quae voluptatem saepe. Culpa aut sapiente unde voluptatem ut voluptatem ut eum. Sunt quaerat qui dolore libero error maxime iste.\n\nRem eius voluptate ipsum autem sit similique iste iste. Voluptas eum aspernatur magni ipsa commodi. Nulla omnis velit doloribus. Autem perspiciatis necessitatibus earum doloribus est.', 'http://andre.fr/velit-eveniet-velit-rerum-pariatur-et-saepe-facilis-quo', '', NULL, NULL, NULL, '2024-11-30 13:03:16', 0),
(2965, 'officia-culpa-quisquam-cum-velit-ut-similique-pariatur-deleniti-3017', 'Officia culpa quisquam cum velit ut similique pariatur deleniti.', 'Possimus quod labore magni commodi a adipisci. Esse consequatur id nisi perspiciatis. Natus reprehenderit porro quod aspernatur. Ut aut saepe beatae sunt necessitatibus.', 'Quo iusto est unde quos distinctio. Consequatur odit et dolore enim. Iusto qui necessitatibus non voluptas. Sequi quis aut dolores non omnis explicabo consequatur fugit. Repellat aliquam laboriosam corrupti sunt.\n\nConsequuntur placeat non nam dignissimos quia qui non. Numquam incidunt molestiae explicabo velit maxime iusto. Et occaecati iure nesciunt fugit.\n\nSunt sit perferendis totam quibusdam. Ut dolorem ducimus ut dolor deserunt illum rerum doloribus. Atque cum eos molestiae autem. Quibusdam nulla perspiciatis qui non iusto atque quod.\n\nEx sed aliquid amet voluptatem quo ut eum. Rerum vero quia iste illo. Rerum omnis deserunt porro voluptatibus et sed et. Non facilis ducimus ut voluptatem pariatur laborum. Et asperiores consequuntur adipisci reprehenderit tenetur.\n\nEum aliquid ab dolorem veritatis. Aut qui consectetur eveniet ducimus. Non sit sed earum aperiam distinctio. Qui ut quidem nulla dolores odio labore dolorem.', 'http://barbier.com/est-beatae-omnis-aut-sint.html', 'ims', NULL, NULL, NULL, '2024-12-29 06:32:56', 0),
(2966, 'in-molestias-in-quis-quibusdam-3018', 'In molestias in quis quibusdam.', 'In ad at quia veritatis esse vel. Quia eos perspiciatis quidem rerum dolorum. Totam eligendi accusantium ea est eos ut. Voluptas cum beatae sint reiciendis debitis.', 'Quae voluptatem atque eum voluptas facilis. Explicabo doloribus commodi rerum aut voluptatem eveniet nam. Velit ullam eos magni et rem enim neque est.\n\nFacere quia aut perspiciatis animi nesciunt in dolor. Temporibus et laboriosam fuga voluptatum dolores ut.\n\nVel accusantium et cumque incidunt qui. Esse minima voluptatem quod tempore illo. Voluptas sed aliquid et at eum omnis voluptas. Est quis expedita vitae.\n\nAlias et enim optio distinctio porro autem enim. Neque sint aspernatur sit necessitatibus numquam voluptatem animi. Magni et sit reprehenderit praesentium sit tempore. Quod autem aliquam quidem repudiandae et voluptas.\n\nOmnis qui reiciendis et minima ipsum. Placeat officiis dolores placeat dignissimos cupiditate. Iste voluptatem eligendi eum inventore quibusdam illum.', 'http://www.valette.com/dolorum-iure-nulla-itaque-ex', 'spl', NULL, NULL, NULL, '2025-03-01 13:04:24', 0),
(2967, 'amet-et-culpa-doloribus-odit-voluptatibus-nulla-3019', 'Amet et culpa doloribus odit voluptatibus nulla.', 'Ut voluptate officiis eius voluptas praesentium ipsum itaque enim. Est quis eligendi consequatur autem laudantium sint quod voluptatem. Quisquam commodi est quia et doloribus quia. Ipsa nesciunt inventore et id ad tempora.', 'Dolore eum reprehenderit est reiciendis voluptatem. In omnis nihil quae dolor. Eos repellendus laborum nihil sit assumenda. Fugit iure facere est.\n\nQui sunt fugit eligendi commodi. Minus atque voluptatem ut et dolorem deserunt et. Cupiditate sed quia ab sit accusamus doloribus aut.\n\nDolores animi illo hic dolores rerum. Necessitatibus aut sequi illo sunt ut sapiente et vel. Sit animi velit temporibus ut corrupti placeat. Magnam doloremque aut doloribus tempora porro excepturi harum.\n\nMinus rerum sit quo odit reprehenderit ullam pariatur. Amet praesentium aut sequi voluptatem suscipit non mollitia. Dicta maiores itaque fuga laboriosam aliquid eos nisi voluptatum.\n\nAd omnis unde occaecati necessitatibus laborum velit animi. Iusto quia corrupti et dolores totam. Sunt quo vitae molestias similique et sed unde.', 'https://rolland.net/omnis-laudantium-et-modi-eius-ipsam-tenetur-voluptas.html', '', NULL, NULL, NULL, '2025-07-02 12:09:02', 0),
(2968, 'aut-ea-consequatur-quibusdam-adipisci-dolorem-voluptatem-nostrum-3020', 'Aut ea consequatur quibusdam adipisci dolorem voluptatem nostrum.', 'Eum consequatur qui eaque doloribus recusandae earum. Sunt ipsam at repudiandae quis laudantium. Quibusdam dignissimos ut nemo expedita sapiente quia quisquam.', 'Iste rerum officia voluptas quia voluptatem illum. Veritatis numquam quia atque voluptate rerum reiciendis. Fugit iusto quos sint vel. Ut inventore soluta delectus.\n\nInventore facere nemo nostrum enim. Et magni ab accusamus pariatur ut qui. Placeat excepturi eum facere rem voluptas. Repellat a provident ut consectetur et dolor doloribus.\n\nNeque ratione cupiditate dignissimos commodi illo sint possimus et. Dolores ex quibusdam veniam aut quam. At est saepe atque est.\n\nOfficiis tenetur voluptatem unde. Velit et non ea rerum quia cum et.\n\nQuia dolore fugiat iure quia reiciendis similique architecto esse. Dolorem beatae labore dolores. Est et sunt sit. Et sed beatae voluptate voluptatibus iusto.', 'https://www.lamy.fr/illum-recusandae-nihil-autem-architecto-amet', 'xslt', NULL, NULL, NULL, '2025-03-26 23:01:19', 0),
(2969, 'magni-aut-enim-dolorum-et-vitae-3021', 'Magni aut enim dolorum et vitae.', 'Est accusamus maiores corrupti optio culpa consequatur. Asperiores ducimus tempore et perferendis et sapiente est. Ratione dolorem ullam sequi corrupti quia quasi sed.', 'Quos laboriosam et suscipit nihil magni quaerat dolorem. Molestiae et incidunt dolorem. Rem illo sit dignissimos quis in sed repellat id. Asperiores et incidunt repudiandae dolorem.\n\nAsperiores quis est sed nihil et. Sit a et dignissimos culpa nobis et. Asperiores nihil sed et. Voluptas iure aut et qui modi non et. Eos eveniet aut ab aut.\n\nAdipisci in quibusdam iure qui ex cupiditate. Id modi quibusdam omnis nesciunt quisquam est. Repellendus at quos est.\n\nNecessitatibus possimus et placeat aperiam quod. Delectus inventore dolorem voluptatem ipsa est quo voluptatibus illo.\n\nAliquid et nulla earum velit optio quam atque. Enim quaerat sint explicabo quibusdam. Reprehenderit debitis consequatur sed minima corporis.', 'http://gimenez.fr/autem-in-velit-dolor-consequuntur', 'cgm', NULL, NULL, NULL, '2025-07-14 21:15:17', 0),
(2970, 'debitis-et-non-aut-id-in-3022', 'Debitis et non aut id in.', 'Enim quia et et magnam. Deserunt enim exercitationem et in sint consequatur. Consequatur aperiam fugiat eum autem.', 'Perferendis qui natus occaecati officia. Nulla mollitia et veritatis accusantium. Laborum saepe iure impedit aliquam sunt provident accusamus.\n\nPraesentium eos voluptas corporis nulla recusandae ipsam. Laborum est assumenda facere. Non tempora et rerum adipisci omnis vitae non. Corrupti soluta accusantium iste.\n\nQuia fugit iusto error omnis. Qui tenetur facilis id assumenda sunt. Porro autem quia veritatis tenetur adipisci debitis rerum dolores. Ipsa porro libero cumque officia unde autem delectus.\n\nSed eius consequatur eveniet neque. Recusandae sed aperiam tenetur quia harum veritatis velit. Quia sunt architecto voluptas iusto aut autem.\n\nError provident nihil ab reprehenderit. Voluptates quidem voluptas vero accusantium. In odit hic nisi.', 'http://www.coste.fr/saepe-aliquid-optio-magni-delectus-suscipit', '', NULL, NULL, NULL, '2025-04-20 13:57:35', 0),
(2971, 'ut-rerum-ut-omnis-qui-a-qui-3023', 'Ut rerum ut omnis qui a qui.', 'Aliquid aspernatur sunt ea sunt. Omnis nobis aut exercitationem aut quo nemo voluptates. Distinctio est quia voluptatem necessitatibus inventore.', 'Voluptatibus similique cupiditate autem deleniti cumque dolor. Quaerat consequatur beatae libero accusantium modi ad. Veritatis facere dolor nobis corrupti in. Numquam voluptas velit ducimus qui voluptatem qui eos fuga.\n\nOfficiis sunt eligendi officia velit officiis atque. Hic excepturi sit atque beatae nihil et sed ipsam. Ut eveniet eum omnis et. Sint facere laboriosam iste id. Voluptatem consequuntur non est deserunt sit voluptate ut.\n\nAsperiores vel sequi asperiores impedit cupiditate laboriosam expedita praesentium. Non voluptatibus illum fuga. Ut optio totam veritatis odit repudiandae in fuga.\n\nEt quod consequatur modi ducimus. Distinctio voluptates eos aut eligendi. Necessitatibus sunt nihil magni iure. Magni voluptas aliquid a saepe. Ea sequi dolor velit.\n\nIn quidem sit odio natus ut nostrum. Unde corrupti ut voluptatibus suscipit ut ea. Sed qui minima distinctio consectetur vero cupiditate laborum.', 'https://www.olivier.com/ut-atque-sunt-nisi-eveniet', 'xvml', NULL, NULL, NULL, '2025-02-09 10:46:12', 0),
(2972, 'saepe-ut-consequatur-officia-3024', 'Saepe ut consequatur officia.', 'Nemo perspiciatis nesciunt ut perspiciatis assumenda ea. Eum iste est quia voluptate nobis aperiam quo. Eius officia assumenda quis nisi.', 'Quaerat repellat laboriosam et. Quia voluptate deserunt quidem eius ut vero. Saepe voluptate similique et laudantium.\n\nMaxime nulla facilis mollitia ea culpa soluta eos. Voluptates error veritatis voluptas itaque consequatur dolor. Voluptas odio molestias quas. Illum fugiat illo praesentium sequi.\n\nVoluptatum nihil consequatur quis. Quas doloremque voluptatem impedit reprehenderit voluptatibus. At voluptates eos sit nam unde totam.\n\nVoluptatem et quasi est. Iste ab reprehenderit quo aut.\n\nAssumenda error molestias sed harum. Amet reiciendis assumenda ea. Delectus aliquid enim nihil ducimus eum nihil blanditiis est. Distinctio dolorem non doloribus aliquid eos est.', 'http://www.evrard.fr/quaerat-aliquam-consequatur-id-dolores', '', NULL, NULL, NULL, '2025-08-10 03:56:55', 0),
(2973, 'excepturi-est-ad-molestiae-vero-architecto-3025', 'Excepturi est ad molestiae vero architecto.', 'Voluptatibus error numquam deserunt ratione reprehenderit qui. Sapiente explicabo architecto est repudiandae. Voluptatum assumenda ab iusto et.', 'Enim libero ea repudiandae tempora modi. Voluptatem et ducimus dolores consequatur. Quidem autem facilis modi maiores ea.\n\nEt rerum odio autem sit illum doloremque recusandae. Eveniet ut dignissimos eum quae impedit. Ut laudantium doloremque aut facere quis.\n\nNobis est ipsa odio voluptatem. Perspiciatis hic amet voluptas et quibusdam deleniti. Accusamus atque dicta ducimus quae vel. Est maiores illum recusandae perferendis est veniam.\n\nRerum nobis distinctio ab voluptatem expedita assumenda non. Eos velit enim velit odit. Delectus distinctio impedit magni sapiente delectus. Et dolore quia molestiae error doloremque.\n\nQuo labore ullam dicta aut excepturi officiis vitae. Veniam repudiandae dignissimos architecto. Molestiae ipsam sed et nihil quos quos eum. Suscipit aut eos est et eveniet quae.', 'http://chartier.com/', '', NULL, NULL, NULL, '2025-03-28 16:55:40', 0),
(2974, 'ut-sed-et-quo-beatae-consequatur-3026', 'Ut sed et quo beatae consequatur.', 'Incidunt sit eos amet doloribus autem. Illo qui sunt nihil excepturi quod dignissimos quo. Nesciunt voluptatem aliquid est possimus.', 'In qui tenetur excepturi. Ipsum harum molestias deleniti quaerat veniam.\n\nAut sint libero est nesciunt culpa error cumque fugiat. Maiores mollitia et est. Saepe hic modi aspernatur mollitia nihil. Et modi aut aut maiores et.\n\nOdio nesciunt ratione quia cupiditate omnis. Minima ea autem ut assumenda enim nesciunt voluptatibus. Voluptas nobis consequuntur qui ut reprehenderit.\n\nEius id rem eum. Porro voluptate itaque sint sunt id nam dolorum suscipit. Laudantium vel quis adipisci ut nulla.\n\nOptio vel impedit ut eveniet at. Expedita voluptatem totam beatae fuga. Nemo minus saepe ipsam a corrupti rerum. Natus laboriosam nam eos dolorem hic nihil excepturi.', 'http://pires.net/ipsum-voluptas-aut-repellendus-aut-doloribus', '', NULL, NULL, NULL, '2025-03-20 05:44:48', 0),
(2975, 'est-amet-adipisci-porro-alias-natus-asperiores-labore-3027', 'Est amet adipisci porro alias natus asperiores labore.', 'Architecto saepe aut quia cum et sit. Est sit dicta dolor vero sit voluptas non. Et quo dolorum itaque quaerat amet dolorem temporibus. Sit pariatur laboriosam debitis ipsum est.', 'Laborum qui aperiam ipsum quis minima. Quo et cumque neque qui aliquam est nobis. Ipsa placeat perspiciatis dolores consequatur.\n\nAut nesciunt rerum est consequatur ex. Voluptas voluptatem tempora soluta dolor eum excepturi quis. Nihil tempora expedita labore est molestiae aut.\n\nEst eos ad est delectus. Dolores assumenda quo autem sint molestias voluptate tempora. Consequatur est harum in voluptate vitae itaque.\n\nNeque similique sed rerum ut voluptates omnis. Laboriosam voluptate impedit numquam itaque. Cum quod accusantium et aspernatur eos in. Quia voluptatem nostrum rem maxime.\n\nNatus odit nemo voluptatibus ut. Iusto ad impedit omnis totam quis esse. Ab quis ipsa minus vero et quia at. Distinctio laboriosam est nesciunt odit exercitationem voluptas sed.', 'http://www.marechal.fr/', 'kia', NULL, NULL, NULL, '2025-06-27 23:50:28', 0),
(2976, 'animi-earum-maxime-est-repudiandae-dolor-3028', 'Animi earum maxime est repudiandae dolor.', 'Cupiditate at officia quia. Sed voluptas reiciendis molestiae ratione omnis.', 'Perferendis excepturi ad et reprehenderit est aut qui. Sapiente expedita voluptatem ut culpa. Ipsa corrupti et sunt corporis autem. Aut voluptatem nam quas excepturi voluptate recusandae nam.\n\nAut at dolorum non facere quia. Et velit autem et qui et. Aliquid id sint impedit nobis est rerum. Ea ut fugiat qui eum.\n\nIusto ullam cupiditate debitis quasi dolor. Veniam ut quidem aut omnis. Illum molestias non pariatur qui aut. Optio totam laborum hic dolorem.\n\nVitae amet voluptatum veniam dicta atque sapiente omnis. Quisquam ut ut fugit tempora impedit. Blanditiis voluptatibus doloremque et dolores culpa ducimus ducimus. Officia sunt veniam nemo repellat aut.\n\nVero quis alias dolorem assumenda illo in. Dignissimos id eaque id in sit fugit harum. Tenetur quos eum ea. Quis rerum adipisci aspernatur incidunt. Architecto consequatur nihil minima aut totam sapiente.', 'https://gerard.fr/sapiente-dolorum-maxime-et-officia-magni.html', '', NULL, NULL, NULL, '2025-09-28 00:30:21', 0),
(2977, 'ullam-eos-qui-debitis-perspiciatis-ipsam-3029', 'Ullam eos qui debitis perspiciatis ipsam.', 'Reiciendis tempore sint odio corporis tempore cumque. Velit itaque cupiditate qui autem et. Aspernatur facere ab itaque minima.', 'Necessitatibus laudantium inventore reprehenderit id explicabo dicta veniam iure. Quod id eos laborum. Illum et in enim aut fugiat quis. Voluptate sunt distinctio deserunt natus et eius.\n\nQuisquam ab nulla nam aut et voluptatem. Saepe velit nemo et atque. Eos ut consequatur tempore et animi aspernatur.\n\nQuia quis iure in fuga voluptates et. Voluptas soluta quis deleniti. Consectetur consequatur doloremque quaerat delectus enim totam dignissimos in.\n\nSit totam soluta sunt unde. Molestiae aliquid rem quia aut eos aut. Porro quis explicabo consequatur dolores odio quo. Numquam quo impedit fuga qui.\n\nHic sint et rerum voluptatem est dignissimos perferendis totam. Aut nulla et distinctio cum dicta autem. Aut consequuntur corrupti quia ab dolor omnis eos. Nostrum iste deleniti porro perspiciatis ab non ullam laudantium.', 'http://www.renard.fr/at-perspiciatis-voluptatibus-commodi-exercitationem-hic.html', 'sti', NULL, NULL, NULL, '2025-08-15 19:01:30', 0),
(2978, 'porro-harum-voluptates-quis-nihil-voluptatibus-voluptates-3030', 'Porro harum voluptates quis nihil voluptatibus voluptates.', 'Nam voluptatem quas numquam ducimus mollitia. Dicta inventore itaque rem et et ducimus aut est.', 'Recusandae nostrum natus dolores corporis est. Quibusdam sed dolor sint assumenda aliquid reiciendis. Consequatur recusandae id quas autem.\n\nAt sed omnis et. Et voluptatibus est eum vitae. Voluptate nobis quod sed expedita ut libero. Mollitia itaque ducimus et eos esse qui.\n\nEum earum magni provident neque voluptatum commodi iure. Tempora neque dignissimos voluptas temporibus autem ipsam adipisci. Ad inventore amet harum dolorem perspiciatis consequatur dolorem.\n\nQuis assumenda placeat adipisci accusantium praesentium veritatis. Nostrum at odit reiciendis non. Ex dicta corporis laborum quae voluptas. Qui omnis excepturi iusto autem magni et.\n\nAut corporis esse doloremque qui. Accusantium cupiditate laborum voluptas reiciendis aperiam tempora aliquam. Non doloremque beatae ipsa nihil illum ipsam.', 'http://www.philippe.com/sunt-modi-adipisci-est-ut-ad-voluptatem-rerum.html', 'xif', NULL, NULL, NULL, '2025-07-04 05:28:41', 0),
(2979, 'et-asperiores-facilis-quo-in-qui-3031', 'Et asperiores facilis quo in qui.', 'Ut quo natus ducimus quis culpa modi. Aut corporis dignissimos quos ut quod repellendus et. Fugiat totam quod veniam earum sunt est placeat qui. Recusandae suscipit possimus rerum est exercitationem nam.', 'Ut doloribus quia ex perferendis. Saepe itaque delectus enim sapiente est rerum. Aut non commodi est ut laudantium impedit repellat quia.\n\nQuia enim ullam est dolorem quasi. Dolores similique tempore qui recusandae.\n\nRepudiandae amet autem voluptatem vitae voluptas quaerat alias. Molestiae fugit rem consequuntur consectetur explicabo suscipit harum. Quae consequatur et sit nisi earum nemo maxime.\n\nAutem libero debitis laudantium quasi quo. Dolor rem quae ab qui temporibus illum autem. Incidunt sed amet nostrum et repellendus maiores.\n\nCum repellendus ut facere voluptate quos. Architecto debitis ipsa voluptatem impedit autem. Blanditiis commodi eaque itaque consequatur corrupti pariatur. Voluptas eaque cumque sed consequatur eos. Reprehenderit consequatur mollitia sint.', 'http://www.roger.com/fuga-laborum-beatae-commodi-quod-magni-reiciendis-et', 'm14', NULL, NULL, NULL, '2025-06-11 06:20:13', 0),
(2980, 'omnis-maiores-dolorum-beatae-eligendi-non-3032', 'Omnis maiores dolorum beatae eligendi non.', 'Odio in rerum sit molestiae ratione ut est. Tenetur nam reprehenderit qui et reiciendis quod. Soluta quia aperiam nemo.', 'Fuga itaque sed aliquid hic sed ad dolorem ipsam. Voluptas eius sequi et atque ut debitis fugiat. Sint commodi iure eveniet et nam iure. Dolorum quod rem dicta dolor et et.\n\nRecusandae sit iste maxime. Saepe repellat perspiciatis suscipit sed qui in quod voluptates. Architecto at ducimus suscipit eius expedita earum est. Aut quaerat corrupti ut aperiam.\n\nUt impedit consectetur dolorem ea occaecati unde. Id illo repudiandae molestiae voluptatem quasi. Optio est dolorem eum. Autem eveniet iste mollitia dolorum optio tenetur odit. Unde sed quis quos.\n\nError quas rerum sapiente ut libero. Fugiat consequatur perferendis nisi est. Reprehenderit hic possimus velit ducimus qui illum voluptatem.\n\nDebitis deleniti quia est et. Dolores quia asperiores fuga velit quibusdam officia sunt. Earum laudantium consequatur optio labore nam ipsum facere aperiam.', 'http://roche.com/ullam-voluptas-sed-rem-itaque-repudiandae-qui.html', '', NULL, NULL, NULL, '2025-07-07 19:31:12', 0),
(2981, 'temporibus-voluptatibus-odio-at-illum-3033', 'Temporibus voluptatibus odio at illum.', 'Sit maxime blanditiis ut iusto quis. Vel molestiae aliquam nulla quod nihil ut voluptatem. Rem qui sint est odio.', 'Odio autem voluptatem expedita dicta ad. Repellendus eaque eaque voluptate quia vero architecto ut consectetur.\n\nDolorum aliquid eos optio provident. Voluptatem quis animi cum suscipit nihil. Doloremque velit aperiam temporibus dolores accusamus. Ut ut ad non rerum id occaecati.\n\nEst veritatis accusantium excepturi voluptates quis. Aperiam corrupti veritatis qui vitae veritatis id autem. Deserunt iure quas voluptatem totam reiciendis voluptatem tempore fugit. Reprehenderit fugit sed ducimus et aut a.\n\nTempora aspernatur quod eius odio. Eveniet quis voluptates ut illo nobis quibusdam quam. Natus tempora at sapiente omnis magni qui. Nulla aut in et deleniti ab quisquam.\n\nItaque modi beatae perferendis ratione fugiat. Autem doloribus velit vel rerum hic.', 'https://lacroix.net/aspernatur-ipsum-eligendi-consequuntur-ipsam-asperiores-autem.html', 'odc', NULL, NULL, NULL, '2025-05-02 11:21:54', 0),
(2982, 'quam-odit-possimus-ut-quia-3034', 'Quam odit possimus ut quia.', 'Error enim tenetur voluptate non nisi ex fugit. Voluptas sed provident cum impedit blanditiis ut enim. Incidunt repellat temporibus voluptas rerum voluptas ducimus deleniti maxime. Et velit ratione eum eum earum. Sed architecto explicabo ut architecto voluptate nobis.', 'Nobis rerum odit dolores corporis ut ut. Quas rerum aut dignissimos nihil quo doloribus. Et excepturi perferendis numquam et tempora quasi quia sed. Voluptatem incidunt est eum est eum.\n\nEnim debitis qui voluptatem veritatis dolor. Qui porro alias qui et voluptatem. Rerum quod unde qui hic veniam non ut. Illo aut voluptatem recusandae ut modi voluptates quia et.\n\nQuo aut aperiam quia et. Harum voluptatem eius suscipit.\n\nEt possimus fuga autem qui. Sed natus praesentium inventore porro ducimus voluptas nihil non. Neque sit consequatur similique molestias.\n\nOmnis non est vel. Ut et cumque cupiditate est. Esse dolores hic nemo enim expedita.', 'http://www.jacquot.fr/ea-vero-dolore-impedit-amet-eum', '', NULL, NULL, NULL, '2025-02-06 10:59:56', 0),
(2983, 'ut-blanditiis-nisi-accusamus-qui-3035', 'Ut blanditiis nisi accusamus qui.', 'Numquam cum possimus laudantium vel. Voluptatem quisquam et cum eum est cumque. Ad non minus molestiae quo.', 'Officia quo sint voluptatibus magni inventore natus. Dignissimos laboriosam quia commodi laboriosam. Fugit in nisi et vero debitis enim. Velit dolores quasi quibusdam velit itaque voluptatem.\n\nSed enim sint fugit debitis. Beatae animi unde nobis maiores est eum architecto. Autem corrupti debitis consequatur necessitatibus maiores qui sed temporibus.\n\nQuidem deleniti voluptas quia quia id molestiae vel quis. Iure dolores sunt quo. Esse laboriosam a ex. Autem labore officia rerum molestias.\n\nNobis id quasi hic doloremque sed qui. Sed suscipit velit dolores nihil voluptatibus mollitia. Enim similique dolore dolorum asperiores.\n\nQuasi omnis ex eius debitis delectus. Ab ducimus explicabo quos et sed ut dolorum. Aut sint fugit est qui laborum accusantium eius. Ut nesciunt molestias et harum qui dolorem.', 'http://www.germain.org/accusamus-nihil-excepturi-perferendis', '', NULL, NULL, NULL, '2025-02-14 11:17:19', 0),
(2984, 'ut-soluta-nam-sapiente-sit-rerum-a-3036', 'Ut soluta nam sapiente sit rerum a.', 'Commodi quo facere eos doloribus. Dolor voluptatum est delectus quam architecto amet veritatis. Ullam sapiente omnis laboriosam sint autem ea.', 'Voluptatem inventore ut eos ipsum quae sed. Debitis autem quis sunt quasi.\n\nLabore in repellat quae repellat dolor veritatis. Similique quod voluptate esse quam impedit neque. Cupiditate culpa omnis deleniti hic. Aspernatur libero nihil impedit soluta ad repellendus.\n\nCumque illum tempora maiores et vitae incidunt et in. Est voluptas est necessitatibus ratione et.\n\nSint laborum et animi iure. Quis atque placeat ex. Eveniet quis voluptates est ab fugit. Delectus in cum reprehenderit consequatur earum iure illo.\n\nMagnam eaque placeat nobis quis minus. Similique et provident odio temporibus est. A facilis sit laudantium sed repudiandae. In et quia et neque consequuntur non.', 'http://www.dossantos.org/dignissimos-eum-esse-assumenda.html', '', NULL, NULL, NULL, '2025-02-02 17:30:13', 0),
(2985, 'error-nihil-eveniet-dolor-qui-debitis-maiores-3037', 'Error nihil eveniet dolor qui debitis maiores.', 'Fugit quisquam vero nostrum iusto. Similique ut rerum exercitationem ullam. Quaerat dicta nemo iusto.', 'Exercitationem suscipit sint culpa eum quis sit. Velit qui sed quo eum eum minus in.\n\nAperiam eligendi dolor dolorem et. Omnis omnis est fugiat animi suscipit. Adipisci laborum et est saepe ab aut earum et. Optio molestias deleniti dolore veniam.\n\nModi rerum a sunt nulla qui qui. Beatae nihil quo quo. Labore accusantium nam atque neque. Numquam inventore eveniet ex adipisci.\n\nTemporibus quo eum inventore pariatur odio. Cum optio ut qui. Omnis ratione quis aut ad voluptatibus dignissimos enim. Eaque ea ut eius sit corrupti nobis dolor. Minus et aut molestias maiores aliquid voluptatem eum dolorem.\n\nBeatae illo quia atque vel sit. Eaque facilis rerum nam.', 'http://www.texier.fr/qui-est-ipsa-quod-eaque-quod-ea-dolorum', '', NULL, NULL, NULL, '2025-09-13 16:05:14', 0);
INSERT INTO `lecon` (`id_lecon`, `slug`, `titre`, `description`, `contenu`, `ficher_principale`, `fichier_support`, `id_matiere`, `id_prof`, `id_niveau`, `created_at`, `published`) VALUES
(2986, 'molestias-aut-aut-et-3038', 'Molestias aut aut et.', 'Nisi voluptatum alias assumenda asperiores similique. Optio velit soluta autem recusandae reiciendis adipisci. Alias qui dolorem dolorum aliquid numquam nostrum asperiores quam.', 'Accusamus quis nulla pariatur ullam commodi. Corporis illo amet dicta non. Voluptates repellendus occaecati et repellat voluptatum quidem asperiores repellendus. Aut non aut dolores at sit eos tempora et.\n\nDignissimos expedita quis id veniam sint voluptatem. Exercitationem suscipit aliquam delectus saepe et. Laboriosam dolor non doloremque explicabo soluta eligendi. Autem ducimus aut dignissimos dolores et.\n\nA libero praesentium quas deserunt non ullam. Natus ab animi voluptates aperiam tempore. Dolorem aut velit quis fuga voluptatem voluptate officiis. Repellat et odio hic similique doloribus consequuntur.\n\nOfficiis voluptas officia inventore ut voluptas. Corporis ut enim autem et. Quasi repudiandae iste fugit provident necessitatibus.\n\nSapiente vel aut sit hic doloribus. Natus dolorem rerum eos omnis placeat.', 'http://noel.fr/nam-aut-natus-et-placeat-enim', 'yang', NULL, NULL, NULL, '2025-02-07 02:43:04', 0);

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
  MODIFY `id_annee_scolaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=411;

--
-- AUTO_INCREMENT pour la table `classe`
--
ALTER TABLE `classe`
  MODIFY `id_classe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3467;

--
-- AUTO_INCREMENT pour la table `depense`
--
ALTER TABLE `depense`
  MODIFY `id_depense` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=367;

--
-- AUTO_INCREMENT pour la table `droit_inscription`
--
ALTER TABLE `droit_inscription`
  MODIFY `id_droit_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1519;

--
-- AUTO_INCREMENT pour la table `ecolage`
--
ALTER TABLE `ecolage`
  MODIFY `id_ecolage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1763;

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id_eleve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2688;

--
-- AUTO_INCREMENT pour la table `etablissement`
--
ALTER TABLE `etablissement`
  MODIFY `id_etablissement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT pour la table `exercice`
--
ALTER TABLE `exercice`
  MODIFY `id_exercice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2878;

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `id_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1701;

--
-- AUTO_INCREMENT pour la table `lecon`
--
ALTER TABLE `lecon`
  MODIFY `id_lecon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2987;

--
-- AUTO_INCREMENT pour la table `matiere`
--
ALTER TABLE `matiere`
  MODIFY `id_matiere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1914;

--
-- AUTO_INCREMENT pour la table `modules`
--
ALTER TABLE `modules`
  MODIFY `id_module` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2158;

--
-- AUTO_INCREMENT pour la table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `id_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1850;

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
  MODIFY `id_parent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1940;

--
-- AUTO_INCREMENT pour la table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `id_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3024;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=387;

--
-- AUTO_INCREMENT pour la table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id_role_permission` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12468;

--
-- AUTO_INCREMENT pour la table `type_personnel`
--
ALTER TABLE `type_personnel`
  MODIFY `id_type_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=897;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1021;

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
