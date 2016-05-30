/**
* MyCable
* @param gl {WebGLRenderingContext}
* @constructor
*/
var degToRad = Math.PI / 180.0;

function MyCable(scene) {
  CGFobject.call(this,scene);

  this.cable = new MyCylinder(this.scene, 3, 5, 2, 4);
  this.hook = new MyHook(this.scene);

  this.height = 1; //z scale of the cable - this vale should stay between the floor and the drone's base
  this.strain = 0;
  this.elevationSpeed = 3; //Elevation Speed
  this.tempValue = 0; //temp value of the position
  this.lastTime=0;

  this.transporting = false;
  this.picks = 0;

};

MyCable.prototype = Object.create(CGFobject.prototype);
MyCable.prototype.constructor = MyCable;

MyCable.prototype.elevate = function(direction){
  this.strain = direction  *  this.elevationSpeed; //this is the displacement associated to the cable's elevation
}

MyCable.prototype.update = function(currTime){

  if(this.lastTime === 0){
    this.lastTime = currTime;
    return;
  }


  if(this.scene.drone.caught()){
    //this.transporting = true;
    this.picks++;
  }

  if(!this.scene.box.onTarget){
    if(this.scene.drone.drop()){
      //this.transporting = false;
      this.scene.box.x = this.scene.target.x;
      this.scene.box.y = this.scene.target.y;
      this.scene.box.z = this.scene.target.z;
    }
}
  
  this.elevationSpeed = this.scene.speed;   //link to gui slider

  //Strain calculation

  var deltaTime = (currTime - this.lastTime)/1000;

  this.tempValue += (this.strain - this.tempValue) * (deltaTime * 10);

  if(this.height > 0.5 && this.tempValue < 0 || this.tempValue > 0){ // the cable cannot go above the drone's base. This fixes the position
    this.height += this.tempValue*deltaTime; //total strain -> final height that corresponds to the z scale
  }

  if(this.height > 4)
    this.height = 4;

  this.lastTime = currTime;

}

MyCable.prototype.display = function(){
  this.scene.pushMatrix();

  this.scene.rotate(90*degToRad, 1, 0, 0);
  this.scene.scale(0.02, 0.02, this.height);
  this.scene.steelAppearance.apply();
  this.cable.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();
  
  this.scene.translate(0, -this.height, 0);
  this.scene.steelAppearance.apply();
  this.hook.display();
  this.scene.popMatrix();
}
