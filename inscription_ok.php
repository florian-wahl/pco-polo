<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['num_employe'])){
    //L'employé est déjà connecté
    header("refresh:0; url=menu_principal.php");

}elseif(empty($_SERVER["HTTP_REFERER"])){
    //L'utilisateur n'a rien a faire sur cette page. Elle est uniquement accessible après inscription.php
    header("refresh:0; url=index.php");
}

else{
    ?>
    <h4> L'inscription s'est déroulée avec succès. Vous allez être redirigé automatiquement dans quelques secondes.
        <br>
        Si ce n'est pas le cas, cliquez sur le bouton ci-dessous.
    </h4>
    <br>
    <a href="index.php"><button>Retour</button></a>
    <?php
    header("refresh:5; url=index.php");
}
?>
</body>
<?php include 'footer.php';?>
</html>