
class Tableau1 extends Phaser.Scene{


    preload(){
        this.load.image('Balle', 'Assets/Images/cercle.png');
        this.load.image('Murs', 'Assets/Images/carre.png');
        this.load.image('particle', 'Assets/Images/particle.png');
        this.load.image('BG', 'Assets/Images/fond.jpg');
        this.load.image('particle1', 'Assets/Images/particle1.png');

    }

    getFrames(prefix,length){
        let frames=[];
        for (let i=1;i<=length;i++){
            frames.push({key: prefix+i});
        }
        return frames;
    }

    create(){

        this.bg = this.add.image(0, 0, 'BG').setOrigin(0, 0);

        this.hauteur = 500
        this.largeur = 1000
        this.speedX = 0
        while(this.speedX===0){
            this.speedX = 500*Phaser.Math.Between(-1,1)
        }
        this.speedY = Phaser.Math.Between(-500, 500)
        this.maxspeed = 500

        this.balle = this.physics.add.image(this.largeur/2, this.hauteur/2, 'Balle')
        this.balle.setDisplaySize(40, 40)
        this.balle.body.setBounce(1,1);
        this.balle.body.setAllowGravity(false)

        let particles = this.add.particles('particle');

        let emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.02, end: 0 },
            blendMode: 'ADD'
        });
        emitter.startFollow(this.balle);

        this.haut = this.physics.add.sprite(0, 0, 'Murs').setOrigin(0, 0)
        this.haut.setDisplaySize(this.largeur, 20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true);


        this.bas = this.physics.add.sprite(0, 480, 'Murs').setOrigin(0, 0)
        this.bas.setDisplaySize(this.largeur, 20)
        this.bas.body.setAllowGravity(false)
        this.bas.setImmovable(true);


        this.player1 = this.physics.add.sprite(50, 360, 'Murs')
        this.player1.setDisplaySize(20, 100)
        this.player1.body.setAllowGravity(false)


        let particles1 = this.add.particles('particle');
        let emitterP1 = particles.createEmitter({
            speed: 30,
            scale: { start: 0.02, end: 0 },
            blendMode: 'ADD'
        });
        emitterP1.startFollow(this.player1);



        this.player2 = this.physics.add.sprite(920, 360, 'Murs')
        this.player2.setDisplaySize(20, 100)
        this.player2.body.setAllowGravity(false)

        let emitterP2 = particles.createEmitter({
            speed: 30,
            scale: { start: 0.02, end: 0 },
            blendMode: 'ADD'
        });
        emitterP2.startFollow(this.player2);


        this.player1.setImmovable(true)
        this.player2.setImmovable(true)






        let me = this;
        this.physics.add.collider(this.player1, this.balle,function(){
            console.log('touche player 1')
            me.rebond(me.player1)
        })
        this.physics.add.collider(this.player2, this.balle,function(){
            console.log('touche player 2')
            me.rebond(me.player2)
        })

        this.physics.add.collider(this.balle, this.bas)
        this.physics.add.collider(this.balle, this.haut)

        this.balle.setMaxVelocity(this.maxspeed,this.maxspeed)

        this.physics.add.collider(this.haut, this.player1)
        this.physics.add.collider(this.bas, this.player1)

        this.physics.add.collider(this.haut, this.player2)
        this.physics.add.collider(this.bas, this.player2)

        this.player1Speed = 0
        this.player2Speed = 0

        this.joueurGauche = new Joueur('Trigger','joueurGauche')
        this.joueurDroite = new Joueur('Count','joueurDroite')
        console.log(this.joueurGauche)

        this.balleAucentre();
        this.initKeyboard();





    }

    rebond(players){
        let me = this ;
        console.log(this.player1.y);
        console.log(me.balle.y);
        let hauteurPlayers = players.displayHeight;

        let positionRelativePlayers = (this.balle.y - players.y);

        positionRelativePlayers= (positionRelativePlayers / hauteurPlayers)
        positionRelativePlayers = positionRelativePlayers*2-1;

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativePlayers * 100);

    }

    balleAucentre(){
        this.balle.x = this.largeur/2
        this.balle.y = this.hauteur/2
        this.speedX = 0

        this.balle.setVelocityX(Math.random()>0.5?-300:300)
        this.balle.setVelocityY(0)
    }

    /**
     *
     * @param {Joueur} joueur
     */
    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }

    update(){
        if(this.balle.x>this.largeur){
            this.win(this.joueurGauche);
        }
        if(this.balle.x<0){
            this.win(this.joueurDroite);
        }
        this.player1.y += this.player1Speed
        this.player2.y += this.player2Speed

        if (this.player1.y<60){
            this.player1.y = 60
        }
        if (this.player1.y>this.hauteur-60){
            this.player1.y =this.hauteur-60
        }
        if (this.player2.y<60){
            this.player2.y = 60
        }
        if (this.player2.y>this.hauteur-60){
            this.player2.y =this.hauteur-60
        }
    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.player1Speed = -7
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.player1Speed = 7
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.player2Speed = -7
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.player2Speed = 7
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.X:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.player2Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.N:
                    me.player2Speed = 0
                    break;
            }
        });
    }
}




