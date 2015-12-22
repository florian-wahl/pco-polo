<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est déjà connecté
    ?>
    <script>window.location.replace("menu_principal.php");</script>
<?php

}elseif(empty($_SERVER["HTTP_REFERER"])){
    //L'utilisateur n'a rien a faire sur cette page. Elle est uniquement accessible après inscription.php
    ?>
    <script>window.location.replace("index.php");</script>
<?php
}

else{
    ?>
    <h4> L'inscription s'est déroulée avec succès. Vous allez être redirigé automatiquement dans quelques secondes.
        <br>
        Si ce n'est pas le cas, cliquez sur le bouton ci-dessous.
    </h4>
    <br>
    <a href="index.php"><button>Retour</button></a>
    <script>
        window.setTimeout(function(){

            // Move to a new location or you can do something else
            window.location.href = "index.php";

        }, 3000);</script>
    <?php
}
?>
</body>
<?php include 'footer.php';?>
</html>