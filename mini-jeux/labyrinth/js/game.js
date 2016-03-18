Main.Game = function (game) {
    this.game = game;
};

Main.Game.prototype =
{
    bg: Phaser.Sprite,
    ball: Phaser.Sprite,
    holes: [],
    goal: Phaser.Sprite,
    group: Phaser.Group,
    uigroup: Phaser.Group,
    boxes: Phaser.Group,
    restartBtn: Phaser.Button,
    exitBtn: Phaser.Button,
    timeLabel: Phaser.Text,
    interval: null,
    map: [],
    playing: false,
    i: 0,

    create: function () {
        var levels = [
            {
                map: [
                    [07, 05, 05, 05, 05, 05, 05, 08],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 15, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [09, 05, 05, 05, 05, 05, 05, 10]
                ],
                start: {x: 150, y: 750},
                goal: {x: 80 * 2, y: 80 * 2},
                holes: []
            },
            {
                map: [
                    [07, 05, 05, 05, 12, 05, 05, 08],
                    [06, 00, 00, 00, 06, 00, 00, 06],
                    [06, 00, 15, 00, 04, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 15, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 02, 00, 00, 01, 13],
                    [06, 00, 00, 06, 00, 00, 00, 06],
                    [06, 00, 00, 06, 00, 00, 00, 06],
                    [06, 00, 00, 06, 00, 00, 00, 06],
                    [06, 00, 00, 06, 00, 00, 00, 06],
                    [09, 05, 05, 11, 05, 05, 05, 10]
                ],
                start: {x: 160, y: 750},
                goal: {x: 80 * 5, y: 80 * 9},
                holes: []
            },
            {
                map: [
                    [07, 05, 05, 05, 05, 05, 05, 08],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 15, 00, 00, 15, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 15, 00, 00, 15, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 15, 00, 00, 15, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [09, 05, 05, 05, 05, 05, 05, 10]
                ],
                start: {x: 320, y: 800},
                goal: {x: 280, y: 80 * 2},
                holes: []
            },
            {
                map: [
                    [07, 05, 05, 05, 05, 05, 05, 08],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [14, 05, 05, 05, 03, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 15, 00, 00, 00, 00, 06],
                    [06, 00, 00, 01, 05, 05, 05, 13],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [09, 05, 05, 05, 05, 05, 05, 10]
                ],
                start: {x: 160, y: 160},
                goal: {x: 80 * 5, y: 80 * 9},
                holes: [{x: 80 * 3, y: 80 * 1 + 10}, {x: 80 * 6 - 10, y: 80 * 3}]
            },
            {
                map: [
                    [07, 05, 05, 12, 05, 05, 05, 08],
                    [06, 00, 00, 06, 00, 00, 00, 06],
                    [06, 00, 00, 06, 00, 00, 00, 06],
                    [06, 00, 00, 06, 00, 00, 00, 06],
                    [06, 00, 00, 06, 00, 15, 00, 06],
                    [06, 00, 00, 06, 00, 00, 00, 06],
                    [06, 00, 00, 06, 00, 15, 00, 06],
                    [06, 00, 00, 06, 00, 00, 00, 06],
                    [06, 00, 00, 04, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [09, 05, 05, 05, 05, 05, 05, 10]
                ],
                start: {x: 120, y: 120},
                goal: {x: 80 * 5, y: 80 * 2},
                holes: [{x: 80 * 1 + 10, y: 80 * 3}, {x: 80 * 2 - 10, y: 80 * 5}, {
                    x: 80 * 1 + 10,
                    y: 80 * 7
                }, {x: 80 * 3, y: 80 * 10 - 10}]
            },
            {
                map: [
                    [07, 05, 05, 05, 05, 05, 05, 08],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 01, 05, 05, 05, 13],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [09, 05, 05, 05, 05, 05, 05, 10]
                ],
                start: {x: 500, y: 120},
                goal: {x: 80 * 6 - 10, y: 80 * 10 - 10},
                holes: [{x: 80 * 1 + 5, y: 80 * 4 + 20}, {x: 80 * 2 + 50, y: 80 * 4 + 20}, {
                    x: 80 * 5 - 30,
                    y: 80 * 10 - 10
                }, {x: 80 * 6 - 10, y: 80 * 9 - 30}]
            },
            {
                map: [
                    [07, 05, 05, 05, 05, 05, 05, 08],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 01, 05, 05, 05, 13],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 15, 00, 15, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [14, 05, 05, 05, 03, 00, 00, 06],
                    [06, 00, 00, 00, 00, 15, 00, 06],
                    [06, 00, 00, 15, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [09, 05, 05, 05, 05, 05, 05, 10]
                ],
                start: {x: 500, y: 120},
                goal: {x: 80 * 2 - 20, y: 80 * 9},
                holes: [{x: 80 * 1 + 5, y: 80 * 3}, {x: 80 * 3, y: 80 * 1 + 10}, {x: 80 * 5, y: 80 * 2 - 10}]
            },
            {
                map: [
                    [07, 05, 05, 05, 05, 05, 05, 08],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [14, 05, 05, 05, 03, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 01, 05, 05, 05, 13],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 15, 00, 15, 00, 00, 06],
                    [14, 00, 00, 15, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [09, 05, 05, 05, 05, 05, 05, 10]
                ],
                start: {x: 140, y: 160},
                goal: {x: 80 * 5, y: 80 * 9},
                holes: [{x: 80 * 3 - 50, y: 80 * 1 + 10}, {x: 80 * 3 - 50, y: 80 * 5 - 10}, {
                    x: 80 * 4,
                    y: 80 * 2 - 10
                }, {x: 80 * 4, y: 80 * 4 + 10}, {x: 80 * 6 - 10, y: 80 * 3}]
            },
            {
                map: [
                    [07, 05, 05, 05, 05, 05, 05, 08],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [06, 00, 00, 00, 00, 00, 00, 06],
                    [09, 05, 05, 05, 05, 05, 05, 10]
                ],
                start: {x: 320, y: 800},
                goal: {x: 280, y: 80 * 2},
                holes: [{x: 80 * 1 + 40, y: 80 * 4}, {x: 80 * 2 + 65, y: 80 * 4}, {
                    x: 80 * 3 + 90,
                    y: 80 * 4
                }, {x: 80 * 4 + 115, y: 80 * 4}, {x: 80 * 1 + 40, y: 80 * 6}, {
                    x: 80 * 2 + 65,
                    y: 80 * 6
                }, {x: 80 * 3 + 90, y: 80 * 6}, {x: 80 * 4 + 115, y: 80 * 6}, {
                    x: 80 * 1 + 40,
                    y: 80 * 8
                }, {x: 80 * 2 + 65, y: 80 * 8}, {x: 80 * 3 + 90, y: 80 * 8}, {x: 80 * 4 + 115, y: 80 * 8}]
            }
        ];

        this.playing = true;
        this.i = 0;

        this.map = levels[Main.level].map;
        this.holes = [];

        this.group = this.game.add.group();
        this.group.alpha = 0;

        this.boxes = this.game.add.group();
        this.boxes.alpha = 0;

        this.uigroup = this.game.add.group();
        this.uigroup.alpha = 0;

        this.bg = this.game.add.sprite(0, 0, 'bg');
        this.group.add(this.bg);

        if (Main.level == '0') {
            var tut1 = this.game.add.sprite(320, 480, 'tutorial1');
            tut1.anchor = {x: 0.5, y: 0.5};
            tut1.scale = {x: 0.75, y: 0.75};
            this.group.add(tut1);

            var tut2 = this.game.add.sprite(260, 190, 'tutorial2');
            tut2.scale = {x: 0.75, y: 0.75};
            this.group.add(tut2);

            var tut3 = this.game.add.sprite(260, 590, 'tutorial3');
            tut3.scale = {x: 0.75, y: 0.75};
            this.group.add(tut3);
        }

        for (var row = 0; row < this.map.length; row++) {
            for (var col = 0; col < this.map[row].length; col++) {
                if (this.map[row][col] > 0 && this.map[row][col] < 15) {
                    var box = this.game.add.sprite(80 * col, 80 * row, 'box' + this.map[row][col]);
                    box.scale = {x: 0.8, y: 0.8};
                    box.body.immovable = true;
                    this.boxes.add(box);
                }
                else if (this.map[row][col] == 15) {
                    var hole = this.game.add.sprite(80 * col, 80 * row, 'hole');
                    hole.scale = {x: 0.8, y: 0.8};
                    hole.body.immovable = true;
                    this.holes.push(hole);
                    this.group.add(hole);
                }
            }
        }

        for (var j = 0; j < levels[Main.level].holes.length; j++) {
            var hole = this.game.add.sprite(levels[Main.level].holes[j].x, levels[Main.level].holes[j].y, 'hole');
            hole.scale = {x: 0.8, y: 0.8};
            hole.body.immovable = true;
            this.holes.push(hole);
            this.group.add(hole);
        }

        this.goal = this.game.add.sprite(levels[Main.level].goal.x, levels[Main.level].goal.y, 'goal');
        this.goal.scale = {x: 0.8, y: 0.8};
        this.goal.body.immovable = true;
        this.group.add(this.goal);

        if (gyro.getFeatures().length > 0) {
            this.ball = this.game.add.sprite(levels[Main.level].start.x, levels[Main.level].start.y, 'ball');
            this.ball.scale = {x: 0.8, y: 0.8};
            this.ball.body.collideWorldBounds = true;
            this.ball.body.bounce = {x: 0.2, y: 0.2};
            this.ball.anchor = {x: 0.5, y: 0.5};
            this.group.add(this.ball);

            var self = this;

            gyro.frequency = 5;

            gyro.startTracking(function (o) {
                switch (window.orientation) {
                    case 0:

                        // Portrait
                        self.ball.body.velocity.x += o.gamma / 5;
                        self.ball.body.velocity.y += o.beta / 5;
                        break;

                    case 180:

                        // Portrait (Upside-down)
                        self.ball.body.velocity.x -= o.gamma / 5;
                        self.ball.body.velocity.y -= o.beta / 5;
                        break;

                    case -90:
                        self.ball.body.velocity.x -= o.beta / 5;
                        self.ball.body.velocity.y += o.gamma / 5;

                        // Landscape (Clockwise)
                        break;

                    case 90:
                        self.ball.body.velocity.x -= o.beta / 5;
                        self.ball.body.velocity.y += o.gamma / 5;
                        // Landscape  (Counterclockwise)
                        break;
                }
            });
        }

        this.restartButton = this.game.add.button(530, 920, 'restart');
        this.restartButton.scale = {x: 0.5, y: 0.5};
        this.restartButton.anchor = {x: 0.5, y: 0.5};
        this.restartButton.orgWidth = 128 * 0.5;
        this.restartButton.orgHeight = 128 * 0.5;

        this.restartButton.onInputDown.add(this.buttonDown, this.restartButton);
        this.restartButton.onInputUp.add(this.restartGame, this);
        this.input.onUp.add(this.buttonUp, this.restartButton);

        this.exitButton = this.game.add.button(600, 920, 'exit');
        this.exitButton.scale = {x: 0.5, y: 0.5};
        this.exitButton.anchor = {x: 0.5, y: 0.5};
        this.exitButton.orgWidth = 128 * 0.5;
        this.exitButton.orgHeight = 128 * 0.5;

        this.exitButton.onInputDown.add(this.buttonDown, this.exitButton);
        this.exitButton.onInputUp.add(this.exitGame, this);
        this.input.onUp.add(this.buttonUp, this.exitButton);

        this.uigroup.add(this.restartButton);
        this.uigroup.add(this.exitButton);

        var style = {font: '40px \'Arial Rounded MT Bold\'', fill: '#FFFFFF', align: 'left'};
        this.timeLabel = this.game.add.text(15, 900, 'Time: 0:00', style);
        this.uigroup.add(this.timeLabel);
        this.i = 0;

        var self = this;

        setTimeout(function () {
            self.interval = setInterval(function () {
                self.i++;
                self.timeLabel.destroy();
                self.timeLabel = self.game.add.text(15, 900, 'Time: ' + Math.floor(self.i / 100) + ':' + (Math.floor(self.i / 10) - Math.floor(self.i / 100) * 10) + (self.i - (Math.floor(self.i / 10) * 10)), style);
                self.uigroup.add(self.timeLabel);
            }, 10);
        }, 300);

        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 1}, 300);
        fade.start();

        var fade2 = this.game.add.tween(this.boxes);
        fade2.to({alpha: 1}, 300);
        fade2.start();

        var fade3 = this.game.add.tween(this.uigroup);
        fade3.to({alpha: 1}, 300);
        fade3.start();
    },
    update: function () {
        if (this.ball != undefined && this.boxes != undefined && this.playing == true) {
            this.game.physics.collide(this.ball, this.boxes);

            for (var i = 0; i < this.holes.length; i++) {
                if (this.collides(this.ball.body, {
                        x: this.holes[i].body.x + 35,
                        y: this.holes[i].body.y + 35,
                        width: 10,
                        height: 10
                    })) {
                    this.playing = false;

                    gyro.stopTracking();
                    this.ball.body.velocity = {x: 0, y: 0};

                    var lose = this.game.add.tween(this.ball);
                    lose.to({
                        alpha: 0,
                        width: 40,
                        height: 40,
                        x: this.holes[i].body.x + 40,
                        y: this.holes[i].body.y + 40
                    }, 200);
                    lose.start();

                    this.restartGameDelay();
                }
            }

            if (this.collides(this.ball.body, {
                    x: this.goal.body.x + 30,
                    y: this.goal.body.y + 30,
                    width: 20,
                    height: 20
                })) {
                this.playing = false;

                gyro.stopTracking();
                this.ball.body.velocity = {x: 0, y: 0};

                var win = this.game.add.tween(this.ball);
                win.to({alpha: 0, width: 40, height: 40, x: this.goal.body.x + 40, y: this.goal.body.y + 40}, 200);
                win.start();

                this.wonGame();
            }
        }
    },
    collides: function (a, b) {
        if (a != undefined) {
            return !(
                ((a.y + a.height) < (b.y)) ||
                (a.y > (b.y + b.height)) ||
                ((a.x + a.width) < b.x) ||
                (a.x > (b.x + b.width))
            );
        }
    },
    wonGame: function () {
        clearInterval(this.interval);

        Main.time = this.i;
        console.log(Main.progress);
        if (Main.progress.length == parseInt(Main.level)) {
            Main.progress.push({time: this.i});
            localStorage.setItem('labyrinth-progress', JSON.stringify(Main.progress));
        }
        else {
            if (Main.progress[parseInt(Main.level)].time > this.i) {
                Main.progress[parseInt(Main.level)].time = this.i;
                localStorage.setItem('labyrinth-progress', JSON.stringify(Main.progress));
            }
        }

        var self = this;

        setTimeout(function () {
            self.closeGame();
            setTimeout(function () {
                self.game.state.start('won');
            }, 350);
        }, 200);
    },
    restartGame: function () {
        clearInterval(this.interval);
        gyro.stopTracking();

        this.closeGame();

        var self = this;

        setTimeout(function () {
            self.game.state.start('game');
        }, 350);
    },
    restartGameDelay: function () {
        clearInterval(this.interval);

        var self = this;

        setTimeout(function () {
            self.closeGame();

            setTimeout(function () {
                self.game.state.start('game');
            }, 350);
        }, 200);
    },
    exitGame: function () {
        clearInterval(this.interval);
        gyro.stopTracking();

        this.closeGame();

        var self = this;

        setTimeout(function () {
            self.game.state.start('levelSelect');
        }, 350);
    },
    closeGame: function () {
        var fade = this.game.add.tween(this.group);
        fade.to({alpha: 0}, 300);
        fade.start();

        var fade2 = this.game.add.tween(this.boxes);
        fade2.to({alpha: 0}, 300);
        fade2.start();

        var fade3 = this.game.add.tween(this.uigroup);
        fade3.to({alpha: 0}, 300);
        fade3.start();
    }
    , buttonDown: function () {
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