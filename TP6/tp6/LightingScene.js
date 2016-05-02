var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();
	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.leftWall = new MyQuad(this, -0.6, 1.55, -0.6, 1.55);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.boardA = new Plane(this,-0.17, 1.3, 0.1, 0.8, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this,0, 1, 0, 1, BOARD_B_DIVISIONS);
	this.prism = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.lamp = new MyLamp(this, 25, 19);
	this.clock = new MyClock(this, 12, 1);
	this.paperPlane = new MyPaperPlane(this, 12, 8);
	this.drone = new MyDrone(this);


	// Materials
	this.materialDefault = new CGFappearance(this);

	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	
	this.materialFloor = new CGFappearance(this);
	this.materialFloor.setAmbient(0.25,0.25,0.25,1);
	this.materialFloor.setDiffuse(0.25,0.25,0.25,1);
	this.materialFloor.setSpecular(0.25,0.25,0.25,1);	
	this.materialFloor.setShininess(120);

	this.materialMetal = new CGFappearance(this);
	this.materialMetal.setAmbient(0.24,0.24,0.24,1);
	this.materialMetal.setDiffuse(0.24,0.24,0.24,1);
	this.materialMetal.setSpecular(0.5,0.5,0.5,1);	
	this.materialMetal.setShininess(120);

	this.materialWall = new CGFappearance(this);
	this.materialWall.setAmbient(1,1,0.6,1);
	this.materialWall.setDiffuse(1,1,0.6,1);
	this.materialWall.setSpecular(1,1,0.6,1);	
	this.materialWall.setShininess(120);

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(1,1,0.6,1);
	this.windowAppearance.setDiffuse(1,1,0.6,1);
	this.windowAppearance.setSpecular(1,1,0.6,1);	
	this.windowAppearance.setShininess(10);
	this.windowAppearance.loadTexture("/resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.25,0.25,0.25,1);
	this.floorAppearance.setDiffuse(0.25,0.25,0.25,1);
	this.floorAppearance.setSpecular(0.25,0.25,0.25,1);	
	this.floorAppearance.setShininess(5);
	this.floorAppearance.loadTexture("/resources/images/floor.png");

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.25,0.25,0.25,1);
	this.slidesAppearance.setDiffuse(0.75,0.75,0.75,1);
	this.slidesAppearance.setSpecular(0.25,0.25,0.25,1);	
	this.slidesAppearance.setShininess(5);
	this.slidesAppearance.loadTexture("/resources/images/slides.png");

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.25,0.25,0.25,1);
	this.boardAppearance.setDiffuse(0.85,0.85,0.85,1);
	this.boardAppearance.setSpecular(0.65,0.65,0.65,1);	
	this.boardAppearance.setShininess(60);
	this.boardAppearance.loadTexture("/resources/images/board.png");

	this.stoneAppearance = new CGFappearance(this);
	this.stoneAppearance.setAmbient(0.25,0.25,0.25,1);
	this.stoneAppearance.setDiffuse(0.75,0.75,0.75,1);
	this.stoneAppearance.setSpecular(0.25,0.25,0.25,1);	
	this.stoneAppearance.setShininess(5);
	this.stoneAppearance.loadTexture("/resources/images/granite.png");

	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.setAmbient(0.5, 0.5, 0.5, 1);
	this.clockAppearance.setDiffuse(0.1, 0.1, 0.1, 1);
	this.clockAppearance.setSpecular(0.01, 0.01, 0.01, 1);
	this.clockAppearance.setShininess(5);
	this.clockAppearance.loadTexture("/resources/images/clock.png");

	this.setUpdatePeriod(10);

	this.option1 = true;
	this.option2 = false;
	this.speed = 3;

	};



LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.4,0.4,0.4,0.4);
	
	// Positions for four lights
	this.lights[0].setPosition(16, 5, 16, 1);
	this.lights[1].setPosition(10, 10, 6.0, 1.0);
	this.lights[2].setPosition(5, 5, 5, 8.0);
	this.lights[3].setPosition(10, 5.0, 5.0, 1.0);


	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,1,1);
	this.lights[0].setConstantAttenuation(0);
	this.lights[0].setLinearAttenuation(1);
	this.lights[0].setQuadraticAttenuation(0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();
	this.lights[1].setVisible(true);

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,1,1);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(1);
	this.lights[3].setQuadraticAttenuation(0);
	this.lights[3].enable();
	
	for (var i = 0; i < 4; i++)
		this.lights[i].setVisible(true);

};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.display = function() {

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup
	// ---- BEGIN Primitive drawing section


//-----------Columns-------------------------------
	// Floor
	this.floorAppearance.apply();
	this.pushMatrix();
	this.translate(7.5, 0, 7.5);
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(15, 15, 0.2);
	this.floor.display();
	this.popMatrix();

	this.materialWall.apply();
	// Left Wall
	this.pushMatrix();
	this.translate(7.5, 4, 0);
	this.scale(15, 8, 0.2);
	this.wall.display();
	this.popMatrix();

	this.windowAppearance.apply();
	// Plane Wall
	this.pushMatrix();
	this.translate(0, 4, 7.5);
	this.rotate(90 * degToRad, 0, 1, 0);
	this.scale(15, 8, 0.2);
	this.leftWall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
	this.translate(4, 0, 7.5);
	this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
	this.translate(11, 0, 7.5);
	this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
	this.translate(4, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
	this.slidesAppearance.apply();
	this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
	this.translate(10.5, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
	this.boardAppearance.apply();
	this.boardB.display();
	this.popMatrix();

	//Colunas
	this.pushMatrix();
	this.stoneAppearance.apply();
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(0.7, 0.7, 0.4);
	this.translate(2, -20, 0);
	this.cylinder.display();
	this.popMatrix();

	this.pushMatrix();
	this.stoneAppearance.apply();
	this.rotate(-90 * degToRad, 1, 0, 0);
	this.scale(0.7, 0.7, 0.4);
	this.translate(20, -20, 0);
	this.cylinder.display();
	this.popMatrix();

	//Relogio
	this.pushMatrix();
	this.translate(7.25, 7.25, 0);
	this.scale(0.5, 0.5, 0.15);
	this.clock.display();
	this.popMatrix();
	
	//Aviao
	this.materialMetal.apply();
	this.pushMatrix();
	this.translate(this.paperPlane.xTranslation,
		 this.paperPlane.yTranslation,
		 this.paperPlane.zTranslation);
	this.rotate(this.paperPlane.rotZ * degToRad, 0, 0, 1);
	this.rotate(this.paperPlane.rotX * degToRad, 1, 0, 0);
	this.paperPlane.display();
	this.popMatrix();

	//Drone
	this.pushMatrix();
	this.rotate(180 * degToRad, 0, 1, 0);
	this.translate(-7.5 - Math.sin(15*degToRad), 0, -8.5);
	this.rotate(15 * degToRad, 0 , 1 ,0);
	this.drone.display();
	this.popMatrix();

	// ---- END Primitive drawing section

};

LightingScene.prototype.update = function(currTime){

	this.clock.update(currTime);
	this.paperPlane.update(currTime);

};

LightingScene.prototype.doSomething = function (){
	console.log("Doing something...");
};
