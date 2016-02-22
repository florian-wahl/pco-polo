var bootState = {
    preload: function () {
        game.load.image('loadingBar', 'res/img/ingame/loadingBar.png');
        game.load.image('loadingScreen', 'res/img/ingame/fond_general.jpg')
    },
    create: function () {
        this.game.state.start("preloadState");
    }
};