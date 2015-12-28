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
        <script src="js/aides.js"></script>

        <h2> Aides </h2>

        <input type="button"  onclick="location.href='menu_principal.php';" value="Retour" />

        <h3>Que voulez-vous savoir ?</h3>

        <p id="fleche_gauche" class="fleche_aide"> < </p>
        <p id="fleche_droite" class="fleche_aide"> > </p>

        <div class="post_it">
            <div id="aide-1" class="post_it_aide">

                <h4>Aide #1</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis feugiat enim sit amet feugiat. Sed urna mi, rhoncus a nulla vel.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div id="aide-2" class="post_it_aide">
                <h4>Aide #2</h4>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis feugiat enim sit amet feugiat. Sed urna mi, rhoncus a nulla vel.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div id="aide-3" class="post_it_aide">
                <h4>Aide #3</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis feugiat enim sit amet feugiat. Sed urna mi, rhoncus a nulla vel.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div id="aide-4" class="post_it_aide">
                <h4>Aide #4</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis feugiat enim sit amet feugiat. Sed urna mi, rhoncus a nulla vel.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis feugiat enim sit amet feugiat. Sed urna mi, rhoncus a nulla vel.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
<?php include 'footer.php';?>
</html>