$(document).ready(function() {

    var liste_mini_jeux = $(".element_liste");
    var nb_jetons = 0;
    var actif;
    getJetons();
    ajaxRequest(gestionMiniJeux, "getBadges", null);


    /*GESTION DES BOUTONS JOUER*/
    $(".button_popup_jouer").click(function (event) {

        var xmlhttp1 = new XMLHttpRequest();

        xmlhttp1.open("GET","ajaxDB.php?q=addBadge&s=8", true);
        xmlhttp1.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xmlhttp1.send();

        if(nb_jetons > 0){
            var xmlhttp2 = new XMLHttpRequest();
            var jetonToAdd = -1;

            xmlhttp2.open("GET","ajaxDB.php?q=addToJeton&s="+jetonToAdd, true);
            xmlhttp2.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xmlhttp2.send();

            //Pour chaque bouton
            switch (event.target.id){
                case 'popup_button_jouer_1':
                    location.href = "mini-jeux/flappyBird.php";
                    break;
                case 'popup_button_jouer_2':
                    location.href = "mini-jeux/labyrinth/labyrinth.php";
                    break;
                case 'popup_button_jouer_3':
                    location.href = "mini-jeux/2048/index.html";
                    break;
                case 'popup_button_jouer_4':

                    location.href = "mini-jeux/breakouts/breakouts/melonjs/breakouts.php";
                    break;
                case 'popup_button_jouer_5':

                    location.href = "mini-jeux/greenMahjong/mahjong.php";
                    break;
                case 'popup_button_jouer_6':

                    location.href = "mini-jeux/bobble/bobble.php";
                    break;
                default:
                    location.href = "menu_mini_jeux.php";
                    break;
            }

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

    function gestionMiniJeux(liste){

        var tabBadges = liste.split("/");
        var i = 0;
        while (i < NOMBRE_BADGE_MAX) {// 11 = nombre de badges au total
            listeBadges[i] = 0;
            i++;
        }
        var j = 0;
        while (j < tabBadges.length - 1) {
            //tabBadges.length-1 car le dernier est null
            listeBadges[parseInt(tabBadges[j])] = 1;
            j++;
        }


        /*GESTION DES MINI-JEUX*/
        liste_mini_jeux.each(function() {
            /*On teste quelles sont les jeux débloqués*/

            if(this.id == 'mini_jeux_1' && listeBadges[1] == 1){
                actif = true;
            }
            else if(this.id == 'mini_jeux_2' && listeBadges[2] == 1){
                actif = true;
            }
            else if(this.id == 'mini_jeux_3' && listeBadges[3] == 1){
                actif = true;
            }
            else if(this.id == 'mini_jeux_4' && listeBadges[4] == 1){
                actif = true;
            }
            else if(this.id == 'mini_jeux_5' && listeBadges[5] == 1){
                actif = true;
            }
            else if(this.id == 'mini_jeux_6' && listeBadges[6] == 1){
                actif = true;
            }
            else {
                actif = false;
            }

            if(!actif){
                $(this).attr('disabled','disabled').css({
                    opacity: '0.3'
                });

            }
        });
    }
});


