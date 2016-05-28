function MyCircle(scene, slices) {
 	CGFobject.call(this,scene);

	this.slices = slices;
	var angle = 360 / this.slices;
	this.aRad = (angle * Math.PI) / 180;
 	this.initBuffers();
 };

 MyCircle.prototype = Object.create(CGFobject.prototype);
 MyCircle.prototype.constructor = MyCircle;

 MyCircle.prototype.initBuffers = function() {

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

  var verts = 0;
  var ang = 0;
  var indiceTemp = 0;

  for(var i = 0 ; i < this.slices; i++){

    var x = Math.cos(ang);
    var y = Math.sin(ang);

    this.vertices.push(x,y,1);
    this.normals.push(0,0,1);

    if(i < this.slices - 2 )
        this.indices.push(indiceTemp, indiceTemp + i + 1, indiceTemp + i + 2);

    var s = (x+1) /2.0;

    var v = ((y*-1)+1) /2.0;

    this.texCoords.push( s, v);

    ang += this.aRad;
}


this.primitiveType = this.scene.gl.TRIANGLES;
this.initGLBuffers();
 };
