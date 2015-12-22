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
    else {


        try {

            /*
             * Fonction de test sur les valeurs entrées
             * Permet d'avoir un formulaire sécurisé
             */
            function test_input($info)
            {
                $info = trim($info);//Enlève els caractères inutiles
                $info = stripcslashes($info);//Enlève les \
                $info = htmlspecialchars($info);//Convertit tous les caractères spéciaux vers leurs codes
                return $info;
            }

            //Initialisation des variables à un string vide
            $errNom = $errPrenom = $errMatricule = $errPassword = "";
            $nom = $password = $prenom = $matricule = "";
            $okPassword = $okNom = $okPrenom = $okMatricule = false;

            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                if (empty($_POST["nom"])) {
                    $errNom = "Votre Nom est requis";
                } elseif (!preg_match("/^[a-zA-Z ]*$/", $_POST["nom"])) {
                    $errNom = "Ne peut contenir que des lettres et des espaces";
                } else {
                    $nom = test_input($_POST["nom"]);
                    $okNom = true;
                }

                if (empty($_POST["prenom"])) {
                    $errPrenom = "Votre Prénom est requis";
                } elseif (!preg_match("/^[a-zA-Z ]*$/", $_POST["prenom"])) {
                    $errPrenom = "Ne peut contenir que des lettres et des espaces";
                } else {
                    $prenom = test_input($_POST["prenom"]);
                    $okPrenom = true;
                }

                if (empty($_POST["matricule"])) {
                    $errMatricule = "Votre numéro d'employé est requis";
                } elseif (!preg_match("/^[0-9]*$/", $_POST["matricule"])) {
                    $errMatricule = "Ne peut contenir que des chiffres";
                } else {
                    $matricule = test_input($_POST["matricule"]);
                    $okMatricule = true;
                }

                if (empty($_POST["password"])) {
                    $errPassword = "Un mot de passe est requis";
                } elseif (count_chars($_POST["password"]) < 5) {
                    $errPassword = "Votre mot de passe est trop petit. Il faut au moins 6 caractères.";
                } else {
                    $password = $_POST["password"];

                    if (empty($_POST["password_bis"])) {
                        $errPassword = "Un mot de passe est requis";
                    } elseif (count_chars($_POST["password_bis"]) < 5) {
                        $errPassword = "Votre mot de passe est trop petit. Il faut au moins 6 caractères.";
                    } else {
                        $password_bis = $_POST["password_bis"];

                        if ($_POST["password"] !== $_POST["password_bis"]) {
                            $errPassword = "Les deux mots de passe doivent correspondrent.";
                        } else {
                            $okPassword = true;
                            $hashedpassword = password_hash($password, PASSWORD_BCRYPT);
                        }
                    }
                }


                if ($okPrenom && $okPassword && $okNom && $okMatricule) {
                    /*CONNEXION A LA BDD SI TOUTES LES INFORMATIONS SONT RENSEIGNEES*/
                    try {

                        /*CONNECTION*/
                        $poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
                        // set the PDO error mode to exception
                        $poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        /*EXECUTION*/

                        //On vérifie que le numéro employé n'est pas déjà utilisé
                        //Requête avec l'ID
                        $stmt = $poloDB->prepare("SELECT * FROM users WHERE matricule = :num");
                        $stmt->bindValue(':num', $matricule);
                        $stmt->execute();

                        //On récupère les résultats
                        $resultat = $stmt->fetchAll();
                        if(count($resultat) != 0){
                            $errMatricule = "Le numéro que vous avez saisi est déjà utilié";
                        }
                        else{
                            //On prépare les commandes qu'on va pouvoir ajouter dans la table
                            $stmt_user = $poloDB->prepare("INSERT INTO Users(nom, prenom, matricule, password, question_s_1, rep_s_1, question_s_2, rep_s_2, score_id_score, personnage_id_personnage) VALUES(:nom, :prenom, :matricule, :password, 'a', 'b', 'c', 'd', '1', '1')");
                            $stmt_user->bindParam(':matricule', $matricule);
                            $stmt_user->bindParam(':password', $hashedpassword);
                            $stmt_user->bindParam(':nom', $nom);
                            $stmt_user->bindParam(':prenom', $prenom);

                            $stmt_user->execute();

                            $nom = $password = $prenom = $matricule = "";

                            /*DISCONNECTION*/
                            $poloDB = null;

                            /*REDIRECTION*/
                            header("Refresh:0; url=inscription_ok.php"); //Relaod page and redirect to index.php
                        }



                    } catch (PDOException $e) {

                        echo "<br>" . $e->getMessage();
                    }
                }

            }
        } catch (Exception $e) {
            echo 'Message d\'erreur: ' . $e->getMessage();
        }
        ?>

    <div class="element">
        <h2>Création d'un nouveau compte utilisateur</h2>
        <form class="formulaire" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">

            Nom : <input type="text" name="nom" value="<?php echo $nom; ?>"> *<span
                class="error"> <?php echo $errNom; ?></span> <br>
            Prénom : <input type="text" name="prenom" value="<?php echo $prenom; ?>"> *<span
                class="error"> <?php echo $errPrenom; ?></span> <br>
            Employé ID : <input type="text" name="matricule" value="<?php echo $matricule; ?>"> *<span
                class="error"> <?php echo $errMatricule; ?></span><br>
            Mot de passe : <input type="password" name="password"> *<span
                class="error"> <?php echo $errPassword; ?></span> <br>
            Mot de passe : <input type="password" name="password_bis"> * <br>
            <span style="font-size: small;"> * Ces informations sont obligatoires.</span><br>
            <input class="formulaire_button" type="submit" value="S'inscrire">
        </form>
        <input type="button" onclick="location.href='menu_principal.php';" value="Retour" />
        <br>

    </div>
        <?php
    }
    ?>

</body>

<?php include "footer.php";?>

</html>