<?php include 'php/first_sql_conf.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'php/header.php'; ?>
<body>

<?php
if (!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est déjà connecté
    ?>
    <script>window.location.replace("menu_principal.php");</script>
    <?php

}
else {


try {

/*
 * Fonction de test sur les valeurs entrées
 * Permet d'avoir un formulaire sécurisé
 */
function test_input($info)
{
    $info = trim($info);//Enlève les caractères inutiles
    $info = stripcslashes($info);//Enlève les \
    $info = htmlspecialchars($info);//Convertit tous les caractères spéciaux vers leurs codes
    return $info;
}

//Initialisation des variables à un string vide
$errPrenom = $errMatricule = $errPassword =  $errEscale = "";
$password = $prenom = $matricule = $reponse_s = $escale = "";
$okPassword = $okPrenom = $okMatricule = $okEscale = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

if (empty($_POST["prenom"])) {
    $errPrenom = "Votre Prénom est requis";
} elseif (!preg_match("/^[a-zA-Zéèàêâùïüë -]*$/", $_POST["prenom"])) {
    $errPrenom = "Ne peut contenir que des lettres et des espaces";
} else {
    $prenom = test_input($_POST["prenom"]);
    $okPrenom = true;
}

if (empty($_POST["matricule"])) {
    $errMatricule = "Votre matricule est requis";
} elseif (!preg_match("/^[a-zA-Z0-9]*$/", $_POST["matricule"])) {
    $errMatricule = "Ne peut contenir que des chiffres et des lettres";
} else {
    $matricule = test_input($_POST["matricule"]);
    $okMatricule = true;
}

if (empty($_POST["escale"])) {
    $errEscale = "Vous devez choisir une escale";
} else {
    $escale = test_input($_POST["escale"]);
    $okEscale = true;
}

if (empty($_POST["password"])) {
    $errPassword = "Un mot de passe est requis";
} else {
    $password = $_POST["password"];

    if (empty($_POST["password_bis"])) {
        $errPassword = "Un mot de passe est requis";
    } else {
        $password_bis = $_POST["password_bis"];

        if ($_POST["password"] !== $_POST["password_bis"]) {
            $errPassword = "Les deux mots de passe doivent correspondrent.";
        } else {
            $okPassword = true;
            $hashedpassword = password_hash($password, PASSWORD_BCRYPT);
        }
    }
}


if ($okPrenom && $okPassword && $okMatricule && $okEscale) {
/*CONNEXION A LA BDD SI TOUTES LES INFORMATIONS SONT RENSEIGNEES*/
try {

//On vérifie que le numéro employé n'est pas déjà utilisé
//Requête avec l'ID
$stmt = $poloDB->prepare("SELECT * FROM users WHERE matricule = :num");
$stmt->bindValue(':num', $matricule);
$stmt->execute();

//On récupère les résultats
$resultat = $stmt->fetchAll();
if (count($resultat) != 0) {
    $errMatricule = "Le numéro que vous avez saisi est déjà utilié";
} else {

//On crée une ligne dans la table score
$stmt_score = $poloDB->prepare("INSERT INTO Score(score, jetons)
                                                    VALUES('0', '0')");
$stmt_score->execute();
//On récupère l'id correspondant
$stmt_score = $poloDB->prepare("SELECT id_score FROM Score ORDER BY id_score DESC;");
$stmt_score->execute();
$res_id = $stmt_score->fetchAll();
$id_score = $res_id[0][0];

//On créé une ligne dans la table des logs
$stmt_log = $poloDB->prepare("INSERT INTO logs(last_log_date, last_log_time, nb_log)
                                                    VALUES(:last_log_date, :last_log_time, '0')");
$today_date = date("Y-m-d");
$stmt_log->bindParam(':last_log_date', $today_date);
$today_time = date("H:i:s");
$stmt_log->bindParam(':last_log_time', $today_time);
$stmt_log->execute();
//On récupère l'id correspondant
$stmt_log = $poloDB->prepare("SELECT id_log FROM logs ORDER BY id_log DESC;");
$stmt_log->execute();
$res_id = $stmt_log->fetchAll();
$id_log = $res_id[0][0];

//On prépare les commandes qu'on va pouvoir ajouter dans la table
$stmt_user = $poloDB->prepare("INSERT INTO Users(prenom, matricule, password, escale, pseudonyme, score_id_score, personnage_id_personnage, logs_id_log)
                                                            VALUES(:prenom, :matricule, :password, :escale, 'defaut',:id_score, '1', :id_log)");
$stmt_user->bindParam(':matricule', $matricule);
$stmt_user->bindParam(':password', $hashedpassword);
$stmt_user->bindParam(':prenom', $prenom);
$stmt_user->bindParam(':escale', $escale);
$stmt_user->bindParam(':id_score', $id_score);
$stmt_user->bindParam(':id_log', $id_log);

$stmt_user->execute();

    try{

    //Requête avec l'ID
    $stmt = $poloDB->prepare("SELECT * FROM users, score, logs WHERE matricule = :num AND score_id_score = id_score AND logs_id_log = id_log;");
    $stmt->bindValue(':num', $matricule);
    $stmt->execute();

    //On récupère les résultats
    $resultat = $stmt->fetchAll();

        if (count($resultat) == 0) {//Il n'y a pas de résultat : erreur dans le numéro employé
            $errConnexion = "Le matricule ou le mot de passe est incorrect <br>";
        } else {
            $employe = $resultat[0];//On récupère la première ligne, le résultat doit être unique
            $hashedPasswordFromDB = $resultat[0]['password'];
            if (!password_verify($password, $hashedPasswordFromDB)) {//Mauvais mot de passe
                $errConnexion = "Le mot de passe saisi est incorrect <br>";
            } else {//L'employé est identifié

                include "php/connexion_script.php";
            }
        }
        } catch (PDOException $e) {
    echo $e->getMessage();
}
$nom = $password = $prenom = $matricule = "";


    /*DECONNEXION*/
    $poloDB = null;

/*REDIRECTION*/
?>
<script>window.location.replace("menu_principal.php");</script>

    <?php
}


} catch (PDOException $e) {

    echo "<br>" . $e->getMessage();
}
}
}

} catch (Exception $e) {
    echo 'Message d\'erreur: ' . $e->getMessage();
}
?>

    <div id="container">

        <form id="formulaire" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
            <fieldset><h2>Créer un nouveau compte utilisateur</h2>

                <p>
                    <label for="prenom">Prénom</label>
                    <input type="text" name="prenom" id="prenom" value="<?php echo $prenom; ?>"> *<span class="error"> <?php echo $errPrenom; ?></span>
                </p>

                <p>
                    <label for="matricule">Matricule Air France</label>
                    <input type="text" name="matricule" id="matricule" value="<?php echo $matricule; ?>"> *<span class="error"> <?php echo $errMatricule; ?></span>
                </p>

                <p>
                    <label for="password">Mot de passe</label>
                    <input type="password" name="password" id="password"> *<span class="error"> <?php echo $errPassword; ?></span>
                </p>

                <p>
                    <label for="password_bis">Répéter mot de passe</label>
                    <input type="password" name="password_bis" id="password_bis"> *
                </p>

                <p>
                    <label for="escale">Choisissez votre escale</label>
                    <select name="escale" id="escale">
                        <option><?php echo $escale; ?></option>
                        <option>CDG</option>
                        <option>EXP</option>
                    </select> *<span class="error"> <?php echo $errEscale; ?></span>
                </p>

                <p>
                    <label>&nbsp;</label>
                    <span style="font-size: 80%;"> * Ces informations sont obligatoires.</span>
                </p>

                <p>
                    <label>&nbsp;</label>
                    <input type="submit" id="button_inscrire" value="">
                    <input type="button" id="button_retour" onclick="location.href='menu_principal.php';" />
                </p>

            </fieldset>
        </form>

    </div>
        <?php
}
?>

</body>

<?php include "php/footer.php"; ?>

</html>