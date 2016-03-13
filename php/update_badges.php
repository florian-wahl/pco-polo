<?php

/*ON CHECK LA MISE A JOUR DE BADGES*/

/*SUR LE CLASSEMENT*/
$stmt = $poloDB->prepare("SELECT * FROM score, users WHERE score_id_score = id_score ORDER BY score DESC;");
$stmt->execute();
//On récupère les résultats
$resultat = $stmt->fetchAll();

$rang = 0;

do{
    $rang++;
}while($resultat[$rang-1]['id_user'] != $_SESSION['id_user']);

//echo "<script> alert('".$rang."');</script>";

if($rang == 1){
    //1er !
    addBadge($poloDB, 14);
}

if($rang <= 10){
    //Top 10
    addBadge($poloDB, 16);
}

if($rang <= 50){
    //Top 50
    addBadge($poloDB, 15);
}

function addBadge($poloDB, $s){
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
}
?>