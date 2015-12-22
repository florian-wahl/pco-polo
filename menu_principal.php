<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est connecté
    ?>
        <div id="container" class="menu_principal">
        <h2>Bonjour <?php echo $_SESSION['prenom']; ?> et bienvenue dans le menu principal ! </h2>
        <h3>Que voulez-vous faire ?</h3>

            <input type="button" id="button_credits" onclick="location.href='credits.php';" value="Crédits" />

        <table>
            <tr>
                <td><input type="button" class="menu_principal_button" id="button_jouer" onclick="location.href='polo.php';" value="Jouer" /></td>
                <td><input type="button" class="menu_principal_button" id="button_mini_jeux" onclick="location.href='menu_mini_jeux.php';" value="Mini-Jeux" /></td>
            </tr>
            <tr>
                <td><input type="button" class="menu_principal_button" id="button_profil" onclick="location.href='profil.php';" value="Profil" /></td>
                <td><input type="button" class="menu_principal_button" id="button_aides" onclick="location.href='aides.php';" value="Aides" /></td>
            </tr>
        </table>
            <input type="button" id="button_quitter" onclick="location.href='php/logout.php';" value="Quitter" />
            <br>

            <br>
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