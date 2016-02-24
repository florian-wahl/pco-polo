var text;
var titre;

var preloadState = {
    preload: function () {


        this.loadingScreen = this.add.image(0,0, 'loadingScreen');
        this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+80, 'loadingBar');
        this.loadingBar.anchor.setTo(0.5);
        this.game.load.setPreloadSprite(this.loadingBar);


    },
    create: function () {

        //	You can listen for each of these events from Phaser.Loader
        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);
        text = game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2+140, 'Le chargement va débuter.', { fill: '#FFFFFF' });
        text.anchor.setTo(0.5);
        /*titre = game.add.text(GAME_WIDTH/2, 150, 'POLO');
        titre.anchor.setTo(0.5);
        titre.font = 'Arial Black';
        titre.fontSize = 60;
        titre.fontWeight = 'bold';
        titre.fill = '#FFFFFF';*/

        this.startLoading();
    },
    startLoading : function() {

        //link_res_perso est défini dans polo.php
        game.load.image('playButton', 'res/img/boutons/bouton_jouer.png');
        game.load.spritesheet('player', link_res_perso, 74, 96);
        game.load.image('background', 'res/img/ingame/fond_avec_panneaux.jpg', 2890, 2206);
        game.load.image('ship', 'res/img/thrust.png');
        game.load.image('transparent', 'res/img/transparent.png');
        game.load.image('mur', 'res/img/wallie.png');

        //touch control
        game.load.image('compass', 'res/img/compass_rose.png');
        game.load.image('touch_segment', 'res/img/touch_segment.png');
        game.load.image('touch', 'res/img/touch.png');


        //Images boutons
        game.load.image('settings', 'res/img/boutons/menu.png');

        //Sounds
        game.load.audio('fond_sonore', 'res/sons/fond_sonore.mp3');

        //Menu
        game.load.image('menu', 'res/img/ingame/menu.png', 804, 599);
        game.load.image('retour_menu_principal', 'res/img/boutons/bouton_retour_menu_principal.png');
        game.load.image('croix_blanche', 'res/img/ingame/croix_blanche.png', 70, 70);
        game.load.spritesheet('toggle_button', 'res/img/boutons/toggle.png', 95, 48);
        game.load.image('reglages_sons_menu', 'res/img/ingame/reglages_sons_menu.png', 405, 60);
        game.load.image('score_menu', 'res/img/ingame/score_menu.png', 152, 37);
        game.load.image('jetons_menu', 'res/img/ingame/jetons_menu.png', 177, 35);

        //Elements
        game.load.image('accueil_salon','res/img/ingame/elements/accueil_salon.png');
        game.load.image('BLS','res/img/ingame/elements/BLS.png');
        game.load.image('borne_arcade','res/img/ingame/elements/borne_arcade.png');
        game.load.image('buffet_salon','res/img/ingame/elements/buffet_salon.png');

        //Sprites personnages
        for (i = 0; i < CLAN_COLORS.length; i++) {
            for (j = 0; j < CLAN_NAMES.length; j++) {
                switch (CLAN_NAMES[j]) {
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
                game.load.image(CLAN_NAMES[j] + CLAN_COLORS[i], 'res/img/personnages/' + CLAN_COLORS[i] + '/' + img + '/idle.png');
            }
        }

        game.load.start();
    },

    playTheGame: function () {
        this.game.state.start("mainState");
    },

    loadStart : function() {
        text.setText("Chargement ...");
    },

    //	This callback is sent the following parameters:
    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {

        text.setText("Chargement à " + progress + "% terminé - " + totalLoaded + " sur " + totalFiles);

    },

    loadComplete : function() {
        text.setText("Chargement terminé");

        this.startButton = this.game.add.button(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 220, "playButton", this.playTheGame, this);
        this.startButton.anchor.setTo(0.5);
    }

};