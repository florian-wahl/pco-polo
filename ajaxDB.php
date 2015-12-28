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

//TODO: problème de sécurité si l'utilisateur passe directement par l'adresse il peut s'ajouter tout seul des jetons ou du socre...

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
        //On modifie le score
        $_SESSION['score_jour'] += $s;

        $stmt = $poloDB->prepare("UPDATE score SET score_jour = :new_score_jour WHERE id_score = :id_score;");
        $stmt->bindValue(':id_score', $_SESSION['id_score']);
        $stmt->bindValue(':new_score_jour', $_SESSION['score_jour']);
        $stmt->execute();

        //On test par rapport au meilleur score
        if($_SESSION['best_score'] < $_SESSION['score_jour']){
            $_SESSION['best_score'] = $_SESSION['score_jour'];

            //On le met aussi à jour dans la BDD
            $stmt = $poloDB->prepare("UPDATE score SET best_score = :new_best WHERE id_score = :id_score;");
            $stmt->bindValue(':id_score', $_SESSION['id_score']);
            $stmt->bindValue(':new_best', $_SESSION['best_score']);
            $stmt->execute();
        }

        break;
    case 'addToJeton':
        //On modifie le score
        $_SESSION['jetons'] += $s;

        $stmt = $poloDB->prepare("UPDATE score SET jetons = :new_jetons WHERE id_score = :id_score;");
        $stmt->bindValue(':id_score', $_SESSION['id_score']);
        $stmt->bindValue(':new_jetons', $_SESSION['jetons']);
        $stmt->execute();


        break;
    default:
        echo '';
}

//DECONNEXION
$poloDB = null;

?>