var text;

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
        game.load.image('background', 'res/img/ingame/fond_sans_panneaux.jpg', 2890, 2206);
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

        //Elements
        game.load.image('accueil_salon','res/img/ingame/elements/accueil_salon.png');
        game.load.image('BLS','res/img/ingame/elements/BLS.png');
        game.load.image('borne_arcade','res/img/ingame/elements/borne_arcade.png');
        game.load.image('buffet_salon','res/img/ingame/elements/buffet_salon.png');

        //Panneaux
        game.load.image('panneau_bagage','res/img/ingame/elements/panneau_bagage.png');
        game.load.image('panneau_bls','res/img/ingame/elements/panneau_bls.png');
        game.load.image('panneau_dba','res/img/ingame/elements/panneau_dba.png');
        game.load.image('panneau_embarquement_debarquement','res/img/ingame/elements/panneau_embarquement_debarquement.png');
        game.load.image('panneau_enregistrement','res/img/ingame/elements/panneau_enregistrement.png');
        game.load.image('panneau_salle_repos','res/img/ingame/elements/panneau_salle_repos.png');
        game.load.image('panneau_salon','res/img/ingame/elements/panneau_salon.png');
        game.load.image('panneau_toilettes','res/img/ingame/elements/panneau_toilettes.png');


        //Fond transparents
        game.load.image('bas_droite','res/img/ingame/transparents/bas_droite.png');
        game.load.image('bas_gauche','res/img/ingame/transparents/bas_gauche.png');
        game.load.image('bas_milieu','res/img/ingame/transparents/bas_milieu.png');
        game.load.image('haut_droite','res/img/ingame/transparents/haut_droite.png');
        game.load.image('haut_gauche','res/img/ingame/transparents/haut_gauche.png');
        game.load.image('haut_milieu','res/img/ingame/transparents/haut_milieu.png');

        game.load.image('mur_haut_droite','res/img/ingame/transparents/mur_haut_droite.png');
        game.load.image('mur_haut_gauche','res/img/ingame/transparents/mur_haut_gauche.png');
        game.load.image('mur_haut_milieu','res/img/ingame/transparents/mur_haut_milieu.png');
        game.load.image('mur_gauche','res/img/ingame/transparents/mur_gauche.png');
        game.load.image('mur_milieu','res/img/ingame/transparents/mur_milieu.png');
        game.load.image('mur_salle_repos_haut','res/img/ingame/transparents/mur_salle_repos_haut.png');
        game.load.image('mur_salle_repos_droite_petit','res/img/ingame/transparents/mur_salle_repos_droite_petit.png');
        game.load.image('mur_salle_repos_droite_grand','res/img/ingame/transparents/mur_salle_repos_droite_grand.png');

        //Sprites personnages
        for (i = 0; i < CLAN_COLORS.length; i++) {
            for (j = 0; j < CLAN_NAMES.length; j++) {

                game.load.spritesheet(CLAN_NAMES[j] + CLAN_COLORS[i], 'res/img/personnages/clients/' + CLAN_COLORS[i] + '/' + CLAN_NAMES[j] + '/perso_sheet.png', 74, 96);
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