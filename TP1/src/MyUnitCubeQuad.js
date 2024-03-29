/**
 * MyUnitCubeQuad (objeto composto)
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene){
	CGFobject.call(this, scene);
	this.quad = new MyQuad(this.scene);
	this.quad.initBuffers();
}

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function() {
 
    //face frente
 	this.scene.pushMatrix();
    this.scene.translate(0.0, 0.0, 0.5);
    this.quad.display();
    this.scene.popMatrix();
 
 
    //face tras
 	this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
    this.scene.translate(0.0, 0.0, 0.5);
    this.quad.display();
    this.scene.popMatrix();
 
 
    //face de cima
    this.scene.pushMatrix();
    this.scene.translate(0.0, 0.5, 0.0);
    this.scene.rotate(-Math.PI/2, 1.0, 0.0, 0.0);
    this.quad.display();
    this.scene.popMatrix();
 
 
    //face de baixo
    this.scene.pushMatrix();
    this.scene.translate(0.0, -0.5, 0.0);
    this.scene.rotate(Math.PI/2, 1.0, 0.0, 0.0);
    this.quad.display();
    this.scene.popMatrix();

 
    //face esquerda
 	this.scene.pushMatrix();
    this.scene.translate(-0.5, 0.0, 0.0);
    this.scene.rotate(-Math.PI/2, 0.0, 1.0, 0.0);
    this.quad.display();
    this.scene.popMatrix();
 
 
    //face direita
 	this.scene.pushMatrix();
    this.scene.translate(0.5, 0.0, 0.0);
    this.scene.rotate(Math.PI/2, 0.0, 1.0, 0.0);
    this.quad.display();
    this.scene.popMatrix();

	
};