/**
* Target
* @param gl {WebGLRenderingContext}
* @constructor
*/

function Target(scene, x, y, z, size){
	CGFobject.call(this, scene);

	this.cube = new MyUnitCubeQuad(scene, 0, 1, 0, 1);
	this.x = x;
	this.y = y;
	this.z = z;
	this.size = size;
}

Target.prototype = Object.create(CGFobject.prototype);
Target.prototype.constructor = Target;

Target.prototype.display = function() {

  this.scene.pushMatrix();
  this.scene.translate(this.x, this.y, this.z);
  this.scene.scale(this.size, this.size/10, this.size);
  this.scene.targetAppearance.apply();
  this.cube.display();
  this.scene.popMatrix();

}