/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
	
 	this.vertices = [];
 	this.indices = [];
	this.normals = [];

	var stack = 1/this.stacks;
	//---------------stacks------------------
	for (var q = 0; q <= 1;) {
		//---------------slices------------------
		for (var i = 0; i < this.slices; i++) {
			this.vertices.push(Math.sqrt(1-(q*q))*Math.cos(i*(2*Math.PI)/this.slices));
			this.vertices.push(Math.sqrt(1-(q*q))*Math.sin(i*(2*Math.PI)/this.slices));
			this.vertices.push(q);

			this.normals.push(Math.sqrt(1-(q*q))*Math.cos(i*(2*Math.PI)/this.slices));
			this.normals.push(Math.sqrt(1-(q*q))*Math.sin(i*(2*Math.PI)/this.slices));
			this.normals.push(q);
		}

		q = q + stack;
	}

	for (var q = 0; q < this.stacks; q++) {
		//---------------slices------------------
		for (var i = 0; i < this.slices; i++) {

			this.indices.push(this.slices*q+i);
			this.indices.push(this.slices*q+i+1);
			this.indices.push(this.slices*(q+1)+i);
			if (i != (this.slices - 1)) {
				this.indices.push(this.slices*(q+1)+i+1);
				this.indices.push(this.slices*(q+1)+i);
				this.indices.push(this.slices*q+i+1);
				}
			else {
				this.indices.push(this.slices*q);
				this.indices.push(this.slices*q+i+1)
				this.indices.push(this.slices*q+i);
				}
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
