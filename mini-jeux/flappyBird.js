// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game
var mainState;
var bootState;
var preload;
var menu_flappy;
var gameOverState;
var scorefinal=0;
bootState= {
    preload: function(){
        this.game.load.image("loading","../res/img/mini-jeux/loading.png");
    },

    create: function(){
        this.game.state.start("preload");
    }
}
preload={
    preload:function(){
        var loadingBar = this.add.sprite(160,240,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
        game.load.image('bird', '../res/img/mini-jeux/bird.png');
        game.load.spritesheet('brick', '../res/img/mini-jeux/bricks.png', 32, 32, 4);
        game.load.image('fond', '../res/img/mini-jeux/back.jpg');
        game.load.image('playButton','../res/img/mini-jeux/playButton.png');
        game.load.image('title','../res/img/mini-jeux/Floppy.png');
        game.load.image('skull','../res/img/mini-jeux/skull.png');
        game.load.image('menuButton','../res/img/mini-jeux/menuButton.png');
    },

    create: function(){
        this.game.state.start("menu_flappy");
    }
}

menu_flappy={
    create: function() {
        this.fond = game.add.tileSprite(0, 0, 490, game.cache.getImage('fond').height, 'fond');
        this.title = game.add.sprite(55,100,"title");
        var playButton = this.game.add.button(200,320,"playButton",this.playTheGame,this);
        playButton.anchor.setTo(0.5,0.5);
    },
    update:function(){
        this. fond.tilePosition.x -= 1;
    },

    playTheGame: function(){
        this.game.state.start("main");
    }
}



mainState = {

    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        game.state.backgroundColor = '#FFFFFF';


    },


    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.fond = game.add.tileSprite(0, 0, 490, game.cache.getImage('fond').height, 'fond');
        this.bird=this.game.add.sprite(100,245,'bird');
        game.physics.arcade.enable(this.bird);
        this.pipes=game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(30,'brick',2);
        this.bird.body.gravity.y=1000;
        this.bird.anchor.setTo(-0.2,0.5);


        game.input.onDown.add(this.jump,this);
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
        this.score=0;
        this.labelScore=game.add.text(20,20,"0",{font:"30px Arial",fill:'#ffffff'});


    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
        this. fond.tilePosition.x -= 1;
        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
        if(this.bird.inWorld==false && this.bird.alive==true)
            this.restartGame();

        game.physics.arcade.overlap(this.bird,this.pipes,this.hitPipe,null,this);

        if(this.bird.angle<20)
            this.bird.angle+=1;

    },

    jump: function(){
        if(this.bird.alive==false){
            return;
        }
        this.bird.body.velocity.y=-300;
        var animation=game.add.tween(this.bird);
        animation.to({angle:-20},100);
        animation.start();

    },

    restartGame: function() {
        scorefinal=this.score;
        game.state.start('gameOver');
    },
    addOnePipe: function(x,y){
        var pipe=this.pipes.getFirstDead();
        pipe.reset(x,y);
        pipe.body.velocity.x =-200;
        pipe.checkWorldBounds=true;
        pipe.outOfBoundsKill=true;
    },


    addRowOfPipes: function(){
        this.score+=1;
        this.labelScore.text=this.score;
        var hole=Math.floor(Math.random()*5)+1;
        for(var i= 0;i<16;i++)
            if(i!=hole && i !=hole+1 && i!=hole+2 && i!=hole+3)
                this.addOnePipe(400,i*32);

    },

    hitPipe: function(){
        if(this.bird.alive==false)
            return;

        this.bird.alive=false;
        //game.time.events.remove(this.timer);
        this.pipes.forEachAlive(function(p){p.body.velocity.x=0;},this);



    },




};
gameOverState = {
    create: function(){

        this.fond = game.add.tileSprite(0, 0, 490, game.cache.getImage('fond').height, 'fond');
        this.skull = game.add.sprite(130,0,"skull");
        var playButton = this.game.add.button(200,250,"playButton",this.replayTheGame,this);
        playButton.anchor.setTo(0.5,0.5);
        var menuButton=this.game.add.button(200,400,"menuButton",this.goToMenu,this);
        menuButton.anchor.setTo(0.5,0.5);
        this.labelScore=game.add.text(25,150,"ton score finale est de "+scorefinal+" points!",{font:"25px Arial",fill:'#FF0000'});
        console.log(scorefinal);
    },
    update: function(){
        this. fond.tilePosition.x -= 1;
    },
    replayTheGame: function(){
        game.state.start('main');
    },
    goToMenu:function(){
        game.state.start('menu_flappy')
    }

}




// Add and start the 'main' state to start the game
game.state.add('boot', bootState);
game.state.add('preload', preload);
game.state.add('menu_flappy', menu_flappy);
game.state.add('main', mainState);
game.state.add('gameOver', gameOverState);


game.state.start('boot');