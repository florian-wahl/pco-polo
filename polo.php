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
    .quiz{width:760px; margin:20px 10px 10px -280px}
    </style>
        <?php

        //function gestionQuizz($id_quizz){
            /*CONNEXION*/
            $poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
            // set the PDO error mode to exception
            $poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $stmt = $poloDB->prepare("SELECT * FROM quizz, scenario, quizz_questions, questions
                                                              WHERE scenario_id_scenario = id_scenario AND quizz_id_quizz = id_quizz AND questions_id_question = id_question;");
            $stmt->execute();

            //On récupère les résultats
            $resultat = $stmt->fetchAll();

            //echo $resultat[0]['id_quizz']." ".$resultat[0]['descriptionScenario']."<br>";
            $i = 0;

            $scenario = $resultat[0]['descriptionScenario'];
            $intituleQuestions = array();
            $intituleReponses = array();
            $isTrueReponses = array();

            foreach ($resultat as $row) {
                //Pour chaque question
                //echo $row['id_question']." ".$row['descriptionQuestion']."<br>";

                $intituleQuestions[$i] = $row['descriptionQuestion'];

                //On récupère les réponses
                $stmt = $poloDB->prepare("SELECT * FROM questions_reponses, reponses
                                                              WHERE questions_id_question = :id_question AND reponses_id_reponse = id_reponse;");
                $stmt->bindValue(':id_question', $row['id_question']);
                $stmt->execute();

                $questionsR = $stmt->fetchAll();

                $tamponRep = array();
                $tamponIsTrue = array();
                $j = 0;
                foreach ($questionsR as $q) {
                    //echo $q['descriptionReponse']. " ".$q['isTrue']. "<br>";
                    $tamponRep[$j] = $q['descriptionReponse'];
                    $tamponIsTrue[$j] = $q['isTrue'];
                    $j++;
                }
                $intituleReponses[$i] = $tamponRep;
                $isTrueReponses[$i] = $tamponIsTrue;
                $i++;
            }
        //}
        ?>

    <script>
        //On transfert les données récuppérées en php vers des tableaux en js
        var scenario = "<?php echo $scenario; ?>";
        var intituleQuestions = [
            <?php
            foreach($intituleQuestions as $q){
                echo '"'.$q.'"' ;
                echo ",";
            }
            ?>
        ];
        var isTrueReponses = <?php echo json_encode($isTrueReponses); ?>;
        var numTrueReponses = [];
        var i = 0;
        while (i < isTrueReponses.length){
            var j = 0;
            while (j < isTrueReponses[i].length){
                if (isTrueReponses[i][j] == true){
                    numTrueReponses[i] = j;
                }
                j++;
            }
            i++;
        }
        var intituleReponses = [
            <?php
            $a = 0;
            foreach($intituleReponses as $ensRep){
                echo "[";
                foreach($ensRep as $r){
                    echo '"'.$r.'"' ;
                    echo ",";
                }
                echo "],";
            }
            ?>
        ];

        var init={'questions':[
            {'question': intituleQuestions[0],
                'answers':intituleReponses[0],
                'correctAnswer': numTrueReponses[0]
            },
            {'question': intituleQuestions[1],
                'answers':intituleReponses[1],
                'correctAnswer': numTrueReponses[1]
            }]};

        $(function(){
            $('#quiz-container').jquizzy({
                questions: init.questions
            });
        });
    </script>
<?php
//TODO: ajouter le test de loggin
?>

<body>

    <script type="text/javascript" src="js/main.js"></script>

    <div id="main">
        <div id="overlay"></div>
        <div id="popup">
            <div class="quiz">
                  <div id='quiz-container'></div>
            </div>
            <div class="popupcontrols">
                  <span id="popupclose">X</span>
            </div>
        </div>
    </div>

    <div id="test">

    </div>


</body>
</html>
