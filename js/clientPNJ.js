/*
 * Permet de créer un client et de gérer sa physique dans le jeux
 */

function Client(clan, couleur, posX, posY){
    this.clan = clan;
    this.couleur = couleur;
    this.posX = posX;
    this.posY = posY;

    this.gameSprite = game.add.sprite(this.posX, this.posY, this.clan+this.couleur);
    game.physics.arcade.enable(this.gameSprite);
    this.gameSprite.body.immovable = true;
    this.gameSprite.body.collideWorldBounds = true;

    this.velocity = 50;
}

Client.prototype.getSprite = function() {
    return this.gameSprite;
};

var mov1 = true;
var mov2 = false;
var mov3 = false;
var mov4 = false;

Client.prototype.move = function(){
    actPosX = this.gameSprite.x;
    actPosY = this.gameSprite.y;


    if(mov1){
        this.gameSprite.body.velocity.x = this.velocity;
        this.gameSprite.body.velocity.y = 0;

        if (actPosX > this.posX+100){
            mov2 = true;
            mov1 = false;
        }
    }
    else if (mov2){
        this.gameSprite.body.velocity.x = 0;
        this.gameSprite.body.velocity.y = this.velocity;
        //this.gameSprite.play('down');

        if (actPosY > this.posY+100){
            mov3 = true;
            mov2 = false;
        }
    }
    else if (mov3){
        this.gameSprite.body.velocity.x = -this.velocity;
        this.gameSprite.body.velocity.y = 0;

        if (actPosX < this.posX){
            mov4 = true;
            mov3 = false;
        }
    }
    else if (mov4){
        this.gameSprite.body.velocity.x = 0;
        this.gameSprite.body.velocity.y = -this.velocity;

        if (actPosY < this.posY){
            mov1 = true;
            mov4 = false;
        }
    }


};
