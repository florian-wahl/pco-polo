$(document).ready(function() {

    var liste_mini_jeux = $(".element_liste");
    var nb_jetons = 0;
    getJetons();

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

        var xmlhttp1 = new XMLHttpRequest();

        xmlhttp1.open("GET","ajaxDB.php?q=addBadge&s=3", true);
        xmlhttp1.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xmlhttp1.send();

        if(nb_jetons > 0){
            var xmlhttp2 = new XMLHttpRequest();
            var jetonToAdd = -1;

            xmlhttp2.open("GET","ajaxDB.php?q=addToJeton&s="+jetonToAdd, true);
            xmlhttp2.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xmlhttp2.send();

            location.href = "menu_mini_jeux.php";
        }
        else{
            $(".errJetons").show();
        }

    });

    function getJetons(){
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                //La réponse
                var nbjt = xmlhttp.responseText;
                setJetons(parseInt(nbjt));
            }
        };
        xmlhttp.open("GET","ajaxDB.php?q=nbJeton", true);
        xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xmlhttp.send();

    }

    function setJetons(jt){;
        nb_jetons = jt;
    }
});
