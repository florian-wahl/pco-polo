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

        //récupération des infos nécessaires pour de l'affichage
        ajaxRequest(setJetons, "nbJeton", null);
        ajaxRequest(setScore, "score", null);
        ajaxRequest(updateBadges, "getBadges", null);

        ajaxQuizzRequest(getListeQuizz, "getListeQuizz", null);


        //Sounds
        game.load.audio('fond_sonore', 'res/sons/fond_sonore.mp3');
        game.load.audio('musique_quizz', 'res/sons/fond_quizz.mp3');
        game.load.audio('effet_quizz', 'res/sons/apparition_quizz.wav');
        game.load.audio('effet_arcade', 'res/sons/apparition_arcade.wav');

        //link_res_perso est défini dans polo.php
        game.load.image('playButton', 'res/img/boutons/bouton_jouer.png');
        game.load.spritesheet('player', link_res_perso, 74, 96);
        game.load.image('background', 'res/img/ingame/fond_sans_panneaux.jpg', 2890, 2206);

        //touch control
        game.load.image('compass', 'res/img/compass_rose.png');
        game.load.image('touch_segment', 'res/img/touch_segment.png');
        game.load.image('touch', 'res/img/touch.png');


        //Images boutons
        game.load.image('settings', 'res/img/boutons/menu.png');


        //Menu
        game.load.image('menu', 'res/img/ingame/menu.png', 804, 599);
        game.load.image('retour_menu_principal', 'res/img/boutons/bouton_retour_menu_principal.png');
        game.load.image('croix_blanche', 'res/img/ingame/croix_blanche.png', 70, 70);
        game.load.spritesheet('toggle_button', 'res/img/boutons/toggle.png', 95, 48);

        //Map
        game.load.image('map', 'res/img/ingame/carte.jpg');
        game.load.image('bouton_map', 'res/img/boutons/map.png');
        game.load.image('cursor', 'res/img/boutons/cursor.png');

        //Elements
        game.load.image('accueil_salon','res/img/ingame/elements/accueil_salon.png');
        game.load.image('BLS_haut','res/img/ingame/elements/BLS_haut.png');
        game.load.image('BLS_bas','res/img/ingame/elements/BLS_bas.png');
        game.load.image('DBA','res/img/ingame/elements/DBA.png');
        game.load.image('borne_arcade','res/img/ingame/elements/borne_arcade.png');
        game.load.image('buffet_salon','res/img/ingame/elements/buffet_salon.png');
        game.load.image('canape_blanc_dos_bas','res/img/ingame/elements/canape_blanc_dos_bas.png');
        game.load.image('canape_blanc_dos_haut','res/img/ingame/elements/canape_blanc_dos_haut.png');
        game.load.image('canape_blanc_face_bas','res/img/ingame/elements/canape_blanc_face_bas.png');
        game.load.image('canape_blanc_face_haut','res/img/ingame/elements/canape_blanc_face_haut.png');
        game.load.image('distributeur','res/img/ingame/elements/distributeur.png');
        game.load.image('fauteuil_rouge','res/img/ingame/elements/fauteuil_rouge.png');
        game.load.image('guichet_emb','res/img/ingame/elements/guichet_emb.png');
        game.load.image('guichet_enregistrement','res/img/ingame/elements/guichet_enregistrement.png');
        game.load.image('table','res/img/ingame/elements/table.png');
        game.load.image('magazines','res/img/ingame/elements/magazines.png');
        game.load.image('magazines_2','res/img/ingame/elements/magazines_2.png');
        game.load.image('magazines_3','res/img/ingame/elements/magazines_3.png');
        game.load.image('plante1','res/img/ingame/elements/plante1.png');
        game.load.image('plante2','res/img/ingame/elements/plante2.png');
        game.load.image('plante3','res/img/ingame/elements/plante3.png');
        game.load.image('PC1','res/img/ingame/elements/PC1.png');
        game.load.image('PC2','res/img/ingame/elements/PC2.png');
        game.load.image('point_info','res/img/ingame/elements/point_info.png');
        game.load.image('rangee_chaise_type1_simple','res/img/ingame/elements/rangee_chaise_type1_simple.png');
        game.load.image('rangee_chaise_type1_haut','res/img/ingame/elements/rangee_chaise_type1_haut.png');
        game.load.image('rangee_chaise_type1_bas','res/img/ingame/elements/rangee_chaise_type1_bas.png');
        game.load.image('tapis_apporte_bagage','res/img/ingame/elements/tapis_apporte_bagage.png');
        game.load.image('bagage1','res/img/ingame/elements/bagage1.png');
        game.load.image('bagage2','res/img/ingame/elements/bagage2.png');
        game.load.image('chicane_assemblees_dba1','res/img/ingame/elements/chicane_assemblees_dba1.png');
        game.load.image('chicane_verticale','res/img/ingame/elements/chicane_verticale.png');
        game.load.image('chicane_horizontale_sf','res/img/ingame/elements/chicane_horizontale_sf.png');
        game.load.image('chicane_assemblees_dba3','res/img/ingame/elements/chicane_assemblees_dba3.png');
        game.load.image('chicane_assemblees_embarquement3','res/img/ingame/elements/chicane_assemblees_embarquement3.png');

        //Panneaux
        game.load.image('panneau_bagage','res/img/ingame/elements/panneau_bagage.png');
        game.load.image('panneau_bls','res/img/ingame/elements/panneau_bls.png');
        game.load.image('panneau_dba','res/img/ingame/elements/panneau_dba.png');
        game.load.image('panneau_embarquement_debarquement','res/img/ingame/elements/panneau_embarquement_debarquement.png');
        game.load.image('panneau_enregistrement','res/img/ingame/elements/panneau_enregistrement.png');
        game.load.image('panneau_salle_repos','res/img/ingame/elements/panneau_salle_repos.png');
        game.load.image('panneau_salon','res/img/ingame/elements/panneau_salon.png');
        game.load.image('panneau_toilettes','res/img/ingame/elements/panneau_toilettes.png');
        game.load.image('ecran_AF','res/img/ingame/elements/ecran.png');
        game.load.image('guichets_zone_partie_haute','res/img/ingame/elements/guichets_zone_partie_haute.png');


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

        //blocage des niveaux
        game.load.image('blocage_niveau_2','res/img/ingame/niveau/niveau_2.png');
        game.load.image('blocage_niveau_3_1','res/img/ingame/niveau/niveau_3_1.png');
        game.load.image('blocage_niveau_3_2','res/img/ingame/niveau/niveau_3_2.png');
        game.load.image('blocage_niveau_3_3','res/img/ingame/niveau/niveau_3_3.png');
        game.load.image('blocage_niveau_4','res/img/ingame/niveau/niveau_4.png');
        game.load.image('blocage_niveau_5','res/img/ingame/niveau/niveau_5.png');

        //Sprites personnages
        game.load.image('agent_blue_headset','res/img/personnages/agent_blue_headset.png');
        game.load.image('space_france_boss','res/img/personnages/space_france_boss.png');
        for (i = 0; i < CLAN_COLORS.length; i++) {
            for (j = 0; j < CLAN_NAMES.length; j++) {

                game.load.spritesheet("client"+CLAN_NAMES[j] + CLAN_COLORS[i], 'res/img/personnages/clients/' + CLAN_COLORS[i] + '/' + CLAN_NAMES[j] + '/perso_sheet.png', 74, 96);
                game.load.spritesheet("agent"+CLAN_NAMES[j] + CLAN_COLORS[i], 'res/img/personnages/agents/' + CLAN_COLORS[i] + '/' + CLAN_NAMES[j] + '/perso_sheet.png', 74, 96);
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

        text.setText("Chargement à " + progress + "% terminé - " + totalLoaded + " / " + totalFiles);

    },

    loadComplete : function() {
        text.setText("Chargement terminé");

        if(originePage == 2){
            // On revient des mini-jeux
            this.playTheGame();
        }
        else {
            this.startButton = this.game.add.button(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 220, "playButton", this.playTheGame, this);
            this.startButton.anchor.setTo(0.5);
        }

    }

};