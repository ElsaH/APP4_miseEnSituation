-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 20 Mai 2016 à 10:56
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `polyquest`
--

-- --------------------------------------------------------

--
-- Structure de la table `capacite`
--

DROP TABLE IF EXISTS `capacite`;
CREATE TABLE IF NOT EXISTS `capacite` (
  `id_capacite` int(11) NOT NULL AUTO_INCREMENT,
  `nom_capacite` varchar(255) NOT NULL,
  `montant_soins` int(11) NOT NULL DEFAULT '0',
  `montant_degats` int(11) NOT NULL DEFAULT '0',
  `cout_mana` int(11) NOT NULL DEFAULT '0',
  `xp_requis` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_capacite`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Vider la table avant d'insérer `capacite`
--

TRUNCATE TABLE `capacite`;
--
-- Contenu de la table `capacite`
--

INSERT INTO `capacite` (`id_capacite`, `nom_capacite`, `montant_soins`, `montant_degats`, `cout_mana`, `xp_requis`) VALUES
(1, 'mug de cafe', 5, 0, 10, 0),
(2, 'lance de clavier', 0, 10, 15, 0),
(3, 'riff de guitare', 0, 10, 30, 0),
(4, 'potion au ciment', 5, 0, 10, 0),
(5, 'lance de disque en ceramique', 0, 10, 20, 0),
(6, 'projection de roche', 0, 15, 30, 0),
(7, 'pile a combustile', 5, 0, 5, 0),
(8, 'morsure de cable electrique', 0, 10, 15, 0),
(9, 'electrocution de masse', 0, 15, 30, 0),
(10, 'lumiere noire', 10, 0, 15, 0),
(11, 'lentille convergente', 0, 5, 15, 0),
(12, 'rayon laser multiple', 0, 10, 20, 0);

-- --------------------------------------------------------

--
-- Structure de la table `champion`
--

DROP TABLE IF EXISTS `champion`;
CREATE TABLE IF NOT EXISTS `champion` (
  `id_champion` int(11) NOT NULL AUTO_INCREMENT,
  `classe` varchar(255) NOT NULL,
  `hp_base` int(11) NOT NULL DEFAULT '100',
  `mana_base` int(11) NOT NULL DEFAULT '200',
  PRIMARY KEY (`id_champion`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Vider la table avant d'insérer `champion`
--

TRUNCATE TABLE `champion`;
--
-- Contenu de la table `champion`
--

INSERT INTO `champion` (`id_champion`, `classe`, `hp_base`, `mana_base`) VALUES
(1, 'informatique', 100, 200),
(2, 'materiau', 100, 200),
(3, 'electronique', 100, 200),
(4, 'optronique', 100, 200);

-- --------------------------------------------------------

--
-- Structure de la table `champion_capacite`
--

DROP TABLE IF EXISTS `champion_capacite`;
CREATE TABLE IF NOT EXISTS `champion_capacite` (
  `id_champion_capacite` int(11) NOT NULL AUTO_INCREMENT,
  `id_champion` int(11) NOT NULL,
  `id_capacite` int(11) NOT NULL,
  PRIMARY KEY (`id_champion_capacite`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Vider la table avant d'insérer `champion_capacite`
--

TRUNCATE TABLE `champion_capacite`;
--
-- Contenu de la table `champion_capacite`
--

INSERT INTO `champion_capacite` (`id_champion_capacite`, `id_champion`, `id_capacite`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 4),
(5, 2, 5),
(6, 2, 6),
(7, 3, 7),
(8, 3, 8),
(9, 3, 9),
(10, 4, 10),
(11, 4, 11),
(12, 4, 12);

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

DROP TABLE IF EXISTS `historique`;
CREATE TABLE IF NOT EXISTS `historique` (
  `id_historique` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `id_gagnant` tinyint(4) DEFAULT NULL,
  `type_salle` int(11) DEFAULT NULL,
  `tournoi` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_historique`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Vider la table avant d'insérer `historique`
--

TRUNCATE TABLE `historique`;
-- --------------------------------------------------------

--
-- Structure de la table `salle`
--

DROP TABLE IF EXISTS `salle`;
CREATE TABLE IF NOT EXISTS `salle` (
  `id_salle` int(11) NOT NULL AUTO_INCREMENT,
  `ouvert` tinyint(4) DEFAULT '1',
  `nb_joueurs` int(11) NOT NULL,
  `id_type_salle` int(11) NOT NULL,
  `xp_min` int(11) DEFAULT NULL,
  `xp_max` int(11) DEFAULT NULL,
  `cree_par` int(11) NOT NULL,
  `cree_le` datetime NOT NULL,
  `termine` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`id_salle`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Vider la table avant d'insérer `salle`
--

TRUNCATE TABLE `salle`;
--
-- Contenu de la table `salle`
--



-- --------------------------------------------------------

--
-- Structure de la table `salle_user`
--

DROP TABLE IF EXISTS `salle_user`;
CREATE TABLE IF NOT EXISTS `salle_user` (
  `id_salle_user` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_salle` int(11) NOT NULL,
  PRIMARY KEY (`id_salle_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Vider la table avant d'insérer `salle_user`
--

TRUNCATE TABLE `salle_user`;
--
-- Contenu de la table `salle_user`
--



-- --------------------------------------------------------

--
-- Structure de la table `table_tournoi`
--

DROP TABLE IF EXISTS `table_tournoi`;
CREATE TABLE IF NOT EXISTS `table_tournoi` (
  `id_table_tournoi` int(11) NOT NULL AUTO_INCREMENT,
  `id_salle` int(11) NOT NULL,
  `id_tournoi` int(11) NOT NULL,
  PRIMARY KEY (`id_table_tournoi`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Vider la table avant d'insérer `table_tournoi`
--

TRUNCATE TABLE `table_tournoi`;
--
-- Contenu de la table `table_tournoi`
--



-- --------------------------------------------------------

--
-- Structure de la table `tournoi`
--

DROP TABLE IF EXISTS `tournoi`;
CREATE TABLE IF NOT EXISTS `tournoi` (
  `id_tournoi` int(11) NOT NULL AUTO_INCREMENT,
  `heure_debut` datetime NOT NULL,
  `heure_fin` datetime NOT NULL,
  `user_vainqueur` int(11) DEFAULT NULL,
  `bonus` int(11) NOT NULL,
  PRIMARY KEY (`id_tournoi`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Vider la table avant d'insérer `tournoi`
--

TRUNCATE TABLE `tournoi`;
--
-- Contenu de la table `tournoi`
--



-- --------------------------------------------------------

--
-- Structure de la table `tournoi_user`
--

DROP TABLE IF EXISTS `tournoi_user`;
CREATE TABLE IF NOT EXISTS `tournoi_user` (
  `id_tournoi_user` int(11) NOT NULL AUTO_INCREMENT,
  `id_tournoi` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `user_points` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_tournoi_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Vider la table avant d'insérer `tournoi_user`
--

TRUNCATE TABLE `tournoi_user`;
-- --------------------------------------------------------

--
-- Structure de la table `type_salle`
--

DROP TABLE IF EXISTS `type_salle`;
CREATE TABLE IF NOT EXISTS `type_salle` (
  `id_type_salle` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_type_salle` varchar(255) NOT NULL,
  `nb_joueurs_max` int(11) NOT NULL,
  PRIMARY KEY (`id_type_salle`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Vider la table avant d'insérer `type_salle`
--

TRUNCATE TABLE `type_salle`;
--
-- Contenu de la table `type_salle`
--

INSERT INTO `type_salle` (`id_type_salle`, `libelle_type_salle`, `nb_joueurs_max`) VALUES
(1, '1 vs 1', 2),
(2, '2 vs 2', 4);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `admin` tinyint(4) NOT NULL DEFAULT '0',
  `pseudo` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT "./images/no_profile_picture.jpg",
  `password` varchar(255) NOT NULL,
  `mail_user` varchar(255) NOT NULL,
  `xp` int(11) NOT NULL DEFAULT '0',
  `combats_joues` int(11) NOT NULL DEFAULT '0',
  `combats_gagnes` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Vider la table avant d'insérer `user`
--

TRUNCATE TABLE `user`;
--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id_user`, `admin`, `pseudo`, `photo`, `password`, `mail_user`, `xp`, `combats_joues`, `combats_gagnes`) VALUES
(1, 1, 'leon', './images/no_profile_picture.jpg', '$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG', 'leon@gamil.com', 20, 1, 1),
(2, 0, 'tofuw', './images/no_profile_picture.jpg', '$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG', 'tofuw@gmail.com', 40, 2, 1),
(3, 0, 'adri', './images/no_profile_picture.jpg', '$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG', 'adri@gmail.com', 5, 0, 0),
(4, 1, 'test', './images/no_profile_picture.jpg', '$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG', 'test@gmail.com', 0, 0, 0),
(5, 0, 'test2', './images/no_profile_picture.jpg', '$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG', 'test2@gmail.com', 0, 0, 0),
(6, 0, 'annoa', './images/no_profile_picture.jpg', '$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG', 'annoa@yopmail.com', 0, 0, 0),
(7, 1, 'bbbb', './images/no_profile_picture.jpg', '$2y$10$tSZh0aW46vzXfTnAcE5y0OUnDspvyiD8TPbLZL9g5OEswV8acG66S', 'aa@aa.fr', 0, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
