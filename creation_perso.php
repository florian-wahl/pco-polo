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

        <input type="button" onclick="location.href='menu_principal.php';" value="Retour"/>


        <form id="creation_perso" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">

            <p id="fleche_gauche" class="fleche_aide"> < </p>
            <p id="fleche_droite" class="fleche_aide"> > </p>

            <div id="selection_pseudo">
                <label for="choix_pseudo">Choisissez un pseudonyme : </label>
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
                        Ils habitent la planète QP66 et ceux-ci se distinguent des autres espèces grâce à leur caractère
                        « touche à tout ».
                        Evidemment ils ne naissent pas avec toutes leurs capacités développées, mais ils ont l’habilité
                        d’apprendre très vite,
                        bien plus que les autres espèces. Bien sûr, ils ont souvent un peu de mal par rapport aux autres
                        espèces au début,
                        mais avec le temps ils sont capables de s’adapter et de s’améliorer énormément. Ils sont donc
                        des travailleurs
                        intelligents et très flexibles.
                    </p>
                </div>

                <div id="perso-2" class="espece_perso">
                    <h4>Les Tec</h4>
                    <img id="img_tec" class="img_perso" src="res/img/personnages/Green/Zeta/idle.png">
                    <p>
                        Ceci est une espèce unique dans tout l’univers connu. Provenant de la planète HQ30, ils sont en
                        fait une forme de
                        vie Biotechnologique. En étudiant l’histoire de leur évolution, on s’est aperçu que la
                        technologie et les cellules
                        ont toujours été en symbiose. Personne n’a encore vraiment compris quand et comment ceci était
                        arrivé. Au vu de
                        leur symbiose avec la technologie, ils maîtrisent toute forme d’électronique et savent utiliser
                        ces instruments
                        mieux que les autres.
                    </p>
                </div>

                <div id="perso-3" class="espece_perso">
                    <h4>Les Pri</h4>
                    <img id="img_pri" class="img_perso" src="res/img/personnages/Green/Gamma/idle.png">
                    <p>
                        Ils viennent de la planète Frolix8. Ils sont une espèce assez compétitive et avec un bon esprit
                        d’entreprenariat
                        mais jamais incorrects (ce n’est pas un hasard que le patron de l’astroport soit un Pri). Ils
                        savent bien comment
                        et quand vendre quelque chose à quelqu’un, cette caractéristique les rend très importants pour
                        le service commercial
                        de la compagnie.
                    </p>
                </div>

                <div id="perso-4" class="espece_perso">
                    <h4>Les Lav</h4>
                    <img id="img_lav" class="img_perso" src="res/img/personnages/Green/Delta/idle.png">
                    <p>
                        Provenant de la planète FI12, les Lav sont des grands travailleurs. Les conditions peu
                        favorables de leur planète
                        d’origine ont permis de développer une résistance à la fatigue et une motivation jamais vue chez
                        les autres espèces.
                        Ils n’aiment pas s’arrêter beaucoup de temps, ils aiment leur travail et ils le connaissent à la
                        perfection.
                        Ils sont souvent un point de référence pour les autres membres de l’équipe, qui n’hésiteront pas
                        à leur demander des conseils.
                    </p>
                </div>

                <div id="perso-5" class="espece_perso">
                    <h4>Les Qi</h4>
                    <img id="img_qi" class="img_perso" src="res/img/personnages/Green/Beta/idle.png">
                    <p>
                        Ils viennent de la planète XK12. Une particularité dans leur évolution leur a permis de
                        développer trois yeux :
                        les deux premiers pour voir la réalité et le troisième pour comprendre les autres. Cela peut
                        sembler bizarre mais
                        lorsqu’un Qi parle avec quelqu’un, le troisième œil est toujours focalisé sur cette personne ;
                        ceci permet à cette
                        espèce de bien comprendre les problèmes et les états d’esprit des gens. Ils sont en général très
                        gentils, donc
                        représentent une ressource extrêmement importante pour le RV (Ressource vivantes) de la
                        compagnie. Ils viennent
                        de la planète XK12. Une particularité dans leur évolution leur a permis de développer trois yeux
                        : les deux
                        premiers pour voir la réalité et le troisième pour comprendre les autres. Cela peut sembler
                        bizarre mais lorsqu’un
                        Qi parle avec quelqu’un, le troisième œil est toujours focalisé sur cette personne ; ceci permet
                        à cette espèce de
                        bien comprendre les problèmes et les états d’esprit des gens. Ils sont en général très gentils,
                        donc représentent
                        une ressource extrêmement importante pour le RV (Ressource vivantes) de la compagnie.
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


            <input id="submit_perso" type="submit" value="Valider">
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