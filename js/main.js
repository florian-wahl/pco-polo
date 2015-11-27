/**
 * Created by Florian on 13/11/2015.
 */
var game = new Phaser.Game(1000, 800, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('player', 'assets/dude.png', 32, 48);
    game.load.image('background', 'assets/starfield2.jpg');
    game.load.image('ship', 'assets/thrust.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('wall', 'assets/platform.png');

    //touch control
    game.load.image('compass', 'assets/compass_rose.png');
    game.load.image('touch_segment', 'assets/touch_segment.png');
    game.load.image('touch', 'assets/touch.png');


    //Images boutons
    game.load.image('settings', 'assets/settings.png');
    game.load.image('volume', 'assets/volume.png');
    game.load.image('volume_mute', 'assets/volume_mute.png');

    //Sounds
    game.load.audio('kikou', 'assets/Kikou.mp3');

}

var player;
var cursors;
var walls;
var ship;
var musicbg;

var button_settings;
var button_volume;

var on_off_volume = true;
var settingsOnOff = true;

function create() {

    musicbg = game.add.audio('kikou');
    musicbg.play();
    game.add.tileSprite(0, 0, 1920, 1920, 'background');

    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    game.touchControl = game.plugins.add(Phaser.Plugin.TouchControl);
    game.touchControl.inputEnable();

    game.camera.follow(player);

    //  The deadzone is a Rectangle that defines the limits at which the camera will start to scroll
    //  It does NOT keep the target sprite within the rectangle, all it does is control the boundary
    //  at which the camera will start to move. So when the sprite hits the edge, the camera scrolls
    //  (until it reaches an edge of the world)
    game.camera.deadzone = new Phaser.Rectangle(150, 150, 450, 300);

    walls = game.add.group();
    walls.enableBody = true;

    var wall = walls.create(400, 400, 'wall');
    wall.body.immovable = true;
    wall = walls.create(500, 600, 'wall');
    wall.body.immovable = true;

    ship = game.add.sprite(800, 700, 'ship');
    game.physics.arcade.enable(ship);
    ship.body.collideWorldBounds = true;
    ship.body.drag = new Phaser.Point(150,150);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    setIHM();


}

function update() {

    game.physics.arcade.collide(player, walls);
    game.physics.arcade.collide(player, ship);
    game.physics.arcade.collide(ship, walls);

    var maxSpeed = 300;

    movementControllerJoystick(maxSpeed);

    //movementControllerCursors(maxSpeed);
}

function render() {

    if(settingsOnOff){
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(player, 32, 500);
    }


}

///////////////////////////////////////////////////////////////////////

function setIHM() {

    //Volume button
    button_volume = game.add.button(game.width-60, 50, 'volume', actionOnClickVolume, this, 2, 1 ,0);
    button_volume.fixedToCamera = true;

    button_settings = game.add.button(game.width-120, 50, 'settings', actionOnClickSettings, this, 2, 1, 0);
    button_settings.fixedToCamera = true;

}

function actionOnClickVolume() {
    on_off_volume =! on_off_volume;

    if(on_off_volume){
        musicbg.pause();
    }
    else{
        musicbg.resume();
    }
}

function actionOnClickSettings() {

    settingsOnOff =! settingsOnOff;

}