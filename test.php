<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'php/header.php';?>
<body>
    <div id="container" class="menu_polo">

        <h2>Bienvenue dans la zone de test !</h2>
        <?php
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

        foreach($resultat as $row){
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
            foreach($questionsR as $q){
                //echo $q['descriptionReponse']. " ".$q['isTrue']. "<br>";
                $tamponRep[$j] = $q['descriptionReponse'];
                $tamponIsTrue[$j] = $q['isTrue'];
                $j++;
            }
            $intituleReponses[$i] = $tamponRep;
            $isTrueReponses[$i] = $tamponIsTrue;
            $i++;
        }
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



        </script>


        <input type="button" class="menu_principal_button" onclick="location.href='menu_principal.php';" value="Retour" />
    </div>

</body>
<?php include 'php/footer.php';?>
</html>