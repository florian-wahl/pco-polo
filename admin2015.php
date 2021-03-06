<?php include 'php/first_sql_conf.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'php/header.php';?>
<body>
<?php


    //Initialisation des variables à un string vide
    $errIdentifiant = $errPassword = $errConnexion = "";
    $input_password = $identifiant = "";

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
        if (empty($_POST["identifiant"])) {
            $errIdentifiant = "* Un identifiant est requis";
        } else {
            $identifiant = test_input($_POST['identifiant']);
        }
        if (empty($_POST["input_password"])) {
            $errPassword = "* Un mot de passe est requis pour ce connecter";
        } else {
            $input_password = test_input($_POST['input_password']);
        }

        if (!empty($_POST["identifiant"]) && !empty($_POST["input_password"])) {
            try{

                //Requête avec l'ID
                $stmt = $poloDB->prepare("SELECT * FROM Admins WHERE identifiant = :id");
                $stmt->bindValue(':id', $identifiant);
                $stmt->execute();

                //On récupère les résultats
                $resultat = $stmt->fetchAll();

                if(count($resultat) == 0){//Il n'y a pas de résultat
                    $errConnexion = "Erreur lors de la connexion. <br>";
                }
                else{
                    $employe = $resultat[0];//On récupère la première ligne, le résultat doit être unique
                    $hashedPasswordFromDB = $resultat[0]['password'];
                    if(!password_verify($input_password, $hashedPasswordFromDB)){//Mauvais mot de passe
                        $errConnexion = "Erreur lors de la connexion. <br>";
                    }
                    else{//L'administrateur est identifié

                        $_SESSION['LoggedInAdmin'] = 1;
                        $_SESSION['identifiant'] = $identifiant;

                        //Réinitialisation des champs de connexion
                        $identifiant = $input_password = "";

                        /*DECONNEXION*/
                        $poloDB = null;

                        /*REDIRECTION*/
                        header("Refresh:0; url=admin2015/index.php"); //Relaod page and redirect to admin2015/index.php
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
        <fieldset><h2>Administration - Connexion</h2>
            <p>
                <label for="identifiant">Identifiant</label>
                <input type="text" name="identifiant" id="identifiant" value="<?php echo $identifiant; ?>"> <span class="error"> <?php echo $errIdentifiant; ?></span>
            </p>
            <p>
                <label for="paswword">Mot de passe</label>
                <input type="password" name="input_password" id="paswword"> <span class="error"> <?php echo $errPassword; ?></span>
            </p>

            <p>
                <label>&nbsp;</label>
                <input type="submit" value="S'identier">
                <input type="button" onclick="location.href='menu_principal.php';" value="Retour" />
            </p>
            <p>
                <label>&nbsp;</label>
                <span class="error"> <?php echo $errConnexion; ?></span>
            </p>
        </fieldset>
    </form>


<?php include 'php/footer.php'; ?>
</body>
</html>