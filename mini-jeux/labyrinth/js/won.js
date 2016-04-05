Main.Won = function (game) {
    this.game = game;
};

Main.Won.prototype =
{
    bg: Phaser.Sprite,
    caption: Phaser.Sprite,
    timeLabel: Phaser.Text,
    bestLabel: Phaser.Text,
    next: Phaser.Button,
    playagain: Phaser.Button,
    menu: Phaser.Button,
    group: Phaser.Group,

    create: function () {
        this.bg = this.game.add.sprite(0, 0, 'bg');

        this.caption = this.game.add.sprite(120, 150, 'levelwon');

        var i = Main.time;
        var j = Main.progress[parseInt(Main.level)].time;

        var style = {font: '40px \'Arial Rounded MT Bold\'', fill: '#684525', align: 'left'};
        this.timeLabel = this.game.add.text(80, 320, 'Temps: ' + Math.floor(i / 100) + ':' + (Math.floor(i / 10) - Math.floor(i / 100) * 10) + (i - (Math.floor(i / 10) * 10)), style);
        this.bestLabel = this.game.add.text(360, 320, 'Meilleur: ' + Math.floor(j / 100) + ':' + (Math.floor(j / 10) - Math.floor(j / 100) * 10) + (j - (Math.floor(j / 10) * 10)), style);

        this.next = this.game.add.button(320, 510, 'next');
        this.next.anchor = {x: 0.5, y: 0.5};
        this.next.orgWidth = 380;
        this.next.orgHeight = 110;

        this.next.onInputDown.add(this.buttonDown, this.next);
        this.next.onInputUp.add(this.nextGame, this);
        this.input.onUp.add(this.buttonUp, this.next);

        this.playagain = this.game.add.button(320, 630, 'playagain');
        this.playagain.anchor = {x: 0.5, y: 0.5};
        this.playagain.orgWidth = 380;
        this.playagain.orgHeight = 110;

        this.playagain.onInputDown.add(this.buttonDown, this.playagain);
        this.playagain.onInputUp.add(this.restartGame, this);
        this.input.onUp.add(this.buttonUp, this.playagain);

        this.menu = this.game.add.button(320, 750, 'menu');
        this.menu.anchor = {x: 0.5, y: 0.5};
        this.menu.orgWidth = 380;
        this.menu.orgHeight = 110;

        this.menu.onInputDown.add(this.buttonDown, this.menu);
        this.menu.onInputUp.add(this.gotoMenu, this);
        this.input.onUp.add(this.buttonUp, this.menu);

        this.group = this.game.add.group();
        this.group.alpha = 0;

        this.group.add(this.bg);
        this.group.add(this.caption);
        this.group.add(this.timeLabel);
        this.group.add(this.bestLabel);
        this.group.add(this.next);
        this.group.add(this.playagain);
        this.group.add(this.menu);

        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 1}, 300);
        fade.start();
    },
    nextGame: function () {
        if ((parseInt(Main.level) + 1) < 9) {
            var fade = this.game.add.tween(this.group);
            fade.to({alpha: 0}, 300);
            fade.start();

            Main.level = (parseInt(Main.level) + 1) + '';

            var self = this;

            setTimeout(function () {
                self.game.state.start('game');
            }, 350);
        }
        else {
            this.gotoMenu();
        }
    },
    restartGame: function () {
        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 0}, 300);
        fade.start();

        var self = this;

        setTimeout(function () {
            self.game.state.start('game');
        }, 350);
    },
    gotoMenu: function () {
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