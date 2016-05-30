/**
* MyLamp
* @constructor
*/
function MyLamp(scene, slices, stacks) {
  CGFobject.call(this,scene);

  this.slices = slices;
  this.stacks = stacks;
  var angulo = 360 / this.slices;
  this.aRad = (angulo * Math.PI) / 180;
  angulo = 90 / this.stacks;
  this.aRadS = (angulo * Math.PI) / 180;

  this.initBuffers();
};

MyLamp.prototype = Object.create(CGFobject.prototype);
MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {


  this.vertices = [];
  this.indices = [];
  this.normals = [];
  this.texCoords = [];

  //Angulo entre o plano xOy e z;
  var fi = this.aRadS;
  //Angulo entre x e y;
  var teta;

  var triN = 0;

  for(var j = 0; j < this.slices; j++){
    teta = j * this.aRad;
    for(var i = 0; i < this.stacks; i++){
      var x,y,z;
      if(i == 0){
        z = Math.sin(i*fi) * Math.cos(teta);
        x = Math.sin(i*fi) * Math.sin(teta);
        y = Math.cos(i*fi);
        //adicionar vertices
        this.vertices.push(x,y,z);
        this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);
        this.normals.push(x,y,z);

        z = Math.sin(i*fi+this.aRadS) * Math.cos(teta);
        x = Math.sin(i*fi+this.aRadS) * Math.sin(teta);
        y = Math.cos(i*fi+this.aRadS);
        this.vertices.push(x,y,z);
        this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);
        this.normals.push(x,y,z);

        z = Math.sin(i*fi+this.aRadS) * Math.cos(teta+this.aRad);
        x = Math.sin(i*fi+this.aRadS) * Math.sin(teta+this.aRad);
        y = Math.cos(i*fi+this.aRadS);
        this.vertices.push(x,y,z);
        this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);
        this.normals.push(x,y,z);

        this.indices.push(triN);
        this.indices.push(triN + 1);
        this.indices.push(triN + 2);
        triN+=3;

        continue;
      }

      z = Math.sin(i*fi) * Math.cos(teta);
      x = Math.sin(i*fi) * Math.sin(teta);
      y = Math.cos(i*fi);
      this.vertices.push(x,y,z);
      this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);
      this.normals.push(x,y,z);

      z = Math.sin(i*fi+this.aRadS) * Math.cos(teta);
      x = Math.sin(i*fi+this.aRadS) * Math.sin(teta);
      y = Math.cos(i*fi+this.aRadS);
      this.vertices.push(x,y,z);
      this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);
      this.normals.push(x,y,z);

      z = Math.sin(i*fi) * Math.cos(teta+this.aRad);
      x = Math.sin(i*fi) * Math.sin(teta+this.aRad);
      y = Math.cos(i*fi);
      this.vertices.push(x,y,z);
      this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);
      this.normals.push(x,y,z);

      z = Math.sin(i*fi + this.aRadS) * Math.cos(teta+this.aRad);
      x = Math.sin(i*fi + this.aRadS) * Math.sin(teta+this.aRad);
      y = Math.cos(i*fi + this.aRadS);
      this.vertices.push(x,y,z);
      this.texCoords.push( (x+1) / 2.0, ((z*-1)+1)/2.0);
      this.normals.push(x,y,z);


      this.indices.push(triN);
      this.indices.push(triN + 1);
      this.indices.push(triN + 2);

      this.indices.push(triN + 1);
      this.indices.push(triN + 3);
      this.indices.push(triN + 2);
      triN+=4;

    }
  }


  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};
