
function reprendre () {
    overlay.style.display='none';
    popup_arcade.style.display='none';
    loading_gif.style.display = 'none';
    popup.style.display='none';

    ajaxRequest(setJetons, "nbJeton", null);
    ajaxRequest(setScore, "scoreJour", null);
    game.physics.arcade.isPaused = false;

    checkQuizzValide();

}


/*
 Permet de mettre � jour le score dans la BDD.
 Ajoute le nombre donn�e en param�tre.
 Si ce nombre est n�gatif, le score va �tre diminu�
 */
function addToScore(scoreToAdd) {

    ajaxRequest(null, "addToScore", scoreToAdd);

    /*
     On test si le score cumul� permet de d�bloqu� un nouveau jeton
     */
    score_cumule += scoreToAdd;
    while (score_cumule >= SCORE_POUR_NOUVEAU_JETON) {
        score_cumule -= SCORE_POUR_NOUVEAU_JETON;
        ajaxRequest(null, "addToJeton", 1);
    }


}

/*
 Permet de mettre � jour les jetons en INTERNE,
 n'applique pas de changement � la BDD.
 Sert surtout pour mettre � jour l'affichage
 */
function setJetons(jt) {
    nb_jetons = parseInt(jt);
}

/*
 Permet de mettre � jour le score en INTERNE,
 n'applique pas de changement � la BDD.
 Sert surtout pour mettre � jour l'affichage
 */
function setScore(sc) {
    score = parseInt(sc);
}

function updateBadges (liste) {

    var tabBadges = liste.split("/");
    var i = 0;
    while (i < NOMBRE_BADGE_MAX) {// 11 = nombre de badges au total
        listeBadges[i] = false;
        i++;
    }
    var j = 0;
    while (j < tabBadges.length - 1) {
        //tabBadges.length-1 car le dernier est null
        listeBadges[parseInt(tabBadges[j])] = true;
        j++;
    }

}

function updateMap(){

    //Blocage du niveau 1 s�quence de test
    if (listeBadges[1] == 1) {
    }
}
/*
 Utilis� pour obtenir ou envoyer une info � la base de donn�es

 callback = fonction qui traite l'information renvoy� par le serveur; null si pas de r�ponse attendue
 request = nom de la fonction ajax (cot� php) � appeler
 valeur = valeur de l'information � passer, � mettre � jour; null si pas d'information � passer

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
        musicbg.resume();
        button_gestion_musique.setFrames(0);
    }
    else {
        musicbg.pause();
        button_gestion_musique.setFrames(1);
    }
}

function actionOnClickEffet() {
    off_effet = !off_effet;

    if (off_effet == false) {
        // musicbg.pause();
        button_gestion_effet.setFrames(0);
    }
    else {
        // musicbg.resume();
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

function testDebloquageBadge(){
    /*DEBLOQUAGE DU BADGE 1 */
    if(score >= 400 && listeBadges[1] == 0){
        listeBadges[1] = 1;
        ajaxRequest(badgeAjoute, 'addBadge', 1);
    }
}

function badgeAjoute(numBadge){
    listeBadges[numBadge] = 1;

    apparitionText("Nouveau badge : N " + parseInt(numBadge)  , 10);
    ajaxRequest(updateBadges, "getBadges", null);
}

function apparitionText(texte, y){

    var t = game.add.text(-texte.length*15, y,  texte);
    t.fixedToCamera = true;
    //t.setStyle({ backgroundColor: '#000000'});
    t.fontSize = 30;
    t.fontWeight = 'bold';
    t.stroke = '#000000';
    t.strokeThickness = 10;
    t.fill = '#FFFFFF';

    tween_t = game.add.tween(t.cameraOffset);

    tween_t.to({x:150}, 5000, Phaser.Easing.Exponential.Out);
    tween_t.onComplete.add(function(){
        e = game.add.tween(t.cameraOffset);

        e.to({ x: -texte.length*15 }, 2000, "Linear", false, 2000);
        e.onComplete.add(function(){
            t.destroy();
        });
        e.start();
    }, this);
    tween_t.start();

}