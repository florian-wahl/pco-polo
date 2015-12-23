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
        <h2> Menu Mini-Jeux </h2>
        <input type="button" class="menu_principal_button" onclick="location.href='menu_principal.php';" value="Retour" />
        <p id="nb_jetons">
            Jetons : <?php echo "103"; ?> <img src="res/img/coin.png" style="width: 20px; vertical-align: text-bottom;"/>
        </p>
        <h3>Que voulez-vous faire ?</h3>
        <table id="liste_mini_jeux" class="liste_mini_jeux">
            <tr>
                <td><a href="#" id="mini_jeux_1" class="element_liste"><img src="res/img/mini-jeux/icon_pacman.png" class="icon_mini_jeux"><br>Mini-Jeux #1</a> </td>
                <td><a href="#" id="mini_jeux_2" class="element_liste"><img src="res/img/mini-jeux/icon_pacman.png" class="icon_mini_jeux"><br>Mini-Jeux #2</a></td>
                <td><a href="#" id="mini_jeux_3" class="element_liste"><img src="res/img/mini-jeux/icon_pacman.png" class="icon_mini_jeux"><br>Mini-Jeux #3</a></td>
                <td><a href="#" id="mini_jeux_4" class="element_liste"><img src="res/img/mini-jeux/icon_pacman.png" class="icon_mini_jeux"><br>Mini-Jeux #4</a></td>
                <td><a href="#" id="mini_jeux_5" class="element_liste"><img src="res/img/mini-jeux/icon_pacman.png" class="icon_mini_jeux"><br>Mini-Jeux #5</a></td>
            </tr>
            <tr>
                <td><a href="#" id="mini_jeux_6" class="element_liste"><img src="res/img/mini-jeux/icon_pacman.png" class="icon_mini_jeux"><br>Mini-Jeux #6</a> </td>
                <td><a href="#" id="mini_jeux_7" class="element_liste"><img src="res/img/mini-jeux/icon_pacman.png" class="icon_mini_jeux"><br>Mini-Jeux #7</a></td>
                <td><a href="#" id="mini_jeux_8" class="element_liste"><img src="res/img/mini-jeux/icon_pacman.png" class="icon_mini_jeux"><br>Mini-Jeux #8</a></td>
                <td><a href="#" id="mini_jeux_9" class="element_liste"><img src="res/img/mini-jeux/icon_pacman.png" class="icon_mini_jeux"><br>Mini-Jeux #9</a></td>
                <td><a href="#" id="mini_jeux_10" class="element_liste"><img src="res/img/mini-jeux/icon_pacman.png" class="icon_mini_jeux"><br>Mini-Jeux #10</a></td>
            </tr>
        </table>

        <!-- GESTION DES POPUP DES MINI-JEUX -->
        <script>
            $(document).ready(function() {
                $(".element_liste").click(function (event) {
                    openPopup(this.id);
                    return false;
                });

                function openPopup(id) {
                    switch (id){
                        case 'mini_jeux_1':
                            alert('1');
                            break;
                        case 'mini_jeux_2':
                            alert('2');
                            break;
                        default:
                            break;
                    }
                }
            });
        </script>

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