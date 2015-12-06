<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
    <?php
    if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['num_employe'])){
        //L'employé est déjà connecté
        ?>
        <h2>Bonjour <?php echo $_SESSION['prenom']; ?> ! </h2>
        <h3>Que voulez-vous faire ?</h3>
        <br>
        <br>
        <a href="polo.php"> <button class="polo_button">Aller vers POLO !</button></a>
        <br>
        <h3>Voulez-vous vous déconnecter ?</h3>
        <a href="php/logout.php"><button>Se déconnecter</button></a>
    <?php
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