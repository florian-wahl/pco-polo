<?php include '../php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include "../header.php"; ?>
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