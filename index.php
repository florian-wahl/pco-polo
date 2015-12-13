<?php include 'php/first.php'; ?>
<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
    <?php
    if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['num_employe'])){
        //L'employé est déjà connecté
        ?>
        <script>window.location.replace("menu_principal.php");</script>
        <?php
    }
    else{

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

                    /*CONNEXION*/
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

                            $_SESSION['LoggedIn'] = 1;
                            $_SESSION['num_employe'] = $num_employe;
                            $_SESSION['nom'] = $employe['nom'];
                            $_SESSION['prenom'] = $employe['prenom'];

                            //Réinitialisation des champs de connexion
                            $num_employe = $input_password = "";

                            /*DECONNEXION*/
                            $poloDB = null;

                            /*REDIRECTION*/
                            ?>
                            <script>window.location.replace("menu_principal.php");</script>

                            <?php
                        }
                    }

                }
                catch(PDOException $e){
                    echo $e->getMessage();
                }
            }

        }
        ?>
        <div class="element">
            <h2>Identifiez-vous :</h2>
            <form class="formulaire" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>">
                Employé ID : <input type="text" name="num_employe" value="<?php echo $num_employe; ?>"> <span class="error"> <?php echo $errNum_employe; ?></span><br>
                Mot de passe : <input type="password" name="input_password"> <span class="error"> <?php echo $errPassword; ?></span> <br>
                <input class="formulaire_button" type="submit" value="S'identier">
            </form>
            <span class="error"> <?php echo $errConnexion; ?></span>
            <h2>Vous n'êtes pas encore inscrit ?</h2>
            <input type="button" onclick="location.href='inscription.php';" value="S'inscrire" />
        </div>
        <?php
    }
    ?>
</body>
<?php include 'footer.php';?>
</html>