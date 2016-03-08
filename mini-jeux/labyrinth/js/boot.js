var Main = {};

Main.Boot = function (game) {
    this.game = game;
};

Main.Boot.prototype =
{
    preload: function () {
        this.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.game.stage.scale.refresh();

        this.game.stage.scale.maxIterations = 1;

        if (this.game.device.android && this.game.device.chrome == false) {
            this.game.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
        }

        if (localStorage.getItem('labyrinth-progress') == null) {
            localStorage.setItem('labyrinth-progress', JSON.stringify([]));
            Main.progress = [];
        }
        else {
            Main.progress = JSON.parse(localStorage.getItem('labyrinth-progress'));
        }

        this.load.image('preloaderBar', 'assets/loaderFull.png');
    },
    create: function () {
        this.game.state.start('preloader');
    }
}