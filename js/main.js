/**
 * Created by Florian on 13/11/2015.
 */
var game = new Phaser.Game(1000, 800, Phaser.CANVAS, 'POLO', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('player', 'res/img/dude.png', 32, 48);
    game.load.image('background', 'res/img/starfield2.jpg');
    game.load.image('ship', 'res/img/thrust.png');
    game.load.image('star', 'res/img/star.png');
    game.load.image('wall', 'res/img/platform.png');

    //touch control
    game.load.image('compass', 'res/img/compass_rose.png');
    game.load.image('touch_segment', 'res/img/touch_segment.png');
    game.load.image('touch', 'res/img/touch.png');


    //Images boutons
    game.load.image('settings', 'res/img/settings.png');
    game.load.image('volume', 'res/img/volume.png');
    game.load.image('volume_mute', 'res/img/volume_mute.png');

    //Sounds
    game.load.audio('kikou', 'res/sons/Kikou.mp3');

}

var player;
var cursors;
var walls;
var ship;
var musicbg;
var star;
var stars;
var newwindow;

var button_settings;
var button_volume;

var on_off_volume = true;
var settingsOnOff = true;

function create() {

    //inizialize les variables

    var closePopup=document.getElementById("popupclose");
    var overlay=document.getElementById("overlay");
    var popup=document.getElementById("popup");
    //fermer le popup
    closePopup.onclick=function(){
        overlay.style.display='none';
        popup.style.display='none';
    }

    musicbg = game.add.audio('kikou');
    //musicbg.play();
    game.add.tileSprite(0, 0, 1920, 1920, 'background');

    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    stars=game.add.group();
    stars.enableBody=true;
    game.physics.arcade.enable(stars);


    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, i*70, 'star');
    }
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
    game.physics.arcade.overlap(player, stars, apri, null, this);

    var maxSpeed = 300;

    movementControllerJoystick(maxSpeed);

    //movementControllerCursors(maxSpeed);
}
function apri(player,star) {
    star.kill();
    overlay.style.display='block';
    popup.style.display='block';




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