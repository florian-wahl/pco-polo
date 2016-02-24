<?php include 'php/first_sql_conf.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'php/header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est connecté



    //On met à jour le score
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

    $stmt = $poloDB->prepare("SELECT * FROM personnage WHERE id_personnage = :id_personnage;");
    $stmt->bindValue(':id_personnage', $_SESSION['id_personnage']);
    $stmt->execute();

    //On récupère les résultats
    $resultat = $stmt->fetchAll();
    $personnage = $resultat[0];

    switch($resultat[0]['clan']){
        case 'Tut':
            $personnage['img'] = "Alpha";
            break;
        case 'Lav':
            $personnage['img'] = "Delta";
            break;
        case 'Pri':
            $personnage['img'] = "Gamma";
            break;
        case 'Tec':
            $personnage['img'] = "Zeta";
            break;
        case 'Qi':
            $personnage['img'] = "Beta";
            break;
    }
    ?>
    <div id="container" class="menu_polo">
        <h2>Profil</h2>

        <input type="button" id="button_retour" onclick="location.href='menu_principal.php';" />
        <br>

        <img id="profil_image_personnage" src="res/img/personnages/<?php echo $personnage['couleur']."/".$personnage['img']."/idle.png"?>" />

        <div id="profil_top">

            <div id="profil_apercu">
                <p><b>Prénom :</b> <?php echo $_SESSION["prenom"]; ?></p>
                <p><b>Matricule :</b> <?php echo $_SESSION["matricule"]; ?></p>
                <p><b>Pseudonyme :</b> <?php echo $_SESSION["pseudonyme"]; ?></p>
            </div>

            <script>
                $(function() {
                    $( "#profil_badges" ).tabs();
                });
            </script>
            <div id="profil_badges">
                <ul>
                    <li><a href="#profil_badges-1">Missions POLO</a></li>
                    <li><a href="#profil_badges-2">Mes Badges</a></li>
                </ul>
                <?php

                //Onrécupère les badges que possède l'utilisateur
                $stmt = $poloDB->prepare("SELECT * FROM users_badges, badges WHERE users_id_user = :id_user AND badges_id_badge = id_badge;");
                $stmt->bindValue(':id_user', $_SESSION['id_user']);
                $stmt->execute();

                //On récupère les résultats
                $resultat = $stmt->fetchAll();
                ?>

                <div id="profil_badges-1">
                    <div id="table_badges_main">
                        <?php
                        foreach($resultat as $badge){

                            if($badge['id_badge'] >= 21 || $badge['id_badge'] < 8){
                                echo "<img id='badge-".$badge['id_badge']."' class='table_badges' src='res/img/badges/".$badge['id_badge'].".png'>";
                                echo "<div id='badge-".$badge['id_badge']."' class='table_badges'>";
                                echo "<h5 id='badge-".$badge['id_badge']."' class='table_badges'>".$badge['nom']."</h5>";
                                echo "<p id='badge-".$badge['id_badge']."' class='table_badges' >".$badge['description']."</p>";
                                echo "</div>";
                            }


                        }
                        ?>
                    </div>
                </div>
                <div id="profil_badges-2">
                    <div id="table_badges_main">
                    <?php

                    foreach($resultat as $badge){

                        if($badge['id_badge'] < 21 && $badge['id_badge'] >= 8 || $badge['id_badge'] >= 27){
                            echo "<img id='badge-".$badge['id_badge']."' class='table_badges' src='res/img/badges/".$badge['id_badge'].".png'>";
                            echo "<div id='badge-".$badge['id_badge']."' class='table_badges'>";
                            echo "<h5 id='badge-".$badge['id_badge']."' class='table_badges'>".$badge['nom']."</h5>";
                            echo "<p id='badge-".$badge['id_badge']."' class='table_badges' >".$badge['description']."</p>";
                            echo "</div>";
                        }


                    }
                    ?>
                    </div>
                </div>
                <script>
                    $("div.table_badges").hide();

                    $("img.table_badges").click(function(event){
                        var id = event.target.id;

                        $("div.table_badges").each(function(event){
                            if(this.id != id){
                                $("div#"+this.id).hide();
                            }
                        });

                        $("div#"+id).toggle();


                        var posLeft = this.offsetLeft - 70;
                        $("div#"+id).css({'left': posLeft});


                    });

                </script>
            </div>
        </div>

        <div id="profil_score_jeton">
            <p>Score Journalier : <b> <?php echo $_SESSION["score_jour"]; ?></b> / Meilleur Score :<b> <?php echo $_SESSION["best_score"]; ?></b> / Nombre de jetons : <b> <?php echo $_SESSION["jetons"]; ?></b></p>
        </div>

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
                    <tr id="first_row_tableau_score">
                        <td>Rang</td>
                        <td>Pseudonyme</td>
                        <td>Score</td>
                    </tr>
                    <?php

                    $stmt = $poloDB->prepare("SELECT * FROM score, users WHERE score_id_score = id_score ORDER BY best_score DESC;");
                    $stmt->execute();

                    //On récupère les résultats
                    $resultat = $stmt->fetchAll();
                    /*
                     * Dans la suite, on gère l'affichage du tableau des scores global
                     */
                    $rang = 0;
                    $inTop5 = false;
                    $troisPoints = true;
                    $row_avant = null;
                    $row_apres = false;

                    foreach($resultat as $row){
                        $rang++;
                        /*
                         * On affiche en premier le top 5
                         */
                        if($rang < 6){
                            if($row['id_user'] == $_SESSION['id_user']){
                                echo '<tr id="ligne_tableau_score_user">';
                            }
                            else{
                                echo "<tr>";
                            }

                            echo "<td> " . $rang . " </td>";
                            echo "<td> " . $row['pseudonyme'] . " </td>";
                            echo "<td> " . $row['best_score'] . " </td>";
                            echo "</tr>";

                        }
                        else{
                            if(!$inTop5){

                                if($troisPoints && $rang != 6){
                                    echo "<tr>";
                                    echo "<td> ... </td>";
                                    echo "<td> ... </td>";
                                    echo "<td> ... </td>";
                                    echo "</tr>";
                                    $troisPoints = false;

                                }

                                /*
                                 * On affiche le rang juste après l'utilisateur
                                 */
                                if($row_apres){
                                    $row_apres = false;

                                    echo "<tr>";
                                    echo "<td> " . $rang . " </td>";
                                    echo "<td> " . $row['pseudonyme'] . " </td>";
                                    echo "<td> " . $row['best_score'] . " </td>";
                                    echo "</tr>";


                                    echo "<tr>";
                                    echo "<td> ... </td>";
                                    echo "<td> ... </td>";
                                    echo "<td> ... </td>";
                                    echo "</tr>";
                                }

                                if($row['id_user'] == $_SESSION['id_user']){

                                    $troisPoints = false;

                                    /*
                                     * On affiche le rang juste avant
                                     */
                                    if($rang != 6){
                                        $rang -= 1;
                                        echo '<tr>';
                                        echo "<td> " . $rang . " </td>";
                                        echo "<td> " . $row_avant['pseudonyme'] . " </td>";
                                        echo "<td> " . $row_avant['best_score'] . " </td>";
                                        echo "</tr>";
                                        $rang +=1;
                                    }


                                    /*
                                     * On affiche le rang de l'utilisateur
                                     */
                                    echo '<tr id="ligne_tableau_score_user">';
                                    echo "<td> " . $rang . " </td>";
                                    echo "<td> " . $row['pseudonyme'] . " </td>";
                                    echo "<td> " . $row['best_score'] . " </td>";
                                    echo "</tr>";

                                    $row_apres = true;
                                }



                            }
                        }
                        $row_avant = $row;

                    }

                    ?>
                </table>
            </div>
            <div id="tabs-2">
                <h4 class="tableau_scores">Classement journalier</h4>
                <table id="tableau_scores" class="tableau_scores">
                    <tr id="first_row_tableau_score">
                        <td>Rang</td>
                        <td>Pseudonyme</td>
                        <td>Score</td>
                    </tr>
                    <?php

                    $stmt = $poloDB->prepare("SELECT * FROM score, users, logs WHERE score_id_score = id_score AND logs_id_log = id_log AND last_log_date = :today_date ORDER BY score_jour DESC;");
                    $today_date = date("Y-m-d");
                    $stmt->bindValue(':today_date', $today_date);

                    $stmt->execute();

                    //On récupère les résultats
                    $resultat = $stmt->fetchAll();

                    /*
                     * Dans la suite on gère le tableau des scores journalier
                     */
                    $rang = 0;
                    $inTop5 = false;
                    $troisPoints = true;
                    $row_avant = null;
                    $row_apres = false;

                    foreach($resultat as $row){
                        $rang++;
                        /*
                         * On affiche en premier le top 5
                         */
                        if($rang < 6){
                            if($row['id_user'] == $_SESSION['id_user']){
                                echo '<tr id="ligne_tableau_score_user">';
                            }
                            else{
                                echo "<tr>";
                            }

                            echo "<td> " . $rang . " </td>";
                            echo "<td> " . $row['pseudonyme'] . " </td>";
                            echo "<td> " . $row['score_jour'] . " </td>";
                            echo "</tr>";

                        }
                        else{
                            if(!$inTop5){

                                if($troisPoints && $rang != 6){
                                    echo "<tr>";
                                    echo "<td> ... </td>";
                                    echo "<td> ... </td>";
                                    echo "<td> ... </td>";
                                    echo "</tr>";
                                    $troisPoints = false;

                                }

                                /*
                                 * On affiche le rang juste après l'utilisateur
                                 */
                                if($row_apres){
                                    $row_apres = false;

                                    echo "<tr>";
                                    echo "<td> " . $rang . " </td>";
                                    echo "<td> " . $row['pseudonyme'] . " </td>";
                                    echo "<td> " . $row['score_jour'] . " </td>";
                                    echo "</tr>";


                                    echo "<tr>";
                                    echo "<td> ... </td>";
                                    echo "<td> ... </td>";
                                    echo "<td> ... </td>";
                                    echo "</tr>";
                                }

                                if($row['id_user'] == $_SESSION['id_user']){

                                    $troisPoints = false;

                                    /*
                                     * On affiche le rang juste avant
                                     */
                                    if($rang != 6){
                                        $rang -= 1;
                                        echo '<tr>';
                                        echo "<td> " . $rang . " </td>";
                                        echo "<td> " . $row_avant['pseudonyme'] . " </td>";
                                        echo "<td> " . $row_avant['score_jour'] . " </td>";
                                        echo "</tr>";
                                        $rang +=1;
                                    }


                                    /*
                                     * On affiche le rang de l'utilisateur
                                     */
                                    echo '<tr id="ligne_tableau_score_user">';
                                    echo "<td> " . $rang . " </td>";
                                    echo "<td> " . $row['pseudonyme'] . " </td>";
                                    echo "<td> " . $row['score_jour'] . " </td>";
                                    echo "</tr>";

                                    $row_apres = true;
                                }



                            }
                        }
                        $row_avant = $row;

                    }

                    ?>
                </table>
            </div>
        </div>
        <?php $poloDB = null; ?>
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
<?php include 'php/footer.php';?>
</html>