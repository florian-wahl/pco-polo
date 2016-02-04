<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'php/header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est connecté

    if($_SESSION['pseudonyme'] == 'defaut') {


    $tab_pseudonymes = array("Rendge", "Havan", "Nuty", "Luba", "Leto", "Len", "Nadam", "Macus", "Mardatt", "Lek", "Kunno", "Nery", "Mungan", "Anger", "Rodatt", "Saran", "Nel", "Mungan", "Dancus", "Locus", "Ranggs", "Bodatt", "Yono", "Necus", "Monrell", "Deedo", "Tanba");
    $i = 0;
    while ($i < 4) {
        $tab_choix[$i] = $tab_pseudonymes[rand(0, max(0, count($tab_pseudonymes) - 1))];
        $i++;
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $_SESSION['pseudonyme'] = $_POST['choix_pseudo'] . $_SESSION['id_user'];

        /*CONNEXION*/
        $poloDB = new PDO("mysql:host=$servername;dbname=$nameDB", $usernameDB, $passwordDB);
        // set the PDO error mode to exception
        $poloDB->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $poloDB->prepare("UPDATE users SET pseudonyme = :pseudonyme WHERE id_user = :id_user;");
        $stmt->bindValue(':id_user', $_SESSION['id_user']);
        $stmt->bindValue(':pseudonyme', $_SESSION['pseudonyme']);
        $stmt->execute();

        $poloDB = null;

        //Redirection
        echo "<script>location.href = 'polo.php';</script>";
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


            <div id="selection_espece">

                <p class="choix">Choisissez l'espèce que vous voulez pour votre personnage :</p>

                <div id="perso-1" class="espece_perso">
                    <h4>Les Tut</h4>
                    <img id="img_tut" class="img_perso" src="res/img/personnages/Green/Alpha/idle.png">
                    <p>
                        <b>Nom :</b> Tut <br>
                        <b>Planète :</b> QP66 <br>
                        <b>Signes particulières :</b> Leur capacité c’est l’apprentissage, Ils apprennent très vit leur travail et tout autre type de compétences.
                    </p>
                </div>

                <div id="perso-2" class="espece_perso">
                    <h4>Les Tec</h4>
                    <img id="img_tec" class="img_perso" src="res/img/personnages/Green/Zeta/idle.png">
                    <p>
                        <b>Nom :</b> Tec <br>
                        <b>Planète :</b> HQ30 <br>
                        <b>Signes particulières :</b> Ils sont des formes de vie biotechnologiques, ils arrivent à bien utiliser  tout outil informatique
                    </p>
                </div>

                <div id="perso-3" class="espece_perso">
                    <h4>Les Pri</h4>
                    <img id="img_pri" class="img_perso" src="res/img/personnages/Green/Gamma/idle.png">
                    <p>
                        <b>Nom :</b> Pri <br>
                        <b>Planète :</b> Frolix8 <br>
                        <b>Signes particulières :</b> Ils ont un sens des affaires très développé
                    </p>
                </div>

                <div id="perso-4" class="espece_perso">
                    <h4>Les Lav</h4>
                    <img id="img_lav" class="img_perso" src="res/img/personnages/Green/Delta/idle.png">
                    <p>
                        <b>Nom :</b> Lav <br>
                        <b>Planète :</b> FI12 <br>
                        <b>Signes particulières :</b> Les dures conditions sur leurs planète leur à permit de devenir des grands travailleur, ils ne sentent pas la fatigue et ils n’aiment pas trop les pauses
                    </p>
                </div>

                <div id="perso-5" class="espece_perso">
                    <h4>Les Qi</h4>
                    <img id="img_qi" class="img_perso" src="res/img/personnages/Green/Beta/idle.png">
                    <p>
                        <b>Nom :</b> Qi <br>
                        <b>Planète :</b> XK12 <br>
                        <b>Yeux :</b> 3 <br>
                        <b>Signes particulières :</b> Ils ont un troisième œil qui lui sert pour comprendre l’état d’esprit des gens

                    </p>
                </div>

            </div>

            <div id="selection_couleur">

                <p class="choix">Choisissez la couleur que vous voulez pour votre personnage :</p>

                <img id="col_green" class="badge_couleur" src="res/img/personnages/Green/Alpha/badge_1.png">
                <img id="col_beige" class="badge_couleur" src="res/img/personnages/Beige/Alpha/badge_1.png">
                <img id="col_blue" class="badge_couleur" src="res/img/personnages/Blue/Alpha/badge_1.png">
                <img id="col_purple" class="badge_couleur" src="res/img/personnages/Purple/Alpha/badge_1.png">
                <img id="col_red" class="badge_couleur" src="res/img/personnages/Red/Alpha/badge_1.png">
                <img id="col_yellow" class="badge_couleur" src="res/img/personnages/Yellow/Alpha/badge_1.png">
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