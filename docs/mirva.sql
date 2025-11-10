-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 10 nov. 2025 à 11:59
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
(3049, 'qui-voluptas-modi-ratione-labore-3093', 'Qui voluptas modi ratione labore.', 'Rem commodi provident ad sed voluptatem. Minima maxime quis asperiores laboriosam eos. Voluptas ex facere officia voluptatibus ut dolorem non. Velit maxime occaecati quam aut sunt.', 'Earum quia perferendis aut. Aut laboriosam cumque sint magni dolorem similique qui. Aspernatur dolore voluptatem ipsam esse sed quaerat laboriosam.\n\nRecusandae earum magni dolorem nobis exercitationem ex nihil. Eum tenetur quaerat sint expedita nihil ducimus labore. Earum mollitia quos voluptate aut.\n\nOccaecati sit consequatur voluptas dolorem. Corrupti quod ex in modi voluptates nesciunt placeat omnis. Consequuntur doloribus qui ut eius fugiat ad. Est laboriosam sunt fugit at debitis quibusdam.\n\nNulla qui qui tempore. Quae recusandae et maiores qui. Provident eius dolorem est debitis sed dolores tempora.\n\nDolores consequatur saepe ipsam earum facere vero pariatur maxime. Impedit error consectetur adipisci earum nulla. Rem quo rem accusantium quis. Dolor quis et accusamus.', 'http://www.guerin.fr/', '', NULL, NULL, NULL, '2025-04-12 01:26:28', 0),
(3050, 'minus-eos-nostrum-perferendis-ratione-vel-3094', 'Minus eos nostrum perferendis ratione vel.', 'Velit eveniet ducimus et illum. Saepe excepturi nam ut dicta aut praesentium. Eum maiores consequatur ex ipsa.', 'Sunt eos veniam voluptatem quis. Illum et sit ut possimus voluptatem. Consequatur at pariatur quibusdam est vel dolorem excepturi.\n\nPerspiciatis odit tenetur ut nisi est voluptatem. Dicta nulla dignissimos eaque dolor sit officia sed. Aliquam ut totam est est doloribus aut possimus. Doloremque deleniti voluptatum aut laudantium voluptas sint asperiores nulla.\n\nCommodi voluptas consectetur eum qui debitis facilis vitae. Et et architecto quibusdam autem sit nemo. Et optio cupiditate provident. Est numquam natus voluptatum repellat.\n\nOmnis unde excepturi ab qui impedit blanditiis. Laborum similique ducimus et. Vel est reiciendis quod repudiandae temporibus. Maiores esse enim labore id.\n\nIllum temporibus laudantium et. Dolores aspernatur inventore quibusdam facere autem. Dolorem dolorem deleniti assumenda. Ipsam sit nostrum nisi repudiandae eos.', 'http://www.humbert.com/', '', NULL, NULL, NULL, '2025-10-16 16:48:50', 0),
(3051, 'placeat-omnis-et-tempora-dolorum-labore-consequatur-sunt-3095', 'Placeat omnis et tempora dolorum labore consequatur sunt.', 'Sit minus rerum cum numquam. Quae quia harum illum quis necessitatibus quia. Dolore quo ex maiores eveniet ea deleniti.', 'Soluta tempore occaecati fugit enim praesentium eligendi distinctio quisquam. Iure cumque porro accusantium qui architecto molestias. Delectus libero qui quia saepe necessitatibus rerum sed.\n\nQuis magni molestiae in fugit. Doloribus sed excepturi magni est repellendus error numquam.\n\nOmnis modi quia quibusdam pariatur nisi ut dolor. Animi natus molestias reprehenderit pariatur quia et assumenda. Nisi omnis quidem quis deleniti qui nemo incidunt. Et in aliquid nostrum laudantium.\n\nSit quis non vitae enim. Illo dicta cupiditate voluptas dignissimos et vero et natus. Eligendi nostrum impedit et molestiae et neque id dolore. Labore iure aut laborum et.\n\nEius veritatis et nisi vel vel. Ratione facere est porro et placeat. Et accusantium doloremque dolore exercitationem. Maiores nemo et enim iusto.', 'http://guyon.fr/non-in-aperiam-iusto-molestiae-nisi-dolor-alias.html', 'hlp', NULL, NULL, NULL, '2025-09-22 05:55:25', 0),
(3052, 'minus-consequatur-quidem-aut-magnam-adipisci-nesciunt-3096', 'Minus consequatur quidem aut magnam adipisci nesciunt.', 'Incidunt assumenda facilis cum ut et in ab velit. Totam quam error molestiae non. Culpa et optio nihil autem. Molestias quas et sed. Eos illum ad iusto.', 'Qui ullam illum et earum dolorum eveniet. Non in ab sunt officia recusandae repellat eius quis. Nihil quisquam et earum.\n\nOdio voluptatem est eum minus molestiae et iusto. In qui voluptatibus ea expedita quia. Est rerum mollitia est aut ea quisquam. Ipsum voluptatem vero eveniet qui beatae veritatis.\n\nEt ut eius provident aut consequatur impedit praesentium. Animi magnam fugiat et cum ut repellat. Voluptatem molestias qui dolorem et explicabo quibusdam unde. Voluptatum minus voluptatibus et quis qui quos.\n\nIn voluptate ex quasi et. Nihil fugiat rerum consequatur rerum voluptatem cumque sit provident. Quia ut doloribus sit quia at placeat dolor.\n\nNon sed autem molestias vero repellendus minima consequatur nihil. Et voluptatem ipsa veritatis assumenda esse praesentium reiciendis. Omnis assumenda ipsa ab. Cum tenetur sit et ut excepturi non blanditiis temporibus. Ea voluptates sunt ut dolores.', 'http://www.leduc.fr/', 'sfd-hdstx', NULL, NULL, NULL, '2025-05-21 16:11:58', 0),
(3053, 'velit-ut-neque-modi-3097', 'Velit ut neque modi.', 'Ut et nihil quod. Et voluptatum nobis eaque quo deserunt amet. Voluptates est reiciendis eum. Rerum voluptatibus perspiciatis eaque inventore rerum maxime expedita. Sit ea et doloribus sapiente.', 'Quo voluptates rem magnam minima quisquam sit. Repellat cupiditate suscipit natus ut. Error quisquam magnam voluptatem quis.\n\nSint minima ut distinctio architecto ipsa consequuntur rerum. Totam est eaque aliquid sed ratione provident aliquam ullam. Facere eligendi debitis rem amet inventore. Natus dolor harum ea enim veniam.\n\nVero molestiae incidunt aut. Distinctio optio quia voluptatibus corporis facilis.\n\nRerum et alias distinctio accusamus at. Voluptates id non laudantium a libero neque. Id illo maxime est ullam doloremque. Voluptas rerum ut vitae et quos vero illum ut.\n\nPlaceat sint autem sint omnis sit quam. Omnis ipsa saepe a facilis aut odio. Id rerum ipsam et eum. At dolorem repellat ratione illum.', 'http://www.giraud.fr/', 'hal', NULL, NULL, NULL, '2025-05-27 04:39:05', 0),
(3054, 'et-illum-delectus-ipsa-velit-aliquam-accusantium-consectetur-3098', 'Et illum delectus ipsa velit aliquam accusantium consectetur.', 'Qui dolorem necessitatibus fuga maiores omnis. Et quo et fuga maiores. Dicta rem itaque quidem similique libero.', 'Et voluptas voluptatem commodi nesciunt non ea facere. Nihil delectus assumenda eos quidem deleniti natus nobis. Quas est repudiandae perspiciatis minima.\n\nPlaceat autem eos occaecati corporis distinctio culpa. Sequi voluptatem dolor eius. Quia officia id saepe.\n\nEst in numquam laborum ipsum voluptates blanditiis sint. Rerum illum omnis qui molestias possimus ut ut alias. Sunt eveniet quisquam fugiat eos quia magnam sunt excepturi.\n\nRerum quam quidem dolorem eum. Dolores placeat modi tempora veniam.\n\nQuia qui eaque maxime id. Vel quia dolorem sed suscipit cum. Et quia dolor iusto voluptatem. Numquam cupiditate eaque eum officiis aut amet.', 'http://pons.net/perspiciatis-est-similique-saepe', '', NULL, NULL, NULL, '2025-05-15 03:10:48', 0),
(3055, 'qui-aut-aliquid-facere-quibusdam-quaerat-3099', 'Qui aut aliquid facere quibusdam quaerat.', 'Sed facere saepe vero. Quia dolor aut sed quo. Et illo molestiae eius in.', 'Iusto architecto iusto molestiae eos. Sunt aliquam facilis deserunt quo est optio ipsum ab. Quo autem itaque commodi voluptatem accusamus aut qui.\n\nQui odit ut et explicabo non iste. Rerum ipsum repellat illo soluta quo. Est non voluptatem quibusdam et voluptas est ipsam.\n\nQuidem sed ut dolor sed voluptatem molestiae illum. Aliquam ea aliquid quam sed.\n\nQuia qui animi ullam alias maxime dolorem. Quia in iste quae. Molestias provident rem nam sed.\n\nExcepturi deserunt iusto optio ducimus qui quaerat omnis. Enim sed architecto delectus iure. Voluptatem iure architecto expedita voluptas necessitatibus. Sed molestias aut et. Eaque assumenda dignissimos asperiores laudantium et distinctio.', 'http://www.muller.com/rerum-tempora-laboriosam-non-ex-ut-dolore', '', NULL, NULL, NULL, '2025-08-23 20:37:09', 0),
(3056, 'sit-laboriosam-harum-illo-amet-voluptatem-non-unde-3100', 'Sit laboriosam harum illo amet voluptatem non unde.', 'Animi deleniti fuga nam omnis enim. Quos et earum dolores. Voluptas recusandae cum doloribus repellendus.', 'Velit voluptates beatae sed. Vel cupiditate corporis adipisci beatae. Aperiam quis ex aut tempore fugit officia. Velit dolor voluptates hic.\n\nSit et tempora nihil. Consectetur accusamus at delectus vitae et. Non recusandae magni praesentium. Veniam eum enim molestiae quisquam. Quam qui quis eos reiciendis quaerat et.\n\nDolores sunt adipisci qui repellat quia blanditiis. Omnis accusantium quam aut eum in aut. Itaque ex quo ut tempore id et. Libero sed exercitationem quisquam odit consectetur consectetur.\n\nRepellat consequatur voluptatem ut est impedit ab. Ea repudiandae est nam. Dolor ut consequatur pariatur qui a aut molestias.\n\nExplicabo repudiandae ut dicta eveniet incidunt voluptatem totam. Laboriosam rerum ullam nihil nihil iure illo. Nisi consequatur et totam labore nam qui omnis. Est maiores labore deserunt beatae.', 'http://www.marchal.com/', '', NULL, NULL, NULL, '2025-02-18 08:53:26', 0),
(3057, 'et-aut-cum-quas-porro-enim-3101', 'Et aut cum quas porro enim.', 'Nulla odio temporibus sed omnis praesentium. Ipsam est consequuntur praesentium quo delectus praesentium vel. Id perspiciatis ratione veniam debitis et voluptas recusandae aut. Et dolor modi tempora expedita sint dolores.', 'Rerum inventore soluta modi labore et nam corporis. Impedit atque perferendis ut libero dolorum expedita et. Expedita consequatur sit ipsam id ut. Molestias ex molestiae mollitia molestiae vel reiciendis voluptate.\n\nSed consequatur porro odit quia doloremque quidem rerum doloribus. Distinctio culpa voluptas voluptatem et illum officia et. Vero quas laborum aut nihil omnis repudiandae blanditiis.\n\nEst aut itaque consectetur tenetur a fugit voluptas. Eligendi vero mollitia quia assumenda earum est illum quam. Dolores fuga sapiente est aperiam minima voluptatum optio. Est rerum est mollitia veniam ut ad et. Optio et voluptas placeat maiores est consequatur.\n\nRepellat aut dolores voluptas corporis alias rem voluptatibus. Non consequatur modi qui recusandae. Iusto ducimus aliquid temporibus saepe libero quasi. Ex et ut ea praesentium.\n\nQuo quis eaque at amet. Voluptatem ab voluptates repellendus vitae ratione ratione labore vero.', 'https://www.voisin.fr/fugit-facilis-repellat-veritatis-rerum-est-vitae-odio', 'bmp', NULL, NULL, NULL, '2025-04-26 17:51:33', 0),
(3058, 'sunt-autem-nihil-eveniet-3102', 'Sunt autem nihil eveniet.', 'Aut error velit quis ducimus at velit. Molestias eveniet illo incidunt ut voluptatem. Repudiandae molestiae occaecati debitis quo.', 'Suscipit cumque labore eum autem a fuga soluta debitis. Architecto nostrum consequatur molestiae et. Aut quia voluptatem ipsum rem aperiam. Nam ut est fuga.\n\nVero aliquam enim est perspiciatis velit quisquam et qui. Ea aut quidem nesciunt qui cum nulla. Eveniet blanditiis tempora et sed voluptatem. In aut distinctio non facilis rerum laboriosam.\n\nExercitationem accusamus numquam occaecati corrupti. Saepe fugiat deserunt dignissimos quae voluptatem et quos nesciunt. Accusamus cupiditate ducimus ipsa et non occaecati. Sunt in soluta repudiandae eius unde debitis id. Officiis nostrum accusamus repudiandae sit.\n\nAt architecto aut et unde eum officiis. Unde porro doloremque cumque odio eum illo quam. Consequatur tempora esse enim commodi suscipit. Quia quo nesciunt ut laboriosam quisquam.\n\nFugiat corporis accusantium possimus explicabo facilis eaque et. Consequatur officia voluptas repellat.', 'https://www.barthelemy.com/labore-totam-non-qui-ut-est-veritatis-ea', '', NULL, NULL, NULL, '2025-07-20 19:33:59', 0),
(3059, 'qui-facilis-sit-quo-tempore-recusandae-accusantium-3103', 'Qui facilis sit quo tempore recusandae accusantium.', 'Cumque accusamus nulla consequuntur culpa ullam qui. Non voluptas id non. Sapiente sunt voluptas rerum commodi error eligendi ab. Perspiciatis rerum commodi recusandae nam eos velit.', 'Qui vero sequi excepturi facilis commodi voluptatem pariatur. Dolores dolor quia qui quia.\n\nIllo velit ratione dignissimos et quod est non assumenda. Rerum consequatur facere in impedit quasi ipsam. Similique ut velit sit autem aspernatur tempore.\n\nQui explicabo vel et commodi sint non debitis laborum. Sit possimus veniam veniam ullam nemo quidem similique consequuntur. Facilis sed quam rerum labore. Magni qui sapiente molestiae sunt.\n\nEt corrupti error qui ut. Praesentium temporibus nemo a voluptas. Rerum dolorem alias hic nemo magni odit voluptatum. Ut eligendi voluptatem minima.\n\nEligendi corrupti sunt non enim et. Veritatis fugiat praesentium ea aut nulla quae hic.', 'http://www.joubert.fr/aut-eum-molestias-recusandae-saepe.html', '', NULL, NULL, NULL, '2025-01-18 19:56:19', 0),
(3060, 'debitis-aut-voluptatum-dignissimos-nostrum-odit-3104', 'Debitis aut voluptatum dignissimos nostrum odit.', 'Rerum aut illum dolorem magnam sed eius neque. Quis dolore dignissimos est ut eius iusto. A quis eligendi in accusamus minus. Tempore optio cumque nihil ea. Libero animi harum temporibus sed.', 'Exercitationem sit voluptatem nihil veritatis. Modi error doloremque qui sequi in. Nemo nesciunt aliquam beatae amet sed. Adipisci consectetur non cupiditate omnis reiciendis id.\n\nCorrupti dolores nostrum cumque ut dolorem animi fugit. Fugit expedita voluptatibus voluptatem at similique exercitationem tempore. Nisi sit voluptatum quas ullam omnis.\n\nOccaecati mollitia modi explicabo ea. Omnis aut sunt doloribus enim eum nobis. Amet fuga voluptate ullam.\n\nOdio deserunt adipisci commodi incidunt provident. Vel nam qui delectus deserunt nesciunt. Eaque omnis occaecati aliquam incidunt.\n\nRepellendus et autem incidunt dolores quidem eligendi. Commodi laboriosam et sapiente est autem. Consequatur ut iste perspiciatis quia.', 'http://www.lucas.fr/', '', NULL, NULL, NULL, '2025-01-23 20:00:12', 0),
(3061, 'velit-et-sunt-ipsa-quia-magnam-commodi-voluptatem-3105', 'Velit et sunt ipsa quia magnam commodi voluptatem.', 'Qui quasi ad omnis. Error inventore impedit quae vel qui repudiandae labore.', 'Iste eius laudantium laboriosam dolorem vero officia. Quas id hic fuga eligendi. Ad tempore dicta debitis beatae eos tenetur nihil non. Quidem dolorum sed eos praesentium sit laborum atque delectus.\n\nMollitia facere corrupti minus eius voluptatum. Et dolores sint qui aliquid qui. Ut quia est impedit dolorem deserunt voluptatum ipsam. Magnam rerum quia quia ipsum eius doloremque ipsam. Sit impedit et neque temporibus.\n\nQuis excepturi fuga aperiam nihil facilis molestiae beatae. Id est at ut ratione architecto veritatis labore sit. Amet et nisi id ea. Ea qui sit reprehenderit blanditiis.\n\nConsequuntur dicta minima id quo voluptas quae. Et quos in qui soluta debitis perferendis. Nisi ipsum aut sed alias facere omnis itaque repellendus.\n\nFacere nulla repudiandae eveniet omnis laudantium eligendi. Nulla nihil tempore ut ratione. Neque quos adipisci minus facere dolor dolorem sequi eveniet.', 'http://www.fischer.fr/harum-eum-ratione-aut-laudantium-nam.html', '', NULL, NULL, NULL, '2025-07-15 19:04:09', 0),
(3062, 'dolore-dolores-quia-quod-odio-minus-3106', 'Dolore dolores quia quod odio minus.', 'Magni aliquam qui amet eos facere reiciendis. A voluptatem debitis eligendi laboriosam corrupti. Laudantium molestiae ea totam labore quas voluptates atque iure. Animi quo et dolores.', 'Totam enim et quod rerum placeat id. Quo omnis a magni sequi aliquam sequi quia occaecati.\n\nAutem doloremque iure dicta voluptatibus. Magni dolores aut dolores ut qui laboriosam ex. Molestiae aut occaecati id recusandae eum eum ut.\n\nExercitationem incidunt ut aut perspiciatis totam vitae. Eos aut esse accusantium ut esse esse aliquid. Pariatur ipsum ullam consequatur minus numquam accusamus totam. Et asperiores repudiandae iure et.\n\nCorrupti voluptatem dolores nulla labore dolores voluptas illo aut. Deleniti dolorem sed quia consequatur corrupti. Cupiditate sed neque aspernatur aut enim in tempore voluptate. Ea ut quis omnis. Magni blanditiis qui voluptatem suscipit aut eligendi.\n\nConsequatur qui possimus voluptate tempora. Omnis sunt sit autem quas accusamus. Recusandae quia culpa dolores quod dolorem.', 'http://olivier.org/consequatur-culpa-voluptates-molestiae-molestias-et-debitis-enim', 'xpl', NULL, NULL, NULL, '2025-10-31 18:28:07', 0),
(3063, 'occaecati-eos-aut-modi-ut-minus-3107', 'Occaecati eos aut modi ut minus.', 'Aspernatur quis corporis pariatur quia. Amet nisi illo saepe quas eius perferendis officiis. Et consequatur libero aliquid dolor soluta. Dolores et modi consequatur eius quae quam. Vel non beatae officia consectetur animi vero.', 'Tempora accusantium molestiae ut ipsum accusantium. Ut quia qui nihil fuga. Officiis dignissimos quo est quis adipisci odio. Ipsum ut ratione similique eveniet aut.\n\nAb beatae consequatur veniam nemo. Quas ab dolor sit. Ut sed est perspiciatis porro rerum sunt repellat aut.\n\nEnim magnam quia et exercitationem eligendi et soluta ipsa. Corrupti est rem tempora neque non soluta ut. Harum velit iste sint natus facilis.\n\nAut est ut sunt voluptatem culpa et. Magnam soluta voluptatum alias accusantium deleniti adipisci neque fuga. Nihil asperiores ipsa harum eum enim voluptatem quas adipisci. Possimus molestiae quod consequatur rerum molestiae.\n\nQui inventore laborum ut commodi quisquam est beatae. Omnis sint velit odio quia. Eum voluptatem ut et et voluptas.', 'https://www.aubert.com/et-iste-aperiam-amet-est-et-nam', '', NULL, NULL, NULL, '2025-02-02 18:09:48', 0),
(3064, 'laborum-commodi-autem-facilis-animi-molestiae-officia-ad-3108', 'Laborum commodi autem facilis animi molestiae officia ad.', 'Illum saepe sunt deleniti amet. Quo delectus nisi quo iure voluptas omnis saepe. Aut possimus deleniti officia numquam ipsa maxime et. Soluta labore illum illum alias reprehenderit in fugit.', 'Ut molestiae laboriosam qui laudantium iusto explicabo recusandae. Qui ab et perferendis sunt reprehenderit. Molestiae voluptates sit harum ab est sunt ipsa. Maxime ducimus rerum ab perferendis dolorem laudantium velit.\n\nLaborum excepturi eum quidem atque eveniet sequi. Dolor sit qui aut nihil. Aut itaque nostrum voluptatum. Ut et eos velit impedit officia quia eos.\n\nNihil minima vitae temporibus sunt delectus aliquam atque. Laborum voluptatibus et sunt unde. Quibusdam facere est sed et sit illo. Eos vero laudantium distinctio a et vitae. Totam rerum dolores voluptatem ut distinctio modi cum.\n\nCulpa sapiente ut porro quia voluptatibus laborum. Amet inventore ipsa fugit incidunt exercitationem nesciunt hic.\n\nReprehenderit saepe maiores omnis sapiente qui. Similique aut et ut praesentium vel dolore. Ipsum aut non iste qui.', 'http://www.blanc.fr/numquam-deleniti-eaque-non-voluptatem', '', NULL, NULL, NULL, '2025-06-13 12:20:44', 0),
(3065, 'cumque-quia-consectetur-veniam-quae-quo-3109', 'Cumque quia consectetur veniam quae quo.', 'Non recusandae at consectetur eum assumenda cumque. Officia mollitia neque quisquam aut doloremque et. Quo quo aliquid nihil velit laborum nobis. Laborum voluptas nesciunt voluptatem reprehenderit.', 'Vel veritatis sunt sit voluptas et cupiditate aut. Ad qui et exercitationem. Architecto atque officia hic nihil magnam. Delectus distinctio sequi quia facilis aut fuga.\n\nUllam inventore illum sit necessitatibus magnam. Impedit maiores quis itaque ipsum. Ullam libero sed iure voluptatibus est laborum non. Qui saepe dolore impedit saepe temporibus iste molestiae. Doloribus at autem sint eius id.\n\nDolorem inventore distinctio voluptatum facilis. Optio adipisci ullam incidunt ab et ea est. Quis ad ea vel quia et. Ut doloribus error sed a fuga velit sunt voluptas.\n\nAut eos accusantium corrupti velit odio. Qui similique ullam cupiditate dolore. Iste dolores nostrum necessitatibus saepe. Sit adipisci quia voluptas id et error qui quibusdam.\n\nEt et nihil ipsum saepe. Minus et hic iusto. Odit perferendis quam dignissimos voluptatem autem.', 'http://www.fontaine.fr/a-ad-porro-qui-earum-minus-rem-consequuntur-a.html', '', NULL, NULL, NULL, '2025-09-29 08:58:55', 0),
(3066, 'est-ut-saepe-similique-voluptatem-alias-aperiam-3110', 'Est ut saepe similique voluptatem alias aperiam.', 'Aspernatur est sunt et suscipit voluptatum. Voluptatibus quia maiores voluptas nulla nobis et alias consequatur. Aperiam nemo eius omnis velit aut provident.', 'Veniam sed ipsum modi. Eos tempore perferendis dolor consequatur et.\n\nEarum ut possimus culpa harum. Eum odio voluptas corrupti quos. Voluptatibus exercitationem ipsa provident nisi facilis optio.\n\nVel qui beatae ex aut omnis occaecati voluptatem. Saepe aut aperiam fuga. Id asperiores rem vel. Officiis sint ad sed praesentium culpa et.\n\nVoluptatem laboriosam voluptatem occaecati excepturi eligendi. Enim vel porro distinctio nobis temporibus. Ea modi ea perspiciatis assumenda quia amet id. Amet excepturi fugit perspiciatis eum rerum.\n\nAut nesciunt et maxime vero quia aut et eveniet. Cum quod inventore esse sequi mollitia. Illo accusantium dolores sit dolorem. Explicabo in distinctio qui omnis.', 'http://dubois.org/corporis-facilis-rerum-aut-rerum', '', NULL, NULL, NULL, '2025-07-08 22:36:49', 0),
(3067, 'corrupti-culpa-praesentium-culpa-nulla-eum-aliquid-3111', 'Corrupti culpa praesentium culpa nulla eum aliquid.', 'Qui consectetur molestiae numquam magni culpa. Dolore exercitationem nihil corporis porro. Ratione assumenda totam occaecati sit incidunt aliquam.', 'Non natus enim laudantium et ab atque necessitatibus ut. Numquam necessitatibus suscipit ea et omnis aperiam.\n\nIpsum omnis incidunt id unde rerum ut. Occaecati ratione doloremque nihil. In rerum tenetur esse est exercitationem sint ipsam facere.\n\nAccusamus nihil voluptatibus dolor ea dolorum consequuntur occaecati est. Reiciendis sit explicabo assumenda optio iusto corrupti. Velit aliquam iure sed.\n\nQui eum nemo aliquam doloremque id in doloribus voluptas. Dolorem qui libero dolores sunt rem et. Recusandae vel debitis eum saepe incidunt nesciunt ab. Eius natus molestiae ut repudiandae quibusdam rem.\n\nAut eligendi aliquid aut perspiciatis et. Qui asperiores consequatur qui cupiditate laborum. Voluptatibus deleniti sint quia reprehenderit omnis qui.', 'https://langlois.com/voluptatem-aut-voluptatem-sapiente-expedita.html', 'xpl', NULL, NULL, NULL, '2025-04-16 18:27:00', 0),
(3068, 'nisi-nemo-aut-in-aut-perferendis-cum-soluta-adipisci-3112', 'Nisi nemo aut in aut perferendis cum soluta adipisci.', 'Vitae inventore ut nihil sit voluptatem. Suscipit reprehenderit aut facilis recusandae dolorem. Autem distinctio et totam dolor saepe.', 'Autem est illum quae est voluptatem. Libero non dicta esse nobis molestiae voluptatem sed. Cum voluptatem sunt commodi similique.\n\nRatione quasi ut sit eligendi saepe temporibus. Aut sit corporis aspernatur et et. Magnam facilis aut enim et eos quis voluptatem.\n\nOmnis provident laboriosam cupiditate dolore qui. Accusamus in dolorem tenetur sunt dolorem ex. Odit non perspiciatis nam voluptates at aut excepturi. Qui eius magnam repellendus est molestiae.\n\nSuscipit eaque aut omnis distinctio et. At sunt earum id totam omnis officiis qui unde.\n\nOptio laborum ut deserunt quod cum ipsa sed. Illum nam odit aut corrupti sed repellat dolores id. Reiciendis velit ea pariatur molestiae occaecati quo.', 'https://www.delattre.com/necessitatibus-et-assumenda-qui-veniam-velit', '', NULL, NULL, NULL, '2025-04-18 20:09:24', 0),
(3069, 'dolorem-et-qui-sit-iusto-3113', 'Dolorem et qui sit iusto.', 'Reprehenderit et ad quae voluptatem non. Occaecati et vero aut. Ipsa sunt consectetur ut ea. Quo itaque quo explicabo incidunt aliquam corporis voluptas. Minima aut consequuntur eos tempore.', 'Aliquid consequatur labore assumenda odio nemo sed. Dolorem omnis enim qui iure itaque tempore ut. Iusto aut debitis odio velit nihil reprehenderit. Voluptatem veniam placeat sed natus.\n\nDolore incidunt velit mollitia sapiente. Excepturi a cumque cumque consequatur. Nostrum consequatur qui cum qui illo explicabo suscipit. Cumque sapiente labore cumque fuga a aut.\n\nLibero dolorem qui nostrum eum temporibus nemo in sit. Esse eum quia ipsam. Aut quia ut illo sit commodi.\n\nQuaerat deserunt tempore repudiandae fugit nihil et dolores. Similique veritatis voluptas soluta eveniet vitae aut similique. Eligendi architecto delectus aspernatur fugit non aut est. Doloremque fuga eos ea debitis temporibus similique.\n\nTempore quod harum odit et ut. Molestiae fuga similique et sapiente voluptas. Dicta quia beatae beatae et.', 'http://delmas.fr/unde-ullam-voluptatem-reiciendis-cumque-natus-deserunt-voluptate', '', NULL, NULL, NULL, '2025-03-09 23:13:32', 0),
(3070, 'iusto-consequuntur-ex-doloremque-minus-velit-commodi-3114', 'Iusto consequuntur ex doloremque minus velit commodi.', 'Sunt perferendis laboriosam voluptatem accusantium. Atque possimus accusamus explicabo molestiae. Doloremque nisi temporibus ut odio aut reprehenderit ut.', 'Molestias sint ratione fugiat sed. Sint porro repellendus et ut. Nihil placeat id esse qui.\n\nOdio rerum voluptas sunt et quisquam. Ullam atque illum omnis voluptate. Est nulla eos est aut assumenda commodi et. Ut cum consectetur doloremque iste.\n\nVoluptatibus est blanditiis vel veniam voluptatem at eum. Est rem dolorem ducimus maxime sit. Et earum quasi corporis.\n\nMolestiae quis sint necessitatibus amet. Enim aut provident at et quos et reiciendis. Porro dolor soluta delectus odio rerum ut nostrum optio.\n\nVoluptatem nesciunt omnis dolore possimus vitae rem. Porro accusamus veniam distinctio sunt nemo repellat eos eum. Aspernatur non sit soluta voluptas quos. Tempore magnam vel perspiciatis aut.', 'http://www.potier.net/', 'sv4crc', NULL, NULL, NULL, '2025-01-13 05:14:44', 0),
(3071, 'sunt-ut-ad-ullam-nulla-nobis-a-3115', 'Sunt ut ad ullam nulla nobis a.', 'Cupiditate aliquam nam eveniet qui nobis in et quos. Et voluptatem error et sed molestiae officiis. Nihil ut sit et voluptatem.', 'Dolores eligendi harum accusantium aut reiciendis sit soluta. Asperiores ea quae placeat minus et. Nemo exercitationem dolore quaerat magni recusandae.\n\nNatus quaerat consequatur repudiandae possimus adipisci ipsum ex. Fuga voluptatem quae sit corrupti impedit. Voluptates est assumenda qui dolorem quas eos.\n\nVoluptate soluta qui doloremque. Rerum culpa cumque aut. Alias accusantium occaecati a recusandae voluptas est est. Reiciendis perspiciatis amet praesentium similique repellendus consequatur. Culpa blanditiis fuga accusamus nihil rerum laudantium nulla quis.\n\nIpsum suscipit similique quibusdam dolorem odio ducimus. Et mollitia aliquam odit non recusandae soluta et neque. Nemo est et deserunt voluptatem aut doloremque.\n\nArchitecto quia a qui et sunt reiciendis deleniti. Non expedita molestiae assumenda enim eos. Vitae ut ipsum quis explicabo odio quaerat.', 'http://fontaine.fr/sint-ut-asperiores-similique-et-maiores-vero', 'udeb', NULL, NULL, NULL, '2025-07-08 09:50:36', 0),
(3072, 'tempore-asperiores-nulla-quibusdam-aperiam-autem-3116', 'Tempore asperiores nulla quibusdam aperiam autem.', 'Et nostrum quis nam. A aperiam voluptate qui pariatur occaecati ex. Repudiandae necessitatibus ea perspiciatis quia.', 'Qui sint aspernatur quasi vero dolores minima voluptatem. Odit occaecati consequatur officiis quis aut ut in aspernatur. Ipsam nihil adipisci qui doloremque. Omnis omnis cupiditate iusto velit.\n\nEt aut voluptatum dolor optio voluptatibus. Nemo optio aspernatur deserunt molestiae rem.\n\nDolore velit id laudantium vel. Ut veritatis repellat numquam est voluptas. Excepturi ipsa voluptatum quas eveniet vero.\n\nDoloremque quasi alias rerum quod quis et quas culpa. Aperiam non explicabo voluptatum ullam assumenda. Similique ut reiciendis sint earum accusantium delectus.\n\nOdit corrupti repudiandae est incidunt nesciunt molestias inventore. Ea enim fugit esse distinctio nesciunt omnis mollitia sunt. Mollitia nobis dolor minus sint.', 'http://www.ribeiro.net/aliquam-molestiae-et-quibusdam.html', 'rmvb', NULL, NULL, NULL, '2025-10-08 18:22:52', 0),
(3073, 'eum-nihil-architecto-incidunt-odit-vel-molestiae-nobis-3117', 'Eum nihil architecto incidunt odit vel molestiae nobis.', 'Qui et quisquam quaerat veniam vitae. Qui placeat voluptas voluptas sunt possimus et libero. Rerum eligendi est veniam voluptas natus similique cupiditate nostrum. Quo eos molestias deserunt voluptatibus.', 'Ut perspiciatis aut voluptas nostrum. Doloribus nobis fugiat est rerum quia totam sit consequatur.\n\nOmnis ut voluptatibus molestiae autem. Praesentium quis ea est atque et quisquam ut facilis. Libero dolores illum autem sunt. Cumque repudiandae ipsa culpa voluptatibus doloribus labore. Alias consectetur sit et.\n\nDolorem voluptate eum consequuntur asperiores. Eum labore dolorem nihil ratione quidem dolor. Repellendus sequi consequuntur perspiciatis ducimus facilis id odit quia.\n\nA quam voluptatum incidunt officia deleniti. Corporis labore et sit laudantium temporibus iusto omnis. Odio rem porro tenetur minima itaque.\n\nEveniet ut cupiditate non harum. Repudiandae perferendis saepe eos exercitationem dolorem. Aliquam quibusdam non molestiae cupiditate. Aperiam quis qui ut tempore repellendus blanditiis consequatur velit.', 'http://www.gaillard.fr/nihil-fugiat-repudiandae-nihil-consequuntur-voluptas-aut-sit-eveniet.html', 'ods', NULL, NULL, NULL, '2025-05-25 19:08:02', 0),
(3074, 'eius-aspernatur-ad-et-3118', 'Eius aspernatur ad et.', 'Dolores dolor at consequatur et et. Harum ipsa tenetur et repellat a. Occaecati et rerum repudiandae molestiae quibusdam et ab. Quis repudiandae dolores omnis eveniet sit quia eaque.', 'Corrupti ut mollitia consequatur. Et laboriosam perspiciatis molestiae corporis at dolores. Sed rerum dolor ea. Fugit ut quia assumenda velit harum quis.\n\nNumquam nesciunt vero dolorem minima aut accusamus nesciunt. Dolores velit ullam necessitatibus omnis labore perspiciatis ut. Accusamus iste optio molestiae sint at. Necessitatibus rerum incidunt illum vel et deserunt. Ipsum sunt fugit possimus sed saepe laborum aut.\n\nAdipisci cumque pariatur consectetur iusto ipsa. Ipsam aut blanditiis labore voluptatem illo ut. Sed amet magnam voluptas et occaecati.\n\nEt accusantium dolor est similique in dignissimos quam. Saepe et perspiciatis provident soluta. Modi molestiae consectetur ut consequatur aspernatur.\n\nCulpa omnis ut eius voluptatem. Consequuntur aut et ut voluptatibus. Ut veniam vitae magni tempora non ut consequatur quasi. Autem similique mollitia reiciendis voluptate.', 'http://www.sauvage.fr/', '', NULL, NULL, NULL, '2024-11-14 06:26:47', 0),
(3075, 'omnis-ut-repellendus-facere-dolor-3119', 'Omnis ut repellendus facere dolor.', 'Ipsum dolores doloremque et magni. Eligendi consequatur vel veniam velit quibusdam. Ipsum voluptates commodi qui voluptas dolor veritatis exercitationem. Est quas harum voluptates placeat ab velit.', 'Sapiente incidunt odit ut maiores placeat vitae sint. Distinctio est veniam sunt. Itaque asperiores omnis et ut qui quia cupiditate.\n\nAt ipsa qui laboriosam aliquam in ipsa voluptatibus. Maiores eos qui a debitis dolores. Explicabo amet nam qui cum deleniti aperiam. Ea asperiores asperiores quae natus ad dolorem.\n\nSapiente doloremque molestias ut qui quasi. Nam sed magnam voluptates accusamus quas a quisquam. Eum accusamus laudantium voluptas omnis sint. Eos sunt in quos. Ab consequuntur vitae porro voluptatem vel ullam voluptatibus.\n\nQuae rerum fuga dolorem aliquam labore. Ipsam at deleniti doloribus et est. Omnis sint culpa ipsa et sunt dolores.\n\nOptio eius ut qui illum aperiam nulla aliquid. Voluptatem et nam sint qui est. Aspernatur dolor dolor omnis natus quo enim. Recusandae aut ab quo expedita.', 'https://noel.net/ut-enim-ea-alias-voluptatem-tenetur-saepe-libero.html', 'psd', NULL, NULL, NULL, '2024-11-29 12:53:36', 0),
(3077, 'quia-ut-quam-ipsa-explicabo-voluptatem-ratione-doloremque-3121', 'Quia ut quam ipsa explicabo voluptatem ratione doloremque.', 'Consectetur exercitationem sit ut. Quia alias aut sit. Vel autem neque dolor dolor dolor.', 'Possimus aliquam omnis adipisci explicabo sed enim dolorem consequatur. Quod ullam similique eveniet. Aliquam quia nisi fugiat in cum. Maiores voluptas voluptatibus eum laudantium iure sed velit nihil. Optio aut nemo vero et id provident quisquam.\n\nNon qui vel quisquam voluptatem. Officiis dolorum quo numquam id quo ut quia. Corporis voluptatibus dolorum nisi adipisci aspernatur non ut.\n\nDebitis nulla rerum architecto voluptas facilis quis quo officiis. Quo minus nam nulla culpa ullam in. Voluptatem esse voluptatum qui quidem est excepturi. Nobis aut eveniet iste soluta repudiandae.\n\nNesciunt repellat repellat repellendus reiciendis est est odit. Quam rerum impedit aspernatur et quibusdam et sint. Nobis hic eum minus unde fuga consequuntur soluta maiores. Dolorem tenetur molestias incidunt molestias.\n\nEst tempora accusantium incidunt sequi. Distinctio sed quod est libero quo. Unde qui ex ipsam voluptatibus aspernatur distinctio ea tenetur. Ea quia et minima reiciendis.', 'https://pinto.net/temporibus-velit-quo-maiores.html', '', NULL, NULL, NULL, '2025-05-22 09:12:37', 0),
(3078, 'molestias-et-asperiores-nihil-maxime-pariatur-fugiat-3122', 'Molestias et asperiores nihil maxime pariatur fugiat.', 'Error quae laudantium sed. Quaerat iste rem consequatur et rerum voluptas. Ipsum quidem et vel soluta qui.', 'Consequuntur in numquam ut dolorum quis et. Recusandae voluptatem omnis assumenda. Non doloribus enim illo laborum. Debitis doloremque sit eaque incidunt quasi aliquid quibusdam.\n\nTemporibus et autem non qui. In doloremque ullam ratione illum expedita sed architecto. Provident fugit perspiciatis perspiciatis ut qui ut in.\n\nIn ut rerum et ea voluptatem totam. Nihil ducimus impedit voluptatem. Libero et vero delectus consequatur nostrum nobis corporis. Saepe ut facilis soluta autem.\n\nEt repudiandae vitae facere exercitationem harum. Doloremque maxime est tenetur ut. Qui aut soluta a.\n\nEt accusantium a voluptatem inventore possimus recusandae dolor consequatur. Ullam voluptate et voluptas consequatur consequatur reiciendis ut. Est in voluptas et delectus et ipsam. Quia voluptatem voluptates eum.', 'http://www.dossantos.com/nostrum-omnis-mollitia-dolorum', 'ivp', NULL, NULL, NULL, '2025-06-17 11:59:07', 0),
(3079, 'fuga-saepe-nulla-est-nulla-nemo-provident-dolorem-3123', 'Fuga saepe nulla est nulla nemo provident dolorem.', 'Libero dolor quibusdam distinctio amet omnis repellat. Molestias ea id est incidunt aperiam blanditiis occaecati. Voluptas nobis possimus accusamus praesentium nihil nisi.', 'Accusantium dicta nihil officiis alias autem rerum et. Et repellat et modi atque. Adipisci qui ullam et id quam numquam doloribus. Tempora dignissimos mollitia omnis quo.\n\nQuae enim reiciendis vel maiores sint eum atque. Non quia iure vel excepturi quia error. Et quas ut assumenda.\n\nMollitia in ratione et dolorem dolore. Inventore adipisci non aperiam veniam et aut. Autem et rerum et nobis sed rem odit. Et ipsam at consequatur.\n\nIn tenetur cupiditate quasi nemo repellat. Ullam delectus enim doloribus rerum harum. Ut aut cumque perferendis molestias. Necessitatibus id at exercitationem tenetur blanditiis sint.\n\nOmnis ratione veniam aut cupiditate. Atque sit error aperiam repellat sit possimus sit. Ratione minus ut laudantium recusandae vitae aut debitis id.', 'http://arnaud.fr/delectus-aut-iure-mollitia', '', NULL, NULL, NULL, '2025-10-26 14:14:01', 0),
(3082, 'titre-du-lecon-3081', 'Titre du leçon', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas?', '', 'public/uploads/lecons//1762756758_file_69118896cde2b7.56522405.txt', '', NULL, NULL, NULL, '2025-11-10 06:39:18', 1);

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
  MODIFY `id_annee_scolaire` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=419;

--
-- AUTO_INCREMENT pour la table `classe`
--
ALTER TABLE `classe`
  MODIFY `id_classe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3586;

--
-- AUTO_INCREMENT pour la table `depense`
--
ALTER TABLE `depense`
  MODIFY `id_depense` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=367;

--
-- AUTO_INCREMENT pour la table `droit_inscription`
--
ALTER TABLE `droit_inscription`
  MODIFY `id_droit_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1567;

--
-- AUTO_INCREMENT pour la table `ecolage`
--
ALTER TABLE `ecolage`
  MODIFY `id_ecolage` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1811;

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id_eleve` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2718;

--
-- AUTO_INCREMENT pour la table `etablissement`
--
ALTER TABLE `etablissement`
  MODIFY `id_etablissement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT pour la table `exercice`
--
ALTER TABLE `exercice`
  MODIFY `id_exercice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2977;

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `id_inscription` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1716;

--
-- AUTO_INCREMENT pour la table `lecon`
--
ALTER TABLE `lecon`
  MODIFY `id_lecon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3083;

--
-- AUTO_INCREMENT pour la table `matiere`
--
ALTER TABLE `matiere`
  MODIFY `id_matiere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1954;

--
-- AUTO_INCREMENT pour la table `modules`
--
ALTER TABLE `modules`
  MODIFY `id_module` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2254;

--
-- AUTO_INCREMENT pour la table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `id_niveau` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1898;

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
  MODIFY `id_parent` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2001;

--
-- AUTO_INCREMENT pour la table `personnel`
--
ALTER TABLE `personnel`
  MODIFY `id_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3106;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=403;

--
-- AUTO_INCREMENT pour la table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id_role_permission` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12924;

--
-- AUTO_INCREMENT pour la table `type_personnel`
--
ALTER TABLE `type_personnel`
  MODIFY `id_type_personnel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=929;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1055;

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
