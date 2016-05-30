/**
* MyHook
* @param gl {WebGLRenderingContext}
* @constructor
*/
var degToRad = Math.PI / 180.0;

function MyHook(scene) {
	CGFobject.call(this,scene);

	this.arc = new MyArc(scene, 10);

};

MyHook.prototype = Object.create(CGFobject.prototype);
MyHook.prototype.constructor = MyHook;


MyHook.prototype.display = function(){
	this.scene.pushMatrix();

	this.scene.pushMatrix();

	this.scene.translate(0,0.2,0.0);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.scene.scale(0.02,0.2,0.2);

	this.arc.display();

	this.scene.popMatrix();


	this.scene.popMatrix();

}
