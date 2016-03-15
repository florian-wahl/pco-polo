function reprendre () {
    overlay.style.display='none';
    popup_arcade.style.display='none';
    popup_vide.style.display='none';
    loading_gif.style.display = 'none';
    popup.style.display='none';

    ajaxRequest(setJetons, "nbJeton", null);
    ajaxRequest(setScore, "score", null);
    game.physics.arcade.isPaused = false;

    if(last_quizz_id != null){
        checkQuizzValide();
    }

    if(!off_volume){
        musicQuizz.pause();
        musicFond.resume();
    }

    $('#img_op').remove();

}


/*
 Permet de mettre à jour le score dans la BDD.
 Ajoute le nombre donnée en paramètre.
 Si ce nombre est négatif, le score va être diminué
 */
function addToScore(scoreToAdd) {

    ajaxRequest(null, "addToScore", scoreToAdd);

    /*
     On test si le score cumulé permet de débloqué un nouveau jeton
     */
    score_cumule += scoreToAdd;
    while (score_cumule >= SCORE_POUR_NOUVEAU_JETON) {
        score_cumule -= SCORE_POUR_NOUVEAU_JETON;
        ajaxRequest(null, "addToJeton", 1);
    }


}

/*
 Permet de mettre à jour les jetons en INTERNE,
 n'applique pas de changement à la BDD.
 Sert surtout pour mettre à jour l'affichage
 */
function setJetons(jt) {
    nb_jetons = parseInt(jt);
}

/*
 Permet de mettre à jour le score en INTERNE,
 n'applique pas de changement à la BDD.
 Sert surtout pour mettre à jour l'affichage
 */
function setScore(sc) {
    score = parseInt(sc);
}

function updateBadges (liste) {
    console.log(listeBadges[10]);

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
    console.log(listeBadges[10]);

}

function updateMap(){

    //Blocage du niveau 2 séquence de test
    if (listeBadges[1] == 1 && blocage_niveau_2 != null) {
        blocage_niveau_2.destroy();
    }
    //Blocage du niveau 3 séquence de test
    if (listeBadges[2] == 1 && blocage_niveau_3_1 != null) {
        blocage_niveau_3_1.destroy();
        blocage_niveau_3_2.destroy();
        blocage_niveau_3_3.destroy();
    }
    //Blocage du niveau 4 séquence de test
    if (listeBadges[3] == 1 && blocage_niveau_4 != null) {
        blocage_niveau_4.destroy();
    }
    //Blocage du niveau 4 séquence de test
    if (listeBadges[4] == 1 && blocage_niveau_5 != null) {
        blocage_niveau_5.destroy();
    }
}

function checkUnlockBadges(){

    if(listeBadges[10] == 0 && score >= 1000){
        listeBadges[10] = 1;
        ajaxRequest(badgeAjoute, "addBadge", 10);
    }

    if(listeBadges[13] == 0 && nb_interaction_client >= 10){
        listeBadges[13] = 1;
        ajaxRequest(badgeAjoute, "addBadge", 13);
    }
}
/*
 Utilisé pour obtenir ou envoyer une info à la base de données

 callback = fonction qui traite l'information renvoyé par le serveur; null si pas de réponse attendue
 request = nom de la fonction ajax (coté php) à appeler
 valeur = valeur de l'information à passer, à mettre à jour; null si pas d'information à passer

 */
function ajaxRequest(callback, request, valeur) {
    var xhr = new XMLHttpRequest();

    if (callback != null) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                callback(xhr.responseText);
            }
        };
    }

    if (valeur != null) {
        xhr.open("GET", "ajaxDB.php?q=" + request + "&s=" + valeur, true);
    }
    else {
        xhr.open("GET", "ajaxDB.php?q=" + request, true);
    }
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(null);
}


function actionOnClickVolume() {
    off_volume = !off_volume;

    if (off_volume == false) {
        musicFond.resume();
        button_gestion_musique.setFrames(0);
    }
    else {
        musicFond.pause();
        button_gestion_musique.setFrames(1);
    }
}

function actionOnClickEffet() {
    off_effet = !off_effet;

    if (off_effet == false) {
        // musicFond.pause();
        button_gestion_effet.setFrames(0);
    }
    else {
        // musicFond.resume();
        button_gestion_effet.setFrames(1);
    }
}

function frameButonOnOff(test){
    if(test == false){
        return 0;
    }
    else {
        return 1;
    }
}

function badgeAjoute(numBadge){
    listeBadges[numBadge] = 1;

    if (numBadge != null){
        apparitionText("Nouveau badge : #" + parseInt(numBadge)  , 10, 30);
        ajaxRequest(updateBadges, "getBadges", null);
    }

}

function apparitionText(texte, posY, fontSize){

    var t = game.add.text(-texte.length*fontSize/2, posY,  texte);
    t.fixedToCamera = true;
    //t.setStyle({ backgroundColor: '#000000'});
    t.fontSize = fontSize;
    t.fontWeight = 'bold';
    t.stroke = '#000000';
    t.strokeThickness = 10;
    t.fill = '#FFFFFF';

    tween_t = game.add.tween(t.cameraOffset);

    tween_t.to({x:150}, 5000, Phaser.Easing.Exponential.Out);
    tween_t.onComplete.add(function(){
        e = game.add.tween(t.cameraOffset);

        e.to({ x: -texte.length*fontSize/2 }, 2000, "Linear", false, 2000);
        e.onComplete.add(function(){
            t.destroy();
        });
        e.start();
    }, this);
    tween_t.start();

}