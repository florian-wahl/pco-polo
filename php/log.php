<?php
/*CONNECTION*/
$servername = "localhost";
$nameDB = "polo";
$usernameDB = "root";
$passwordDB = "";
$poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
// set the PDO error mode to exception
$poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
echo "Successfully connected to the " . $nameDB . " database <br>";
?>