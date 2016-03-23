/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene){
	CGFobject.call(this, scene);
	this.ucq = new MyUnitCubeQuad(this.scene);
}

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function() {
	
//PERNAS
	this.scene.pushMatrix();
	this.scene.translate(0.15, 1.75, 0.15);
	this.scene.scale(0.3, 3.5, 0.3);
	this.ucq.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0.15, 1.75, 2.85);
	this.scene.scale(0.3, 3.5, 0.3);
	this.ucq.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(4.85, 1.75, 2.85);
	this.scene.scale(0.3, 3.5, 0.3);
	this.ucq.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(4.85, 1.75, 0.15);
	this.scene.scale(0.3, 3.5, 0.3);
	this.ucq.display();
	this.scene.popMatrix();

//TAMPO
	this.scene.pushMatrix();
	this.scene.translate(2.5, 3.65, 1.5);
	this.scene.scale(5, 0.3, 3);
	this.ucq.display();
	this.scene.popMatrix();

};