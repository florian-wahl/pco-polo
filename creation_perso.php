<?php include 'php/first.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'header.php';?>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est connecté

    $tab_pseudonymes = array("Rendge","Havan","Nuty","Luba","Leto","Len","Nadam","Macus","Mardatt","Lek","Kunno","Nery","Mungan","Anger","Rodatt","Saran","Nel","Mungan","Dancus","Locus","Ranggs","Bodatt","Yono","Necus","Monrell","Deedo","Tanba");
    $i = 0;
    while($i < 4){
        $tab_choix[$i] = $tab_pseudonymes[rand(0, max(0, count($tab_pseudonymes)-1))];
        $i++;
    }
    ?>
    <div id="container" class="menu_polo">

        <script src="js/creation_perso.js"></script>

        <h2> Création du personnage </h2>

        <input type="button"  onclick="location.href='menu_principal.php';" value="Retour" />





        <form id="creation_perso" method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">

            <p id="fleche_gauche" class="fleche_aide"> < </p>
            <p id="fleche_droite" class="fleche_aide"> > </p>

            <div id="selection_pseudo">
                <label for="choix_pseudo">Choisissez un pseudonyme : </label>
                <select name="choix_pseudo" id="choix_pseudo">
                    <option><?php echo $tab_choix[0];?></option>
                    <option><?php echo $tab_choix[1];?></option>
                    <option><?php echo $tab_choix[2];?></option>
                    <option><?php echo $tab_choix[3];?></option>
                </select>
            </div>



            <div id="selection_espece">
                <div id="perso-1" class="espece_perso">
                    <h4>Les Qi</h4>
                    <img id="img_qi" class="img_perso" src="res/img/personnages/Green/Beta/idle.png">
                    <p>
                        Ils viennent de la planète XK12. Une particularité dans leur évolution leur a permis de développer trois yeux :
                        les deux premiers pour voir la réalité et le troisième pour comprendre les autres. Cela peut sembler bizarre mais
                        lorsqu’un Qi parle avec quelqu’un, le troisième œil est toujours focalisé sur cette personne ; ceci permet à cette
                        espèce de bien comprendre les problèmes et les états d’esprit des gens. Ils sont en général très gentils, donc
                        représentent une ressource extrêmement importante pour le RV (Ressource vivantes) de la compagnie. Ils viennent
                        de la planète XK12. Une particularité dans leur évolution leur a permis de développer trois yeux : les deux
                        premiers pour voir la réalité et le troisième pour comprendre les autres. Cela peut sembler bizarre mais lorsqu’un
                        Qi parle avec quelqu’un, le troisième œil est toujours focalisé sur cette personne ; ceci permet à cette espèce de
                        bien comprendre les problèmes et les états d’esprit des gens. Ils sont en général très gentils, donc représentent
                        une ressource extrêmement importante pour le RV (Ressource vivantes) de la compagnie.
                    </p>
                </div>

                <div id="perso-2" class="espece_perso">
                    <h4>Perso #2</h4>


                </div>
            </div>

            <div id="selection_couleur">
                <img id="col_green" src="res/img/personnages/Green/Alpha/badge_1.png">
                <img id="col_beige" src="res/img/personnages/Beige/Alpha/badge_1.png">
                <img id="col_blue" src="res/img/personnages/Blue/Alpha/badge_1.png">
                <img id="col_purple" src="res/img/personnages/Purple/Alpha/badge_1.png">
                <img id="col_red" src="res/img/personnages/Red/Alpha/badge_1.png">
                <img id="col_yellow" src="res/img/personnages/Yellow/Alpha/badge_1.png">
            </div>



            <input id="submit_perso" type="submit" value="S'inscrire">


        </form>

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