/**
 * Created by Florian on 13/11/2015.
 */
var game = new Phaser.Game(1024, 690, Phaser.CANVAS, 'POLO', { preload: preload, create: create, update: update, render: render });

var GAME_WIDTH = 1024;
var GAME_HEIGHT = 690;
var ESPECE_NAMES = ['Tut','Lav', 'Pri', 'Tec', 'Qi'];
var ESPECE_COLORS = ['Beige','Blue','Green','Purple','Red','Yellow'];

function preload() {


    //link_res_perso est défini dans polo.php
    game.load.spritesheet('player', link_res_perso, 74, 96);
    game.load.image('background', 'res/img/floor.jpg');
    game.load.image('ship', 'res/img/thrust.png');
    game.load.image('wall', 'res/img/platform.png');
    game.load.image('transparent','res/img/transparent.png');

    //touch control
    game.load.image('compass', 'res/img/compass_rose.png');
    game.load.image('touch_segment', 'res/img/touch_segment.png');
    game.load.image('touch', 'res/img/touch.png');


    //Images boutons
    game.load.image('settings', 'res/img/settings.png');
    game.load.image('volume', 'res/img/volume.png');
    game.load.image('volume_mute', 'res/img/volume_mute.png');

    //Sounds
    game.load.audio('kikou', 'res/sons/Kikou.mp3');

    //Menu
    game.load.image('menu', 'res/img/cadre_menu_in_game.png', 900, 700);

    //Sprites personnages
    for (i = 0; i < ESPECE_COLORS.length; i++) {
        for (j = 0; j < ESPECE_NAMES.length; j++){
            switch(ESPECE_NAMES[j]){
                case 'Tut':
                    img = "Alpha";
                    break;
                case 'Lav':
                    img = "Delta";
                    break;
                case 'Pri':
                    img = "Gamma";
                    break;
                case 'Tec':
                    img = "Zeta";
                    break;
                case 'Qi':
                    img = "Beta";
                    break;
            }
            game.load.image(ESPECE_NAMES[j]+ESPECE_COLORS[i], 'res/img/personnages/'+ESPECE_COLORS[i]+'/'+img+'/idle.png');
        }
    }


}

var player;
var cursors;
var walls;
var ship;
var musicbg;
var newwindow;
var transparents;
var transparente;
var button_settings;
var button_volume;

var on_off_volume = true;
var settingsOnOff = true;

var nb_jetons = 0;
var score = 0;
var score_cumule = 0;
var SCORE_POUR_NOUVEAU_JETON = 200;
var badge1=0;

var listeBadges = [];
var clients = [];
var lastClient;

function create() {

    //inizialize les variables

    var closePopup=document.getElementById("popupclose");
    var overlay=document.getElementById("overlay");
    var popup=document.getElementById("popup");
    var loading_gif = document.getElementById("loading_gif");
    //fermer le popup
    closePopup.onclick=function(){
        overlay.style.display='none';
        popup.style.display='none';
    };

    musicbg = game.add.audio('kikou');
    //musicbg.play();
    game.add.tileSprite(0, 0, 1920, 1920, 'background');

    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Ajout des clients
    clients[0] = new Client('Tec','Red', game.world.centerX+500, game.world.centerY+400);
    clients[1] = new Client('Lav','Yellow', game.world.centerX-500, game.world.centerY+400);
    clients[2] = new Client('Qi','Beige', game.world.centerX-100, game.world.centerY-700);


    // Ajout du joueur
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0,1], 10, true);
    player.animations.add('down', [2,3], 10, true);
    player.animations.add('up', [5,6], 10, true);
    player.animations.add('right', [7,8], 10, true);

    game.touchControl = game.plugins.add(Phaser.Plugin.TouchControl);
    game.touchControl.inputEnable();

    game.camera.follow(player);

    //  The deadzone is a Rectangle that defines the limits at which the camera will start to scroll
    //  It does NOT keep the target sprite within the rectangle, all it does is control the boundary
    //  at which the camera will start to move. So when the sprite hits the edge, the camera scrolls
    //  (until it reaches an edge of the world)
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 450, 300);


    //Ajout des murs
    walls = game.add.group();
    walls.enableBody = true;

    var wall = walls.create(400, 400, 'wall');
    wall.body.immovable = true;
    wall = walls.create(500, 600, 'wall');
    wall.body.immovable = true;
    //code pour bloquer les zones de la carte
    transparents = game.add.group();
    transparents.enableBody = true;
    if(listeBadges[1] == false) {
        transparente = transparents.create(1200, 1200, 'transparent');
        transparente.body.immovable = true;
    }

    ship = game.add.sprite(800, 700, 'ship');
    game.physics.arcade.enable(ship);
    ship.body.collideWorldBounds = true;
    ship.body.drag = new Phaser.Point(150,150);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    setIHM();

    ajaxRequest(setJetons, "nbJeton", null);
    ajaxRequest(setScore, "scoreJour", null);
    ajaxRequest(updateBadges, "getBadges", null);

}

