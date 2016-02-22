/**
 * Created by Florian on 13/11/2015.
 */
var game = new Phaser.Game(1024, 705, Phaser.CANVAS, 'POLO');

/*
DECLARATION DES CONSTANTES
 */
var GAME_WIDTH = 1024;
var GAME_HEIGHT = 700;
var clan_NAMES = ['Tut','Lav', 'Pri', 'Tec', 'Qi'];
var clan_COLORS = ['Beige','Blue','Green','Purple','Red','Yellow'];

var MAX_SPEED_PLAYER = 300;

var SCORE_POUR_NOUVEAU_JETON = 200;

var NOMBRE_BADGE_MAX = 11;

/*
DECLARATION DES VARIABLES
 */
var player;
var cursors;
var walls;
var murs;
var mur;
var ship;
var musicbg;
var newwindow;
var transparents;
var transparent;
var button_settings;
var button_volume;

var on_off_volume = true;

var ajoutBadge4 = false;

var nb_jetons = 0;
var score = 0;
var score_cumule = 0;
var badge1 = 0;

var listeBadges = [];
var clients = [];
var lastClient;

bootState = {
    preload: function () {
        game.load.spritesheet("loading", "res/img/mini-jeux/loading.png");
        game.load.spritesheet("loading2", "res/img/barra.png");
    },
    create: function () {
        this.game.state.start("preload");
    }
};

