function MyClock(scene, slices, stacks){
	CGFobject.call(this,scene);

	this.lastUpdate = -1;

	this.cylinder = new MyCylinder(this.scene, slices, stacks);
	this.cylinder.initBuffers();

	this.face = new MyCircle(this.scene, 1, 12);
	this.face.initBuffers();

	this.hourHand = new MyClockHand(this.scene, 0.5, 0);		//yy
	this.hourHand.initBuffers();

	this.minuteHand = new MyClockHand(this.scene, 0.7, 0);		//yy
	this.minuteHand.initBuffers();

	this.secondHand = new MyClockHand(this.scene, 0.9, 0);		//yy
	this.secondHand.initBuffers();

	this.hourHand.setAngle(270);	//3h
	this.minuteHand.setAngle(180);	//30m
	this.secondHand.setAngle(90);	//45s

	this.clockAppearence = new CGFappearance(this.scene);
	this.clockAppearence.loadTexture("../resources/images/clock.png");
	this.clockAppearence.setAmbient(0.24,0.24,0.24,1);
	this.clockAppearence.setDiffuse(0.24,0.24,0.24,1);
	this.clockAppearence.setSpecular(0.5,0.5,0.5,1);
	this.clockAppearence.setShininess(5);

	this.handAppearence = new CGFappearance(this.scene);
	this.handAppearence.setAmbient(0,0,0,0);
	this.handAppearence.setDiffuse(0,0,0,0);
	this.handAppearence.setSpecular(0,0,0,0);
	this.handAppearence.setShininess(0);

	this.materialMetal = new CGFappearance(this.scene);
	this.materialMetal.setAmbient(0.24,0.24,0.24,1);
	this.materialMetal.setDiffuse(0.24,0.24,0.24,1);
	this.materialMetal.setSpecular(0.5,0.5,0.5,1);
	this.materialMetal.setShininess(120);

	this.anim =true;
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function(){

	var degToRad = Math.PI / 180;

	this.scene.pushMatrix();
	this.clockAppearence.apply();
	this.scene.translate(0, 0, 1);
	this.face.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.materialMetal.apply();
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.hourHand.angle * degToRad, 0, 0, 1);
	this.handAppearence.apply();
	this.hourHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.minuteHand.angle * degToRad, 0, 0, 1);
	this.handAppearence.apply();
	this.minuteHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.secondHand.angle * degToRad, 0, 0, 1);
	this.handAppearence.apply();
	this.secondHand.display();
	this.scene.popMatrix();

};

MyClock.prototype.update = function(currTime){

	if (this.lastUpdate == -1) {
		this.lastUpdate = currTime;
		secInc = 0.6;
	}
	else {
		var diff = currTime - this.lastUpdate;
		this.lastUpdate = currTime;
		secInc = diff * (360 / (60 * 1000));
	}

	this.secondHand.setAngle(this.secondHand.angle - secInc);
	this.minuteHand.setAngle(this.minuteHand.angle - secInc / 60);
	this.hourHand.setAngle(this.hourHand.angle - secInc / 3600);

};
