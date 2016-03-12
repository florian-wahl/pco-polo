<?php include 'php/first_sql_conf.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'php/header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est connecté
    ?>
    <div id="container" class="menu_polo">
        <script src="js/aides.js"></script>

        <h2> Aides </h2>

        <input type="button" id="button_retour" onclick="location.href='menu_principal.php';" />

        <h3>Que voulez-vous savoir ?</h3>

        <p id="fleche_gauche" class="fleche_aide"></p>
        <p id="fleche_droite" class="fleche_aide"> </p>

        <!--
        AJOUTER LES POST IT A LA SUITE EN SUIVANT LA MEME SYNTHAXE
        IL FAUT JUSTE BIEN INCREMENTER LE NUMERO DANS L'ID
        L'AFFICHAGE EST GERE AVEC LE SCRIPT js/aide.js
        -->
        <div class="post_it">
            <div id="aide-1" class="post_it_aide">
                <img src="res/img/aides/aide_1.png">
            </div>

            <div id="aide-2" class="post_it_aide">
                <img src="res/img/aides/aide_2.png">
            </div>

            <div id="aide-3" class="post_it_aide">
                <img src="res/img/aides/aide_3.png">
            </div>

            <div id="aide-4" class="post_it_aide">
                <img src="res/img/aides/aide_4.png">
            </div>

            <div id="aide-5" class="post_it_aide">
                <img src="res/img/aides/aide_5.png">
            </div>

            <div id="aide-6" class="post_it_aide">
                <img src="res/img/aides/aide_6.png">
            </div>

            <div id="aide-7" class="post_it_aide">
                <img src="res/img/aides/aide_7.png">
            </div>

            <div id="aide-8" class="post_it_aide">
                <h4>Rejouer l'introduction</h4>
                <p>Vous pouvez, si vous le voulez, rejouer l'introduction de POLO en cliquant sur le bouton ci-dessous.</p>
                <br>
                <input type="button" id='rejouer_intro' onclick="location.href='polo.php?origine=1';" />
            </div>

        </div>




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
<?php include 'php/footer.php';?>
</html>