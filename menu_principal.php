<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['num_employe'])){
    //L'employé est connecté
    ?>
        <div class="element">
        <h2>Bonjour <?php echo $_SESSION['prenom']; ?> et bienvenue dans le menu principal ! </h2>
        <h3>Que voulez-vous faire ?</h3>

        <br>
            <input type="button" class="menu_principal_button" onclick="location.href='polo.php';" value="Jouer" />
        <br>
            <input type="button" class="menu_principal_button" onclick="location.href='menu_mini_jeux.php';" value="Mini-Jeux" />
        <br>
            <input type="button" class="menu_principal_button" onclick="location.href='aides.php';" value="Aides" />
        <br>
            <input type="button" class="menu_principal_button" onclick="location.href='reglages.php';" value="Règlages" />
        <br>
            <input type="button" class="menu_principal_button" onclick="location.href='php/logout.php';" value="Quitter" />
        </div>
    <?php
}else{
    //L'employé ne doit pas être sur cette page sans être connecté
    ?>
    <script>window.location.replace("index.php");</script>
    <?php
}
?>
</body>
<?php include 'footer.php';?>
</html>