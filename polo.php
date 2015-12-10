<!doctype html>
<html lang="en">
<head>
<style>
    #overlay {
        display:none;
        position:absolute;
        top:0;
        background:#999;
        width:100%;
        height:100%;
        opacity:0.8;
        z-index:100;
    }
    #popup {
        display:none;
        position:absolute;
        top:50%;
        left:50%;

        background: #fff;
        width: 500px;
        height: 500px;
        margin-left: -250px; /*Half the value of width to center div*/
        margin-top: -250px; /*Half the value of height to center div*/
        z-index: 200;
    }
        #popupclose{
            float:right;
            padding:10px;
            cursor:pointer;
        }
        .popupcontent{
            padding:20px;
        }
    </style>
    <meta charset="UTF-8" />
    <title>POLO</title>
    <script type="text/javascript" src="js/phaser/phaser.min.js"></script>
    <script src="js/phaser/phaser-touch-control.js"></script>
    <script src="js/allFunctions.js"></script>
    <style type="text/css">
        body {
            margin: 0;
        }
    </style>
</head>
<body>
<div id="maincontent">
<div id="overlay"></div>
<div id="popup">
    <div class="popupcontrols">
        <span id="popupclose">X</span>
    </div>
    <div class="popupcontent">
        <h1><img src="http://www.dafont.com/forum/attach/orig/2/6/263344.jpg" alt="Ou un quizz" width="450" height="350"/>
        Ou un quizz</h1>
    </div>
</div>
<script type="text/javascript" src="js/main.js"></script>
<a href="menu_principal.php"><button>Retour</button></a>
</body>
</html>