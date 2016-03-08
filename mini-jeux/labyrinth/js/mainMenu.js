Main.MainMenu = function (game) {
    this.game = game;
};

Main.MainMenu.prototype =
{
    bg: Phaser.Sprite,
    logo: Phaser.Sprite,
    play: Phaser.Button,
    group: Phaser.Group,

    create: function () {
        this.bg = this.game.add.sprite(0, 0, 'bg');

        this.group = this.game.add.group();
        this.group.alpha = 0;

        this.logo = this.game.add.sprite(70, 70, 'logo');

        this.group.add(this.bg);
        this.group.add(this.logo);

        if (gyro.getFeatures().length > 0) {
            this.play = this.game.add.button(320, 740, 'play');
            this.play.anchor = {x: 0.5, y: 0.5};
            this.play.orgWidth = 380;
            this.play.orgHeight = 110;

            this.play.onInputDown.add(this.buttonDown, this.play);
            this.play.onInputUp.add(this.playGame, this);
            this.input.onUp.add(this.buttonUp, this.play);

            this.group.add(this.play);
        }
        else {
            var needed = this.game.add.sprite(320, 740, 'accelneeded');
            needed.anchor = {x: 0.5, y: 0.5};
            this.group.add(needed);
        }

        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 1}, 300);
        fade.start();
    },
    playGame: function () {
        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 0}, 300);
        fade.start();

        var self = this;

        setTimeout(function () {
            self.game.state.start('levelSelect');
        }, 350);
    },
    buttonDown: function () {
        var bounce = this.game.add.tween(this);
        bounce.to({width: this.orgWidth * 1.1, height: this.orgHeight * 1.1}, 300, Phaser.Easing.Back.Out);
        bounce.start();
    },
    buttonUp: function () {
        var bounce = this.game.add.tween(this);
        bounce.to({width: this.orgWidth, height: this.orgHeight}, 300, Phaser.Easing.Back.Out);
        bounce.start();
    }
}