/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : polyquest

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2016-05-18 10:31:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `capacite`
-- ----------------------------
DROP TABLE IF EXISTS `capacite`;
CREATE TABLE `capacite` (
  `id_capacite` int(11) NOT NULL AUTO_INCREMENT,
  `nom_capacite` varchar(255) NOT NULL,
  `montant_soins` int(11) NOT NULL DEFAULT '0',
  `montant_degats` int(11) NOT NULL DEFAULT '0',
  `cout_mana` int(11) NOT NULL DEFAULT '0',
  `xp_requis` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_capacite`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of capacite
-- ----------------------------
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (1,'mug_de_cafe',5,0,10,0);
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (2,'lance_de_clavier',0,10,15,0);
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (3,'riff_de_guitare',0,10,30,0);
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (4,'potion_au_ciment',5,0,10,0);
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (5,'lance_de_disque_en_ceramique',0,10,20,0);
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (6,'projection_de_roche',0,15,30,0);
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (7,'pile_a_combustile',5,0,5,0);
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (8,'morsure_de_cable_electrique',0,10,15,0);
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (9,'electrocution_de_masse',0,15,30,0);
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (10,'lumiere_noire',10,0,15,0);
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (11,'lentille_convergente',0,5,15,0);
INSERT INTO `capacite` (`id_capacite`,`nom_capacite`,`montant_soins`,`montant_degats`,`cout_mana`,`xp_requis`) VALUES (12,'rayon_laser_multiple',0,10,20,0);

-- ----------------------------
-- Table structure for `champion`
-- ----------------------------
DROP TABLE IF EXISTS `champion`;
CREATE TABLE `champion` (
  `id_champion` int(11) NOT NULL AUTO_INCREMENT,
  `classe` varchar(255) NOT NULL,
  `hp_base` int(11) NOT NULL DEFAULT '100',
  `mana_base` int(11) NOT NULL DEFAULT '200',
  PRIMARY KEY (`id_champion`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of champion
-- ----------------------------
INSERT INTO `champion` (`id_champion`,`classe`,`hp_base`,`mana_base`) VALUES (1,'informatique',100,200);
INSERT INTO `champion` (`id_champion`,`classe`,`hp_base`,`mana_base`) VALUES (2,'materiau',100,200);
INSERT INTO `champion` (`id_champion`,`classe`,`hp_base`,`mana_base`) VALUES (3,'electronique',100,200);
INSERT INTO `champion` (`id_champion`,`classe`,`hp_base`,`mana_base`) VALUES (4,'optronique',100,200);

-- ----------------------------
-- Table structure for `champion_capacite`
-- ----------------------------
DROP TABLE IF EXISTS `champion_capacite`;
CREATE TABLE `champion_capacite` (
  `id_champion_capacite` int(11) NOT NULL AUTO_INCREMENT,
  `id_champion` int(11) NOT NULL,
  `id_capacite` int(11) NOT NULL,
  PRIMARY KEY (`id_champion_capacite`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of champion_capacite
-- ----------------------------
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (1,1,1);
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (2,1,2);
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (3,1,3);
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (4,2,4);
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (5,2,5);
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (6,2,6);
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (7,3,7);
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (8,3,8);
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (9,3,9);
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (10,4,10);
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (11,4,11);
INSERT INTO `champion_capacite` (`id_champion_capacite`,`id_champion`,`id_capacite`) VALUES (12,4,12);

-- ----------------------------
-- Table structure for `salle`
-- ----------------------------
DROP TABLE IF EXISTS `salle`;
CREATE TABLE `salle` (
  `id_salle` int(11) NOT NULL AUTO_INCREMENT,
  `ouvert` tinyint(4) DEFAULT 1,
  `nb_joueurs` int(11) NOT NULL,
  `id_type_salle` int(11) NOT NULL,
  `xp_min` int(11) DEFAULT NULL,
  `xp_max` int(11) DEFAULT NULL,
  `cree_par` int(11) NOT NULL,
  `cree_le` datetime NOT NULL,
  PRIMARY KEY (`id_salle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of salle
-- ----------------------------

-- ----------------------------
-- Table structure for `salle_user`
-- ----------------------------
DROP TABLE IF EXISTS `salle_user`;
CREATE TABLE `salle_user` (
  `id_salle_user` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_salle` int(11) NOT NULL,
  PRIMARY KEY (`id_salle_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of salle_user
-- ----------------------------

-- ----------------------------
-- Table structure for `table_tournoi`
-- ----------------------------
DROP TABLE IF EXISTS `table_tournoi`;
CREATE TABLE `table_tournoi` (
  `id_table_tournoi` int(11) NOT NULL AUTO_INCREMENT,
  `id_salle` int(11) NOT NULL,
  `id_tournoi` int(11) NOT NULL,
  PRIMARY KEY (`id_table_tournoi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_tournoi
-- ----------------------------

-- ----------------------------
-- Table structure for `tournoi`
-- ----------------------------
DROP TABLE IF EXISTS `tournoi`;
CREATE TABLE `tournoi` (
  `id_tournoi` int(11) NOT NULL AUTO_INCREMENT,
  `heure_debut` datetime NOT NULL,
  `heure_fin` datetime NOT NULL,
  `user_vainqueur` int(11) DEFAULT NULL,
  `bonus` int(11) NOT NULL,
  PRIMARY KEY (`id_tournoi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tournoi
-- ----------------------------

-- ----------------------------
-- Table structure for `tournoi_user`
-- ----------------------------
DROP TABLE IF EXISTS `tournoi_user`;
CREATE TABLE `tournoi_user` (
  `id_tournoi_user` int(11) NOT NULL AUTO_INCREMENT,
  `id_tournoi` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `user_points` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_tournoi_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tournoi_user
-- ----------------------------

-- ----------------------------
-- Table structure for `type_salle`
-- ----------------------------
DROP TABLE IF EXISTS `type_salle`;
CREATE TABLE `type_salle` (
  `id_type_salle` int(11) NOT NULL AUTO_INCREMENT,
  `libelle_type_salle` varchar(255) NOT NULL,
  PRIMARY KEY (`id_type_salle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of type_salle
-- ----------------------------

INSERT INTO `type_salle` (`id_type_salle`,`libelle_type_salle`) VALUES (1, "1 vs 1");
INSERT INTO `type_salle` (`id_type_salle`,`libelle_type_salle`) VALUES (2, "2 vs 2");

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `admin` tinyint(4) NOT NULL DEFAULT '0',
  `pseudo` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `mail_user` varchar(255) NOT NULL,
  `xp` int(11) NOT NULL DEFAULT '0',
  `combats_joues` int(11) NOT NULL DEFAULT '0',
  `combats_gagnes` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` (`id_user`,`admin`,`pseudo`,`photo`,`password`,`mail_user`,`xp`,`combats_joues`,`combats_gagnes`) VALUES (1,1,'leon',NULL,'$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG','leon@gamil.com',20,1,1);
INSERT INTO `user` (`id_user`,`admin`,`pseudo`,`photo`,`password`,`mail_user`,`xp`,`combats_joues`,`combats_gagnes`) VALUES (2,0,'tofuw',NULL,'$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG','tofuw@gmail.com',40,2,1);
INSERT INTO `user` (`id_user`,`admin`,`pseudo`,`photo`,`password`,`mail_user`,`xp`,`combats_joues`,`combats_gagnes`) VALUES (3,0,'adri',NULL,'$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG','adri@gmail.com',5,0,0);
INSERT INTO `user` (`id_user`,`admin`,`pseudo`,`photo`,`password`,`mail_user`,`xp`,`combats_joues`,`combats_gagnes`) VALUES (4,1,'test',NULL,'$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG','test@gmail.com',0,0,0);
INSERT INTO `user` (`id_user`,`admin`,`pseudo`,`photo`,`password`,`mail_user`,`xp`,`combats_joues`,`combats_gagnes`) VALUES (5,0,'test2',NULL,'$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG','test2@gmail.com',0,0,0);
INSERT INTO `user` (`id_user`,`admin`,`pseudo`,`photo`,`password`,`mail_user`,`xp`,`combats_joues`,`combats_gagnes`) VALUES (6,0,'annoa',NULL,'$2y$10$fFv86mipa/he7YzS1B1.Luam0eAL.EX1wEHH.IXtWZbLUq7MLqKeG','annoa@yopmail.com',0,0,0);

-- ----------------------------
-- Table structure for `historique`
-- ----------------------------
DROP TABLE IF EXISTS `historique`;
CREATE TABLE `historique` (
  `id_historique` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `id_gagnant` tinyint(4) DEFAULT NULL,
  `type_salle` int(11) DEFAULT NULL,
  `tournoi` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_historique`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;