function MyLeg(scene) {
 	CGFobject.call(this,scene);
    this.arc = new MyArc(scene, 10);

 };

 MyLeg.prototype = Object.create(CGFobject.prototype);
 MyLeg.prototype.constructor = MyLeg;

 MyLeg.prototype.display = function() {

   this.scene.pushMatrix();

         this.scene.pushMatrix();

            this.scene.translate(0,0,0.3);
            //this.scene.scale(0.05,0.5,0.1);
            this.scene.scale(0.06,0.5,0.7);

            this.arc.display();

          this.scene.popMatrix();


 	this.scene.popMatrix();
 };
