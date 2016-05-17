/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : polyquest

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2016-05-17 14:31:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `capacite`
-- ----------------------------
DROP TABLE IF EXISTS `capacite`;
CREATE TABLE `capacite` (
  `id_capacite` int(11) NOT NULL AUTO_INCREMENT,
  `montant_soins` int(11) NOT NULL DEFAULT '0',
  `montant_degats` int(11) NOT NULL DEFAULT '0',
  `cout_mana` int(11) NOT NULL DEFAULT '0',
  `xp_requis` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_capacite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of capacite
-- ----------------------------

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of champion
-- ----------------------------

-- ----------------------------
-- Table structure for `champion_capacite`
-- ----------------------------
DROP TABLE IF EXISTS `champion_capacite`;
CREATE TABLE `champion_capacite` (
  `id_champion_capacite` int(11) NOT NULL AUTO_INCREMENT,
  `id_champion` int(11) NOT NULL,
  `id_capacite` int(11) NOT NULL,
  PRIMARY KEY (`id_champion_capacite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of champion_capacite
-- ----------------------------

-- ----------------------------
-- Table structure for `salle`
-- ----------------------------
DROP TABLE IF EXISTS `salle`;
CREATE TABLE `salle` (
  `id_salle` int(11) NOT NULL AUTO_INCREMENT,
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
-- Table structure for `tournoi`
-- ----------------------------
DROP TABLE IF EXISTS `tournoi`;
CREATE TABLE `tournoi` (
  `id_tournoi` int(11) NOT NULL AUTO_INCREMENT,
  `heure_debut` datetime NOT NULL,
  `heure_fin` datetime NOT NULL,
  `user_vainqueur` int(11) DEFAULT NULL,
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

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `admin` tinyint(4) NOT NULL DEFAULT '0',
  `pseudo` varchar(255) NOT NULL,
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
