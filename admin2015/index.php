<?php include '../php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include '../header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedInAdmin']) && !empty($_SESSION['identifiant'])){
    //L'employé est connecté
    ?>
    <h2>Accueil administration </h2>

    <br>
    <a class="menu_principal_button" href="../php/logout.php"><button>Se déconnecter</button></a>
    <?php
}else{
    //Demande non autorisé d'accès à cette page
    header("refresh:0; url=../index.php");
}
?>
</body>
<?php include '../footer.php';?>
</html>