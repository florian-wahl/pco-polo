<?php
//On démarre la session
session_start();

//on initialise les variables pour se connecter a MySQL
global $servername, $nameDB, $usernameDB, $passwordDB;
$servername = "localhost";
$nameDB = "polo";
$usernameDB = "polo";
$passwordDB = "poloGI@2015";

/*CONNEXION*/
$poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
// set the PDO error mode to exception
$poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $poloDB->prepare("SET NAMES 'utf8';");
$stmt->execute();

?>