function update() {

    //TEST DE COLLISIONS
    game.physics.arcade.collide(player, walls);
    game.physics.arcade.collide(player, ship);
    game.physics.arcade.collide(ship, walls);
    game.physics.arcade.collide(player, transparents);
    game.physics.arcade.collide(player,transparents,blocco,null,this);
    for (i = 0; i < clients.length; i++){
        game.physics.arcade.collide(player, clients[i].getSprite(), interactionClient);
    }


    //DEPLACEMENTS

    var maxSpeed = 300;

    clients[0].move();

    movementControllerJoystick(maxSpeed);

    //movementControllerCursors(maxSpeed);
}

function interactionClient(player, client){

    if(lastClient == client){
        //On ne fait rien
    }
    else {
        lastClient = client;

        /*
        LA GESTION DES QUIZZ SE FAIT DANS LE js/gestionQuizz.js
        Pour démarrer un quizz, faire appel à demarrerQuizz(id_quizz)
         */
        demarrerQuizz(0);//le paramètre 0 demande la génération d'un quizz aléatoire
        game.physics.arcade.isPaused = true;

    }

}

function reprendre(){

    //update
    ajaxRequest(setJetons, "nbJeton", null);
    ajaxRequest(setScore, "scoreJour", null);


    game.physics.arcade.isPaused = false;
}


function render() {

    if(settingsOnOff){
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(player, 600, 600);
    }


}

function setIHM() {

    //Volume button
    button_volume = game.add.button(game.width-60, 20, 'volume', actionOnClickVolume, this, 2, 1 ,0);
    button_volume.fixedToCamera = true;

    button_settings = game.add.button(game.width-120, 20, 'settings', actionOnClickMenu, this, 2, 1, 0);
    button_settings.fixedToCamera = true;

}

function actionOnClickVolume() {
    on_off_volume =! on_off_volume;

    if(on_off_volume){
        musicbg.pause();
    }
    else{
        musicbg.resume();
    }
}

