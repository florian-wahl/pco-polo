$(document).ready(function() {

    var num_post_it = 1;
    var nb_post_it = $(".post_it_aide").size();

    update_post_it();


   $("#fleche_droite").click(function(){
        num_post_it++;

       if(num_post_it > nb_post_it){
           num_post_it = 1;
       }

       update_post_it();
   });

    $("#fleche_gauche").click(function(){
        num_post_it--;

        if(num_post_it < 1){
            num_post_it = nb_post_it;
        }

        update_post_it();
    });

    function update_post_it(){

        var nom_post_it = "#aide-"+num_post_it;

        $(".post_it_aide").hide();

        $(nom_post_it).show();

    }
});