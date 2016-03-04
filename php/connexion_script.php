<?php
$_SESSION['LoggedIn'] = 1;
$_SESSION['matricule'] = $matricule;
$_SESSION['prenom'] = $employe['prenom'];
$_SESSION['pseudonyme'] = $employe['pseudonyme'];
$_SESSION['id_user'] = $employe['id_user'];
$_SESSION['id_personnage'] = $employe['personnage_id_personnage'];
$_SESSION['id_score'] = $employe['id_score'];
$_SESSION['score'] = $employe['score'];
$_SESSION["escale"] = $employe['escale'];
$_SESSION['jetons'] = $employe['jetons'];
$_SESSION['id_log'] = $employe['id_log'];
$_SESSION['last_log_date'] = $employe['last_log_date'];
$_SESSION['last_log_time'] = $employe['last_log_time'];
$_SESSION['nb_log'] = $employe['nb_log'];


//Si c'est la première connexion du jour
if ($_SESSION['last_log_date'] < date("Y-m-d")) {
    $_SESSION['last_log_date'] = date("Y-m-d");
    $_SESSION['nb_log'] += $_SESSION['nb_log'];
    $_SESSION['score'] = 0;


    //On met à jour le score dans la BDD
    $stmt = $poloDB->prepare("UPDATE score SET score = :new_score WHERE id_score = :id_score;");
    $stmt->bindValue(':id_score', $_SESSION['id_score']);
    $stmt->bindValue(':new_score', $_SESSION['score']);
    $stmt->execute();

    //On met à jour le log dans la BDD
    //On créé une nouvelle ligne dans les logs
    $stmt_log = $poloDB->prepare("INSERT INTO logs(last_log_date, last_log_time, nb_log)
                                                    VALUES(:last_log_date, :last_log_time, :nb_log)");
    $_SESSION['last_log_date'] = date("Y-m-d");
    $stmt_log->bindParam(':last_log_date', $_SESSION['last_log_date']);
    $_SESSION['last_log_time'] = date("H:i:s");
    $stmt_log->bindParam(':last_log_time', $_SESSION['last_log_time']);
    $stmt_log->bindParam(':nb_log', $_SESSION['nb_log']);
    $stmt_log->execute();
    //On récupère l'id correspondant
    $stmt_log = $poloDB->prepare("SELECT id_log FROM logs ORDER BY id_log DESC;");
    $stmt_log->execute();
    $res_id = $stmt_log->fetchAll();
    $new_id_log = $res_id[0][0];
    $_SESSION['id_log'] = $new_id_log;

    $stmt = $poloDB->prepare("UPDATE users SET logs_id_log = :new_id_log WHERE id_user = :id_user;");
    $stmt->bindValue(':id_user', $_SESSION['id_user']);
    $stmt->bindValue(':new_id_log', $_SESSION['id_log']);
    $stmt->execute();
} elseif ($_SESSION['last_log_time'] != date("H:i:s")) {
    $_SESSION['last_log_time'] = date("H:i:s");
    $stmt = $poloDB->prepare("UPDATE logs SET last_log_time = :new_last_log_time WHERE id_log = :id_log;");
    $stmt->bindValue(':new_last_log_time', $_SESSION['last_log_time']);
    $stmt->bindValue(':id_log', $_SESSION['id_log']);
    $stmt->execute();
}


?>