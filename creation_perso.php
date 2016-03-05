<?php include 'php/first_sql_conf.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'php/header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est connecté

    if($_SESSION['pseudonyme'] == 'defaut') {


    $tab_pseudonymes = array("Rendge", "Havan", "Nuty", "Luba", "Leto", "Len", "Nadam", "Macus", "Mardatt", "Lek", "Kunno", "Nery", "Mungan", "Floppy", "Maro", "Rodatt", "Saran", "Nel", "Mungan", "Dancus", "Locus", "Ranggs", "Bodatt", "Yono", "Necus", "Monrell", "Deedo", "Tanba");

    for($j = 0; $j < 4; $j++){
        $tab_choix[$j] = $tab_pseudonymes[rand(0, max(0, count($tab_pseudonymes) - 1))];
        if($j == 1){
            while($tab_choix[$j] == $tab_choix[$j-1]){
                $tab_choix[$j] = $tab_pseudonymes[rand(0, max(0, count($tab_pseudonymes) - 1))];
            }

        }if($j == 2){
            while($tab_choix[$j] == $tab_choix[$j-1] || $tab_choix[$j] == $tab_choix[$j-2]){
                $tab_choix[$j] = $tab_pseudonymes[rand(0, max(0, count($tab_pseudonymes) - 1))];
            }
        }if($j == 3){
            while($tab_choix[$j] == $tab_choix[$j-1] || $tab_choix[$j] == $tab_choix[$j-2] || $tab_choix[$j] == $tab_choix[$j-3]){
                $tab_choix[$j] = $tab_pseudonymes[rand(0, max(0, count($tab_pseudonymes) - 1))];
            }
        }

    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $_SESSION['pseudonyme'] = $_POST['choix_pseudo'] . $_SESSION['id_user'];


        $stmt = $poloDB->prepare("UPDATE users SET pseudonyme = :pseudonyme WHERE id_user = :id_user;");
        $stmt->bindValue(':id_user', $_SESSION['id_user']);
        $stmt->bindValue(':pseudonyme', $_SESSION['pseudonyme']);
        $stmt->execute();

        $poloDB = null;

        //Redirection
        echo "<script>location.href = 'polo.php?origine=1';</script>";
    }
    ?>

    <div id="container" class="menu_polo">

        <script src="js/creation_perso.js"></script>

        <h2> Création du personnage </h2>

        <input type="button" id="button_retour" onclick="location.href='menu_principal.php';"/>


        <form id="creation_perso" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">

            <p id="fleche_gauche" class="fleche_aide"> </p>
            <p id="fleche_droite" class="fleche_aide"> </p>

            <div id="selection_pseudo">
                <label for="choix_pseudo"><b>Choisissez un pseudonyme : </b></label>
                <select name="choix_pseudo" id="choix_pseudo">
                    <option><?php echo $tab_choix[0]; ?></option>
                    <option><?php echo $tab_choix[1]; ?></option>
                    <option><?php echo $tab_choix[2]; ?></option>
                    <option><?php echo $tab_choix[3]; ?></option>
                </select>
            </div>

            <div id="selection_clan">

                <p class="choix">Choisissez le clan que vous voulez pour votre personnage :</p>

                <div id="perso-1" class="clan_perso">
                    <h4>Les Tut</h4>
                    <img id="img_tut" class="img_perso" src="res/img/personnages/agents/Green/Tut/idle.png">
                    <p>
                        <b>Nom :</b> Tut <br>
                        <b>Planète :</b> QP66 <br>
                        <b>Signes particuliers :</b> Leur capacité c’est l’apprentissage, Ils apprennent très vite leur travail et tout autre type de compétences.
                    </p>
                </div>

                <div id="perso-2" class="clan_perso">
                    <h4>Les Tec</h4>
                    <img id="img_tec" class="img_perso" src="res/img/personnages/agents/Green/Tec/idle.png">
                    <p>
                        <b>Nom :</b> Tec <br>
                        <b>Planète :</b> HQ30 <br>
                        <b>Signes particuliers :</b> Ils sont des formes de vie biotechnologiques, ils arrivent à bien utiliser tout outil informatique.
                    </p>
                </div>

                <div id="perso-3" class="clan_perso">
                    <h4>Les Pri</h4>
                    <img id="img_pri" class="img_perso" src="res/img/personnages/agents/Green/Pri/idle.png">
                    <p>
                        <b>Nom :</b> Pri <br>
                        <b>Planète :</b> Frolix8 <br>
                        <b>Signes particuliers :</b> Ils ont un sens des affaires très développé.
                    </p>
                </div>

                <div id="perso-4" class="clan_perso">
                    <h4>Les Lav</h4>
                    <img id="img_lav" class="img_perso" src="res/img/personnages/agents/Green/Lav/idle.png">
                    <p>
                        <b>Nom :</b> Lav <br>
                        <b>Planète :</b> FI12 <br>
                        <b>Signes particuliers :</b> Les dures conditions sur leur planète natale leur à permit de devenir de grands travailleurs, ils ne sentent pas la fatigue et ils n’aiment pas trop les pauses
                    </p>
                </div>

                <div id="perso-5" class="clan_perso">
                    <h4>Les Qi</h4>
                    <img id="img_qi" class="img_perso" src="res/img/personnages/agents/Green/Qi/idle.png">
                    <p>
                        <b>Nom :</b> Qi <br>
                        <b>Planète :</b> XK12 <br>
                        <b>Yeux :</b> 3 <br>
                        <b>Signes particuliers :</b> Ils ont un troisième œil qui leur sert pour comprendre l’état d’esprit des gens.

                    </p>
                </div>

            </div>

            <div id="selection_couleur">

                <p class="choix">Choisissez la couleur que vous voulez pour votre personnage :</p>

                <img id="col_green" class="badge_couleur" src="res/img/personnages/agents/Green/Tut/badge_1.png">
                <img id="col_blue" class="badge_couleur" src="res/img/personnages/agents/Blue/Tut/badge_1.png">
                <img id="col_purple" class="badge_couleur" src="res/img/personnages/agents/Purple/Tut/badge_1.png">
                <img id="col_red" class="badge_couleur" src="res/img/personnages/agents/Red/Tut/badge_1.png">
                <img id="col_yellow" class="badge_couleur" src="res/img/personnages/agents/Yellow/Tut/badge_1.png">
            </div>


            <input id="submit_perso" type="submit" value="">
            <br>

        </form>

    </div>

<?php
}
else{
//L'employé n'a pas à être sur cette page car il possède déjà un personnage
?>
    <script>window.location.replace("menu_principal.php");</script>
<?php
}
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