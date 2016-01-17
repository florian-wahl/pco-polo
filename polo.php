<?php include 'php/first.php'; ?>

<!doctype html>
<html lang="en">
<?php include 'php/header.php';?>
<!-- Désactive le zoom et le scrolling -->
<script>
    document.ontouchmove = function(event){
        event.preventDefault();
    }
</script>


<link rel="stylesheet" href="css/quiz.css"  type="text/css" />
<link rel="stylesheet" href="css/polo.css"  type="text/css" />
<script src="js/phaser/phaser.min.js"></script>
<script src="js/phaser/phaser-touch-control.js"></script>
<script src="js/allFunctions.js"></script>
<script src="js/jQuizzy.js"></script>
<script src="js/clientPNJ.js"></script>
 <style type="text/css">
    .quiz{width:760px; margin:10px 10px 10px -360px}
    </style>
<script src="js/gestionQuizz.js"></script>

<?php
//TODO: ajouter le test de loggin
?>

<body>

    <script type="text/javascript" src="js/main.js"></script>

    <div id="main">
        <div id="overlay"></div>
        <img id="loading_gif" src="res/img/loading.gif">
        <div id="popup">
            <div class="quiz">
                  <div id='quiz-container'></div>
            </div>
            <div class="popupcontrols">
                  <span id="popupclose">X</span>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            $('#popupclose').click(reprendre);
        });
    </script>


</body>
</html>
