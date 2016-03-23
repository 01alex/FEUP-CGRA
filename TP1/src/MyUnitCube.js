/**
 * MyUnitCube (malha de triangulos)
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);
	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
			-0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,
			-0.5, 0.5, 0.5,		
			0.5, 0.5, 0.5,
			-0.5, 0.5, -0.5,
			0.5, 0.5, -0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, -0.5
			];

	this.indices = [
		//FRONT
		0, 1, 2,
		3, 2, 1,
		//TOP
		2, 3, 4,
		5, 4, 3,
		//BACK
		7, 6, 5,
		4, 5, 6,
		//BOTTOM
		1, 0, 7,
		6, 7, 0,
		//LEFT
		6, 0, 4,
		2, 4, 0,
		//RIGHT
		1, 7, 3,
		5, 3, 7
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};