/**
* MyInterface
* @constructor
*/


function MyInterface() {
	//call CGFinterface constructor
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
* init
* @param {CGFapplication} application
*/
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);

	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui

	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };

	//this.gui.add(this.scene, 'doSomething');
	this.gui.add(this.scene, 'Animacao_Relogio');

	// add a group of controls (and open/expand by defult)

	/*var group=this.gui.addFolder("Options");
	group.open();
	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;

	group.add(this.scene, 'option1');
	group.add(this.scene, 'option2');*/

	var Luzes = this.gui.addFolder("Luzes");
	Luzes.open();

	Luzes.add(this.scene, 'Luz1');
	Luzes.add(this.scene, 'Luz2');
	Luzes.add(this.scene, 'Luz3');
	Luzes.add(this.scene, 'Luz4');
	Luzes.add(this.scene, 'Luz5');

	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters

	this.gui.add(this.scene, 'speed', -5, 5);
	this.gui.add(this.scene, 'Helix_Rot_Factor', 0.1, 2);
	
	this.gui.add(this.scene, 'currDroneAppearance', this.scene.droneAppearanceList);

	//  this.gui.add(this.scene, 'Drone Texture choice');

	return true;
};

/**
* processKeyboard
* @param event {Event}
*/
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);

	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars

	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	/*
	switch (event.keydown)
	{
	case (65):	// only works for capital 'A', as it is
	this.scene.drone.rotate(1);
	break;
};
*/
};

MyInterface.prototype.processKeyDown = function(event){

	CGFinterface.prototype.processKeyDown.call(this,event);

	var key = event.which || event.keyCode;

	switch (key){

		case (65):	// only works for capital 'A', as it is
		this.scene.drone.rotate(1);
		break;
		case (68):	// only works for capital 'D', as it is
		this.scene.drone.rotate(-1);
		break;
		case (87):	// only works for capital 'W', as it is
		this.scene.drone.movement(1);
		break;
		case (83):	// only works for capital 'S', as it is
		this.scene.drone.movement(-1);
		break;
		case (73):	// only works for capital 'I', as it is
		this.scene.drone.elevate(1);
		break;
		case (74):	// only works for capital 'J', as it is
		this.scene.drone.elevate(-1);
		break;
		case (80):
		this.scene.drone.moveCable(-1);
		break;
		case (76):
		this.scene.drone.moveCable(1);
		break;

	};
};

MyInterface.prototype.processKeyUp = function(event){

	CGFinterface.prototype.processKeyUp.call(this,event);

	var key = event.which || event.keyCode;

	switch (key){
		case (65):	// only works for capital 'A', as it is
		case (68):	// only works for capital 'D', as it is
		this.scene.drone.rotate(0);
		break;
		case (87):	// only works for capital 'W', as it is
		case (83):	// only works for capital 'S', as it is
		this.scene.drone.movement(0);
		break;
		case (73):	// only works for capital 'I', as it is
		case (74):	// only works for capital 'J', as it is
		this.scene.drone.elevate(0);
		break;
		case (108):
		case (76):
		case (80):
		case (112):
		this.scene.drone.moveCable(0);
		break;
	};
};
