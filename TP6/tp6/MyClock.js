function MyClock(scene, slices, stacks){
	CGFobject.call(this,scene);

	this.lastUpdate = -1;

	this.cylinder = new MyCylinder(this.scene, slices, stacks);


	this.face = new MyCircle(this.scene, 12);


	this.hourHand = new MyClockHand(this.scene, 0.5, 0);		//yy

	
	this.minuteHand = new MyClockHand(this.scene, 0.7, 0);		//yy


	this.secondHand = new MyClockHand(this.scene, 0.9, 0);		//yy


	this.hourHand.setAngle(270);	//3h
	this.minuteHand.setAngle(180);	//30m
	this.secondHand.setAngle(90);	//45s

	this.initBuffers();


	this.anim =true;
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function(){

	var degToRad = Math.PI / 180;

	this.scene.pushMatrix();
	this.scene.clockAppearance.apply();
	this.scene.translate(0, 0, 0);
	this.face.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.materialMetal.apply();
	this.cylinder.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.hourHand.angle * degToRad, 0, 0, 1);
	this.scene.handAppearance.apply();
	this.hourHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.minuteHand.angle * degToRad, 0, 0, 1);
	this.scene.handAppearance.apply();
	this.minuteHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1.01);
	this.scene.rotate(this.secondHand.angle * degToRad, 0, 0, 1);
	this.scene.handAppearance.apply();
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
