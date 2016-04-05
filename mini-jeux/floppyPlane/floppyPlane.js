// Initialize Phaser, and create a 400x490px game
var game = new Phaser.Game(550, 600, Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game
var mainState;
var bootState;
var preload;
var menu_flappy;
var gameOverState;
var scorefinal=0;
var lives = 3;
bootState= {
    preload: function(){
        this.game.load.image("loading","res/loading.png");
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
        game.load.image('plane', 'res/plane.png');
        game.load.spritesheet('brick', 'res/bricks.png', 32, 32, 4);
        game.load.image('fond', 'res/back.jpg');
        game.load.image('playButton','res/playButton.png');
        game.load.image('title', 'res/floppy_plane_title.png');
        game.load.image('end','res/game_over.png');
        game.load.image('menuButton','res/menuButton.png');
    },

    create: function(){
        this.game.state.start("menu_flappy");
    }
}

menu_flappy={
    create: function() {
        this.fond = game.add.tileSprite(0, 0, 550, game.cache.getImage('fond').height, 'fond');
        this.title = game.add.sprite(150,100,"title");
        var playButton = this.game.add.button(270,320,"playButton",this.playTheGame,this);
        playButton.anchor.setTo(0.5,0.5);
        this.labelVie = game.add.text(175, 450, "Vies restantes : " + lives, {
            font: "25px Arial",
            fill: '#080A39'
        });
        this.labelScore = game.add.text(170, 480, " Score : " + scorefinal + " points !", {
            font: "25px Arial",
            fill: '#080A39'
        });
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
        this.fond = game.add.tileSprite(0, 0, 550, game.cache.getImage('fond').height, 'fond');
        this.plane=this.game.add.sprite(100,245,'plane');
        game.physics.arcade.enable(this.plane);
        this.pipes=game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(30,'brick',2);
        this.plane.body.gravity.y=1000;
        this.plane.anchor.setTo(-0.2,0.5);


        game.input.onDown.add(this.jump,this);
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
        this.score=-1;
        this.labelScore=game.add.text(20,20,"0",{font:"30px Arial",fill:'#ffffff'});


    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
        this. fond.tilePosition.x -= 1;
        game.physics.arcade.overlap(this.plane, this.pipes, this.dead, null, this);
        if(this.plane.inWorld==false && this.plane.alive==true)
            this.dead();

        game.physics.arcade.overlap(this.plane,this.pipes,this.hitPipe,null,this);

        if(this.plane.angle<20)
            this.plane.angle+=1;

    },

    jump: function(){
        if(this.plane.alive==false){
            return;
        }
        this.plane.body.velocity.y=-300;
        var animation=game.add.tween(this.plane);
        animation.to({angle:-20},100);
        animation.start();

    },

    dead : function () {
        scorefinal= (this.score < 0) ? 0 : this.score;
        if( lives > 1 ){
            lives--;
            this.state.start('menu_flappy');
        }
        else {

            this.state.start('gameOver');
        }
    },

    restartGame: function() {
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
        for(var i= 0;i<19;i++)
            if(i!=hole && i !=hole+1 && i!=hole+2 && i!=hole+3)
                this.addOnePipe(550,i*32);

    },

    hitPipe: function(){
        if(this.plane.alive==false)
            return;

        this.plane.alive=false;
        //game.time.events.remove(this.timer);
        this.pipes.forEachAlive(function(p){p.body.velocity.x=0;},this);



    }


};
gameOverState = {
    create: function(){

        this.fond = game.add.tileSprite(0, 0, 550, game.cache.getImage('fond').height, 'fond');
        this.end = game.add.sprite(150,100,"end");
        var menuButton=this.game.add.button(270,400,"menuButton",this.goToMenu,this);
        menuButton.anchor.setTo(0.5,0.5);
        this.labelScore = game.add.text(90, 250, "Votre score final est de " + scorefinal + " points !", {
            font: "25px Arial",
            fill: '#080A39'
        });
        console.log(scorefinal);
    },
    update: function(){
        this. fond.tilePosition.x -= 1;
    },
    replayTheGame: function(){
        game.state.start('main');
    },
    goToMenu:function(){
        location.href = "../../menu_mini_jeux.php";
    }

};




// Add and start the 'main' state to start the game
game.state.add('boot', bootState);
game.state.add('preload', preload);
game.state.add('menu_flappy', menu_flappy);
game.state.add('main', mainState);
game.state.add('gameOver', gameOverState);


game.state.start('boot');