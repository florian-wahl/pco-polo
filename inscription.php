<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>

    <?php
    try {

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

        //Initialisation des variables à un string vide
        $errNom = $errPrenom = $errID_employe = $errPassword = "";
        $nom = $password = $prenom = $id_employe = "";

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            if (empty($_POST["nom"])) {
                $errNom = "Votre Nom est requis";
            } elseif (!preg_match("/^[a-zA-Z ]*$/", $_POST["nom"])) {
                $errNom = "Ne peut contenir que des lettres et des espaces";
            } else {
                $nom = test_input($_POST["nom"]);
            }

            if (empty($_POST["prenom"])) {
                $errPrenom = "Votre Prénom est requis";
            } elseif (!preg_match("/^[a-zA-Z ]*$/", $_POST["prenom"])) {
                $errPrenom = "Ne peut contenir que des lettres et des espaces";
            } else {
                $prenom = test_input($_POST["prenom"]);
            }

            if (empty($_POST["id_employe"])) {
                $errID_employe = "Votre ID d'employé est requis";
            } elseif (!preg_match("/^[0-9]*$/", $_POST["id_employe"])) {
                $errID_employe = "Ne peut contenir que des chiffres";
            } else {
                $id_employe = test_input($_POST["id_employe"]);
            }

            if (empty($_POST["password"])) {
                $errPassword = "Un mot de passe est requis";
            } elseif (count_chars($_POST["password"]) < 5) {
                $errPassword = "Votre mot de passe est trop petit. Il faut au moins 6 caractères.";
            } else {
                $password = $_POST["password"];
            }

        }
    }
    catch(Exception $e){
        echo 'Message d\'erreur: ' . $e->getMessage();
    }
    ?>


    <h2>Création d'un nouveau compte utilisateur</h2>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>">

        Nom : <input type="text" name="nom" value="<?php echo $nom; ?>"> *<span class="error"> <?php echo $errNom; ?></span> <br>
        Prénom : <input type="text" name="prenom" value="<?php echo $prenom; ?>"> *<span class="error"> <?php echo $errPrenom; ?></span> <br>
        Employé ID : <input type="text" name="id_employe" value="<?php echo $id_employe; ?>"> *<span class="error"> <?php echo $errID_employe; ?></span><br>
        Mot de passe : <input type="password" name="password"> *<span class="error"> <?php echo $errPassword; ?></span> <br>
        <span style="font-size: small;"> * Ces informations sont obligatoires.</span><br>
        <input type="submit">
    </form>
    <a href="index.php"><button>Retour</button></a>
    <br>

    <?php echo $nom . " " . $prenom . " " . $id_employe . " " . $password ;?>
</body>

<?php include "footer.php";?>

</html>