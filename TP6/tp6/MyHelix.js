var degToRad = Math.PI / 180.0;


function MyHelix(scene) {
 	CGFobject.call(this,scene);
 	this.base = new MyLamp(this.scene,6,2);
  this.helix = new MyCylinder(this.scene,4,1,1,1);
 };

 MyHelix.prototype = Object.create(CGFobject.prototype);
 MyHelix.prototype.constructor = MyHelix;

 MyHelix.prototype.display = function() {

    this.scene.pushMatrix();
        this.scene.translate(0,0.3,0);

        this.scene.pushMatrix();
            this.scene.translate(0,0,-2);
            this.scene.scale(0.2,0.05,4);
            this.helix.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.rotate(90*degToRad,0,1,0);
            this.scene.translate(0,0,-2);
            this.scene.scale(0.2,0.05,4);
            this.helix.display();
        this.scene.popMatrix();
        this.scene.translate(0,-0.3,0);
     this.base.display();

    this.scene.popMatrix();
 };
