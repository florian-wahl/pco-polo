$(document).ready(function() {

    var num_espece = 1;
    var nb_espece = $(".espece_perso").size();

    update_post_it();


   $("#fleche_droite").click(function(){
        num_espece ++;

       if(num_espece  > nb_espece){
           num_espece  = 1;
       }

       update_post_it();
   });

    $("#fleche_gauche").click(function(){
        num_espece --;

        if(num_espece  < 1){
            num_espece  = nb_espece;
        }

        update_post_it();
    });

    function update_post_it(){

        var nom_espece_perso = "#perso-"+num_espece ;

        $(".espece_perso").hide();

        $(nom_espece_perso).show();

    }
});
