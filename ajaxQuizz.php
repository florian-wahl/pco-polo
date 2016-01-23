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

switch($q){
    case 'quizzValide':
        $stmt = $poloDB->prepare("SELECT * FROM users_quizz WHERE users_id_user = :id_user AND id_quizz = :id_quizz;");
        $stmt->bindValue(':id_user', $_SESSION['id_user']);
        $stmt->bindValue(':id_quizz', $_GET['id_quizz']);
        $stmt->execute();

        //On récupère les résultats
        $resultat = $stmt->fetchAll();

        if(count($resultat) == 0){
            //C'est la première fois que le joueur fair ce quizz

            $stmt = $poloDB->prepare("INSERT INTO users_quizz(users_id_user, id_quizz, valide, occurence, occurenceAvantValidation) VALUES(:id_user, :id_quizz,'1', '1','1')");
            $stmt->bindValue(':id_user', $_SESSION['id_user']);
            $stmt->bindValue(':id_quizz', $_GET['id_quizz']);
            $stmt->execute();

        }
        elseif($resultat[0]['valide'] == 0){
            //On met à jour en validant le quizz
            $occurence = $resultat[0]['occurence'];
            $newOccurence = $occurence + 1;

            $stmt = $poloDB->prepare("UPDATE users_quizz SET valide = '1', occurence = :newOccurence, occurenceAvantValidation = :newOccurence WHERE users_id_user = :id_user AND id_quizz = :id_quizz;");
            $stmt->bindValue(':id_user', $_SESSION['id_user']);
            $stmt->bindValue(':id_quizz', $_GET['id_quizz']);
            $stmt->bindValue(':newOccurence', $newOccurence);
            $stmt->execute();
        }
        else{
            //On met a jour l'occurence
            $occurence = $resultat[0]['occurence'];
            $newOccurence = $occurence + 1;

            $stmt = $poloDB->prepare("UPDATE users_quizz SET valide = '1', occurence = :newOccurence WHERE users_id_user = :id_user AND id_quizz = :id_quizz;");
            $stmt->bindValue(':id_user', $_SESSION['id_user']);
            $stmt->bindValue(':id_quizz', $_GET['id_quizz']);
            $stmt->bindValue(':newOccurence', $newOccurence);
            $stmt->execute();
        }

        break;
    case 'quizzNonValide':
        $stmt = $poloDB->prepare("SELECT * FROM users_quizz WHERE users_id_user = :id_user AND id_quizz = :id_quizz;");
        $stmt->bindValue(':id_user', $_SESSION['id_user']);
        $stmt->bindValue(':id_quizz', $_GET['id_quizz']);
        $stmt->execute();

        //On récupère les résultats
        $resultat = $stmt->fetchAll();

        if(count($resultat) == 0){
            //C'est la première fois que le joueur fair ce quizz

            $stmt = $poloDB->prepare("INSERT INTO users_quizz(users_id_user, id_quizz, valide, occurence, occurenceAvantValidation) VALUES(:id_user, :id_quizz,'0', '1','0')");
            $stmt->bindValue(':id_user', $_SESSION['id_user']);
            $stmt->bindValue(':id_quizz', $_GET['id_quizz']);
            $stmt->execute();

        }
        else{
            //On met a jour l'occurence
            $occurence = $resultat[0]['occurence'];
            $newOccurence = $occurence + 1;

            $stmt = $poloDB->prepare("UPDATE users_quizz SET occurence = :newOccurence WHERE users_id_user = :id_user AND id_quizz = :id_quizz;");
            $stmt->bindValue(':id_user', $_SESSION['id_user']);
            $stmt->bindValue(':id_quizz', $_GET['id_quizz']);
            $stmt->bindValue(':newOccurence', $newOccurence);
            $stmt->execute();
        }
        break;
}

//DECONNEXION
    $poloDB = null;

}
else {
    die("HTTP/1.0 403 Forbidden");
}


?>