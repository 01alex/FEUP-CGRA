function MyClosedCylinder(scene, slices , stacks, u, v) {
  CGFobject.call(this,scene);

  this.cilinder = new MyCylinder(scene, slices, stacks, u , v);
  this.circle =  new MyCircle(scene, slices);


};

MyClosedCylinder.prototype = Object.create(CGFobject.prototype);
MyClosedCylinder.prototype.constructor = MyClosedCylinder;

MyClosedCylinder.prototype.display = function() {

  this.scene.pushMatrix();

  this.cilinder.display();

  this.circle.display();

  this.scene.translate(0,0,1);
  this.scene.rotate(Math.PI,1,0,0);

  this.circle.display();


  this.scene.popMatrix();
}
