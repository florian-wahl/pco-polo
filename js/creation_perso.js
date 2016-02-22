$(document).ready(function() {

    var num_clan = 1;
    var nb_clan = $(".clan_perso").size();

    update_post_it();


   $("#fleche_droite").click(function(){
        num_clan ++;

       if(num_clan  > nb_clan){
           num_clan  = 1;
       }

       update_post_it();
   });

    $("#fleche_gauche").click(function(){
        num_clan --;

        if(num_clan  < 1){
            num_clan  = nb_clan;
        }

        update_post_it();
    });

    function update_post_it(){

        var nom_clan_perso = "#perso-"+num_clan ;

        $(".clan_perso").hide();

        $(nom_clan_perso).show();

    }

    /*GESTION DE L'ENVOIE DU PERSONNAGE A LA BDD*/

    $("#submit_perso").click(function(){

        //Protocole AJAX

        var xmlhttp = new XMLHttpRequest();
        var clan;

        switch (num_clan){
            case 1:
                clan = "Tut";
                break;
            case 2:
                clan = "Tec";
                break;
            case 3:
                clan = "Pri";
                break;
            case 4:
                clan = "Lav";
                break;
            case 5:
                clan = "Qi";
                break;

        }
        xmlhttp.open("GET","ajaxDB.php?q=setPersonnage&clan="+clan+"&couleur="+couleur, false);
        xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xmlhttp.send();

        var xmlhttp1 = new XMLHttpRequest();

        xmlhttp1.open("GET","ajaxDB.php?q=addBadge&s=1", true);
        xmlhttp1.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xmlhttp1.send();
    });

    /* GESTION DES COULEURS*/

    //DEFAUT
    var couleur = "Green";
    $("#col_green").css({
        border: "dashed 1px",
        padding: "1px"
    });

    //SELECTION
    $("#col_beige").click(function(){
        couleur = "Beige";
        $(".badge_couleur").css({
            border: "none"
        });

        $("#col_beige").css({
            border: "dashed 1px",
            padding: "1px"
        });

        $("#img_qi").attr("src","res/img/personnages/"+couleur+"/Beta/idle.png");
        $("#img_tut").attr("src","res/img/personnages/"+couleur+"/Alpha/idle.png");
        $("#img_tec").attr("src","res/img/personnages/"+couleur+"/Zeta/idle.png");
        $("#img_pri").attr("src","res/img/personnages/"+couleur+"/Gamma/idle.png");
        $("#img_lav").attr("src","res/img/personnages/"+couleur+"/Delta/idle.png");
    });

    $("#col_green").click(function(){
        couleur = "Green";
        $(".badge_couleur").css({
            border: "none"
        });

        $("#col_green").css({
            border: "dashed 1px",
            padding: "1px"
        });

        $("#img_qi").attr("src","res/img/personnages/"+couleur+"/Beta/idle.png");
        $("#img_tut").attr("src","res/img/personnages/"+couleur+"/Alpha/idle.png");
        $("#img_tec").attr("src","res/img/personnages/"+couleur+"/Zeta/idle.png");
        $("#img_pri").attr("src","res/img/personnages/"+couleur+"/Gamma/idle.png");
        $("#img_lav").attr("src","res/img/personnages/"+couleur+"/Delta/idle.png");
    });

    $("#col_blue").click(function(){
        couleur = "Blue";
        $(".badge_couleur").css({
            border: "none"
        });

        $("#col_blue").css({
            border: "dashed 1px",
            padding: "1px"
        });

        $("#img_qi").attr("src","res/img/personnages/"+couleur+"/Beta/idle.png");
        $("#img_tut").attr("src","res/img/personnages/"+couleur+"/Alpha/idle.png");
        $("#img_tec").attr("src","res/img/personnages/"+couleur+"/Zeta/idle.png");
        $("#img_pri").attr("src","res/img/personnages/"+couleur+"/Gamma/idle.png");
        $("#img_lav").attr("src","res/img/personnages/"+couleur+"/Delta/idle.png");
    });

    $("#col_purple").click(function(){
        couleur = "Purple";
        $(".badge_couleur").css({
            border: "none"
        });

        $("#col_purple").css({
            border: "dashed 1px",
            padding: "1px"
        });

        $("#img_qi").attr("src","res/img/personnages/"+couleur+"/Beta/idle.png");
        $("#img_tut").attr("src","res/img/personnages/"+couleur+"/Alpha/idle.png");
        $("#img_tec").attr("src","res/img/personnages/"+couleur+"/Zeta/idle.png");
        $("#img_pri").attr("src","res/img/personnages/"+couleur+"/Gamma/idle.png");
        $("#img_lav").attr("src","res/img/personnages/"+couleur+"/Delta/idle.png");
    });

    $("#col_red").click(function(){
        couleur = "Red";
        $(".badge_couleur").css({
            border: "none"
        });

        $("#col_red").css({
            border: "dashed 1px",
            padding: "1px"
        });

        $("#img_qi").attr("src","res/img/personnages/"+couleur+"/Beta/idle.png");
        $("#img_tut").attr("src","res/img/personnages/"+couleur+"/Alpha/idle.png");
        $("#img_tec").attr("src","res/img/personnages/"+couleur+"/Zeta/idle.png");
        $("#img_pri").attr("src","res/img/personnages/"+couleur+"/Gamma/idle.png");
        $("#img_lav").attr("src","res/img/personnages/"+couleur+"/Delta/idle.png");
    });

    $("#col_yellow").click(function(){
        couleur = "Yellow";
        $(".badge_couleur").css({
            border: "none"
        });

        $("#col_yellow").css({
            border: "dashed 1px",
            padding: "1px"
        });

        $("#img_qi").attr("src","res/img/personnages/"+couleur+"/Beta/idle.png");
        $("#img_tut").attr("src","res/img/personnages/"+couleur+"/Alpha/idle.png");
        $("#img_tec").attr("src","res/img/personnages/"+couleur+"/Zeta/idle.png");
        $("#img_pri").attr("src","res/img/personnages/"+couleur+"/Gamma/idle.png");
        $("#img_lav").attr("src","res/img/personnages/"+couleur+"/Delta/idle.png");
    });
});
