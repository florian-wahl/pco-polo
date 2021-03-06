/**
 * Created by Florian on 13/11/2015.
 */

function movementControllerCursors(maxSpeed) {

    player.body.velocity.set(0);

    /*GESTION AVEC LE CLAVIER*/
    if(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown ||cursors.down.isDown){

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -maxSpeed;
        }
        if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = maxSpeed;
        }
        if (cursors.up.isDown){

            //Move to the top
            player.body.velocity.y = -maxSpeed;
        }
        if (cursors.down.isDown){

            //Move to the down
            player.body.velocity.y = maxSpeed;
        }
    }
    else
    {
        player.body.velocity.set(0);
    }

}



function movementControllerJoystick (maxSpeed) {

    /*GESTION AVEC LE JOYSTICK*/

    var speed = game.touchControl.speed;
    var delay = 0;

    player.body.velocity.y = -speed.y * 3.5;//coordonn�es sont invers�es
    player.body.velocity.x = -speed.x * 3.5;
    // Also you could try linear speed;
    //this.tilesprite.tilePosition.y += this.game.touchControl.speed.y / 20;
    //this.tilesprite.tilePosition.x += this.game.touchControl.speed.x / 20;

    if (Math.abs(speed.y) < Math.abs(speed.x)){
        delay = parseInt(1000 / Math.abs((easeInSpeed(speed.x)) * 10), 10);

        // moving mainly right or left
        if (game.touchControl.cursors.left) {
            player.play('left');
        } else if (game.touchControl.cursors.right) {
            player.play('right');
        }
    } else if (Math.abs(speed.y) > Math.abs(speed.x)){
        delay = parseInt(1000 / Math.abs((easeInSpeed(speed.y)) * 10), 10);
        // moving mainly up or down
        if (game.touchControl.cursors.up) {
            player.play('up');
        } else if (game.touchControl.cursors.down) {
            player.play('down');
        }
    } else {
        player.animations.stop();
        player.frame = 4;
    }

    // this is a little hack, if the next frame its really slow and we have speed up things we will
    // have to wait for _timeNextFrame to se the fps updated
    /*this.character.animations.currentAnim.delay = delay;
    if(delay && (this.character.animations.currentAnim._timeNextFrame - this.time.now) > delay){
        this.character.animations.currentAnim._timeNextFrame = this.time.now + delay;
    }*/

}

var easeInSpeed = function(x){
    return x * Math.abs(x) / 2000;
};
