<?php include 'php/first_sql_conf.php'; ?>

<!DOCTYPE html>
<html lang="en">
<?php include 'php/header.php';?>
<!-- Désactive le zoom et le scrolling -->
<script>
    document.ontouchmove = function(event){
        event.preventDefault();
    }
</script>
<body>
<?php
if(!empty($_SESSION['LoggedIn']) && !empty($_SESSION['matricule'])){
    //L'employé est connecté
    include "php/update_badges.php";

    ?>
        <div id="container" class="menu_principal">
        <h2>Bienvenue <?php echo $_SESSION['prenom']; ?> ! </h2>
        <h3>Que voulez-vous faire ?</h3>

            <input type="button" class="menu_principal_button" id="button_jouer"/>
        <table>
            <tr>
                <td class="menu_principal"><input type="button" class="menu_principal_button" id="button_profil"/></td>
                <td><input type="button" class="menu_principal_button" id="button_aides"/></td>
            </tr>
        </table>
            <input type="button" id="button_quitter" onclick="location.href='logout.php';"/>
            <br>

            <br>
        </div>

    <script>
        $("#button_jouer").click(function(){
            var pseudonyme = '<?php echo $_SESSION['pseudonyme'];?>';

            if(pseudonyme == "defaut"){
                location.href = "creation_perso.php";
            }
            else{
                location.href = "polo.php?origine=0";
            }
        });

        $("#button_aides").click(function(){
            location.href='aides.php';
        });

        $("#button_profil").click(function(){
            location.href='profil.php';
        });


    </script>
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