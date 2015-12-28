/**
 * Created by Florian on 13/11/2015.
 */
var game = new Phaser.Game(1024, 768, Phaser.CANVAS, 'POLO', { preload: preload, create: create, update: update, render: render });

var GAME_WIDTH = 1024;
var GAME_HEIGHT = 768;

function preload() {

    game.load.spritesheet('player', 'res/img/dude.png', 32, 48);
    game.load.image('background', 'res/img/starfield2.jpg');
    game.load.image('ship', 'res/img/thrust.png');
    game.load.image('star', 'res/img/star.png');
    game.load.image('wall', 'res/img/platform.png');

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

}

var player;
var cursors;
var walls;
var ship;
var musicbg;
var star;
var stars;
var newwindow;

var button_settings;
var button_volume;

var on_off_volume = true;
var settingsOnOff = true;

var nb_jetons = 0;
var score = 0;
var score_cumule = 0;
var SCORE_POUR_NOUVEAU_JETON = 200;

function create() {

    //inizialize les variables

    var closePopup=document.getElementById("popupclose");
    var overlay=document.getElementById("overlay");
    var popup=document.getElementById("popup");
    //fermer le popup
    closePopup.onclick=function(){
        overlay.style.display='none';
        popup.style.display='none';
    }

    musicbg = game.add.audio('kikou');
    //musicbg.play();
    game.add.tileSprite(0, 0, 1920, 1920, 'background');

    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    stars=game.add.group();
    stars.enableBody=true;
    game.physics.arcade.enable(stars);


    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, i*70, 'star');
    }
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    game.touchControl = game.plugins.add(Phaser.Plugin.TouchControl);
    game.touchControl.inputEnable();

    game.camera.follow(player);

    //  The deadzone is a Rectangle that defines the limits at which the camera will start to scroll
    //  It does NOT keep the target sprite within the rectangle, all it does is control the boundary
    //  at which the camera will start to move. So when the sprite hits the edge, the camera scrolls
    //  (until it reaches an edge of the world)
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 450, 300);

    walls = game.add.group();
    walls.enableBody = true;

    var wall = walls.create(400, 400, 'wall');
    wall.body.immovable = true;
    wall = walls.create(500, 600, 'wall');
    wall.body.immovable = true;

    ship = game.add.sprite(800, 700, 'ship');
    game.physics.arcade.enable(ship);
    ship.body.collideWorldBounds = true;
    ship.body.drag = new Phaser.Point(150,150);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    setIHM();



    getJetons();
    getScore();



}

function update() {

    game.physics.arcade.collide(player, walls);
    game.physics.arcade.collide(player, ship);
    game.physics.arcade.collide(ship, walls);
    game.physics.arcade.overlap(player, stars, apri, null, this);

    var maxSpeed = 300;

    movementControllerJoystick(maxSpeed);
    accesCarte();

    //movementControllerCursors(maxSpeed);
}
function apri(player,star) {
    star.kill();
    overlay.style.display='block';
    popup.style.display='block';

    //TODO: A enlever

    //A chaque fois on ajoute 100 a score
    addToScore(100);

    getJetons();
    getScore();
}
function render() {

    if(settingsOnOff){
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(player, 32, 500);
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
            game.physics.arcade.isPaused= false;
        }
        else{

        }

}

/*
 Permet de récupérer les jetons enregistrer dans la BDD.
 ATTENTION: il ne faut pas executer cette fonction en boucle (dans la fonction update par exemple)
 Elle envoie des requêtes au serveur, trop de requêtes vont ralentir
 le temps de réponse voir faire crasher le serveur
 */
function getJetons(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            //La réponse
            var nbjt = xmlhttp.responseText;
            setJetons(parseInt(nbjt));
        }
    };
    xmlhttp.open("GET","ajaxDB.php?q=nbJeton", true);
    xmlhttp.send();

}

/*
Permet de récupérer le score enregistrer dans la BDD.
ATTENTION: il ne faut pas executer cette fonction en boucle (dans la fonction update par exemple)
Elle envoie des requêtes au serveur, trop de requêtes vont ralentir
le temps de réponse voir faire crasher le serveur
 */
function getScore(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            //La réponse
            var sco = xmlhttp.responseText;
            setScore(parseInt(sco));
        }
    };
    xmlhttp.open("GET","ajaxDB.php?q=scoreJour", true);
    xmlhttp.send();

}
/*
Permet de mettre à jour le score dans la BDD.
Ajoute le nombre donnée en paramètre.
Si ce nombre est négatif, le score va être diminué
 */
function addToScore(scoreToAdd){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET","ajaxDB.php?q=addToScore&s="+scoreToAdd, true);
    xmlhttp.send();

    /*
    On test si le score cumulé permet de débloqué un nouveau jeton
     */
    score_cumule += scoreToAdd;
    while(score_cumule >= SCORE_POUR_NOUVEAU_JETON){
        score_cumule -= SCORE_POUR_NOUVEAU_JETON;
        addToJeton(1);
    }



}

/*
Permet de mettre à jour les jetons dans la BDD.
Ajoute le nombre donnée en paramètre.
Si ce nombre est négatif, le nombre de jetons va être diminué
 */
function addToJeton(jetonToAdd){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET","ajaxDB.php?q=addToJeton&s="+jetonToAdd, true);
    xmlhttp.send();

}


/*
 Permet de mettre à jour les jetons en INTERNE,
 n'applique pas de changement à la BDD.
 Sert surtout pour mettre à jour l'affichage
 */
function setJetons(jt){;
    nb_jetons = jt;
}

/*
Permet de mettre à jour le score en INTERNE,
n'applique pas de changement à la BDD.
Sert surtout pour mettre à jour l'affichage
 */
function setScore(sc){;
    score  = sc;
}