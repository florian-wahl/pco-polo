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



        <div id="profil_top">
            <div>
                <img id="profil_image_personnage" src="res/img/custom_icon_polo.png" />
            </div>

            <div id="profil_apercu">
                <p>Nom : <?php echo $_SESSION["nom"]; ?></p>
                <p>Prénom : <?php echo $_SESSION["prenom"]; ?></p>
                <p>Matricule : <?php echo $_SESSION["matricule"]; ?></p>
                <p>Pseudonyme : <?php echo $_SESSION["pseudonyme"]; ?></p>
            </div>

            <div id="profil_badges">
                <p>Mes badges</p>
                <table>
                    <tr>
                        <td>Badge #1</td>
                        <td>Badge #2</td>
                        <td>Badge #3</td>
                        <td>Badge #4</td>
                    </tr>
                    <tr>
                        <td>Badge #1</td>
                        <td>Badge #2</td>
                        <td>Badge #3</td>
                        <td>Badge #4</td>
                    </tr>
                </table>
            </div>
        </div>





        <div>
            <p>Score Journalier : <?php echo $_SESSION["score_jour"]; ?></p>
            <p>Meilleur Score : <?php echo $_SESSION["best_score"]; ?></p>
            <p>Nombre de jetons : <?php echo $_SESSION["jetons"]; ?></p>
        </div>


        <script
        <script>
            $(function() {
                $( "#tabs" ).tabs();
            });
        </script>

        <div id="tabs">
            <ul>
                <li><a href="#tabs-1">Global</a></li>
                <li><a href="#tabs-2">Jour</a></li>
            </ul>
            <div id="tabs-1">
                <table id="tableau_scores" class="tableau_scores">
                    <h4 class="tableau_scores">Classement global</h4>
                    <tr>
                        <td>Rang</td>
                        <td>Pseudonyme</td>
                        <td>Score</td>
                    </tr>
                </table>
            </div>
            <div id="tabs-2">
                <h4 class="tableau_scores">Classement journalier</h4>
                <table id="tableau_scores" class="tableau_scores">
                    <tr>
                        <td>Rang</td>
                        <td>Pseudonyme</td>
                        <td>Score</td>
                    </tr>
                </table>
            </div>
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