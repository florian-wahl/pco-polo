<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'php/header.php';?>
<!-- Désactive le zoom et le scrolling -->
<script>
    document.ontouchmove = function(event){
        event.preventDefault();
    }
</script>

<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est connecté
    ?>


    <div id="container" class="menu_polo">
        <h2> Menu Mini-Jeux </h2>

        <input type="button" onclick="location.href='menu_principal.php';" value="Retour" />

        <p id="nb_jetons">
            Jetons : <?php echo $_SESSION['jetons']; ?> <img src="res/img/coin.png" style="width: 20px; vertical-align: text-bottom;"/>
        </p>

        <h3>Que voulez-vous faire ?</h3>

        <table id="liste_mini_jeux" class="liste_mini_jeux">
            <tr>
                <td><input type="button" id="mini_jeux_1" class="element_liste" onclick="location.href='#openModal_1'"></td>
                <td><input type="button" id="mini_jeux_2" class="element_liste" value="Pacman" onclick="location.href='#openModal_2'"></td>
                <td><input type="button" id="mini_jeux_3" class="element_liste" onclick="location.href='#openModal_3'"></td>
                <td><input type="button" id="mini_jeux_4" class="element_liste" value="Coil" onclick="location.href='#openModal_4'"></td>
                <td><input type="button" id="mini_jeux_5" class="element_liste" value="Mini-Jeux #5"></td>
            </tr>
            <tr>
                <td><input type="button" id="mini_jeux_6" class="element_liste" value="Mini-Jeux #6"></td>
                <td><input type="button" id="mini_jeux_7" class="element_liste" value="Mini-Jeux #7"></td>
                <td><input type="button" id="mini_jeux_8" class="element_liste" value="Mini-Jeux #8"></td>
                <td><input type="button" id="mini_jeux_9" class="element_liste" value="Mini-Jeux #9"></td>
                <td><input type="button" id="mini_jeux_10" class="element_liste" value="Mini-Jeux #10"></td>
            </tr>
        </table>

    </div>

    <!-- POPUP SUR LES MINI-JEUX -->
    <!-- Géré uniquement en HTML5/CSS3 -->

    <div id="openModal_1" class="modalDialog">
        <div>
            <a href="#close" title="Close" class="close">X</a>
            <img src="res/img/mini-jeux/Floppy_Bird_icon.png" id="img_popup_left"/>
            <h2>Floppy Bird</h2>
            <p>Vous dirigez un oiseau : touchez l’écran et l’oiseau saute ! <br>Attention aux obstacles ! Une collision ou une chute vous feront perdre la partie.</p>
            <p>Vos jetons : <?php echo $_SESSION['jetons']; ?> <img src="res/img/coin.png" style="width: 20px; vertical-align: text-bottom;"/></p>
            <input type="button" id="popup_button_jouer_1" class="button_popup_jouer" value="Jouer" />
            <p class="errJetons">Vous n'avez pas assez de jetons.</p>
        </div>
    </div>

    <div id="openModal_2" class="modalDialog">
        <div>
            <a href="#close" title="Close" class="close">X</a>
            <img src="res/img/mini-jeux/icon_pacman.png" width="250px" id="img_popup_left"/>
            <h2>Pacman Classic</h2>
            <p>Pacman est un jeu d'arcade classique.</p>
            <p>Vos jetons : <?php echo $_SESSION['jetons']; ?> <img src="res/img/coin.png" style="width: 20px; vertical-align: text-bottom;"/></p>
            <input type="button" id="popup_button_jouer_1" class="button_popup_jouer" value="Jouer" />
            <p class="errJetons">Vous n'avez pas assez de jetons.</p>
        </div>
    </div>

    <div id="openModal_3" class="modalDialog">
        <div>
            <a href="#close" title="Close" class="close">X</a>
            <img src="res/img/mini-jeux/2048_icon.png" id="img_popup_left"/>
            <h2>2048</h2>
            <p>Combinez les chiffres jusqu’à obtenir 2048. <br> Glissez votre doigt dans la direction qui permettra d’additionner les cases portant le même nombre : 4, 8, 16, … 2048 !</p>
            <p> Jetons : <?php echo $_SESSION['jetons']; ?> <img src="res/img/coin.png" style="width: 20px; vertical-align: text-bottom;"/></p>
            <input type="button" id="popup_button_jouer_3" class="button_popup_jouer" value="Jouer" />
            <p class="errJetons">Vous n'avez pas assez de jetons.</p>
        </div>
    </div>

    <div id="openModal_4" class="modalDialog">
        <div>
            <a href="#close" title="Close" class="close">X</a>
            <img src="res/img/mini-jeux/img_defaut.jpg" id="img_popup_left"/>
            <h2>Coil</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lobortis feugiat enim sit amet feugiat. Sed urna mi, rhoncus a nulla vel.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p> Jetons : <?php echo $_SESSION['jetons']; ?> <img src="res/img/coin.png" style="width: 20px; vertical-align: text-bottom;"/></p>
            <input type="button" id="popup_button_jouer_3" class="button_popup_jouer" value="Jouer" />
            <p class="errJetons">Vous n'avez pas assez de jetons.</p>
        </div>
    </div>

    <!--
        CE SCRIPT PERMET DE GERER LE FONCTION DES POPUPS
        LA REACTION DES BOUTONS
        LA GESTION DES JETONS
    -->
    <script src="js/liste_mini_jeux.js"></script>

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