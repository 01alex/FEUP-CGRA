var degToRad = Math.PI / 180.0;

function MyDrone(scene, x, y, z, angle) {

  CGFobject.call(this,scene);

  this.shape = new MyDroneObject(scene);

  //Initial Positions and Angles
  this.x = x;
  this.y = y;
  this.z = z;

  this.defaultAngle = angle;  //initial angle - Initial Movement Angle
  this.lastAngle = angle; //end movement Angle

  //Lean And Movement

  this.defaultAngleY = 0;
  this.defaultLeanAngle = 25 * degToRad;
  this.motion = 0;
  this.lastMotion = 0;

  //Elevation
  this.elevation = 0;
  this.totalElevation = 0;

  this.rotation = 0;
  this.lastRotation = 0;

  //Velocity
  this.moveVel = 10;
  this.rotationVel = 200;
  this.elevationVel = 2;

  this.heliceFactor = 1;
  this.heliceVeloL = 0.2;
    this.heliceVeloN = 1;
    this.heliceVeloR = 10;

  this.lastTime = 0;
};


MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

MyDrone.prototype.movement = function(direction) {
  this.motion = direction * this.moveVel;
}

MyDrone.prototype.elevate = function(direction) {
  this.elevation = direction * this.elevationVel;
}

MyDrone.prototype.rotate = function(angle){
  this.rotation = angle * this.rotationVel;
}


MyDrone.prototype.update = function(currTime) {
  this.shape.update(currTime);

  if(this.lastTime === 0) {
    this.lastTime = currTime;
    return;
  }

  var deltaTime = (currTime - this.lastTime) / 1000;

  if(this.motion > 0){
      this.shape.rightDroneArm.setVel1( this.heliceVeloL * this.heliceFactor);
      this.shape.rightDroneArm.setVel2( this.heliceVeloR * this.heliceFactor);
   }else if( this.motion < 0){
      this.shape.rightDroneArm.setVel1( this.heliceVeloR * this.heliceFactor);
      this.shape.rightDroneArm.setVel2( this.heliceVeloL * this.heliceFactor); 
   }else{
     this.shape.rightDroneArm.setVel1( this.heliceVeloN  * this.heliceFactor);
      this.shape.rightDroneArm.setVel2( this.heliceVeloN * this.heliceFactor);
   }

   if(this.rotation > 0){
      this.shape.leftDroneArm.setVel1( this.heliceVeloR * this.heliceFactor);
      this.shape.leftDroneArm.setVel2( this.heliceVeloR * this.heliceFactor);
      this.shape.rightDroneArm.setVel1( this.heliceVeloL * this.heliceFactor);
      this.shape.rightDroneArm.setVel2( this.heliceVeloL * this.heliceFactor);
   }else if( this.rotation < 0){
      this.shape.leftDroneArm.setVel1( this.heliceVeloL * this.heliceFactor);
      this.shape.leftDroneArm.setVel2( this.heliceVeloL * this.heliceFactor);
      this.shape.rightDroneArm.setVel1( this.heliceVeloR * this.heliceFactor);
      this.shape.rightDroneArm.setVel2( this.heliceVeloR * this.heliceFactor);
   }else{
     this.shape.leftDroneArm.setVel1( this.heliceVeloN * this.heliceFactor);
     this.shape.leftDroneArm.setVel2( this.heliceVeloN * this.heliceFactor);
   }

  this.lastAngle += (this.defaultAngle - this.lastAngle) * deltaTime;
  this.lastMotion += (this.motion - this.lastMotion) * deltaTime;
  this.lastRotation += (this.rotation - this.lastRotation) * deltaTime;
  this.totalElevation += (this.elevation - this.totalElevation) * deltaTime;

  //Position

  var tempX = Math.cos(-(this.defaultAngle - 90) * degToRad);
  var tempZ = Math.sin(-(this.defaultAngle-90) * degToRad);

  this.x += tempX * this.lastMotion * deltaTime;
  this.y += this.totalElevation * deltaTime;
  this.z += tempZ * this.lastMotion * deltaTime;

  //Rotation

  this.defaultAngle += this.lastRotation * deltaTime;
  this.defaultAngleY = this.defaultLeanAngle * (this.lastMotion / this.moveVel);

  this.lastTime = currTime;

}


MyDrone.prototype.display = function(){

  this.scene.pushMatrix();

  this.scene.pushMatrix();
  this.scene.translate(this.x,this.y,this.z);
  this.scene.rotate(this.defaultAngle*degToRad, 0,1,0);
  this.scene.rotate(this.defaultAngleY, 1,0,0);
  this.shape.display();
  this.scene.popMatrix();

  this.scene.popMatrix();

}