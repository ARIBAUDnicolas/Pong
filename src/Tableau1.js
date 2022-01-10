class Tableau1 extends Phaser.Scene{

    preload(){
        this.load.image('Balle', 'assets/Images/cercle.png');
        this.load.image('Murs', 'assets/Images/carre.png');


    }

    create(){
        this.hauteur = 500
        this.largeur = 1000



        this.Balle=this.physics.add.image( this.largeur/2-10,this.hauteur/2-10,  'Balle').setOrigin(0,0);
        this.Balle.setDisplaySize(20,20);
        this.Balle.body.setBounce(3,3);
        this.Balle.setVelocityX(Phaser.Math.Between( -200,200));
        this.Balle.setVelocityY(Phaser.Math.Between( -200,200));
        this.Balle.setMaxVelocity(500,500);



        this.Haut=this.physics.add.image(0,0, 'Murs').setOrigin(0,0);
        this.Haut.setDisplaySize(this.largeur,20);
        this.Haut.body.setAllowGravity(false);
        this.Haut.setImmovable(true);


        this.Bas=this.physics.add.image(0,this.hauteur-20, 'Murs').setOrigin(0,0);
        this.Bas.setDisplaySize(this.largeur,20);
        this.Bas.body.setAllowGravity(false);
        this.Bas.setImmovable(true);


        this.gauche=this.physics.add.image(50,200, 'Murs').setOrigin(0,0);
        this.gauche.setDisplaySize(20,100);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);


        this.droite=this.physics.add.image(this.largeur-70,200, 'Murs').setOrigin(0,0);
        this.droite.setDisplaySize(20,100);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);


        this.physics.add.collider(this.Balle,this.Bas);
        this.physics.add.collider(this.Balle,this.Haut);
        this.physics.add.collider(this.Balle,this.droite);
        this.physics.add.collider(this.Balle,this.gauche);




    };

    update(){

        if (this.Balle.x>this.largeur){
            this.Balle.x = 0
        }

        if (this.Balle.x<0){
            this.Balle.x = this.largeur
        }

        if (this.Balle.y<0){
            this.Balle.y = 0
        }
        if (this.Balle.y>this.hauteur){
            this.Balle.y = this.hauteur
        }

    }

}
