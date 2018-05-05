var canvasWidth = 800;
var canvasHeight = 400;
var player;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(10);
    player = new Paddle();
}


//main loop
function draw() {
	background(0);
	player.render();
}



