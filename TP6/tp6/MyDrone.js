var degToRad = Math.PI / 180.0;

function MyDrone(scene, x, y, z, angle) {

  CGFobject.call(this,scene);

  this.movementArm = new MyArm(scene, true);   //movement
  this.rotationArm = new MyArm(scene, false);
  this.bodyDrone = new MyLamp(scene, 10, 5, 1, 1);
  this.circle = new MyCircle(scene, 10);
  this.leg = new MyLeg(scene, 10, 10);
  this.base = new MyUnitCubeQuad(scene);
  this.cable = new MyCable(scene);

  //Initial Positions and Angles
  this.x = x;
  this.y = y;
  this.z = z;

  console.log(x);

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


  this.ApIndex = 0;

  this.bodyAppearanceList = [];
  this.armAppearanceList = [];


  this.bodyAppearance1 = new CGFappearance(this.scene);
  this.bodyAppearance1.setDiffuse(0.5,0.5,0.5,1.0);
  this.bodyAppearance1.setSpecular(0.8,0.8,0.8,1);
  this.bodyAppearance1.setShininess(120);
  this.bodyAppearance1.loadTexture("../resources/images/drone5.png");
  this.bodyAppearanceList.push(this.bodyAppearance1);



  this.bodyAppearance2 = new CGFappearance(this.scene);
  this.bodyAppearance2.setAmbient(0.3,0.3,0.3,1);
  this.bodyAppearance2.setDiffuse(0.5,0.5,0.5,1.0);
  this.bodyAppearance2.setSpecular(0.6,0.6,0.6,1);
  this.bodyAppearance2.setShininess(120);
  this.bodyAppearance2.loadTexture("../resources/images/drone9.png");
  this.bodyAppearanceList.push(this.bodyAppearance2);

  this.bodyAppearance3 = new CGFappearance(this.scene);
  this.bodyAppearance3.setDiffuse(0.9,0.9,0.9,1.0);
  this.bodyAppearance3.setSpecular(0.9,0.9,0.9,1);
  this.bodyAppearance3.setShininess(10);
  this.bodyAppearance3.loadTexture("../resources/images/drone1.png");

  this.bodyAppearanceList.push(this.bodyAppearance3);


  this.armAppearance1 = new CGFappearance(this.scene);
  this.armAppearance1.setDiffuse(0.5,0.5,0.5,1.0);
  this.armAppearance1.setSpecular(0.8,0.8,0.8,1);
  this.armAppearance1.setShininess(60);
  this.armAppearance1.loadTexture("../resources/images/drone3.png");
  this.armAppearanceList.push(this.armAppearance1);

  this.armAppearance2 = new CGFappearance(this.scene);
  this.armAppearance2.setDiffuse(0.5,0.5,0.5,1.0);
  this.armAppearance2.setSpecular(0.8,0.8,0.8,1);
  this.armAppearance2.setShininess(60);
  this.armAppearance2.loadTexture("../resources/images/drone3.png");
  this.armAppearanceList.push(this.armAppearance2);


  this.armAppearance3 = new CGFappearance(this.scene);
  this.armAppearance3.setDiffuse(0.5,0.5,0.5,1.0);
  this.armAppearance3.setSpecular(0.8,0.8,0.8,1);
  this.armAppearance3.setShininess(60);
  this.armAppearance3.loadTexture("../resources/images/drone1.png");
  this.armAppearanceList.push(this.armAppearance3);

  this.initBuffers();

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

MyDrone.prototype.moveCable = function(increment) {
  this.cable.elevate(increment);
}

MyDrone.prototype.getHookY = function(){  //ex 6.2
  return this.y - this.cable.height;
}

MyDrone.prototype.caught = function(){

  if(this.x < this.scene.box.x + this.scene.box.size && this.x > this.scene.box.x - this.scene.box.size) {
    if(this.getHookY() < this.scene.box.y + this.scene.box.size && this.getHookY() > this.scene.box.y - this.scene.box.size) {
      if(this.z < this.scene.box.z + this.scene.box.size && this.z > this.scene.box.z - this.scene.box.size) {
        if(!this.cable.transporting){
          console.log("In touch!");
          this.cable.transporting = true;
          this.scene.box.onTarget = false;
          return true;
        }
      }
    }
  }

  return false;
}

MyDrone.prototype.drop = function(){

   if(this.x < this.scene.target.x + this.scene.target.size && this.x > this.scene.target.x - this.scene.target.size) {
    if(this.getHookY() < this.scene.target.y + this.scene.target.size && this.getHookY() > this.scene.target.y - this.scene.target.size) {
      if(this.z < this.scene.target.z + this.scene.target.size && this.z > this.scene.target.z - this.scene.target.size) {
        if(this.cable.transporting){
          console.log("Droping!");
          this.cable.transporting = false;
          this.scene.box.onTarget = true;
          return true;
        }
      }
    }
  }

  return false;
}

MyDrone.prototype.update = function(currTime) {

  if(this.lastTime === 0) {
    this.lastTime = currTime;
    return;
  }

  this.rotationArm.update(currTime);
  this.movementArm.update(currTime);

  this.heliceFactor = this.scene.Helix_Rot_Factor;

  var deltaTime = (currTime - this.lastTime) / 1000;

  if(this.motion > 0){
    this.rotationArm.setVel1( this.heliceVeloL * this.heliceFactor);
    this.rotationArm.setVel2( this.heliceVeloR * this.heliceFactor);
  }else if( this.motion < 0){
    this.rotationArm.setVel1( this.heliceVeloR * this.heliceFactor);
    this.rotationArm.setVel2( this.heliceVeloL * this.heliceFactor);
  }else{
    this.rotationArm.setVel1( this.heliceVeloN  * this.heliceFactor);
    this.rotationArm.setVel2( this.heliceVeloN * this.heliceFactor);
  }

  if(this.rotation > 0){
    this.movementArm.setVel1( this.heliceVeloR * this.heliceFactor);
    this.movementArm.setVel2( this.heliceVeloR * this.heliceFactor);
    this.rotationArm.setVel1( this.heliceVeloL * this.heliceFactor);
    this.rotationArm.setVel2( this.heliceVeloL * this.heliceFactor);
  }else if( this.rotation < 0){
    this.movementArm.setVel1( this.heliceVeloL * this.heliceFactor);
    this.movementArm.setVel2( this.heliceVeloL * this.heliceFactor);
    this.rotationArm.setVel1( this.heliceVeloR * this.heliceFactor);
    this.rotationArm.setVel2( this.heliceVeloR * this.heliceFactor);
  }else{
    this.movementArm.setVel1( this.heliceVeloN * this.heliceFactor);
    this.movementArm.setVel2( this.heliceVeloN * this.heliceFactor);
  }

  this.lastAngle += (this.defaultAngle - this.lastAngle) * deltaTime;
  this.lastMotion += (this.motion - this.lastMotion) * deltaTime;
  this.lastRotation += (this.rotation - this.lastRotation) * deltaTime;
  this.totalElevation += (this.elevation - this.totalElevation) * deltaTime;

  //Position

  var tempX = Math.cos(-(this.defaultAngle - 90) * degToRad);

  var tempZ = Math.sin(-(this.defaultAngle - 90) * degToRad);

  this.x += tempX * this.lastMotion * deltaTime * this.scene.speed;
  if(this.x < 2)
    this.x = 2;
  if(this.x > 30)
    this.x = 30;

  this.y += this.totalElevation * deltaTime * this.scene.speed;
  if(this.y < 0.1)
    this.y = 0.1;
  if(this.y > 12)
    this.y = 12;

  this.z += tempZ * this.lastMotion * deltaTime * this.scene.speed;
  if(this.z < 2)
    this.z = 2;
  if(this.z > 15)
    this.z = 15;

  //Rotation

  this.defaultAngle += this.lastRotation * deltaTime * this.scene.speed;
  this.defaultAngleY = this.defaultLeanAngle * (this.lastMotion / this.moveVel);

  //Check if holds box

  //if(this.caught())
    //this.scene.box.update();
    
  if(this.cable.transporting){
    this.scene.box.x = this.x;
    this.scene.box.y = this.y - this.cable.height;
    this.scene.box.z = this.z;
  }

 /* if(this.drop()){
    this.scene.box.x = this.scene.target.x;
    this.scene.box.y = this.scene.target.y;
    this.scene.box.z = this.scene.target.z;
  }*/

    this.cable.update(currTime);

    this.lastTime = currTime;

}


MyDrone.prototype.display = function(){

  this.armAppearanceList[this.ApIndex].apply();
    
  this.scene.pushMatrix();  //DRAW ARM (RIGHT)

  this.scene.translate(this.x,this.y,this.z);
  this.scene.rotate(this.defaultAngle*degToRad, 0,1,0);
  this.scene.rotate(this.defaultAngleY, 1,0,0);
  this.rotationArm.display();


  this.scene.pushMatrix(); //DRAW LEFT ARM

  this.scene.rotate(Math.PI/2 , 0 , 1 ,0);
  this.movementArm.display();
  this.scene.popMatrix();
  this.scene.pushMatrix();

  this.scene.translate(0,-0.1,0);
  this.scene.pushMatrix();

  this.scene.pushMatrix();
  this.scene.steelAppearance.apply();
  this.cable.display();
  this.scene.popMatrix();
  this.scene.translate(0.0, 0.5, 0.0);
  this.scene.rotate(Math.PI/2,1,0,0);
  this.scene.scale(0.5,0.5,0.5);
  this.circle.display(); //BODY BASE
  this.scene.popMatrix();
  this.scene.pushMatrix();

  this.scene.rotate( -Math.PI / 2, 0,1,0);
  this.scene.translate(0.2,-0.5,0);
  this.leg.display();


  /*  this.scene.translate(-1,0,0);

  this.leg.display();*/

  this.scene.popMatrix();

  this.scene.pushMatrix();

  this.scene.rotate( -Math.PI / 2, 0,1,0);
  this.scene.translate(-0.2,-0.5,0);
  this.leg.display();


  this.scene.popMatrix();

  this.scene.pushMatrix();

  this.scene.rotate( Math.PI / 2, 0,1,0);
  this.scene.translate(-0.2,-0.5,0);
  this.leg.display();


  this.scene.popMatrix();

  this.scene.pushMatrix();

  this.scene.rotate( Math.PI / 2, 0,1,0);
  this.scene.translate(0.2,-0.5,0);
  this.leg.display();


  this.scene.popMatrix();


  this.scene.pushMatrix();
  this.bodyAppearanceList[this.ApIndex].apply();
  this.scene.rotate( Math.PI / 2, 0,1,0);
  this.scene.translate(-0.2,-0.5,0);
  this.leg.display();


  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.bodyAppearanceList[this.ApIndex].apply();
  this.scene.translate(-1, -0.5, 0);
  this.scene.scale(0.05,0.05,1);
  this.base.display();

  this.scene.popMatrix();

  this.scene.pushMatrix();
  this.bodyAppearanceList[this.ApIndex].apply();
  this.scene.translate(1, -0.5, 0);
  this.scene.scale(0.05,0.05,1);
  this.base.display();

  this.scene.popMatrix();



  this.scene.pushMatrix();
  this.bodyAppearanceList[this.ApIndex].apply();

  this.scene.scale(0.5,0.5,0.5);
  this.bodyDrone.display(); //DRONE BODY
  this.scene.popMatrix();
  this.scene.popMatrix();
  this.scene.popMatrix();

}
