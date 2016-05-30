/**
* MyUnitCubeQuad
* @param gl {WebGLRenderingContext}
* @constructor
*/
function MyUnitCubeQuad(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.quad = new MyQuad(this.scene, minS, maxS, minT, maxT);
	this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function() {
	this.scene.pushMatrix();

	//Face frente
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	
	//Face tras
	this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();

	//Face direita
	this.scene.rotate(Math.PI/2, 0.0, 1.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();

	//Face esquerda
	this.scene.rotate(-Math.PI/2, 0.0, 1.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();

	//Face baixo
	this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();

	//Face cima
	this.scene.rotate(-Math.PI/2, 1.0, 0.0, 0.0);
	this.scene.translate(0.0,0.0,0.5);
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();

	this.scene.popMatrix();
}
