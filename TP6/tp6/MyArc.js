/**
 * MyCurve
 * @constructor
 */
 function MyArc(scene, slices) {
 	CGFobject.call(this,scene);

	this.slices = slices;

 	this.initBuffers();
 };

 MyArc.prototype = Object.create(CGFobject.prototype);
 MyArc.prototype.constructor = MyArc;

 MyArc.prototype.initBuffers = function()
 {

	var index = 0;

	var x = 0;
	var y = 1;
	var z = 0;

	var n = (Math.PI/2)/this.slices;
	var alpha = 0;

	this.vertices = []; //ARRAYS
	this.indices = [];
	this.normals = [];

	var nx = 0;	//NORMALS
	var ny = 1;
	var nz = 0;

	for(i = 0; i < this.slices; i++)
	{

		if(i == 0)
		{
			this.vertices.push(x,y,z);
			this.vertices.push(x+1,y,z);

			this.normals.push(nx,ny,nz);
			this.normals.push(nx,ny,nz);

			alpha += n;

			y = Math.cos(alpha);
			z = Math.sin(alpha);

			ny = Math.cos(alpha);
			nz = Math.sin(alpha);

			this.vertices.push(x,y,z);
			this.vertices.push(x+1,y,z);

			this.normals.push(nx,ny,nz);
			this.normals.push(nx,ny,nz);

			this.indices.push(index, index +2, index+1);
			this.indices.push(index+1, index+2, index+3);

			this.indices.push(index, index +1, index+2);
			this.indices.push(index+1, index+3, index+2);

			index += 2;

			alpha += n;

			y = Math.cos(alpha);
			z = Math.sin(alpha);

			ny = Math.cos(alpha);
			nz = Math.sin(alpha);

		}
		else
		{

			this.vertices.push(x,y,z);
			this.vertices.push(x+1,y,z);

			this.normals.push(nx,ny,nz);
			this.normals.push(nx,ny,nz);

			alpha += n;

			y = Math.cos(alpha);
			z = Math.sin(alpha);

			ny = Math.cos(alpha);
			nz = Math.sin(alpha);

			this.indices.push(index, index +2, index+1);
			this.indices.push(index+1, index+2, index+3);

			this.indices.push(index, index +1, index+2);
			this.indices.push(index+1, index+3, index+2);

			index += 2;

		}


	}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};
