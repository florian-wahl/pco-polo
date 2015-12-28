$(document).ready(function() {

    var liste_mini_jeux = $(".element_liste");

    /*GESTION DES MINI-JEUX*/
    liste_mini_jeux.each(function() {
        /*On teste quelles sont les jeux débloqués*/
        if(this.id =='mini_jeux_1' || this.id =='mini_jeux_3'){
            var actif = true;
        }
        if(!actif){
            $(this).attr('disabled','disabled').css({
                opacity: '0.3',
                color: 'grey'
            });

        }
    });

    /*GESTION DES BOUTONS JOUER*/
    $(".button_popup_jouer").click(function () {
        var xmlhttp = new XMLHttpRequest();
        var jetonToAdd = -1;

        xmlhttp.open("GET","ajaxDB.php?q=addToJeton&s="+jetonToAdd, true);
        xmlhttp.send();

        location.href = "menu_mini_jeux.php";
    });

});
