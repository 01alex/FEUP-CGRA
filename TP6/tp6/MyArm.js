/**
* MyArm
* @param gl {WebGLRenderingContext}
* @constructor
*/

function MyArm(scene, movementArm) {

  CGFobject.call(this, scene);

  this.cylinder = new MyCylinder(this.scene, 4, 5, 2, 4);
  this.helix =  new MyHelix(this.scene);
  this.cylinder2 = new MyClosedCylinder(this.scene, 6, 1, 4, 1);

  this.helice1Velo = 5;
  this.helice2Velo = 5;
  this.helice1Angle = 0;
  this.helice2Angle = 0;

  this.lastTime = 0;

  this.movementArm = movementArm; //if it is the movement Arm rotation is positive, if it is the rotation arm, it has a counter clock wise rotation
}

MyArm.prototype = Object.create(CGFobject.prototype);
MyArm.prototype.constructor = MyArm;

MyArm.prototype.setVel1 = function (value){
  this.helice1Velo = value;
}

MyArm.prototype.setVel2 = function (value){
  this.helice2Velo = value;
}


MyArm.prototype.update = function (currTime){
  if(this.lastTime === currTime){
    this.lastTime = currTime;
    return;
  }

  var deltaTime = (currTime - this.lastTime ) / 1000;


  this.helice1Angle += this.helice1Velo * (Math.PI*2) * deltaTime;
  this.helice2Angle += this.helice2Velo * (Math.PI*2) * deltaTime;
  this.lastTime = currTime;
}


MyArm.prototype.display = function () {

  this.scene.pushMatrix();

  this.scene.translate(0,0,-1);
  this.scene.scale(0.1, 0.1, 2.0);
  this.cylinder.display();
  this.scene.popMatrix();

  this.scene.pushMatrix();

  this.scene.translate(0,0.1,0);
  this.scene.pushMatrix();

  this.scene.translate(0,0,1);
  this.scene.scale(0.2,0.2,0.2);
  this.scene.rotate(90*Math.PI/180, 1,0,0);
  this.cylinder2.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();

  this.scene.translate(0,0,-1);
  this.scene.scale(0.2,0.2,0.2);
  this.scene.rotate(90*Math.PI/180, 1,0,0);
  this.cylinder2.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();

  this.scene.translate(0,0,-1);
  this.scene.scale(0.2,0.2,0.2);
  if(this.movementArm) {
  this.scene.rotate(this.helice2Angle, 0,1,0);
} else {
  this.scene.rotate(- this.helice2Angle, 0, 1, 0);
}
  this.helix.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();

  this.scene.translate(0,0,1);
  this.scene.scale(0.2,0.2,0.2);
  if(this.movementArm){
  this.scene.rotate(this.helice1Angle, 0,1,0);
} else {
  this.scene.rotate( - this.helice1Angle, 0,1,0);

}
  this.helix.display();
  this.scene.popMatrix();
  this.scene.popMatrix();


};