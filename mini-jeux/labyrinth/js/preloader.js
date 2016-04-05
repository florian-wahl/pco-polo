Main.Preloader = function (game) {
    this.game = game;
};

Main.Preloader.prototype =
{
    loaderFull: Phaser.Sprite,
    preload: function () {
        this.loaderFull = this.add.sprite(120, 450, 'preloaderBar');
        this.loaderFull.scale.x = 0.0;

        this.game.load.image('bg', 'assets/bg.png');
        this.game.load.image('logo', 'assets/logo.png');
        this.game.load.image('play', 'assets/play.png');
        this.game.load.image('retour', 'assets/retour.png');
        this.game.load.image('accelneeded', 'assets/accelneeded.png');

        this.game.load.image('selectlevel', 'assets/selectlevel.png');
        this.game.load.image('lvl1', 'assets/lvl2.png');
        this.game.load.image('lvl2', 'assets/lvl1.png');
        this.game.load.image('lvl3', 'assets/lvl3.png');
        this.game.load.image('lvl4', 'assets/lvl4.png');
        this.game.load.image('lvl5', 'assets/lvl5.png');
        this.game.load.image('lvl6', 'assets/lvl6.png');
        this.game.load.image('lvl7', 'assets/lvl7.png');
        this.game.load.image('lvl8', 'assets/lvl8.png');
        this.game.load.image('lvl9', 'assets/lvl9.png');

        this.game.load.image('restart', 'assets/restart.png');
        this.game.load.image('exit', 'assets/exit.png');

        this.game.load.image('tutorial1', 'assets/tutorial1.png');
        this.game.load.image('tutorial2', 'assets/tutorial2.png');
        this.game.load.image('tutorial3', 'assets/tutorial3.png');

        this.game.load.image('ball', 'assets/ball.png');
        this.game.load.image('hole', 'assets/hole.png?2');
        this.game.load.image('goal', 'assets/goal.png?2');
        this.game.load.image('box1', 'assets/box1.png');
        this.game.load.image('box2', 'assets/box2.png');
        this.game.load.image('box3', 'assets/box3.png');
        this.game.load.image('box4', 'assets/box4.png');
        this.game.load.image('box5', 'assets/box5.png');
        this.game.load.image('box6', 'assets/box6.png');
        this.game.load.image('box7', 'assets/box7.png');
        this.game.load.image('box8', 'assets/box8.png');
        this.game.load.image('box9', 'assets/box9.png');
        this.game.load.image('box10', 'assets/box10.png');
        this.game.load.image('box11', 'assets/box11.png');
        this.game.load.image('box12', 'assets/box12.png');
        this.game.load.image('box13', 'assets/box13.png');
        this.game.load.image('box14', 'assets/box14.png');

        this.game.load.image('levelwon', 'assets/levelwon.png');
        this.game.load.image('next', 'assets/next.png');
        this.game.load.image('playagain', 'assets/playagain.png');
        this.game.load.image('menu', 'assets/menu.png');

        this.load.onFileComplete.add(this.fileLoaded, this);
    },
    create: function () {
        this.game.state.start('mainMenu');
    },
    fileLoaded: function (progress) {
        this.loaderFull.scale.x = progress / 100;
    }
}
