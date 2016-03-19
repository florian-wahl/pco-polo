/**
 * Created by Florian on 12/01/2016.
 */

    /*INITIALISATION */
var NOMBRE_QUIZZ_MAX;
var POURCENTAGE_REUSSITE_QUIZZ = 0.5;

var listeQuizzInfos;

var last_quizz_id;
var last_zone_id;
var last_xml;
//On défini les différents tableaux

var scenario;
var intituleQuestions = [];
var intituleReponses = new Array(5);
for( var j = 0; j < 5; j++){
    intituleReponses[j] = [];
}
var numTrueReponses = [];

var src_img_op;

var avancementActuel = 0;

/*
 * Permet d'envoyer des requetes ajax vers ajaxQuizz
 * async: false (permet d'attendre la réponse avant de continuer le chargement de la page)
 */
function ajaxQuizzRequest(callback, request, valeur) {
    var xhr = new XMLHttpRequest();

    if (callback != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                callback(xhr.responseText);
            }
        };
    }

    if (valeur != null) {
        xhr.open("GET", "ajaxQuizz.php?q=" + request + "&s=" + valeur, true);
    }
    else {
        xhr.open("GET", "ajaxQuizz.php?q=" + request, true);
    }
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(null);

}

function genererjQuizzy(){
    //TODO : peut faire mieux
    var nbQuestion = intituleQuestions.length;
    var listeQuizz;
    switch (nbQuestion){
        case 1:
            listeQuizz = {'questions':[
                {'question': intituleQuestions[0],
                    'answers':intituleReponses[0],
                    'correctAnswer': numTrueReponses[0]
                }]};
            break;
        case 2:
            listeQuizz = {'questions':[
                {'question': intituleQuestions[0],
                    'answers':intituleReponses[0],
                    'correctAnswer': numTrueReponses[0]
                },
                {'question': intituleQuestions[1],
                    'answers':intituleReponses[1],
                    'correctAnswer': numTrueReponses[1]
                }]};
            break;
        case 3:
            listeQuizz = {'questions':[
                {'question': intituleQuestions[0],
                    'answers':intituleReponses[0],
                    'correctAnswer': numTrueReponses[0]
                },
                {'question': intituleQuestions[1],
                    'answers':intituleReponses[1],
                    'correctAnswer': numTrueReponses[1]
                },
                {'question': intituleQuestions[2],
                    'answers':intituleReponses[2],
                    'correctAnswer': numTrueReponses[2]
                }
            ]};
            break;
        case 4:
            listeQuizz = {'questions':[
                {'question': intituleQuestions[0],
                    'answers':intituleReponses[0],
                    'correctAnswer': numTrueReponses[0]
                },
                {'question': intituleQuestions[1],
                    'answers':intituleReponses[1],
                    'correctAnswer': numTrueReponses[1]
                },
                {'question': intituleQuestions[2],
                    'answers':intituleReponses[2],
                    'correctAnswer': numTrueReponses[2]
                },
                {'question': intituleQuestions[3],
                    'answers':intituleReponses[3],
                    'correctAnswer': numTrueReponses[3]
                }
            ]};
            break;
        case 5:
            listeQuizz = {'questions':[
                {'question': intituleQuestions[0],
                    'answers':intituleReponses[0],
                    'correctAnswer': numTrueReponses[0]
                },
                {'question': intituleQuestions[1],
                    'answers':intituleReponses[1],
                    'correctAnswer': numTrueReponses[1]
                },
                {'question': intituleQuestions[2],
                    'answers':intituleReponses[2],
                    'correctAnswer': numTrueReponses[2]
                },
                {'question': intituleQuestions[3],
                    'answers':intituleReponses[3],
                    'correctAnswer': numTrueReponses[3]
                },
                {'question': intituleQuestions[4],
                    'answers':intituleReponses[4],
                    'correctAnswer': numTrueReponses[4]
                }
            ]};
            break;
        default:
            listeQuizz = {'questions':[
                {'question': intituleQuestions[0],
                    'answers':intituleReponses[0],
                    'correctAnswer': numTrueReponses[0]
                }]};
            break;
    }

    //On démarre le quizz
    $(function() {
        $('#quiz-container').jquizzy({
            questions: listeQuizz.questions,
            scenario: scenario
        });
    });



    //On affiche le quizz
    popup.style.display='block';
    loading_gif.style.display = 'none';

}

/*
 * Permet d'initialiser le quizz dont l'id est id_quizz
 */
function initQuizz(){

    //On remet à null les anciennes données
    scenario = null;
    intituleQuestions = [];
    intituleReponses = new Array(5);
    for( var j = 0; j < 5; j++){
        intituleReponses[j] = [];
    }
    numTrueReponses = [];

}

