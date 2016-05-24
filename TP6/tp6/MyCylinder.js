/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks, numRepX, numRepY) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
	var angulo = 360 / this.slices;
	this.aRad = (angulo * Math.PI) / 180;
	this.aRad2 = this.aRad / 2;
	this.numRepX = numRepX || 1;
	this.numRepY = numRepY || 1;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {


 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

	var ang = 0;
	//Usar pop() e push()
	for(var z = 0 ; z <= this.stacks ; z++){
		for(var i = 0 ; i < this.slices; i++){

			var x = Math.cos(ang);
			var y = Math.sin(ang);

			this.vertices.push(x,y,z/this.stacks);
			this.normals.push(x,y,0);

			var s = i/this.slices;

			var v = z/this.stacks;

			if( i > this.slices/2){
				s = (this.slices - i)/this.slices;
			}

			this.texCoords.push( s * this.numRepX, v * this.numRepY);

			ang += this.aRad;
		}
	}

	for(var i = 0 ; i < this.stacks; i++){
		var limit = (i * this.slices) + this.slices;
		for(var j = i * this.slices ; j < limit ; j++){
			if(j == (limit-1)){
				this.indices.push(j,j+1,j+this.slices);
				this.indices.push(j,(j+1)-this.slices,j+1);
				continue;
			}
			this.indices.push(j,j+1,j+this.slices + 1);
			this.indices.push(j,j+1+this.slices, j + this.slices);
		}
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
