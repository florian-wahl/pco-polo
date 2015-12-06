<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['num_employe'])){
    //L'employé est connecté
    ?>
    <h2>Bonjour <?php echo $_SESSION['prenom']; ?> et bienvenue dans le menu principal ! </h2>
    <h3>Que voulez-vous faire ?</h3>
    <br>
    <a class="menu_principal_button" href="polo.php"><button>Jouer</button></a>
    <br>
    <a class="menu_principal_button" href="menu_mini_jeux.php"><button>Mini-Jeux</button></a>
    <br>
    <a class="menu_principal_button" href="aides.php"><button>Aides</button></a>
    <br>
    <a class="menu_principal_button" href="reglages.php"><button>Règlages</button></a>
    <br>
    <a class="menu_principal_button" href="php/logout.php"><button>Quitter</button></a>
    <?php
}else{
    //L'employé ne doit pas être sur cette page sans être connecté
    header("refresh:0; url=connexion.php");
}
?>
</body>
<?php include 'footer.php';?>
</html>