function actionOnClickMenu() {
    //On pause la physique du jeu.
    /*ATTENTION : mettre en pause tout le jeu (game.pause() ) bloque aussi
    les listeners, donc plus aucun bouton ne fonctionne...
     */
    game.physics.arcade.isPaused = true;
    /*AJOUT DU MENU ET DE SON IHM*/
    menu = game.add.sprite(game.camera.x + GAME_WIDTH/2 -900/2, game.camera.y + GAME_HEIGHT/2 -700/2, 'menu');


    var text_retour_menu_principal = 'RETOUR AU MENU PRINCIPAL';
    var text_reglages_sons = 'REGLAGES SONORES';
    var text_musique = 'Musique';
    var text_effets = 'Effets';
    var text_score = 'Score : ';
    var text_jetons = 'Jetons : ';

    t_reglages_sons = game.add.text(game.camera.x + GAME_WIDTH/2 - 150, game.camera.y + GAME_HEIGHT/2 -200, text_reglages_sons);
    t_musique = game.add.text(game.camera.x + GAME_WIDTH/2 - 150, game.camera.y + GAME_HEIGHT/2 -150, text_musique);
    t_effets = game.add.text(game.camera.x + GAME_WIDTH/2 - 150, game.camera.y + GAME_HEIGHT/2 -100, text_effets);
    retour_menu_principal = game.add.text(game.camera.x + GAME_WIDTH/2 - 200, game.camera.y + GAME_HEIGHT/2 + 20, text_retour_menu_principal );
    retour_menu_principal.inputEnabled = true;
    retour_menu_principal.events.onInputUp.add(function () {
        window.location.href = 'menu_principal.php';
    });


    t_score = game.add.text(game.camera.x + GAME_WIDTH/2 + 150, game.camera.y + GAME_HEIGHT/2 +100, text_score + score);

    t_jetons = game.add.text(game.camera.x + GAME_WIDTH/2 + 150, game.camera.y + GAME_HEIGHT/2 +150, text_jetons + nb_jetons);

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unPauseMenu, self);


}

/*
Fonction gérant le menu, en particulier à le détruire lorsque
l'on quitte le menu
 */
function unPauseMenu(event){
    // Only act if paused

    //TODO: Peut faire mieux avec un sprite de bouton quitté
        //Cordonnée de la croix du menu
        var x1 = GAME_WIDTH/2 + 900/2 - 120 ;
        var x2 = GAME_WIDTH/2 + 900/2;
        var y1 = GAME_HEIGHT/2 - 700/2;
        var y2 = GAME_HEIGHT/2 - 700/2 + 120 ;

        // Si l'utilisateur touche la croix
        if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
            // Remove the menu and the label
            menu.destroy();
            retour_menu_principal.destroy();
            t_reglages_sons.destroy();
            t_musique.destroy();
            t_effets.destroy();
            t_score.destroy();
            t_jetons.destroy();

            // Unpause the game
            reprendre();
        }
        else{

        }

}


/*
Permet de mettre à jour le score dans la BDD.
Ajoute le nombre donnée en paramètre.
Si ce nombre est négatif, le score va être diminué
 */
function addToScore(scoreToAdd){

    ajaxRequest(null, "addToScore", scoreToAdd);

    /*
    On test si le score cumulé permet de débloqué un nouveau jeton
     */
    score_cumule += scoreToAdd;
    while(score_cumule >= SCORE_POUR_NOUVEAU_JETON){
        score_cumule -= SCORE_POUR_NOUVEAU_JETON;
        ajaxRequest(null, "addToJeton", 1);
    }



}

/*
 Permet de mettre à jour les jetons en INTERNE,
 n'applique pas de changement à la BDD.
 Sert surtout pour mettre à jour l'affichage
 */
function setJetons(jt){
    nb_jetons = parseInt(jt);
}

/*
Permet de mettre à jour le score en INTERNE,
n'applique pas de changement à la BDD.
Sert surtout pour mettre à jour l'affichage
 */
function setScore(sc){
    score  = parseInt(sc);
}

function updateBadges(liste){

    var tabBadges = liste.split("/");
    var i = 0;
    while (i < 11){// 11 = nombre de badges au total
        listeBadges[i] = false;
        i++;
    }
    var j = 0;
    while (j < tabBadges.length-1){
        //tabBadges.length-1 car le dernier est null
        listeBadges[parseInt(tabBadges[j])] = true;
        j++;
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

    if(callback != null){
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                callback(xhr.responseText);
            }
        };
    }

    if(valeur != null){
        xhr.open("GET","ajaxDB.php?q="+request+"&s="+valeur, true);
    }
    else {
        xhr.open("GET","ajaxDB.php?q="+request, true);
    }
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(null);
}

