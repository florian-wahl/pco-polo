<?php include 'php/first.php'; ?>

<?php
/*CONNEXION*/
$poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
// set the PDO error mode to exception
$poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$q = $_GET['q'];
if(!empty($_GET['s'])){
    $s = $_GET['s'];
}

switch($q){
    case 'nbJeton':
        //Requête avec l'ID
        $stmt = $poloDB->prepare("SELECT * FROM score WHERE id_score = :id_score;");
        $stmt->bindValue(':id_score', $_SESSION['id_score']);
        $stmt->execute();

        //On récupère les résultats
        $resultat = $stmt->fetchAll();

        //On récupère la première ligne, le résultat doit être unique
        $nb_jeton = $resultat[0]['jetons'];

        echo $nb_jeton;
        break;
    case 'scoreJour':
        //Requête avec l'ID
        $stmt = $poloDB->prepare("SELECT * FROM score WHERE id_score = :id_score;");
        $stmt->bindValue(':id_score', $_SESSION['id_score']);
        $stmt->execute();

        //On récupère les résultats
        $resultat = $stmt->fetchAll();

        //On récupère la première ligne, le résultat doit être unique
        $score = $resultat[0]['score_jour'];

        echo $score;
        break;
    case 'addToScore':
        //Requête avec l'ID
        $_SESSION['score_jour'] += $s;
        $stmt = $poloDB->prepare("UPDATE score SET score_jour = :new_score_jour WHERE id_score = :id_score;");
        $stmt->bindValue(':id_score', $_SESSION['id_score']);
        $stmt->bindValue(':new_score_jour', $_SESSION['score_jour']);
        $stmt->execute();

        $stmt = $poloDB->prepare("SELECT * FROM score WHERE id_score = :id_score;");
        $stmt->bindValue(':id_score', $_SESSION['id_score']);
        $stmt->execute();
        //On récupère les résultats
        $resultat = $stmt->fetchAll();

        //On récupère la première ligne, le résultat doit être unique
        $score = $resultat[0]['score_jour'];

        echo $score;
        break;
    default:
        echo '';
}


?>