function demarrerQuizzByID(id_quizz){

    last_quizz_id = id_quizz;
    initQuizz();

    $.when(
        xmlRequestByID(id_quizz)
    ).done();

    //Filtre blanc
    overlay.style.display='block';
    loading_gif.style.display = 'block';

}

function demarrerQuizzByZone(id_zone){

    //On veut le quizz 1
    initQuizz();

    last_zone_id = id_zone;

    $.when(
        xmlRequestByZone(id_zone)
    ).done();

    //Filtre blanc
    overlay.style.display='block';
    loading_gif.style.display = 'block';

}

function xmlRequestByID(id_quizz){
    $.ajax({
        type: "GET",
        url: "data/quizz.xml",
        dataType: "xml",
        success: function(xml) {
            xmlCallbackByID(xml, id_quizz);
        }
    }); //close $.ajax(
}

function xmlCallbackByID(xml, id_quizz){
    $(xml).find('quizz').each(function(){
        var attr_id_quizz = $(this).attr('id');

        if(attr_id_quizz == id_quizz){
            if (attr_id_quizz == 0){
                //Quizz d'introduction !
                $('#img_op').remove();
                $('.popup_holder').append("<img id='img_op' src='res/img/quizz/intro.png' />");
            }
            scenario = $(this).find('scenario').text();

            var i = 0;

            $(this).find('question').each(function(){
                intituleQuestions[i] = $(this).find('intitule').text();

                $(this).find('reponses').each(function(){
                    var j = 0;
                    $(this).find('reponse').each(function(){
                        intituleReponses[i][j] = $(this).text();
                        var isTrue = $(this).attr('isTrue');
                        if(isTrue == '1'){
                            numTrueReponses[i] = j+1;
                        }
                        j++;
                    });

                });

                i++;
            });

            genererjQuizzy();
        }

    });
}

function xmlRequestByZone(id_zone){

    $.ajax({
        type: "GET",
        url: "data/quizz.xml",
        dataType: "xml",
        success: function(xml) {
            xmlCallbackByZone(xml, id_zone);
        }
    });
}

function xmlCallbackByZone(xml, id_zone){
//On réinitialise la liste des quizz correspondant à la zone choisie
    var listeQuizzZoneChoisie = [];



    //On récupère tous les quizz correspondant à la zone
    $(xml).find('quizz').each(function() {
        var attr_id_quizz = $(this).attr('id');
        var attr_id_zone = $(this).find('zone').text();
        var attr_id_op = $(this).find('op').text();
        var attr_id_difficulte = $(this).find('difficulte').text();

        if (attr_id_zone == id_zone) {
            //[id, op, dif, occ]
            listeQuizzZoneChoisie.push([attr_id_quizz, attr_id_op, attr_id_difficulte, listeQuizzInfos[attr_id_quizz][2]]);

        }

    });

    //On elimine tous les quizz déjà validé
    var listeQuizzZoneNonValide = [];
    for(var i = 0; i < listeQuizzZoneChoisie.length; i++){
        var id = listeQuizzZoneChoisie[i][0];
        if(listeQuizzInfos[id][1] == 0){
            listeQuizzZoneNonValide.push(listeQuizzZoneChoisie[i]);
        }
    }


    //On détermine quel quizz sélectionner
    // --> Occurence la plus faible
    var min_occ = listeQuizzZoneNonValide[0][3];
    for(i = 0; i < listeQuizzZoneNonValide.length; i++){
        if(listeQuizzZoneNonValide[0][3] < min_occ){
            min_occ = listeQuizzZoneNonValide[0][3];
        }
    }
    var listeQuizzZoneNonValideOccMin = [];
    for(i = 0; i < listeQuizzZoneNonValide.length; i++){
        if(listeQuizzZoneNonValide[0][3] == min_occ){
            listeQuizzZoneNonValideOccMin.push(listeQuizzZoneNonValide[i]);
        }
    }

    //--> niveau le plus faible
    var min_dif = listeQuizzZoneNonValideOccMin[0][2];
    for(i = 0; i < listeQuizzZoneNonValideOccMin.length; i++){
        if(listeQuizzZoneNonValideOccMin[0][2] < min_dif){
            min_dif = listeQuizzZoneNonValideOccMin[0][2];
        }
    }
    var listeQuizzZoneNonValideNivFaible = [];
    for(i = 0; i < listeQuizzZoneNonValideOccMin.length; i++){
        if(listeQuizzZoneNonValideOccMin[0][2] == min_dif){
            listeQuizzZoneNonValideNivFaible.push(listeQuizzZoneNonValideOccMin[i]);
        }
    }

    var num_quizz_alea = Math.floor(Math.random() * listeQuizzZoneNonValideNivFaible.length);
    var id_quizz_select = listeQuizzZoneNonValideNivFaible[num_quizz_alea][0];



    $(xml).find('quizz').each(function() {
        var attr_id_quizz = $(this).attr('id');
        var attr_id_op = $(this).find('op').text();
        src_img_op = 'res/img/quizz/op'+ attr_id_op +'.png';
        if(attr_id_quizz == id_quizz_select){

            last_quizz_id = id_quizz_select;

            scenario = $(this).find('scenario').text();

            var i = 0;

            $(this).find('question').each(function(){
                intituleQuestions[i] = $(this).find('intitule').text();

                $(this).find('reponses').each(function(){
                    var j = 0;
                    $(this).find('reponse').each(function(){
                        intituleReponses[i][j] = $(this).text();
                        var isTrue = $(this).attr('isTrue');
                        if(isTrue == '1'){
                            numTrueReponses[i] = j+1;
                        }
                        j++;
                    });

                });

                i++;
            });

            genererjQuizzy();
        }

    });

    //Reset : faire de la place en mémoire
    listeQuizzZoneChoisie = null;
    listeQuizzZoneNonValide = null;
    listeQuizzZoneNonValideOccMin = null;
    listeQuizzZoneNonValideNivFaible = null;
}

