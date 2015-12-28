<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est connecté

    /*CONNEXION*/
    $poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
    // set the PDO error mode to exception
    $poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //Requête avec l'ID
    $stmt = $poloDB->prepare("SELECT * FROM score WHERE id_score = :id_score;");
    $stmt->bindValue(':id_score', $_SESSION['id_score']);
    $stmt->execute();

    //On récupère les résultats
    $resultat = $stmt->fetchAll();

    //On récupère la première ligne, le résultat doit être unique
    $res_score = $resultat[0];
    $_SESSION['score_jour'] = $res_score['score_jour'];
    $_SESSION['best_score'] = $res_score['best_score'];
    $_SESSION['jetons'] = $res_score['jetons'];
    ?>
    <div id="container" class="menu_polo">
        <h2>Profil</h2>
        <div id="profil_apercu">
            <img src="res/img/custom_icon_polo.png" />
            <p>Nom : <?php echo $_SESSION["nom"]; ?></p>
            <p>Prénom : <?php echo $_SESSION["prenom"]; ?></p>
            <p>Matricule : <?php echo $_SESSION["matricule"]; ?></p>
            <p>Pseudonyme : <?php echo $_SESSION["pseudonyme"]; ?></p>
        </div>
        <div>
            <p>Score Journalier : <?php echo $_SESSION["score_jour"]; ?></p>
            <p>Meilleur Score : <?php echo $_SESSION["best_score"]; ?></p>
            <p>Nombre de jetons : <?php echo $_SESSION["jetons"]; ?></p>
        </div>
        <input type="button" class="menu_principal_button" onclick="location.href='menu_principal.php';" value="Retour" />
    </div>
<?php
}else{
//L'employé ne doit pas être sur cette page sans être connecté
?>
    <script>window.location.replace("index.php");</script>
    <?php
}
?>
</body>
<?php include 'footer.php';?>
</html>