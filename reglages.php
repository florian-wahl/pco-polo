<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['num_employe'])){
    //L'employé est connecté
    ?>
    <h2> Règlages </h2>
    <br>
    <br>
    <br>
    <a href="menu_principal.php"><button>Retour</button></a>
    <?php
}else{
    //L'employé ne doit pas être sur cette page sans être connecté
    header("refresh:0; url=connexion.php");
}
?>
</body>
<?php include 'footer.php';?>
</html>