-- MySQL Script generated by MySQL Workbench
-- 03/19/16 16:48:15
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema polo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema polo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `polo` DEFAULT CHARACTER SET utf8 ;
USE `polo` ;

-- -----------------------------------------------------
-- Table `polo`.`admins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `polo`.`admins` ;

CREATE TABLE IF NOT EXISTS `polo`.`admins` (
  `id_admin` INT(6) UNSIGNED NOT NULL AUTO_INCREMENT,
  `identifiant` VARCHAR(15) NOT NULL,
  `password` VARCHAR(80) NOT NULL,
  `reg_date` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_admin`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `polo`.`score`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `polo`.`score` ;

CREATE TABLE IF NOT EXISTS `polo`.`score` (
  `id_score` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `score` INT(10) NOT NULL DEFAULT 0,
  `jetons` INT(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_score`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `polo`.`personnage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `polo`.`personnage` ;

CREATE TABLE IF NOT EXISTS `polo`.`personnage` (
  `id_personnage` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `clan` VARCHAR(45) NOT NULL DEFAULT 'defaut',
  `couleur` VARCHAR(45) NOT NULL DEFAULT 'defaut',
  PRIMARY KEY (`id_personnage`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `polo`.`logs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `polo`.`logs` ;

CREATE TABLE IF NOT EXISTS `polo`.`logs` (
  `id_log` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `last_log_date` DATE NOT NULL,
  `last_log_time` TIME NOT NULL,
  `nb_log` INT NOT NULL,
  `last_delog_time` DATE NULL,
  `connexion_duration` INT NULL DEFAULT 0,
  PRIMARY KEY (`id_log`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `polo`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `polo`.`users` ;

CREATE TABLE IF NOT EXISTS `polo`.`users` (
  `id_user` INT(6) UNSIGNED NOT NULL AUTO_INCREMENT,
  `prenom` VARCHAR(30) NOT NULL,
  `matricule` VARCHAR(15) NOT NULL,
  `password` VARCHAR(80) NOT NULL,
  `escale` VARCHAR(45) NOT NULL,
  `reg_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `pseudonyme` VARCHAR(45) NOT NULL DEFAULT 'defaut',
  `score_id_score` INT UNSIGNED NOT NULL,
  `personnage_id_personnage` INT UNSIGNED NOT NULL,
  `logs_id_log` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id_user`, `score_id_score`, `personnage_id_personnage`, `logs_id_log`),
  CONSTRAINT `fk_users_score1`
    FOREIGN KEY (`score_id_score`)
    REFERENCES `polo`.`score` (`id_score`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_personnage1`
    FOREIGN KEY (`personnage_id_personnage`)
    REFERENCES `polo`.`personnage` (`id_personnage`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_logs1`
    FOREIGN KEY (`logs_id_log`)
    REFERENCES `polo`.`logs` (`id_log`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_users_score1_idx` ON `polo`.`users` (`score_id_score` ASC);

CREATE INDEX `fk_users_personnage1_idx` ON `polo`.`users` (`personnage_id_personnage` ASC);

CREATE INDEX `fk_users_logs1_idx` ON `polo`.`users` (`logs_id_log` ASC);


-- -----------------------------------------------------
-- Table `polo`.`badges`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `polo`.`badges` ;

CREATE TABLE IF NOT EXISTS `polo`.`badges` (
  `id_badge` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id_badge`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `polo`.`users_badges`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `polo`.`users_badges` ;

CREATE TABLE IF NOT EXISTS `polo`.`users_badges` (
  `users_id_user` INT(6) UNSIGNED NOT NULL,
  `badges_id_badge` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`users_id_user`, `badges_id_badge`),
  CONSTRAINT `fk_users_has_badges_users`
    FOREIGN KEY (`users_id_user`)
    REFERENCES `polo`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_badges_badges1`
    FOREIGN KEY (`badges_id_badge`)
    REFERENCES `polo`.`badges` (`id_badge`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_users_has_badges_badges1_idx` ON `polo`.`users_badges` (`badges_id_badge` ASC);

CREATE INDEX `fk_users_has_badges_users_idx` ON `polo`.`users_badges` (`users_id_user` ASC);


-- -----------------------------------------------------
-- Table `polo`.`users_quizz`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `polo`.`users_quizz` ;

CREATE TABLE IF NOT EXISTS `polo`.`users_quizz` (
  `users_id_user` INT(6) UNSIGNED NOT NULL,
  `id_quizz` INT(6) UNSIGNED NOT NULL,
  `id_zone` INT(6) NOT NULL,
  `id_op` INT(6) NOT NULL,
  `valide` TINYINT(1) NOT NULL DEFAULT 0,
  `occurence` INT(6) NOT NULL DEFAULT 0,
  `occurenceAvantValidation` INT(6) NULL,
  PRIMARY KEY (`users_id_user`, `id_quizz`),
  CONSTRAINT `fk_users_has_quizz_users1`
    FOREIGN KEY (`users_id_user`)
    REFERENCES `polo`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_users_has_quizz_users1_idx` ON `polo`.`users_quizz` (`users_id_user` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `polo`.`personnage`
-- -----------------------------------------------------
START TRANSACTION;
USE `polo`;
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (1, 'Qi', 'Green');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (2, 'Qi', 'Red');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (3, 'Qi', 'Yellow');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (4, 'Qi', 'Purple');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (5, 'Qi', 'Blue');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (6, 'Tec', 'Green');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (7, 'Tec', 'Red');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (8, 'Tec', 'Yellow');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (9, 'Tec', 'Purple');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (10, 'Tec', 'Blue');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (11, 'Pri', 'Green');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (12, 'Pri', 'Red');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (13, 'Pri', 'Yellow');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (14, 'Pri', 'Purple');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (15, 'Pri', 'Blue');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (16, 'Lav', 'Green');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (17, 'Lav', 'Red');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (18, 'Lav', 'Yellow');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (19, 'Lav', 'Purple');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (20, 'Lav', 'Blue');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (21, 'Tut', 'Green');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (22, 'Tut', 'Red');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (23, 'Tut', 'Yellow');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (24, 'Tut', 'Purple');
INSERT INTO `polo`.`personnage` (`id_personnage`, `clan`, `couleur`) VALUES (25, 'Tut', 'Blue');

COMMIT;


-- -----------------------------------------------------
-- Data for table `polo`.`badges`
-- -----------------------------------------------------
START TRANSACTION;
USE `polo`;
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (1, 'Niveau 1', 'Vous avez fini le niveau 1');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (2, 'Niveau 2', 'Vous avez fini le niveau 2');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (3, 'Niveau 3', 'Vous avez fini le niveau 3');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (4, 'Niveau 4', 'Vous avez fini le niveau 4');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (5, 'Niveau 5', 'Vous avez fini le niveau 5');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (6, 'Tous les niveaux !', 'Vous avez fini tous les niveaux. Félicitations !');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (7, 'Toutes les missions POLO', 'Vous avez validé toutes les missions POLO !');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (8, 'Jouer à un mini-jeux', 'Vous avez joué à un mini-jeu');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (9, 'Créer son personnage', 'Vous avez créé votre personnage');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (10, '1000 points', 'Vous avez atteint un score global de 1000 points');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (11, '100 questions', 'Vous avez répondu correctement à 100 questions');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (12, 'Aider quelqu\'un', 'Vous avez aidé quelqu\'un avec un problème');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (13, '10 personnes différentes', 'Vous avez intéragi avec 10 personnes différentes');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (14, '1er !', 'Vous avez été premier du tableau de score global');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (15, 'Top 50', 'Vous avez fait parti des 50 premiers du tableau de score global');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (16, 'Top 10', 'Vous avez fait parti des 10 premiers du tableau de score global');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (17, 'Peut mieux faire', 'Vous avez été dernier du classement... Mais ce n\'est pas grave, vous allez certainement faire mieux !');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (18, 'Regarder les aides', 'Vous avez regardé toutes les aides présentes dans le menu d\'aides');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (19, 'Silence', 'Vous avez éteint tous les sons du jeu');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (20, 'Concurrent', 'Vous avez consulté votre score global et journalier');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (21, 'Sécurité de l\'iPad', 'Vous avez répondu à tous les quizz de cette mission');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (22, 'Utilisation de l\'iPad', 'Vous avez répondu à tous les quizz de cette mission');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (23, 'Connaissance de MARCO', 'Vous avez répondu à tous les quizz de cette mission');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (24, 'Diagnostic client', 'Vous avez répondu à tous les quizz de cette mission');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (25, 'Gestion des flux', 'Vous avez répondu à tous les quizz de cette mission');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (26, 'Commercial', 'Vous avez répondu à tous les quizz de cette mission');
INSERT INTO `polo`.`badges` (`id_badge`, `nom`, `description`) VALUES (27, 'Tous les badges !', 'Vous avez débloqué tous les badges disponibles. Félicitations !');

COMMIT;

