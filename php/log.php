<?php
$servername = "localhost";
$usernameDB = "root";
$passwordDB = "";
$nameDB = "polo";

try {
    /*CONNECTION*/
    $poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
    // set the PDO error mode to exception
    $poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Successfully connected to the " . $nameDB . " database <br>";

    /*EXECUTION*/
    // sql to create table
    //$sql = "CREATE TABLE Users (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, num_employe INT(10) NOT NULL, password VARCHAR(30) NOT NULL, nom VARCHAR(30) NOT NULL, prenom VARCHAR(30) NOT NULL, email VARCHAR(50), reg_date TIMESTAMP)";
    //$poloDB->exec($sql);

    //$poloDB->exec("INSERT INTO Users(num_employe, password, nom, prenom, email) VALUES('0123456789', 'test', 'Wahl', 'Florian', 'ok@cool.fr')");

    //On prépare les commandes qu'on va pouvoir ajouter dans la table
    /*
    $stmt_user = $poloDB->prepare("INSERT INTO Users(num_employe, password, nom, prenom, email) VALUES(:num_employe, :password, :nom, :prenom, :email)");
    $stmt_user->bindParam(':num_employe', $num_employe);
    $stmt_user->bindParam(':password', $password);
    $stmt_user->bindParam(':nom', $nom);
    $stmt_user->bindParam(':prenom', $prenom);
    $stmt_user->bindParam(':email', $email);

    $num_employe = "23252325";
    $password = "testBis";
    $nom = "Pierre";
    $prenom = "Paul";
    $email = "";
    $stmt_user->execute();

    */
    echo "<br> Ok !";

    /*DISCONNECTION*/
    $poloDB = null;
    echo "<br> Successfully disconnected from the  " . $nameDB . " database <br>";
}
catch(PDOException $e)
{

    echo "<br>" . $e->getMessage();
}
?>