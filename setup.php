<?php
/*
 *Utiliser ce script pour générer la base de donnée et les tables correspondantes sur le serveur
 * Atcuellement :
 * BDD
 * polo
 * TABLE
 * Users(id, matricule, password, nom, prenom, email, reg_date)
 *
 */

/*CREATION DES TABLES*/

/*
//Users
$sql = "CREATE TABLE Users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    matricule VARCHAR(15) NOT NULL,
    password VARCHAR(80) NOT NULL,
    nom VARCHAR(30) NOT NULL,
    prenom VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    reg_date TIMESTAMP
    )";
$poloDB->exec($sql);
echo 'TABLE Users cree <br>';


//Admins
$sql = "CREATE TABLE Admins (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    identifiant VARCHAR(15) NOT NULL,
    password VARCHAR(80) NOT NULL,
    reg_date TIMESTAMP
    )";
$poloDB->exec($sql);
echo 'TABLE Admins cree <br>';
*/
//Set default admin
$hashedpassword = password_hash('marco@2015', PASSWORD_BCRYPT);
$sql = "INSERT INTO Admins(identifiant, password) VALUES('marcopolo', '$hashedpassword')";
$poloDB->exec($sql);
echo 'Admin marcopolo cree <br>';


//DECONNEXION
$poloDB = null;

?>