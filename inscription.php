<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>

    <?php
    if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['num_employe'])){
        //L'employé est déjà connecté
        header("refresh:0; url=menu_principal.php");

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
            $errNom = $errPrenom = $errNum_employe = $errPassword = "";
            $nom = $password = $prenom = $num_employe = "";
            $okPassword = $okNom = $okPrenom = $okNum_employe = false;

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

                if (empty($_POST["num_employe"])) {
                    $errNum_employe = "Votre numéro d'employé est requis";
                } elseif (!preg_match("/^[0-9]*$/", $_POST["num_employe"])) {
                    $errNum_employe = "Ne peut contenir que des chiffres";
                } else {
                    $num_employe = test_input($_POST["num_employe"]);
                    $okNum_employe = true;
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


                if ($okPrenom && $okPassword && $okNom && $okNum_employe) {
                    /*CONNEXION A LA BDD SI TOUTES LES INFORMATIONS SONT RENSEIGNEES*/
                    try {

                        /*CONNECTION*/
                        $poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
                        // set the PDO error mode to exception
                        $poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        /*EXECUTION*/

                        //On vérifie que le numéro employé n'est pas déjà utilisé
                        //Requête avec l'ID
                        $stmt = $poloDB->prepare("SELECT * FROM users WHERE num_employe = :num");
                        $stmt->bindValue(':num', $num_employe);
                        $stmt->execute();

                        //On récupère les résultats
                        $resultat = $stmt->fetchAll();
                        if(count($resultat) != 0){
                            $errNum_employe = "Le numéro que vous avez saisi est déjà utilié";
                        }
                        else{
                            //On prépare les commandes qu'on va pouvoir ajouter dans la table
                            $stmt_user = $poloDB->prepare("INSERT INTO Users(num_employe, password, nom, prenom, email) VALUES(:num_employe, :password, :nom, :prenom, :email)");
                            $stmt_user->bindParam(':num_employe', $num_employe);
                            $stmt_user->bindParam(':password', $hashedpassword);
                            $stmt_user->bindParam(':nom', $nom);
                            $stmt_user->bindParam(':prenom', $prenom);
                            $stmt_user->bindParam(':email', $email);

                            $stmt_user->execute();

                            $nom = $password = $prenom = $num_employe = "";

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
            Employé ID : <input type="text" name="num_employe" value="<?php echo $num_employe; ?>"> *<span
                class="error"> <?php echo $errNum_employe; ?></span><br>
            Mot de passe : <input type="password" name="password"> *<span
                class="error"> <?php echo $errPassword; ?></span> <br>
            Mot de passe : <input type="password" name="password_bis"> * <br>
            <span style="font-size: small;"> * Ces informations sont obligatoires.</span><br>
            <input class="formulaire_button" type="submit">
        </form>
        <a  href="index.php"><button class="formulaire_button">Retour</button></a>
        <br>

    </div>
        <?php
    }
    ?>

</body>

<?php include "footer.php";?>

</html>