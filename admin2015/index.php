<?php include '../php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>POLO - Air France</title>

    <!-- Include meta tag to ensure proper rendering and touch zooming -->
    <link rel="apple-touch-icon" href="/res/img/custom_icon_polo.png">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <!-- Au dessus : désactive le zoom
    En dessous : désactive les on touch move (zoom, pinch, scrolling)
    -->
    <!-- TODO: Installer jQuery en local pour éviter les problèmes liés à internet-->
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>

    <link rel="manifest" href="/manifest.json">

    <!-- CSS -->
    <link rel="stylesheet" href="../css/polo.css">
    <link rel="stylesheet" href="../css/menu.css">
    <link rel="stylesheet" href="../css/pages.css">


</head>
<body>
<?php
if(!empty($_SESSION['LoggedInAdmin']) && !empty($_SESSION['identifiant'])){
    //L'employé est connecté

    /*CONNEXION*/
    $poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
    // set the PDO error mode to exception
    $poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //Requête avec l'ID
    $stmt = $poloDB->prepare("SELECT * FROM users ORDER BY id_user ASC;");
    $stmt->execute();

    //On récupère les résultats
    $resultat = $stmt->fetchAll();
    ?>
    <div id="container" class="menu_polo">
        <h2>Tableau de Bord - Administration</h2>


        <p>
            Nombre d'utilisateur : <?php echo count($resultat); ?>
        </p>
        <h2>Liste des utilisateurs</h2>
        <table class="liste_utilisateur">
            <tr style="font-weight: bold;">
                <td>ID Utilisateur</td>
                <td>Nom</td>
                <td>Prénom</td>
                <td>Matricule</td>
                <td>Pseudonyme</td>
                <td>Date d'enregistrement</td>
            </tr>
            <?php

            foreach($resultat as $row){
                echo "<tr>";
                echo "<td> " . $row['id_user'] . " </td>";
                echo "<td> " . $row['nom'] . " </td>";
                echo "<td> " . $row['prenom'] . " </td>";
                echo "<td> " . $row['matricule'] . " </td>";
                echo "<td> " . $row['pseudonyme'] . " </td>";
                echo "<td> " . $row['reg_date'] . " </td>";
                echo "</tr>";
            }


            ?>
        </table>
        <input type="button" class="menu_principal_button" onclick="location.href='../php/logout.php';" value="Déconnexion" />
    </div>
    <?php
}else{
    //Demande non autorisé d'accès à cette page
    header("refresh:0; url=../index.php");
}
?>
</body>
<?php include '../footer.php';?>
</html>