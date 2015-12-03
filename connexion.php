<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
//Initialisation des variables à un string vide
$errNum_employe = $errPassword = $errConnexion = "";
$input_password = $num_employe = "";

/*
 * Fonction de test sur les valeurs entrées
 * Permet d'avoir un formulaire sécurisé
 */
function test_input($info)        {
    $info = trim($info);//Enlève els caractères inutiles
    $info = stripcslashes($info);//Enlève les \
    $info = htmlspecialchars($info);//Convertit tous les caractères spéciaux vers leurs codes
    return $info;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(empty($_POST["num_employe"])){
        $errNum_employe = "* Un numéro d'employé est requis pour ce connecter";
    }
    else{
        $num_employe = test_input($_POST['num_employe']);
    }
    if(empty($_POST["input_password"])){
        $errPassword = "* Un mot de passe est requis pour ce connecter";
    }
    else{
        $input_password = test_input($_POST['input_password']);
    }
    if(!empty($_POST["num_employe"]) && !empty($_POST["input_password"])){
        try{

            /*CONNECTION*/
            $servername = "localhost";
            $nameDB = "polo";
            $usernameDB = "root";
            $passwordDB = "";
            $poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
            // set the PDO error mode to exception
            $poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            //Requête avec l'ID
            $stmt = $poloDB->prepare("SELECT * FROM users WHERE num_employe = :num");
            $stmt->bindValue(':num', $num_employe);
            $stmt->execute();

            //On récupère les résultats
            $resultat = $stmt->fetchAll();

            if(count($resultat) == 0){//Il n'y a pas de résultat : erreur dans le numéro employé
                $errConnexion = "Le numéro d\'employé ou le mot de passe est incorrecte <br>";
            }
            else{
                $employe = $resultat[0];//On récupère la première ligne, le résultat doit être unique
                $hashedPasswordFromDB = $resultat[0]['password'];
                if(!password_verify($input_password, $hashedPasswordFromDB)){//Mauvais mot de passe
                    $errConnexion = "Le mot de passe saisi est incorrect <br>";
                }
                else{//L'employé est identifié
                    echo "<h3> Bonjour " . $employe['prenom'] . " " . $employe['nom'] . " et bienvenue sur POLO ! </h3><br>";

                    //Réinitialisation des champs de connexion
                    $num_employe = $input_password = "";
                }
            }

        }
        catch(PDOException $e){
            echo $e->getMessage();
        }
    }

}
?>
<h2>Connexion</h2>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>">
        Employé ID : <input type="text" name="num_employe" value="<?php echo $num_employe; ?>"> <span class="error"> <?php echo $errNum_employe; ?></span><br>
        Mot de passe : <input type="password" name="input_password"> <span class="error"> <?php echo $errPassword; ?></span> <br>
        <input type="submit">
    </form>
<span class="error"> <?php echo $errConnexion; ?></span>
<a href="index.php"><button>Retour</button></a>

<?php include 'footer.php'; ?>
</body>
</html>