preloadState = {
    preload: function () {
        this.loadingBar = this.add.sprite(160, 240, "loading");
        this.loadingBar.anchor.setTo(0.5, 0.5);
        //this.load.setPreloadSprite(this.loadingBar);
        //link_res_perso est défini dans polo.php
        game.load.image('playButton', 'res/img/boutons/bouton_jouer.png');
        game.load.image('ren', 'res/img/ren.png');
        game.load.spritesheet('player', link_res_perso, 74, 96);
        game.load.image('background', 'res/img/ingame/carte.jpg', 2890, 2206);
        game.load.image('ship', 'res/img/thrust.png');
        game.load.image('wall', 'res/img/platform.png');
        game.load.image('transparent', 'res/img/transparent.png');
        game.load.image('mur', 'res/img/wallie.png');

        //touch control
        game.load.image('compass', 'res/img/compass_rose.png');
        game.load.image('touch_segment', 'res/img/touch_segment.png');
        game.load.image('touch', 'res/img/touch.png');


        //Images boutons
        game.load.image('settings', 'res/img/settings.png');

        //Sounds
        //game.load.audio('fond_sonore', 'res/sons/fond_sonore.mp3');

        //Menu
        game.load.image('menu', 'res/img/ingame/menu.png', 804, 599);
        game.load.image('retour_menu_principal', 'res/img/ingame/retour_menu_principal.png', 430, 60);
        game.load.image('croix_blanche', 'res/img/ingame/croix_blanche.png', 70, 70);
        game.load.image('musique_menu', 'res/img/ingame/musique_menu.png', 200, 55);
        game.load.image('reglages_sons_menu', 'res/img/ingame/reglages_sons_menu.png', 405, 60);
        game.load.image('score_menu', 'res/img/ingame/score_menu.png', 152, 37);
        game.load.image('jetons_menu', 'res/img/ingame/jetons_menu.png', 177, 35);

        //Sprites personnages
        for (i = 0; i < clan_COLORS.length; i++) {
            for (j = 0; j < clan_NAMES.length; j++) {
                switch (clan_NAMES[j]) {
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
                game.load.image(clan_NAMES[j] + clan_COLORS[i], 'res/img/personnages/' + clan_COLORS[i] + '/' + img + '/idle.png');
            }
        }
    },
    create: function () {
        var start = this.game.add.button(GAME_WIDTH / 2 - 160, GAME_HEIGHT / 2 + 200, "playButton", this.playTheGame, this);
        ren = game.add.sprite(700, 300, 'ren');
    },
    playTheGame: function () {
        this.game.state.start("main");
    }

};

mainState = {

    create: function () {

        //inizialize les variables

        var closePopup = document.getElementById("popupclose");
        var overlay = document.getElementById("overlay");
        var popup = document.getElementById("popup");
        var loading_gif = document.getElementById("loading_gif");
        //fermer le popup
        closePopup.onclick = function () {
            overlay.style.display = 'none';
            popup.style.display = 'none';
        };

        //musicbg = game.add.audio('fond_sonore');
        //musicbg.play();
        game.add.tileSprite(0, 0, 2890, 2206, 'background');

        game.world.setBounds(0, 0, 2890, 2206);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Ajout des clients
        clients[0] = new Client('Tec', 'Red', game.world.centerX + 500, game.world.centerY + 400);
        clients[1] = new Client('Lav', 'Yellow', game.world.centerX - 500, game.world.centerY + 400);
        clients[2] = new Client('Qi', 'Beige', 150, 500);


        // Ajout du joueur
        player = game.add.sprite(1100, 1900, 'player');
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;

        player.animations.add('left', [0, 1], 10, true);
        player.animations.add('down', [2, 3], 10, true);
        player.animations.add('up', [5, 6], 10, true);
        player.animations.add('right', [7, 8], 10, true);

        game.touchControl = game.plugins.add(Phaser.Plugin.TouchControl);
        game.touchControl.inputEnable();

        game.camera.follow(player);

        //  The deadzone is a Rectangle that defines the limits at which the camera will start to scroll
        //  It does NOT keep the target sprite within the rectangle, all it does is control the boundary
        //  at which the camera will start to move. So when the sprite hits the edge, the camera scrolls
        //  (until it reaches an edge of the world)
        game.camera.deadzone = new Phaser.Rectangle(150, 150, 450, 300);


        //mur proto
        transparents = game.add.group();
        transparents.enableBody = true;
        murs = game.add.group();
        murs.enableBody = true;
        creermur();


        /*
        //Ajout des murs
        walls = game.add.group();
        walls.enableBody = true;

        var wall = walls.create(400, 400, 'wall');
        wall.body.immovable = true;
        wall = walls.create(500, 600, 'wall');
        wall.body.immovable = true;
         */
        //code pour bloquer les zones de la carte

        /*if (listeBadges[1] == false) {
         transparente = transparents.create(600, 360, 'transparent');
            transparente.body.immovable = true;
         transparente = transparents.create(600, 320, 'transparent');
         transparente.body.immovable = true;
         transparente = transparents.create(600, 280, 'transparent');
         transparente.body.immovable = true;
         }*/

        ship = game.add.sprite(800, 700, 'ship');
        game.physics.arcade.enable(ship);
        ship.body.collideWorldBounds = true;
        ship.body.drag = new Phaser.Point(150, 150);

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();

        this.setIHM();

        ajaxRequest(setJetons, "nbJeton", null);
        ajaxRequest(setScore, "scoreJour", null);
        ajaxRequest(updateBadges, "getBadges", null);

    },

    update: function () {

        //TEST DE COLLISIONS
        game.physics.arcade.collide(player, walls);
        game.physics.arcade.collide(player, ship);
        game.physics.arcade.collide(ship, walls);
        game.physics.arcade.collide(player, transparents);
        //game.physics.arcade.collide(player,transparent);
        game.physics.arcade.collide(player, transparents, blocco, null, this);
        game.physics.arcade.collide(player, murs);
        for (i = 0; i < clients.length; i++) {
            game.physics.arcade.collide(player, clients[i].getSprite(), this.interactionClient);
        }


        //DEPLACEMENTS
        clients[0].move();

        movementControllerJoystick(MAX_SPEED_PLAYER);

        //movementControllerCursors(MAX_SPEED_PLAYER);
    },

    interactionClient: function (player, client) {
/*
        if (lastClient == client) {
            //On ne fait rien
        }
        else {
            lastClient = client;

            /*
             LA GESTION DES QUIZZ SE FAIT DANS LE js/gestionQuizz.js
             Pour démarrer un quizz, faire appel à demarrerQuizz(id_quizz)
             */

            demarrerQuizz(0);
            game.physics.arcade.isPaused = true;
/*
        }*/

    },


    render: function () {


        testDebloquageBadge();
        updateMap();

        if (1) {
            game.debug.cameraInfo(game.camera, 32, 32);
            game.debug.spriteCoords(player, 32, 600);
        }


    },

    setIHM: function () {

        button_settings = game.add.button(game.width - 120, 20, 'settings', this.actionOnClickMenu, this, 2, 1, 0);
        button_settings.fixedToCamera = true;

    },


    actionOnClickMenu: function () {
        //On pause la physique du jeu.
        /*ATTENTION : mettre en pause tout le jeu (game.pause() ) bloque aussi
         les listeners, donc plus aucun bouton ne fonctionne...
         */
        game.physics.arcade.isPaused = true;

        game.touchControl.inputDisable();
        button_settings.inputEnabled = false;


        /*AJOUT DU MENU ET DE SON IHM*/
        menu = game.add.sprite(game.camera.x + GAME_WIDTH / 2 - 804 / 2, game.camera.y + GAME_HEIGHT / 2 - 599 / 2, 'menu');

        button_retour_menu_principal = game.add.button(game.camera.x + GAME_WIDTH / 2 - 200, game.camera.y + GAME_HEIGHT / 2 -80, 'retour_menu_principal', function () {
            window.location.href = 'menu_principal.php';
        }, this, 2, 1, 0);

        button_gestion_musique = game.add.button(game.camera.x + GAME_WIDTH / 2 - 95, game.camera.y + GAME_HEIGHT / 2 -160, 'musique_menu', function () {
            actionOnClickVolume();
        }, this, 2, 1, 0);

        button_croix_blanche = game.add.button(game.camera.x + 843, game.camera.y + 52, 'croix_blanche', function () {
            menu.destroy();
            button_retour_menu_principal.destroy();
            button_croix_blanche.destroy();
            button_gestion_musique.destroy();
            t_score.destroy();
            t_jetons.destroy();
            button_settings.inputEnabled = true;

            game.touchControl.inputEnable();

            // Unpause the game
            reprendre();
        }, this, 2, 1, 0);


        t_score = game.add.text(game.camera.x + 760, game.camera.y + 530,  score);
        t_score.font = 'Arial Black';
        t_score.fontSize = 40;
        t_score.fontWeight = 'bold';
        t_score.fill = '#6ec2a6';

        t_jetons = game.add.text(game.camera.x + 785, game.camera.y + 588,  nb_jetons);
        t_jetons.font = 'Arial Black';
        t_jetons.fontSize = 40;
        t_jetons.fontWeight = 'bold';
        t_jetons.fill = '#6ec2a6';


    }


};

function reprendre () {
    ajaxRequest(setJetons, "nbJeton", null);
    ajaxRequest(setScore, "scoreJour", null);
    game.physics.arcade.isPaused = false;


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

    //Blocage du niveau 1 séquence de test
    if (listeBadges[4] == 1) {

        transparents.destroy();
    }
}
/*
 Utilisé pour obtenir ou envoyer une info à la base de données

 callback = fonction qui traite l'information renvoyé par le serveur; null si pas de réponse attendue
 request = nom de la fonction ajax (coté php) à appeler
 valeur = valeur de l'information à passer, à mettre à jour; null si pas d'information à passer

 */
function creermur() {
    for (var i = 0; i < 32; i++) {
        mur = murs.create(i * 40, 0, 'mur');
        mur.body.immovable = true;
        if (!(i == 24 || i == 25 || i == 26)) {
            mur = murs.create(i * 40, 600, 'mur');
        }
        mur.body.immovable = true;
        if (i == 0 || i == 15 || i == 31) {
            for (var j = 0; j < 16; j++) {

                if ((i == 15 && (j == 8 || j == 7 || j == 9))) {
                    transparent = transparents.create(i * 40, j * 40, 'mur');
                    transparent.body.immovable = true;
                    transparent.renderable = false;
                }
                else {
                    mur = murs.create(i * 40, j * 40, 'mur');
                    mur.body.immovable = true;
                }
            }
        }
    }
}
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
    on_off_volume = !on_off_volume;

    if (on_off_volume) {
       // musicbg.pause();
    }
    else {
       // musicbg.resume();
    }
}

function blocco(){

}

function testDebloquageBadge(){
    if(score >= 400 && listeBadges[4] == 0 && ajoutBadge4 == false){
        listeBadges[4] = 1;
        ajaxRequest(badgeAjoute, 'addBadge', 4);
        ajoutBadge4 = true;
    }
}

function badgeAjoute(numBadge){
    listeBadges[numBadge] = 1;
    ajaxRequest(updateBadges, "getBadges", null);
}
game.state.add('boot', bootState);
game.state.add('preload', preloadState);
game.state.add('main', mainState);
game.state.start('boot');

