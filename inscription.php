<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'php/header.php';?>
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
                $info = trim($info);//Enlève les caractères inutiles
                $info = stripcslashes($info);//Enlève les \
                $info = htmlspecialchars($info);//Convertit tous les caractères spéciaux vers leurs codes
                return $info;
            }

            //Initialisation des variables à un string vide
            $errNom = $errPrenom = $errMatricule = $errPassword = $errReponse_s_1 = $errReponse_s_2 = $errQuestion_s_1 = $errQuestion_s_2 = "";
            $nom = $password = $prenom = $matricule = $reponse_s_1 = $reponse_s_2 = $question_s_1 = $question_s_2 = "";
            $okPassword = $okNom = $okPrenom = $okMatricule = $okRepose_s_1 = $okRepose_s_2 = $okQuestion_s_1 = $okQuestion_s_2 = false;

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
                    $errMatricule = "Votre matricule est requis";
                } elseif (!preg_match("/^[0-9a-zA-Z]*$/", $_POST["matricule"])) {
                    $errMatricule = "Ne peut contenir que des chiffres et des lettres";
                } else {
                    $matricule = test_input($_POST["matricule"]);
                    $okMatricule = true;
                }

                if (empty($_POST["question_s_1"])) {
                    $errQuestion_s_1 = "Vous devez choisir une question secrète";
                } else {
                    $question_s_1 = test_input($_POST["question_s_1"]);
                    $okQuestion_s_1 = true;
                }

                if (empty($_POST["reponse_s_1"])) {
                    $errReponse_s_1 = "Une réponse à la question secrète est requise";
                } elseif (!preg_match("/^[a-zA-Z ]*$/", $_POST["reponse_s_1"])) {
                    $errReponse_s_1 = "Ne peut contenir que des lettres et des espaces";
                } else {
                    $reponse_s_1 = test_input($_POST["reponse_s_1"]);
                    $okRepose_s_1 = true;
                }

                if (empty($_POST["question_s_2"])) {
                    $errQuestion_s_2 = "Vous devez choisir une question secrète";
                } else {
                    $question_s_2 = test_input($_POST["question_s_2"]);
                    $okQuestion_s_2 = true;
                }

                if (empty($_POST["reponse_s_2"])) {
                    $errReponse_s_2 = "Une réponse à la question secrète est requise";
                } elseif (!preg_match("/^[a-zA-Z ]*$/", $_POST["reponse_s_2"])) {
                    $errReponse_s_2 = "Ne peut contenir que des lettres et des espaces";
                } else {
                    $reponse_s_2 = test_input($_POST["reponse_s_2"]);
                    $okRepose_s_2 = true;
                }

                if (empty($_POST["password"])) {
                    $errPassword = "Un mot de passe est requis";
                }
                else {
                $password = $_POST["password"];

                if (empty($_POST["password_bis"])) {
                    $errPassword = "Un mot de passe est requis";
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


            if ($okPrenom && $okPassword && $okNom && $okMatricule && $okRepose_s_1 && $okRepose_s_2 && $okQuestion_s_1 && $okQuestion_s_2) {
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
                    if (count($resultat) != 0) {
                        $errMatricule = "Le numéro que vous avez saisi est déjà utilié";
                    } else {

                        //On crée une ligne dans la table score
                        $stmt = $poloDB->prepare("INSERT INTO Score(score_jour, best_score, jetons)
                                                    VALUES('0', '0', '0')");
                        $stmt->execute();
                        //On récupère l'id correspondant
                        $stmt = $poloDB->prepare("SELECT id_score FROM Score ORDER BY id_score DESC;");
                        $stmt->execute();
                        $res_id = $stmt->fetchAll();
                        $id_score = $res_id[0][0];

                        //On prépare les commandes qu'on va pouvoir ajouter dans la table
                        $stmt_user = $poloDB->prepare("INSERT INTO Users(nom, prenom, matricule, password, question_s_1, rep_s_1, question_s_2, rep_s_2, pseudonyme, last_log_date, score_id_score, personnage_id_personnage)
                                                            VALUES(:nom, :prenom, :matricule, :password, :question_s_1, :reponse_s_1, :question_s_2, :reponse_s_2, 'defaut', :last_log_date, :id_score, '1')");
                        $stmt_user->bindParam(':matricule', $matricule);
                        $stmt_user->bindParam(':password', $hashedpassword);
                        $stmt_user->bindParam(':nom', $nom);
                        $stmt_user->bindParam(':prenom', $prenom);
                        $stmt_user->bindParam(':question_s_1', $question_s_1);
                        $stmt_user->bindParam(':question_s_2', $question_s_2);
                        $stmt_user->bindParam(':reponse_s_1', $reponse_s_1);
                        $stmt_user->bindParam(':reponse_s_2', $reponse_s_2);
                        $stmt_user->bindParam(':id_score', $id_score);
                        $today_date = date("Y-m-d");
                        $stmt_user->bindParam(':last_log_date', $today_date);

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

    <div id="container">

        <form id="formulaire" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
            <fieldset><h2>Créer un nouveau compte utilisateur</h2>
                <p>
                    <label for="nom">Nom</label>
                    <input type="text" name="nom" id="nom" value="<?php echo $nom; ?>"> *<span class="error"> <?php echo $errNom; ?></span>
                </p>

                <p>
                    <label for="prenom">Prénom</label>
                    <input type="text" name="prenom" id="prenom" value="<?php echo $prenom; ?>"> *<span class="error"> <?php echo $errPrenom; ?></span>
                </p>

                <p>
                    <label for="matricule">Matricule Air France</label>
                    <input type="text" name="matricule" id="matricule" value="<?php echo $matricule; ?>"> *<span class="error"> <?php echo $errMatricule; ?></span>
                </p>

                <p>
                    <label for="password">Mot de passe</label>
                    <input type="password" name="password" id="password"> *<span class="error"> <?php echo $errPassword; ?></span>
                </p>

                <p>
                    <label for="password_bis">Répéter mot de passe</label>
                    <input type="password" name="password_bis" id="password_bis"> *
                </p>

                <p>
                    <label for="question_s_1">Question secrète 1</label>
                    <select name="question_s_1" id="question_s_1">
                        <option><?php echo $question_s_1;?></option>
                        <option>Quel est votre ville de naissance ?</option>
                        <option>Quel est le nom de votre premier animal de compagnie ?</option>
                        <option>Quel est le nom de jeune fille de votre mère ?</option>
                    </select> *<span class="error"> <?php echo $errQuestion_s_1; ?></span>
                </p>

                <p>
                    <label for="reponse_s_1">Réponse 1</label>
                    <input type="text" name="reponse_s_1" id="reponse_s_1" value="<?php echo $reponse_s_1; ?>"> *<span class="error"> <?php echo $errReponse_s_1; ?></span>
                </p>

                <p>
                    <label for="question_s_2">Question secrète 2</label>
                    <select name="question_s_2" id="question_s_2">
                        <option><?php echo $question_s_2;?></option>
                        <option>Quel est le nom de votre meilleur(e) ami(e) d'enfance ?</option>
                        <option>Quel est le signe astrologique de votre père ?</option>
                    </select> *<span class="error"> <?php echo $errQuestion_s_2; ?></span>
                </p>

                <p>
                    <label for="reponse_s_2">Réponse 2</label>
                    <input type="text" name="reponse_s_2" id="reponse_s_2" value="<?php echo $reponse_s_2; ?>"> *<span class="error"> <?php echo $errReponse_s_2; ?></span>
                </p>

                <p>
                    <label>&nbsp;</label>
                    <span style="font-size: 80%;"> * Ces informations sont obligatoires.</span>
                </p>

                <p>
                    <label>&nbsp;</label>
                    <input type="submit" value="S'inscrire">
                    <input type="button" onclick="location.href='menu_principal.php';" value="Retour" />
                </p>

            </fieldset>
        </form>

    </div>
        <?php
    }
    ?>

</body>

<?php include "php/footer.php";?>

</html>