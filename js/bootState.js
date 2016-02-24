var bootState = {
    preload: function () {
        game.load.image('loadingBar', 'res/img/ingame/loadingBar.jpg');
        game.load.image('loadingScreen', 'res/img/ingame/fond_lancement_polo.png')
    },
    create: function () {
        this.game.state.start("preloadState");
    }
};