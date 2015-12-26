<!doctype html>
<html lang="en">
<?php include 'header.php';?>
<!-- Désactive le zoom et le scrolling -->
<script>
    document.ontouchmove = function(event){
        event.preventDefault();
    }
</script>

<link rel="stylesheet" href="css/quiz.css"  type="text/css" />

<script src="js/phaser/phaser.min.js"></script>
<script src="js/phaser/phaser-touch-control.js"></script>
<script src="js/allFunctions.js"></script>
<script src="quiz.js"></script>
 <style type="text/css">
    .quiz{width:760px; margin:60px auto 10px auto}
    </style>
    <script>
    var init={'questions':[{'question':'1+1=？','answers':['2','3','4','5'],'correctAnswer':1},{'question':'2+3=?','answers':['1','100','5','7'],'correctAnswer':3},{'question':'5-5=?','answers':['1','2','3','0'],'correctAnswer':4},{'question':'6+8=？','answers':['18','14','100','180'],'correctAnswer':2}]};

    $(function(){
        $('#quiz-container').jquizzy({
            questions: init.questions
        });
    });
    </script>
<body>

<script type="text/javascript" src="js/main.js"></script>
<div id="main">
    <div id="overlay"></div>
    <div id="popup">
        <div class="popupcontrols">
                    <span id="popupclose">X</span>
                </div>
        <div class="quiz">
              <div id='quiz-container'></div>
    </div>
       </div>
    </div>
<input type="button" onclick="location.href='menu_principal.php';" value="Retour" />


</body>
</html>
