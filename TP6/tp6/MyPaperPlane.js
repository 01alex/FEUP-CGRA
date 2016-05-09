/**
 * MyPaperPlane
 * @constructor
 */
 var degToRad = Math.PI / 180.0;


 function MyPaperPlane(scene, xCoord, zCoord) {
 	CGFobject.call(this,scene);

	this.xTranslation = xCoord;
	this.yTranslation = 3.7;
	this.zTranslation = zCoord;
	this.rotZ = -10;
	this.rotX = 0;
	this.lastUpdate = -1;
	this.elapsedTime = 0;

 	this.initBuffers();
 };

 MyPaperPlane.prototype = Object.create(CGFobject.prototype);
 MyPaperPlane.prototype.constructor = MyPaperPlane;

 MyPaperPlane.prototype.initBuffers = function() {
    
 	this.vertices = [];
 	this.indices = [];
	this.normals = [];
    

	this.vertices.push(0, 0, 0.3);
	this.vertices.push(0, 0, -0.3);
	this.vertices.push(-1, 0, 0);
	this.vertices.push(-1, 0, 0);
	this.vertices.push(0, 0, 0);
	this.vertices.push(0, -0.2, 0);
	this.vertices.push(-1, 0, 0);
	this.vertices.push(0, 0, 0);
	this.vertices.push(0, -0.2, 0);
	this.vertices.push(0, 0, 0.3);
	this.vertices.push(0, 0, -0.3);
	this.vertices.push(-1, 0, 0);

	this.normals.push(0,1,0);
	this.normals.push(0,1,0);
	this.normals.push(0,1,0);
	this.normals.push(0,0,1);
	this.normals.push(0,0,1);
	this.normals.push(0,0,1);
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(0,0,-1);
	this.normals.push(0,-1,0);
	this.normals.push(0,-1,0);
	this.normals.push(0,-1,0);

	this.indices.push(0,1,2);
	this.indices.push(3,5,4);
	this.indices.push(6,7,8);
	this.indices.push(11,10,9);
	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };



MyPaperPlane.prototype.update = function(currTime) {
	if (this.lastUpdate == -1)
		this.lastUpdate = currTime;

	var diff = currTime - this.lastUpdate;

	if (this.xTranslation > 0.9 && this.elapsedTime > 1000) {
		this.xTranslation -= (diff * (7/1000));
		this.yTranslation += (diff * (0.8/1000));
	}
	else if (this.yTranslation > 0.2 && this.elapsedTime > 1000) {
		this.yTranslation -= (diff *(7/1000));
		this.rotZ -= (diff * 245/1000);
		this.rotX -= (diff * 500/1000);
	}
	else this.elapsedTime += diff;

	this.lastUpdate = currTime;
}