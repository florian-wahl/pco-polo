<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est connecté
    ?>
    <div id="container" class="menu_polo">
        <h2>Profil</h2>
        <input type="button" class="menu_principal_button" onclick="location.href='menu_principal.php';" value="Retour" />
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