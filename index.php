<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
    <?php
    if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['num_employe'])){
        //L'employé est déjà connecté
        header("refresh:0; url=menu_principal.php");

    }else{

    ?>
    <h1>Bienvenue sur la page d'accueil de POLO</h1>
    <a href="connexion.php"><button>Connexion</button></a>
    <a href="inscription.php"><button>Inscription</button></a>
    <br>
    <br>
    <a href="polo.php"> <button class="polo_button">Aller vers POLO !</button></a>
    <br>
    <?php
    }
    ?>
</body>
<?php include 'footer.php';?>
</html>