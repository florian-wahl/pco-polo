<?php include 'php/first.php'; ?>
<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
    <?php
    if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
        //L'employé est déjà connecté
        ?>
        <script>window.location.replace("menu_principal.php");</script>
        <?php
    }
    else{

        //Initialisation des variables à un string vide
        $errMatricule = $errPassword = $errConnexion = "";
        $input_password = $matricule = "";

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
            if(empty($_POST["matricule"])){
                $errMatricule = "* Un matricule est requis pour se connecter";
            }
            else{
                $matricule = test_input($_POST['matricule']);
            }
            if(empty($_POST["input_password"])){
                $errPassword = "* Un mot de passe est requis pour se connecter";
            }
            else{
                $input_password = test_input($_POST['input_password']);
            }
            if(!empty($_POST["matricule"]) && !empty($_POST["input_password"])){
                try{

                    /*CONNEXION*/
                    $poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
                    // set the PDO error mode to exception
                    $poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                    //Requête avec l'ID
                    $stmt = $poloDB->prepare("SELECT * FROM users, score WHERE matricule = :num AND score_id_score = id_score;");
                    $stmt->bindValue(':num', $matricule);
                    $stmt->execute();

                    //On récupère les résultats
                    $resultat = $stmt->fetchAll();

                    if(count($resultat) == 0){//Il n'y a pas de résultat : erreur dans le numéro employé
                        $errConnexion = "Le matricule ou le mot de passe est incorrect <br>";
                    }
                    else{
                        $employe = $resultat[0];//On récupère la première ligne, le résultat doit être unique
                        $hashedPasswordFromDB = $resultat[0]['password'];
                        if(!password_verify($input_password, $hashedPasswordFromDB)){//Mauvais mot de passe
                            $errConnexion = "Le mot de passe saisi est incorrect <br>";
                        }
                        else{//L'employé est identifié

                            $_SESSION['LoggedIn'] = 1;
                            $_SESSION['matricule'] = $matricule;
                            $_SESSION['nom'] = $employe['nom'];
                            $_SESSION['prenom'] = $employe['prenom'];
                            $_SESSION['pseudonyme'] = $employe['pseudonyme'];
                            $_SESSION['id_user'] = $employe['id_user'];
                            $_SESSION['id_personnage'] = $employe['personnage_id_personnage'];
                            $_SESSION['id_score'] = $employe['id_score'];
                            $_SESSION['score_jour'] = $employe['score_jour'];
                            $_SESSION['best_score'] = $employe['best_score'];
                            $_SESSION['jetons'] = $employe['jetons'];


                            //Réinitialisation des champs de connexion
                            $matricule = $input_password = "";

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
        <div id="container">
            <form id="formulaire" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>">
                <fieldset><h2>Connectez-vous</h2>
                    <p>
                        <label for="matricule">Matricule</label>
                        <input type="text" name="matricule" id="matricule" value="<?php echo $matricule; ?>"> <span class="error"> <?php echo $errMatricule; ?></span>
                    </p>
                    <p>
                        <label for="paswword">Mot de passe</label>
                        <input type="password" name="input_password" id="paswword"> <span class="error"> <?php echo $errPassword; ?></span>
                    </p>
                    <p>
                        <label>&nbsp;</label>
                        <input type="submit" value="S'identier">
                    </p>
                    <p>
                        <label>&nbsp;</label>
                        <span class="error"> <?php echo $errConnexion; ?></span>
                    </p>
                 </fieldset>
            </form>

            <form id="formulaire">
                <fieldset><h2>Vous n'êtes pas encore inscrit ?</h2>
                    <p>
                        <label>&nbsp;</label>
                        <input class="formulaire_button" type="button" onclick="location.href='inscription.php';" value="S'inscrire" />
                    </p>
                </fieldset>
            </form>

        </div>
        <?php
    }
    ?>
</body>
<?php include 'footer.php';?>
</html>