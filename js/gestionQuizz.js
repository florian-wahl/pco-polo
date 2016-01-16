/**
 * Created by Florian on 12/01/2016.
 */
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
        async: false,
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

}

/*
 * Permet d'initialiser le quizz dont l'id est id_quizz
 */
function initQuizz(id_quizz){
    $.when(
        ajaxQuizzRequest(callbackScenario, 'getScenario', id_quizz),
        ajaxQuizzRequest(callbackQuestionsReponses, 'getQuestionsReponses', id_quizz)
    ).done();
}

function demarrerQuizz(id_quizz){
    //On veut le quizz 1
    initQuizz(id_quizz);

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
            questions: listeQuizz.questions
        });
    });

    overlay.style.display='block';
    popup.style.display='block';
}

