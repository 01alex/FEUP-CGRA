/**
 * MyDrone
 * @constructor
 */
 
var degToRad = Math.PI / 180.0;

function MyDrone(scene) {
	
	CGFobject.call(this,scene);

	this.yRot = 15 * degToRad;
	this.x = -7.5 - Math.sin(this.yRot);
	this.y = 0;
	this.z = -8.5;

	this.lastUpdate = -1;

	this.initBuffers();
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

MyDrone.prototype.initBuffers = function() {
    
 	this.vertices = [
 		0.5, 0.3, 0,
 		-0.5, 0.3, 0,
 		0, 0.3, 2,
 	];

 	this.indices = [
 		0, 1, 2,
 	];

	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};

/*MyDrone.prototype.display = function(){
	this.scene.pushMatrix();
	this.scene.rotate(180 * degToRad, 0, 1, 0);
	this.scene.translate(-7.5 - Math.sin(15*degToRad), 0, -8.5);
	this.scene.rotate(15 * degToRad, 0 , 1 ,0);
	this.scene.popMatrix();
};*/

MyDrone.prototype.update = function(currTime){
	if(this.lastUpdate == -1)
		this.lastUpdate = currTime;

	var diff = currTime - this.lastUpdate;


	this.lastUpdate = currTime;
};

MyDrone.prototype.rotateLeft = function(speed){
	this.yRot += speed * degToRad;
}

MyDrone.prototype.rotateRight = function(speed){
	this.yRot -= speed * degToRad;
}

MyDrone.prototype.moveForward = function(speed){
	this.x += Math.sin(this.yRot) * (speed / 15);
	this.z += Math.cos(this.yRot) * (speed / 15);
}

MyDrone.prototype.moveBack = function(speed){
	this.x -= Math.sin(this.yRot) * (speed / 15);
	this.z -= Math.cos(this.yRot) * (speed / 15);
}

MyDrone.prototype.moveUp = function(speed){
	this.y += (speed / 15);	
}

MyDrone.prototype.moveDown = function(speed){
	this.y -= (speed / 15);
}

