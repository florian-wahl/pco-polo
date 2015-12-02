<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
//Initialisation des variables à un string vide
$errID_employe = $errPassword = "";
$password = $id_employe = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(empty($_POST["id_employe"])){
        $errID_employe = "* Un numéro d'employé est requis pour ce connecté";
    }
    if(empty($_POST["password"])){
        $errPassword = "* Un mot de passe est requis pour ce connecté";
    }

    //Requête avec l'ID

    //Erreur ID inconnu

    //récupération du mot de passe

    //hashage du mot de passe entrée

    //vérification du mot de passe
}
?>
<h2>Connexion</h2>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>">
        Employé ID : <input type="text" name="id_employe" value="<?php echo $id_employe; ?>"> <span class="error"> <?php echo $errID_employe; ?></span><br>
        Mot de passe : <input type="password" name="password"> <span class="error"> <?php echo $errPassword; ?></span> <br>
        <input type="submit">
    </form>
<a href="index.php"><button>Retour</button></a>

<?php include 'footer.php'; ?>
</body>
</html>