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

                <h4>Aide #1 : les déplacements</h4>
                <p>Pour vous déplacer sur la carte posez votre doigt sur n’importe quelle zone de l’écran et faites-le glisser dans la direction souhaitée.</p>

            </div>

            <div id="aide-2" class="post_it_aide">
                <h4>Aide #2 : les interactions</h4>

                <p>Pour interagir avec un personnage, il vous suffit de l’approcher. Si le signe « ! » est présent au-dessus de sa tête, il a besoin de vous et vous pouvez interagir.</p>

            </div>

            <div id="aide-3" class="post_it_aide">
                <h4>Aide #3 : les quizz et les points</h4>
                <p>L’interaction avec un personnage déclenche un quizz. En fonction de vos réponses, des points vous seront attribués. Une bonne réponse vous permet d'obtenir 100 points.</p>
            </div>

            <div id="aide-4" class="post_it_aide">
                <h4>Aide #4 : les jetons</h4>
                <p>Les points gagnés aux quizz se convertissent en jetons : 200 points = 1 jeton. Ces jetons vous permettront de jouer aux mini-jeux présents dans le menu mini-jeu.</p>
            </div>

            <div id="aide-5" class="post_it_aide">
                <h4>Aide #5 : le menu dans Polo</h4>
                <p>Lorsque vous jouez à Polo, vous pouvez revenir au menu principal et gérer les effets sonores grâce au menu en haut à droite.</p>
            </div>

            <div id="aide-6" class="post_it_aide">
                <h4>Aide #6 : le profil</h4>
                <p>Vos scores journaliers et globaux sont présents dans votre profil. Cela vous permettra de comparer vos résultats avec les autres joueurs.</p>
            </div>

            <div id="aide-7" class="post_it_aide">
                <h4>Aide #7 : l'e-learning</h4>
                <p>Vous pouvez trouver la réponse à tous les quizz sur l’intranet grâce au e-learning.</p>
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