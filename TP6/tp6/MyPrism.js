/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **Math.single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
	
 	this.vertices = [];
 	this.indices = [];
	this.normals = [];

	//---------------stacks------------------
	for (var q = 0; q < this.stacks; q++) {
		//---------------slices------------------
		for (var i = 0; i < this.slices; i++) {
		
		this.vertices.push(Math.cos(i*(2*Math.PI)/this.slices));
		this.vertices.push(Math.sin(i*(2*Math.PI)/this.slices));
		this.vertices.push(q);

		this.vertices.push(Math.cos((i+1)*(2*Math.PI)/this.slices));
		this.vertices.push(Math.sin((i+1)*(2*Math.PI)/this.slices));
		this.vertices.push(q);

		this.vertices.push(Math.cos(i*(2*Math.PI)/this.slices));
		this.vertices.push(Math.sin(i*(2*Math.PI)/this.slices));
		this.vertices.push(q+1);

		this.vertices.push(Math.cos((i+1)*(2*Math.PI)/this.slices));
		this.vertices.push(Math.sin((i+1)*(2*Math.PI)/this.slices));
		this.vertices.push(q+1);

		}

	}


	//---------------stacks------------------
	for (var q = 0; q < this.stacks; q++) {
		//---------------slices------------------
		for (var i = 0; i < this.slices; i++) {

			this.indices.push(this.slices*4*q+4*i);
			this.indices.push(this.slices*4*q+4*i+1);
			this.indices.push(this.slices*4*q+4*i+2);

			this.indices.push(this.slices*4*q+4*i+3);
			this.indices.push(this.slices*4*q+4*i+2);
			this.indices.push(this.slices*4*q+4*i+1);

		}
	}


	var angle = (2*Math.PI)/this.slices;

	//---------------stacks------------------
	for (var q = 0; q < this.stacks; q++) {
		//---------------slices------------------
			for (var i = 0; i < this.slices; i++) {
	
			this.normals.push(Math.cos(angle*(i+0.5)));
			this.normals.push(Math.sin(angle*(i+0.5)));
			this.normals.push(0);

			this.normals.push(Math.cos(angle*(i+0.5)));
			this.normals.push(Math.sin(angle*(i+0.5)));
			this.normals.push(0);
		
			this.normals.push(Math.cos(angle*(i+0.5)));
			this.normals.push(Math.sin(angle*(i+0.5)));
			this.normals.push(0);

			this.normals.push(Math.cos(angle*(i+0.5)));
			this.normals.push(Math.sin(angle*(i+0.5)));
			this.normals.push(0);

		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
