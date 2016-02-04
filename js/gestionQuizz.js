/**
 * Created by Florian on 12/01/2016.
 */

    /*INITIALISATION */
var NOMBRE_QUIZZ_MAX = 2;

var last_quizz_id;
//On défini les différents tableaux

var scenario;
var intituleQuestions = [];
var intituleReponses = new Array(5);
for( var j = 0; j < 5; j++){
    intituleReponses[j] = [];
}
var numTrueReponses = [];

/*
 * Permet d'envoyer des requetes ajax vers ajaxQuizz
 * async: false (permet d'attendre la réponse avant de continuer le chargement de la page)
 */
function ajaxQuizzRequest(callback, request, valeur) {
    $.ajax({
        type:"GET",
        url: "ajaxQuizz.php",
        async: true,
        data: "q="+request+"&s="+valeur,
        dataType: "json",
        success: callback
    });

}

function callbackScenario(data){
    scenario = data.toString();
}

/*
 * On récupère un json avec : id_question, descriptionQuestion, descriptionReponse, isTrue
 * On transfert ces données dans les tableaux javascript
 */
function callbackQuestionsReponses(data){
    var lastID = 0;
    var numReponse = 0;

    for (var i = 0; i < data.length; i++){
        if(data[i].id_question != lastID){
            numReponse = 0;
            lastID = data[i].id_question;
            intituleQuestions[data[i].id_question-1] = data[i].descriptionQuestion;
            intituleReponses[data[i].id_question-1][numReponse] = data[i].descriptionReponse;
        }
        else {
            numReponse++;
            intituleReponses[data[i].id_question-1][numReponse] = data[i].descriptionReponse;
        }
        if(data[i].isTrue == '1'){
            numTrueReponses[data[i].id_question-1] = numReponse;
        }

    }

    genererjQuizzy();

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
function initQuizz(id_quizz){
    last_quizz_id = id_quizz;

    //On remet à null les anciennes données
    scenario = null;
    intituleQuestions = [];
    intituleReponses = new Array(5);
    for( var j = 0; j < 5; j++){
        intituleReponses[j] = [];
    }
    numTrueReponses = [];

    $.when(
        //ajaxQuizzRequest(callbackScenario, 'getScenario', id_quizz),
        //ajaxQuizzRequest(callbackQuestionsReponses, 'getQuestionsReponses', id_quizz)
        xmlRequest(id_quizz)
    ).done();
}

function demarrerQuizz(id_quizz){

    if(id_quizz == 0){
        //On génère un numéro de quizz aléatoire
        id_quizz = Math.ceil(Math.random()*NOMBRE_QUIZZ_MAX);
    }

    //On veut le quizz 1
    initQuizz(id_quizz);

    //Filtre blanc
    overlay.style.display='block';
    loading_gif.style.display = 'block';

}

function xmlRequest(id_quizz){
    $.ajax({
        type: "GET",
        url: "data/quizz.xml",
        dataType: "xml",
        success: function(xml) {
            xmlCallback(xml, id_quizz);
        }
    }); //close $.ajax(
}

function xmlCallback(xml, id_quizz){
    $(xml).find('quizz').each(function(){
        var attr_id_quizz = $(this).attr('id');

        if(attr_id_quizz == id_quizz){

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

function updateStatsQuizz(nbReponseJuste, nbTotReponse){

    var xhr = new XMLHttpRequest();

    if (nbReponseJuste == nbTotReponse){
        //Le quizz est validé
        xhr.open("GET", "ajaxQuizz.php?q=quizzValide&id_quizz=" + last_quizz_id , true);
    }
    else {
        //le quizz n'est pas validé
        xhr.open("GET", "ajaxQuizz.php?q=quizzNonValide&id_quizz=" + last_quizz_id , true);
    }

    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(null);
}

