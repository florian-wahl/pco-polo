var bootState = {
    preload: function () {
        game.load.image('loadingBar', 'res/img/ingame/loadingBar.jpg');
        game.load.image('loadingScreen', 'res/img/ingame/fond_lancement_polo.png')
    },
    create: function () {
        /*
         On récupère le code de la page d'origine
         0 : page principale, valeur par défaut
         1 : page de création du personnage
         2 : page des mini-jeux
         */
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }

        initNombreQuizz();
        originePage = vars['origine'];
        this.game.state.start("preloadState");
    }
};