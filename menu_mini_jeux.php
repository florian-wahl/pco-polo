<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est connecté
    ?>
    <h2> Menu Mini-Jeux </h2>
    <h3>Que voulez-vous faire ?</h3>
    <br>
    <br>
    <br>
<input type="button" class="menu_principal_button" onclick="location.href='menu_principal.php';" value="Retour" />
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