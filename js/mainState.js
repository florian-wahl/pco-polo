/**
 * Created by Florian on 13/11/2015.
 */
var game = new Phaser.Game(1024, 705, Phaser.CANVAS, 'POLO');

/*
DECLARATION DES CONSTANTES
 */
var GAME_WIDTH = 1024;
var GAME_HEIGHT = 700;
var CLAN_NAMES = ['Tut','Lav', 'Pri', 'Tec', 'Qi'];
var CLAN_COLORS = ['Blue','Green','Purple','Red','Yellow'];

var MAX_SPEED_PLAYER = 300;

var SCORE_POUR_NOUVEAU_JETON = 200;

var NOMBRE_BADGE_MAX = 11;

/*
DECLARATION DES VARIABLES
 */
var player;
var cursors;
var mur;
var transparent;

var musicbg;

/*Groupes d'éléments du décor*/
var group_decors_derriere_collide;
var group_decors_devant_collide;
var group_bornes_arcades;
var group_decors_derriere_non_collide;
var group_decors_devant_non_collide;
var group_transparents;

var button_settings;
var off_volume = false;
var off_effet = false;

var nb_jetons = 0;
var score = 0;
var score_cumule = 0;

var listeBadges = [];
var clients = [];
var lastClient;



var mainState = {

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

        game.add.tileSprite(0, 0, 2890, 2206, 'background');
        game.world.setBounds(0, 0, 2890, 2206);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // controls
        game.touchControl = game.plugins.add(Phaser.Plugin.TouchControl);
        game.touchControl.inputEnable();
        cursors = game.input.keyboard.createCursorKeys();

        //récupération des infos nécessaires pour de l'affichage
        ajaxRequest(setJetons, "nbJeton", null);
        ajaxRequest(setScore, "scoreJour", null);
        ajaxRequest(updateBadges, "getBadges", null);

        this.setMusicsAndEffects();

        this.setDecorsDerriere();

        this.setPNJ();

        this.setPlayer();
        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(300, 250, 420, 250);

        this.setDecorsDevant();

        this.setIHM();

    },

    update : function () {

        //TEST DE COLLISIONS
        game.physics.arcade.collide(player, group_transparents);
        game.physics.arcade.collide(player, group_decors_derriere_collide);
        game.physics.arcade.collide(player, group_decors_devant_collide);
        game.physics.arcade.collide(player, group_bornes_arcades, this.interactionArcade);


        for (i = 0; i < clients.length; i++) {
            game.physics.arcade.collide(player, clients[i].getSprite(), function(player, clientSprite){mainState.interactionPNJ(player, clientSprite, clients[i])});
        }


        //DEPLACEMENTS
        clients[0].move();

        movementControllerJoystick(MAX_SPEED_PLAYER);

        //movementControllerCursors(MAX_SPEED_PLAYER);
    },

    render : function () {


        testDebloquageBadge();
        updateMap();

        if (1) {
            game.debug.cameraInfo(game.camera, 32, 32);
            game.debug.spriteCoords(player, 32, 600);
            game.debug.body(player);
        }


    },

    setPlayer : function(){
        // Ajout du joueur
        player = game.add.sprite(1100, 1900, 'player');
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.height = 40;
        player.anchor.setTo(1);

        player.animations.add('left', [0, 1], 10, true);
        player.animations.add('down', [2, 3], 10, true);
        player.animations.add('up', [5, 6], 10, true);
        player.animations.add('right', [7, 8], 10, true);
    },

    setIHM : function () {

        button_settings = game.add.button(game.width - 80, 8, 'settings', this.actionOnClickMenu, this, 2, 1, 0);
        button_settings.fixedToCamera = true;

    },

    setDecorsDerriere : function () {
        /*GESTION DES DECORS QUI SE SITUERONT EN DESSOUS DU PLAYER*/

        /*DECORS VISIBLES ET NON SOLIDES PART 1/2*/

        /*DECORS SOLIDE*/
        group_decors_derriere_collide = game.add.group();
        group_decors_derriere_collide.enableBody = true;
        //Elements du vide, limite de la carte
        group_decors_derriere_collide.add(game.add.sprite(0, 0, 'haut_gauche'));
        group_decors_derriere_collide.add(game.add.sprite(1071, 0, 'haut_milieu'));
        group_decors_derriere_collide.add(game.add.sprite(2690, 0, 'haut_droite'));
        group_decors_derriere_collide.add(game.add.sprite(0, 1500, 'bas_gauche'));
        group_decors_derriere_collide.add(game.add.sprite(509, 2193, 'bas_milieu'));
        group_decors_derriere_collide.add(game.add.sprite(2225, 1498, 'bas_droite'));
        //Elements de mur
        group_decors_derriere_collide.add(game.add.sprite(1072, 800, 'mur_haut_gauche'));
        group_decors_derriere_collide.add(game.add.sprite(1685, 802, 'mur_haut_milieu'));
        group_decors_derriere_collide.add(game.add.sprite(2372, 802, 'mur_haut_droite'));
        group_decors_derriere_collide.add(game.add.sprite(626, 800, 'mur_gauche'));
        group_decors_derriere_collide.add(game.add.sprite(933, 1079, 'mur_milieu'));
        group_decors_derriere_collide.add(game.add.sprite(505, 1500, 'mur_salle_repos_haut'));
        group_decors_derriere_collide.add(game.add.sprite(1271, 1500, 'mur_salle_repos_droite_petit'));
        group_decors_derriere_collide.add(game.add.sprite(1271, 1698, 'mur_salle_repos_droite_grand'));

        //Elements
        group_decors_derriere_collide.add(game.add.sprite(240, 1340, 'accueil_salon'));
        group_decors_derriere_collide.add(game.add.sprite(1890, 1650, 'agent_blue_headset'));
        group_decors_derriere_collide.add(game.add.sprite(975, 1080, 'BLS_bas'));
        group_decors_derriere_collide.add(game.add.sprite(1075, 1080, 'BLS_bas'));
        group_decors_derriere_collide.add(game.add.sprite(1175, 1080, 'BLS_bas'));
        group_decors_derriere_collide.add(game.add.sprite(1275, 1080, 'BLS_bas'));
        group_decors_derriere_collide.add(game.add.sprite(2685, 840, 'DBA'));
        group_decors_derriere_collide.add(game.add.sprite(2685, 1040, 'DBA'));
        group_decors_derriere_collide.add(game.add.sprite(2685, 1240, 'DBA'));
        group_decors_derriere_collide.add(game.add.sprite(0, 1100, 'buffet_salon'));
        group_decors_derriere_collide.add(game.add.sprite(270, 706, 'distributeur'));
        group_decors_derriere_collide.add(game.add.sprite(776, 706, 'distributeur'));
        group_decors_derriere_collide.add(game.add.sprite(860, 1500, 'distributeur'));
        group_decors_derriere_collide.add(game.add.sprite(1390, 50, 'agent_blue_headset'));
        group_decors_derriere_collide.add(game.add.sprite(1390, 120, 'guichet_emb'));
        group_decors_derriere_collide.add(game.add.sprite(1465, 1110, 'agent_blue_headset'));
        group_decors_derriere_collide.add(game.add.sprite(1665, 1110, 'agent_blue_headset'));
        group_decors_derriere_collide.add(game.add.sprite(1865, 1110, 'agent_blue_headset'));
        group_decors_derriere_collide.add(game.add.sprite(1465, 1171, 'guichet_enregistrement'));
        group_decors_derriere_collide.add(game.add.sprite(1665, 1171, 'guichet_enregistrement'));
        group_decors_derriere_collide.add(game.add.sprite(1865, 1171, 'guichet_enregistrement'));
        group_decors_derriere_collide.add(game.add.sprite(23, 918, 'table'));
        group_decors_derriere_collide.add(game.add.sprite(410, 918, 'table'));
        group_decors_derriere_collide.add(game.add.sprite(770, 1910, 'table'));
        group_decors_derriere_collide.add(game.add.sprite(1021, 2151, 'canape_blanc_dos_haut'));
        group_decors_derriere_collide.add(game.add.sprite(750, 1747, 'canape_blanc_face_haut'));
        group_decors_derriere_collide.add(game.add.sprite(0, 787, 'canape_blanc_face_haut'));
        group_decors_derriere_collide.add(game.add.sprite(385, 787, 'canape_blanc_face_haut'));
        group_decors_derriere_collide.add(game.add.sprite(1790, 1500, 'point_info'));
        var plantes = game.add.sprite(1420, 1150, 'plante1');
        game.physics.arcade.enable(plantes);
        plantes.body.height = 20;
        plantes.anchor.setTo(1);
        group_decors_derriere_collide.add(plantes);
        plantes = game.add.sprite(2680, 150, 'plante1');
        game.physics.arcade.enable(plantes);
        plantes.body.height = 20;
        plantes.anchor.setTo(1);
        group_decors_derriere_collide.add(plantes);
        plantes = game.add.sprite(1010, 1600, 'plante2');
        game.physics.arcade.enable(plantes);
        plantes.body.height = 60;
        plantes.anchor.setTo(1);
        group_decors_derriere_collide.add(plantes);
        group_decors_derriere_collide.add(game.add.sprite(1690, 270, 'rangee_chaise_type1_haut'));
        group_decors_derriere_collide.add(game.add.sprite(1690, 512, 'rangee_chaise_type1_haut'));
        group_decors_derriere_collide.add(game.add.sprite(2358, 1403, 'chicane_assemblees_dba1'));
        group_decors_derriere_collide.add(game.add.sprite(2358, 910, 'chicane_assemblees_dba3'));
        group_decors_derriere_collide.add(game.add.sprite(2532, 809, 'chicane_verticale'));
        group_decors_derriere_collide.add(game.add.sprite(1080, 566, 'chicane_assemblees_dba1'));
        group_decors_derriere_collide.add(game.add.sprite(1080, 272, 'chicane_horizontale_sf'));
        group_decors_derriere_collide.add(game.add.sprite(1353, 372, 'chicane_horizontale_sf'));
        group_decors_derriere_collide.add(game.add.sprite(1490, 272, 'chicane_verticale'));
        group_decors_derriere_collide.add(game.add.sprite(1080, 272, 'chicane_assemblees_embarquement3'));
        for(var i = 0; i < group_decors_derriere_collide.length; i++){
            group_decors_derriere_collide.getChildAt(i).body.immovable = true;
        }

        /*BORNES ARCADES*/
        group_bornes_arcades = game.add.group();
        group_bornes_arcades.enableBody = true;
        var borne_arcade = game.add.sprite(580, 1625, 'borne_arcade');
        game.physics.arcade.enable(borne_arcade);
        borne_arcade.body.height = 120;
        borne_arcade.anchor.setTo(1);
        group_bornes_arcades.add(borne_arcade);
        borne_arcade = game.add.sprite(650, 1625, 'borne_arcade');
        game.physics.arcade.enable(borne_arcade);
        borne_arcade.body.height = 120;
        borne_arcade.anchor.setTo(1);
        group_bornes_arcades.add(borne_arcade);
        for(var i = 0; i < group_bornes_arcades.length; i++){
            group_bornes_arcades.getChildAt(i).body.immovable = true;
        }

        /*DECORS TRANSPARENTS SOLIDES BLOQUAND LES NIVEAUX*/
        group_transparents = game.add.group();
        group_transparents.enableBody = true;
        for(var i = 0; i < group_transparents.length; i++){
            group_transparents.getChildAt(i).body.immovable = true;
        }


        /*DECORS VISIBLES ET NON SOLIDES PART 2/2*/
        group_decors_derriere_non_collide = game.add.group();
        group_decors_derriere_non_collide.enableBody = false;
        group_decors_derriere_non_collide.add(game.add.sprite(2508, 27, 'panneau_toilettes'));
        group_decors_derriere_non_collide.add(game.add.sprite(65, 712, 'ecran_AF'));
        group_decors_derriere_non_collide.add(game.add.sprite(890, 718, 'ecran_AF'));
        group_decors_derriere_non_collide.add(game.add.sprite(1120, 15, 'ecran_AF'));
        group_decors_derriere_non_collide.add(game.add.sprite(1725, 15, 'ecran_AF'));
        group_decors_derriere_non_collide.add(game.add.sprite(1910, 15, 'ecran_AF'));
        group_decors_derriere_non_collide.add(game.add.sprite(1021, 2107, 'canape_blanc_dos_bas'));
        group_decors_derriere_non_collide.add(game.add.sprite(750, 1798, 'canape_blanc_face_bas'));
        group_decors_derriere_non_collide.add(game.add.sprite(0, 838, 'canape_blanc_face_bas'));
        group_decors_derriere_non_collide.add(game.add.sprite(385, 838, 'canape_blanc_face_bas'));
        group_decors_derriere_non_collide.add(game.add.sprite(520, 2080, 'fauteuil_rouge'));
        group_decors_derriere_non_collide.add(game.add.sprite(420, 925, 'magazines'));
        group_decors_derriere_non_collide.add(game.add.sprite(90, 930, 'magazines_2'));
        group_decors_derriere_non_collide.add(game.add.sprite(840, 1920, 'magazines_3'));
        group_decors_derriere_non_collide.add(game.add.sprite(1690, 70, 'rangee_chaise_type1_simple'));
        group_decors_derriere_non_collide.add(game.add.sprite(1690, 335, 'rangee_chaise_type1_bas'));
        group_decors_derriere_non_collide.add(game.add.sprite(1690, 577, 'rangee_chaise_type1_bas'));
        group_decors_derriere_non_collide.add(game.add.sprite(2215, 193, 'tapis_apporte_bagage'));
        group_decors_derriere_non_collide.add(game.add.sprite(2215, 490, 'tapis_apporte_bagage'));
        group_decors_derriere_non_collide.add(game.add.sprite(2225, 241, 'bagage1'));
        group_decors_derriere_non_collide.add(game.add.sprite(2355, 486, 'bagage2'));





    },

    setDecorsDevant : function(){
        /*GESTION DES DECORS QUI SE SITUERONT AU DESSUS DU PLAYER*/

        /*DECORS NON SOLIDE*/
        group_decors_devant_non_collide = game.add.group();
        group_decors_devant_non_collide.enableBody = false;
        group_decors_devant_non_collide.add(game.add.sprite(975, 1029, 'BLS_haut'));
        group_decors_devant_non_collide.add(game.add.sprite(1075, 1029, 'BLS_haut'));
        group_decors_devant_non_collide.add(game.add.sprite(1175, 1029, 'BLS_haut'));
        group_decors_devant_non_collide.add(game.add.sprite(1275, 1029, 'BLS_haut'));
        group_decors_devant_non_collide.add(game.add.sprite(1868, 762, 'panneau_bagage'));
        group_decors_devant_non_collide.add(game.add.sprite(1686, 762, 'panneau_embarquement_debarquement'));
        group_decors_devant_non_collide.add(game.add.sprite(547, 1183, 'panneau_salon'));
        group_decors_devant_non_collide.add(game.add.sprite(2615, 690, 'panneau_dba'));
        group_decors_devant_non_collide.add(game.add.sprite(933, 960, 'panneau_bls'));
        group_decors_devant_non_collide.add(game.add.sprite(1193, 1681, 'panneau_salle_repos'));
        group_decors_devant_non_collide.add(game.add.sprite(1465, 1020, 'guichets_zone_partie_haute'));
        group_decors_devant_non_collide.add(game.add.sprite(385, 1294, 'PC1'));
        group_decors_devant_non_collide.add(game.add.sprite(528, 1408, 'PC2'));

        /*DECORS SOLIDES*/
        group_decors_devant_collide = game.add.group();
        group_decors_devant_collide.enableBody = true;
        var plantes = game.add.sprite(2270, 1495, 'plante1');
        game.physics.arcade.enable(plantes);
        plantes.body.height = 20;
        plantes.anchor.setTo(1);
        group_decors_devant_collide.add(plantes);
        plantes = game.add.sprite(2040, 2190, 'plante2');
        game.physics.arcade.enable(plantes);
        plantes.body.height = 20;
        plantes.anchor.setTo(1);
        group_decors_devant_collide.add(plantes);
        plantes = game.add.sprite(65, 1495, 'plante3');
        game.physics.arcade.enable(plantes);
        plantes.body.height = 20;
        plantes.anchor.setTo(1);
        group_decors_devant_collide.add(plantes);
        plantes = game.add.sprite(1265, 1495, 'plante3');
        game.physics.arcade.enable(plantes);
        plantes.body.height = 20;
        plantes.anchor.setTo(1);
        group_decors_devant_collide.add(plantes);
        group_decors_devant_collide.add(plantes);
        plantes = game.add.sprite(1125, 790, 'plante3');
        game.physics.arcade.enable(plantes);
        plantes.body.height = 20;
        plantes.anchor.setTo(1);
        group_decors_devant_collide.add(plantes);

        for(var i = 0; i < group_decors_devant_collide.length; i++){
            group_decors_devant_collide.getChildAt(i).body.immovable = true;
        }
    },

    setPNJ : function(){

        //Ajout des clients
        clients[0] = new PNJ('Tec', 'Red', 1600, 1900, 0);
        clients[1] = new PNJ('Lav', 'Yellow', 1950, 865, 0);
        clients[2] = new PNJ('Qi', 'Blue', 2110, 275, 0);
    },

    setMusicsAndEffects : function(){
        //Musics
        musicbg = game.add.audio('fond_sonore');
        musicbg.play();
    },

    interactionPNJ : function (player, clientSprite, clientPNJ) {

        if (lastClient == clientSprite) {
            //On ne fait rien
        }
        else {
            lastClient = clientSprite;

            /*
             LA GESTION DES QUIZZ SE FAIT DANS LE js/gestionQuizz.js
             Pour démarrer un quizz, faire appel à demarrerQuizz(id_quizz)
             */

            demarrerQuizz(clientPNJ.zone);
            game.physics.arcade.isPaused = true;

        }

    },

    interactionArcade : function(){

        //Filtre blanc
        game.physics.arcade.isPaused = true;

        overlay.style.display='block';
        popup_arcade.style.display='block';



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

        button_retour_menu_principal = game.add.button(game.camera.x + GAME_WIDTH / 2, game.camera.y + GAME_HEIGHT / 2 + 80, 'retour_menu_principal', function () {
            window.location.href = 'menu_principal.php';
        }, this, 2, 1, 0);
        button_retour_menu_principal.anchor.setTo(0.5);

        button_gestion_musique = game.add.button(game.camera.x + GAME_WIDTH / 2 + 130, game.camera.y + GAME_HEIGHT / 2 - 85 , 'toggle_button', actionOnClickVolume, this, frameButonOnOff(off_volume), frameButonOnOff(off_volume));
        button_gestion_musique.anchor.setTo(0.5);

        button_gestion_effet = game.add.button(game.camera.x + GAME_WIDTH / 2 + 130, game.camera.y + GAME_HEIGHT / 2 - 25 , 'toggle_button', actionOnClickEffet, this, frameButonOnOff(off_effet), frameButonOnOff(off_effet));
        button_gestion_effet.anchor.setTo(0.5);

        button_croix_blanche = game.add.button(game.camera.x + 843, game.camera.y + 52, 'croix_blanche', function () {
            menu.destroy();
            button_retour_menu_principal.destroy();
            button_croix_blanche.destroy();
            button_gestion_musique.destroy();
            button_gestion_effet.destroy();
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
    if (listeBadges[1] == 1) {
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
    ajaxRequest(updateBadges, "getBadges", null);
}


game.state.add('bootState', bootState);
game.state.add('preloadState', preloadState);
game.state.add('mainState', mainState);
game.state.start('bootState');

