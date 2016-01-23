<?php include 'php/first.php'; ?>

<?php

if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && ( $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest' ) )
{
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
        case 'setPersonnage':

            $stmt = $poloDB->prepare("SELECT id_personnage FROM personnage WHERE couleur = :couleur AND espece = :espece;");
            $stmt->bindValue(':couleur', $_GET['couleur']);
            $stmt->bindValue(':espece', $_GET['espece']);
            $stmt->execute();

            //On récupère les résultats
            $resultat = $stmt->fetchAll();

            $id_personnage = $resultat[0]['id_personnage'];

            $stmt = $poloDB->prepare("UPDATE users SET personnage_id_personnage = :id_personnage WHERE id_user = :id_user;");
            $stmt->bindValue(':id_user', $_SESSION['id_user']);
            $stmt->bindValue('id_personnage',$id_personnage);
            $stmt->execute();

            $_SESSION['id_personnage'] = $id_personnage;
            break;
        case 'addBadge':

            $stmt = $poloDB->prepare("SELECT * FROM users_badges WHERE users_id_user = :id_user AND badges_id_badge = :id_badge;");
            $stmt->bindValue(':id_user', $_SESSION['id_user']);
            $stmt->bindValue(':id_badge', $s);
            $stmt->execute();

            $resultat = $stmt->fetchAll();

            //On test si le joueur a déjà le badge
            if(count($resultat) == 0){
                $stmt = $poloDB->prepare("INSERT INTO users_badges(users_id_user, badges_id_badge) VALUES (:id_user, :id_badge)");
                $stmt->bindValue(':id_user', $_SESSION['id_user']);
                $stmt->bindValue(':id_badge', $s);
                $stmt->execute();
            }

            break;
        case 'getBadges':

            $stmt = $poloDB->prepare("SELECT * FROM users_badges WHERE users_id_user = :id_user;");
            $stmt->bindValue(':id_user', $_SESSION['id_user']);
            $stmt->execute();

            $resultat = $stmt->fetchAll();

            foreach($resultat as $row){
                echo $row['badges_id_badge'] . "/";
            }
            break;
        default:
            echo '';
            break;
    }

//DECONNEXION
    $poloDB = null;

}
else {
    die("HTTP/1.0 403 Forbidden");

}


?>