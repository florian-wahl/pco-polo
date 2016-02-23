var preloadState = {
    preload: function () {
        this.loadingScreen = this.add.image(0,0, 'loadingScreen');
        this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
        this.loadingBar.anchor.setTo(0.5);
        this.game.load.setPreloadSprite(this.loadingBar);


        //link_res_perso est défini dans polo.php
        game.load.image('playButton', 'res/img/boutons/bouton_jouer.png');
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
        game.load.audio('fond_sonore', 'res/sons/fond_sonore.mp3');

        //Menu
        game.load.image('menu', 'res/img/ingame/menu.png', 804, 599);
        game.load.image('retour_menu_principal', 'res/img/ingame/retour_menu_principal.png', 430, 60);
        game.load.image('croix_blanche', 'res/img/ingame/croix_blanche.png', 70, 70);
        game.load.image('musique_menu', 'res/img/ingame/musique_menu.png', 200, 55);
        game.load.image('reglages_sons_menu', 'res/img/ingame/reglages_sons_menu.png', 405, 60);
        game.load.image('score_menu', 'res/img/ingame/score_menu.png', 152, 37);
        game.load.image('jetons_menu', 'res/img/ingame/jetons_menu.png', 177, 35);

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
    },
    create: function () {
        this.start = this.game.add.button(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100, "playButton", this.playTheGame, this);
        this.start.anchor.setTo(0.5);
    },
    playTheGame: function () {
        this.game.state.start("mainState");
    }

};