function updateStatsQuizz(nbReponseJuste, nbTotReponse){

    //On met à jour la liste local
    listeQuizzInfos[last_quizz_id][2]++;


    //On met à jour la bdd
    var xhr = new XMLHttpRequest();

    if (nbReponseJuste == nbTotReponse){
        //Le quizz est validé
        listeQuizzInfos[last_quizz_id][1] = 1;
        xhr.open("GET", "ajaxQuizz.php?q=quizzValide&id_quizz=" + last_quizz_id + "&id_zone="+ last_zone_id, true);
    }
    else {
        //le quizz n'est pas validé
        xhr.open("GET", "ajaxQuizz.php?q=quizzNonValide&id_quizz=" + last_quizz_id + "&id_zone="+ last_zone_id, true);
    }

    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(null);
}

function getListeQuizz (liste) {
    var tabQuizzBrut = liste.split("/");

    //Initialisation
    for(var i = 0; i < listeQuizzInfos.length; i++){
        //[id, valide, occurence]
        listeQuizzInfos[i] = [i, 0, 0];
    }
    //Remplissage
    for(i = 0; i < tabQuizzBrut.length - 1; i++){// -1 car il y a un / en plus dans le tabQuizzBrut
        var ligneQuizz = tabQuizzBrut[i].split("+");
        listeQuizzInfos[parseInt(ligneQuizz[0])] = [parseInt(ligneQuizz[0]), parseInt(ligneQuizz[1]), parseInt(ligneQuizz[2])];//On parseInt pour enlever les caractères spéciaux
    }



}

function quizzResetCallback (){
    ajaxQuizzRequest(getListeQuizz, "getListeQuizz", null)
}

