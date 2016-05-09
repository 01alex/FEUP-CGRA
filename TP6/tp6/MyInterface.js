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
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

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
	
	var key = event.which || event.keyCode;

	switch (key){

		case (65):
		case (97):
			//console.log("Key 'A' pressed");
			this.scene.drone.rotateLeft(this.scene.speed);
			break;
		
		case (68):
		case (100):
			//console.log("Key 'D' pressed");
			this.scene.drone.rotateRight(this.scene.speed);
			break;

		case (87):
		case (119):
			//console.log("Key 'W' pressed");
			this.scene.drone.moveForward(this.scene.speed);
			break;

		case (83):
		case (115):
			//console.log("Key 'S' pressed");
			this.scene.drone.moveBack(this.scene.speed);
			break;

		case (73):
		case (105):
			//console.log("Key 'I' pressed");
			this.scene.drone.moveUp(this.scene.speed);
			break;

		case (74):
		case (106):
			//console.log("Key 'J' pressed");
			this.scene.drone.moveDown(this.scene.speed);
			break;
	};
};

