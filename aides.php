<?php include 'php/first.php'; ?>

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

        <input type="button" onclick="location.href='menu_principal.php';" value="Retour" />

        <h3>Que voulez-vous savoir ?</h3>

        <p id="fleche_gauche" class="fleche_aide"> < </p>
        <p id="fleche_droite" class="fleche_aide"> > </p>

        <!--
        AJOUTER LES POST IT A LA SUITE EN SUIVANT LA MEME SYNTHAXE
        IL FAUT JUSTE BIEN INCREMENTER LE NUMERO DANS L'ID
        L'AFFICHAGE EST GERE AVEC LE SCRIPT js/aide.js
        -->
        <div class="post_it">
            <div id="aide-1" class="post_it_aide">

                <h4>Aide #1</h4>
                <p>Pour te déplacer sur la carte pose ton doigt sur n’importe quelle zone de l’écran et fais le glisser dans la direction souhaitée </p>

            </div>

            <div id="aide-2" class="post_it_aide">
                <h4>Aide #2</h4>

                <p>Pour interagir avec un personnage il te suffit  de t’approcher. Si le signe « ! » est présente au-dessus de sa tète vous pouvez interagir</p>

            </div>

            <div id="aide-3" class="post_it_aide">
                <h4>Aide #3</h4>
                <p>L’interaction avec un personnage déclenche un quizz, en fonction de tes réponses des points et des jetons te seront attribué</p>
            </div>

            <div id="aide-4" class="post_it_aide">
                <h4>Aide #4</h4>
                <p>Tu peux  jouer aux mini-jeux en utilisant les jetons gagnés avec les quizz. Une partie cout un jeton</p>
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