/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : polyquest

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2016-05-17 10:48:49
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
