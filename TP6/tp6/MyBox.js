/**
* MyBox
* @constructor
*/

function MyBox(scene, x, y, z, size) {
  
  CGFobject.call(this,scene);

  this.box = new MyUnitCubeQuad(scene, 0, 1, 0, 1);
  this.x = x;
  this.y = y;
  this.z = z;

  this.size = size;
  this.onTarget = false;

};

MyBox.prototype = Object.create(CGFobject.prototype);
MyBox.prototype.constructor = MyBox;

MyBox.prototype.display = function() {

  this.scene.pushMatrix();
  this.scene.translate(this.x, this.y, this.z);
  this.scene.scale(this.size, this.size, this.size);
  if(this.scene.drone.cable.transporting)
    this.scene.targetAppearance.apply();
  else this.scene.boxAppearance.apply();
  //console.log(this.scene.drone.cable.transporting);
  this.box.display();
  this.scene.popMatrix();

}

MyBox.prototype.scenePosition = function() {  //ex 6.4
  var position = [this.x, this.y, this.z];

  return position;
}

MyBox.prototype.moveY = function(displacementY) {

  this.y += displacementY;
  
  if(this.y < 0.5) //bottom limit
    this.y = 0.5;
  else if (this.y >= this.scene.drone.y)
    this.y -= displacementY;

}

MyBox.prototype.moveX = function(displacementX) {
  this.x += displacementX;
}

MyBox.prototype.moveZ = function (displacementZ) {
  this.z += displacementZ;
}