<?php include '../php/first_sql_conf.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include "../php/header_admin.php"; ?>
<body>
<?php
if(!empty($_SESSION['LoggedInAdmin']) && !empty($_SESSION['identifiant'])){
    //L'employé est connecté

    //Requête avec l'ID
    $stmt = $poloDB->prepare("SELECT * FROM users, logs WHERE logs_id_log = id_log ORDER BY id_user ASC;");
    $stmt->execute();

    //On récupère les résultats
    $resultat = $stmt->fetchAll();
    ?>
    <div id="container_admin" class="menu_polo">
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
                <td>Date de dernière connexion</td>
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
                echo "<td> " . $row['last_log_date'] . " " . $row['last_log_time'] . " </td>";
                echo "</tr>";
            }


            ?>
        </table>
        <input type="button" class="menu_principal_button" onclick="location.href='../logout.php';" value="Déconnexion" />
    </div>
    <?php
}else{
    //Demande non autorisé d'accès à cette page
    header("refresh:0; url=../index.php");
}
?>
</body>
<?php include '../php/footer.php';?>
</html>