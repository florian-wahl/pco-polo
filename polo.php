<?php include 'php/first_sql_conf.php'; ?>

<!doctype html>
<html lang="en">
<?php include 'php/header.php';?>
<!-- Désactive le zoom et le scrolling -->
<script>
    document.ontouchmove = function(event){
        event.preventDefault();
    }
</script>


<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
//L'employé est connecté

//On met à jour le score
$stmt = $poloDB->prepare("SELECT * FROM score WHERE id_score = :id_score;");
$stmt->bindValue(':id_score', $_SESSION['id_score']);
$stmt->execute();

//On récupère les résultats
$resultat = $stmt->fetchAll();

//On récupère la première ligne, le résultat doit être unique
$res_score = $resultat[0];
$_SESSION['score'] = $res_score['score'];
$_SESSION['jetons'] = $res_score['jetons'];

$stmt = $poloDB->prepare("SELECT * FROM personnage WHERE id_personnage = :id_personnage;");
$stmt->bindValue(':id_personnage', $_SESSION['id_personnage']);
$stmt->execute();

//On récupère les résultats
$resultat = $stmt->fetchAll();
$personnage = $resultat[0];
?>

<link rel="stylesheet" href="css/quizz.css" type="text/css" />
<link rel="stylesheet" href="css/polo.css"  type="text/css" />
<script src="js/phaser/phaser.min.js"></script>
<script src="js/phaser/phaser-touch-control.js"></script>
<script src="js/mouvementHandler.js"></script>
<script src="js/jQuizzy.js"></script>
<script src="js/PNJ.js"></script>
<script src="js/gestionQuizz.js"></script>
<script src="js/gestionJeu.js"></script>


<style type="text/css">
    .popup_holder {width:760px; margin:10px 10px 10px -360px;}
    .popup_holder_arcade {width:760px; margin:10px 10px 10px -360px}
    .popup_holder_vide {width:760px; margin:10px 10px 10px -360px}
</style>
<body>
    <div id="main_polo">
    <script>
        var link_res_perso = 'res/img/personnages/agents/<?php echo $personnage['couleur']."/".$personnage['clan']."/perso_sheet.png";?>';
    </script>
    <script type="text/javascript" src="js/bootState.js"></script>
    <script type="text/javascript" src="js/preloadState.js"></script>
    <script type="text/javascript" src="js/mainState.js"></script>



        <div id="overlay"></div>
        <img id="loading_gif" src="res/img/loading.gif">
        <div id="popup">
            <div class="popup_holder">
                  <div id='quiz-container'></div>
            </div>
            <div class="popupcontrols">
                  <span id="popupclose"><img src="res/img/boutons/black_cross.png"></span>
            </div>
        </div>

        <div id="popup_arcade">
            <div class="popup_holder_arcade">
                <div id="info_arcade">
                    <h2>Bornes d'Arcades ZX1999</h2>
                    <p>Bienvenue sur la borne d'arcade, pour accéder aux mini-jeux cliquez sur le bouton ci-dessous : <br></p>
                    <input type="button" id="button_mini_jeux"/>
                </div>
            </div>
            <div class="popupcontrols_arcade">
                <span id="popupclose_arcade"><img src="res/img/boutons/black_cross.png"></span>
            </div>
        </div>

        <div id="popup_vide">
            <div class="popup_holder_vide">
                <div id="info_vide">

                </div>
            </div>
            <div class="popupcontrols_vide">
                <span id="popupclose_vide"><img src="res/img/boutons/black_cross.png"></span>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            $('#popupclose').click(reprendre);

            $('#popupclose_arcade').click(function(){
                reprendre();
            });

            $('#popupclose_vide').click(function(){
                reprendre();
            });

            $("#button_mini_jeux").click(function(){
                location.href='menu_mini_jeux.php';
            });

        });
    </script>

    <?php
    }else{
//L'employé ne doit pas être sur cette page sans être connecté
        ?>
        <script>window.location.replace("index.php");</script>
        <?php
    }
    ?>

</body>
</html>
