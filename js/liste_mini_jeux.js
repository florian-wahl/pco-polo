$(document).ready(function() {

    var liste = $(".element_liste");

    /*GESTION DES MINI-JEUX*/
    liste.each(function() {
        /*On teste quelles sont les jeux débloqués*/
        if(this.id =='mini_jeux_1' || this.id =='mini_jeux_3'){
            var ok = true;
        }
        if(!ok){
            $(this).attr('disabled','disabled').css({
                opacity: '0.3',
                color: 'grey'
            });

        }
    });

});
