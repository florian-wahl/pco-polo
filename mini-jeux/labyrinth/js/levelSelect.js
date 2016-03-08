Main.LevelSelect = function (game) {
    this.game = game;
};

Main.LevelSelect.prototype =
{
    bg: Phaser.Sprite,
    caption: Phaser.Sprite,
    group: Phaser.Group,

    create: function () {
        this.group = this.game.add.group();
        this.group.alpha = 0;

        this.bg = this.game.add.sprite(0, 0, 'bg');
        this.group.add(this.bg);

        this.caption = this.game.add.sprite(120, 110, 'selectlevel');
        this.group.add(this.caption);

        for (var i = 0; i < 9; i++) {
            var lvl = this.game.add.button(190 + i * 130 - Math.floor(i / 3) * 390, 350 + Math.floor(i / 3) * 130, 'lvl' + (i + 1));
            lvl.anchor = {x: 0.5, y: 0.5};
            lvl.orgWidth = 100;
            lvl.orgHeight = 100;
            lvl.name = i;

            if (Main.progress.length >= i) {
                lvl.onInputDown.add(this.buttonDown, lvl);
                lvl.onInputUp.add(this.playGame, lvl);
                this.input.onUp.add(this.buttonUp, lvl);
            }
            else {
                lvl.alpha = 0.5;
                ;
                lvl.input.stop();
            }

            this.group.add(lvl);
        }

        this.exitButton = this.game.add.button(320, 850, 'exit');
        this.exitButton.scale = {x: 0.5, y: 0.5};
        this.exitButton.anchor = {x: 0.5, y: 0.5};
        this.exitButton.orgWidth = 128 * 0.5;
        this.exitButton.orgHeight = 128 * 0.5;

        this.exitButton.onInputDown.add(this.buttonDown, this.exitButton);
        this.exitButton.onInputUp.add(this.exitGame, this);
        this.input.onUp.add(this.buttonUp, this.exitButton);

        this.group.add(this.exitButton);

        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 1}, 300);
        fade.start();
    },
    playGame: function () {
        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 0}, 300);
        fade.start();

        Main.level = this.name;

        var self = this;

        setTimeout(function () {
            self.game.state.start('game');
        }, 350);
    },
    exitGame: function () {
        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 0}, 300);
        fade.start();

        var self = this;

        setTimeout(function () {
            self.game.state.start('mainMenu');
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