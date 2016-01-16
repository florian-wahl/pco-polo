<?php include 'php/first.php'; ?>

<?php
/*CONNEXION*/
$poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
// set the PDO error mode to exception
$poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//On récupère la fonction appelé
$q = $_GET['q'];
//On récupère le paramètre s'il y en a un
if(!empty($_GET['s'])){
    $s = $_GET['s'];
}

switch($q){

    case 'getScenario':

        $stmt = $poloDB->prepare("SELECT * FROM quizz, scenario
                                                              WHERE scenario_id_scenario = id_scenario AND id_quizz = :id_quizz;");
        $stmt->bindParam(':id_quizz', $s);
        $stmt->execute();

        //On récupère les résultats
        $resultat = $stmt->fetchAll();

        //echo $resultat[0]['id_quizz']." ".$resultat[0]['descriptionScenario']."<br>";
        $i = 0;

        $scenario = $resultat[0]['descriptionScenario'];
        echo $scenario;
        break;

    case 'getQuestionsReponses':

        $stmt = $poloDB->prepare("SELECT id_question, descriptionQuestion, descriptionReponse, isTrue FROM quizz, quizz_questions, questions, questions_reponses, reponses
                                                              WHERE quizz_id_quizz = id_quizz AND questions_reponses.questions_id_question = id_question AND quizz_questions.questions_id_question AND reponses_id_reponse = id_reponse AND id_quizz = :id_quizz
                                                              GROUP BY id_reponse;");
        $stmt->bindParam(':id_quizz', $s);
        $stmt->execute();

        //On récupère les résultats
        $resultat = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $arr = Array();

        $i = 0;

        foreach($resultat as $row){
            foreach($row as $key => $value)
            {
                $arr[$i][$key] = utf8_encode($value);
            }
            $i++;
        }

        echo strval(json_encode($arr));

        break;
    default:
        echo '';

}
?>