function checkQuizzValide(){

    $.ajax({
        type: "GET",
        url: "data/quizz.xml",
        dataType: "xml",
        success: function(xml) {
            var listeQuizzZoneChoisie = [];

            //On récupère tous les quizz correspondant à la zone
            $(xml).find('quizz').each(function() {
                var attr_id_quizz = $(this).attr('id');
                var attr_id_zone = $(this).find('zone').text();
                var attr_id_op = $(this).find('op').text();
                var attr_id_difficulte = $(this).find('difficulte').text();

                if(last_zone_id == 3 || last_zone_id == 4){
                    if (attr_id_zone == 3 || attr_id_zone == 4) {
                        //[id, op, dif, occ]
                        listeQuizzZoneChoisie.push([attr_id_quizz, attr_id_op, attr_id_difficulte, listeQuizzInfos[attr_id_quizz][2]]);
                    }
                }
                else if(last_zone_id == 5 ||last_zone_id == 7){
                    if (attr_id_zone == 5 || attr_id_zone == 7) {
                        //[id, op, dif, occ]
                        listeQuizzZoneChoisie.push([attr_id_quizz, attr_id_op, attr_id_difficulte, listeQuizzInfos[attr_id_quizz][2]]);
                    }
                }
                else {
                    if (attr_id_zone == last_zone_id) {
                        //[id, op, dif, occ]
                        listeQuizzZoneChoisie.push([attr_id_quizz, attr_id_op, attr_id_difficulte, listeQuizzInfos[attr_id_quizz][2]]);
                    }
                }


            });

            //On elimine tous les quizz déjà validé
            var listeQuizzZoneNonValide = [];
            for(var i = 0; i < listeQuizzZoneChoisie.length; i++){
                var id = listeQuizzZoneChoisie[i][0];
                if(listeQuizzInfos[id][1] == 0){
                    listeQuizzZoneNonValide.push(listeQuizzZoneChoisie[i]);
                }
            }

            //S'il n'y a plus de quizz dispo
            //S'il y a moins que 90% de quizz non validé --> Niveau terminé
            if(listeQuizzZoneNonValide.length <= POURCENTAGE_REUSSITE_QUIZZ*listeQuizzZoneChoisie.length){

                var niveau;

                if(last_zone_id == 3 || last_zone_id == 4){
                    niveau = 3;
                }
                else if(last_zone_id == 5 ||last_zone_id == 7){
                    niveau = 4;
                }
                else if (last_zone_id == 6){
                    niveau = 5;
                }
                else {
                    niveau = last_zone_id;
                }

                if(listeBadges[niveau] == 0){
                    //On ajoute le badge qui correspond au niveau / zone
                    ajaxRequest(badgeAjoute, 'addBadge', niveau);

                    //On affiche un message comme quoi le niveau actuel est terminé
                    apparitionText("Vous avez fini le niveau " + niveau + " ! Félicitation.", 50, 20);
                }

                //On reset les quizz
                if(last_zone_id == 3 || last_zone_id == 4){
                    ajaxQuizzRequest(quizzResetCallback, 'resetQuizz', 3);
                    ajaxQuizzRequest(quizzResetCallback, 'resetQuizz', 4);
                }
                else if(last_zone_id == 5 ||last_zone_id == 7){
                    ajaxQuizzRequest(quizzResetCallback, 'resetQuizz', 5);
                    ajaxQuizzRequest(quizzResetCallback, 'resetQuizz', 7);
                }
                else {
                    ajaxQuizzRequest(quizzResetCallback, 'resetQuizz', last_zone_id);
                }

            }
        }
    });
}

function initNombreQuizz(){
    $.ajax({
        type: "GET",
        url: "data/quizz.xml",
        dataType: "xml",
        success: function(xml) {

            var nb_quizz = 0;
            $(xml).find('quizz').each(function() {
                nb_quizz++;
            });

            console.log('Nombre de quizz : ' + nb_quizz);
            NOMBRE_QUIZZ_MAX = nb_quizz;
            listeQuizzInfos = new Array(NOMBRE_QUIZZ_MAX);
        }
    });
}

function avancementNiveauActuel(){

    $.ajax({
        type: "GET",
        url: "data/quizz.xml",
        dataType: "xml",
        success: function(xml) {
            var listeQuizzZoneChoisie = [];

            //On récupère tous les quizz correspondant à la zone
            $(xml).find('quizz').each(function() {
                var attr_id_quizz = $(this).attr('id');
                var attr_id_zone = $(this).find('zone').text();
                var attr_id_op = $(this).find('op').text();
                var attr_id_difficulte = $(this).find('difficulte').text();

                niveauActuel();

                if(niveau_actuel == 3){
                    if (attr_id_zone == 3 || attr_id_zone == 4) {
                        //[id, op, dif, occ]
                        listeQuizzZoneChoisie.push([attr_id_quizz, attr_id_op, attr_id_difficulte, listeQuizzInfos[attr_id_quizz][2]]);
                    }
                }
                else if(niveau_actuel == 4){
                    if (attr_id_zone == 5 || attr_id_zone == 7) {
                        //[id, op, dif, occ]
                        listeQuizzZoneChoisie.push([attr_id_quizz, attr_id_op, attr_id_difficulte, listeQuizzInfos[attr_id_quizz][2]]);
                    }
                }
                else {
                    if (attr_id_zone == niveau_actuel) {
                        //[id, op, dif, occ]
                        listeQuizzZoneChoisie.push([attr_id_quizz, attr_id_op, attr_id_difficulte, listeQuizzInfos[attr_id_quizz][2]]);
                    }
                }


            });

            //On elimine tous les quizz déjà validé
            var listeQuizzZoneNonValide = [];
            for(var i = 0; i < listeQuizzZoneChoisie.length; i++){
                var id = listeQuizzZoneChoisie[i][0];
                if(listeQuizzInfos[id][1] == 0){
                    listeQuizzZoneNonValide.push(listeQuizzZoneChoisie[i]);
                }
            }

            avancementActuel = parseInt((listeQuizzZoneNonValide.length / listeQuizzZoneChoisie.length) * 100);

        }
    });
}
