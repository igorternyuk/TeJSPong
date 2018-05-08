var canvasWidth = 800;
var canvasHeight = 400;
const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 100;
const PUCK_RADIUS = 10;
const PUCK_VELOCITY = 7;
const PADDLE_VELOCITY = 5;
const SCORE_LIMIT = 5;
var player, ai, puck;
const GameState = Object.freeze({ PLAY: 0, PAUSE: 1, HUMAN_WON: 2, COMPUTER_WON: 3 });
var gameState = GameState.PLAY;

function setup() {
	frameRate(30);
    createCanvas(canvasWidth, canvasHeight);
    rectMode(CENTER);
    ellipseMode(CENTER);
    player = new Player(PADDLE_WIDTH, height / 2, 0, 0, PADDLE_WIDTH, PADDLE_HEIGHT);
    ai = new Ai(width - PADDLE_WIDTH, height / 2, 0, 0, PADDLE_WIDTH, PADDLE_HEIGHT);
    puck = new Puck(width / 2, height / 2, 0, 0, PUCK_RADIUS);
    pushPuckAtRandomAngle(true);
}

function startNewGame() {
	player.reset();
	ai.reset();
	pushPuckAtRandomAngle(random() < 0.5);
	gameState = GameState.PLAY;
}
function pushPuckAtRandomAngle(isComputersTurn = true){
	puck.reset();
	let randAngle = QUARTER_PI;	
	if(isComputersTurn){
		randAngle = random(-3 * QUARTER_PI, +3 * QUARTER_PI);
	} else {
		randAngle = random(-QUARTER_PI, QUARTER_PI);
	}
	puck.vx = PUCK_VELOCITY * cos(randAngle);
	puck.vy = PUCK_VELOCITY * sin(randAngle);
}

function  mouseReleased() {
	if(mouseButton === CENTER){
		togglePause();
	}
}

function keyPressed(){
	if(keyCode === UP_ARROW){
		player.isMovingUp = true;
		player.isMovingDown = false;
	} else if(keyCode === DOWN_ARROW){
		player.isMovingUp = false;
		player.isMovingDown = true;
	}
}

function keyReleased(){
	if(key === ' '){
		togglePause();
		return;
	} else if(key === 'N'){
		startNewGame();
	}

	if(keyCode === UP_ARROW || keyCode === DOWN_ARROW){
		player.isMovingUp = false;
		player.isMovingDown = false;
	} 
}

function togglePause() {
	if(gameState === GameState.PLAY){
		gameState = GameState.PAUSE;
	} else if(gameState === GameState.PAUSE){
		gameState = GameState.PLAY;
	}
}

function checkScore() {
	if(puck.left() < 0){
		++ai.score;
		pushPuckAtRandomAngle(false);
	} else if(puck.right() > width){
		++player.score;
		pushPuckAtRandomAngle(true);
	}
}

function checkWin() {
	if(player.score >= SCORE_LIMIT){
		gameState = GameState.HUMAN_WON;
	} else if(ai.score >= SCORE_LIMIT){
		gameState = GameState.COMPUTER_WON;
	}
}

//main loop
function draw() {	
	//Update phase
	if(gameState === GameState.PLAY){
		player.update();
		player.update();
		ai.update();
		puck.update();
		puck.handleCollision(player);
		puck.handleCollision(ai);
		checkScore();
		checkWin();	
	}
	
	//Render phase
	background("#bbda47");
	renderField();
	renderScore();
	renderGameState();
	puck.render();
	player.render();
	ai.render();
}

function renderField() {
	fill("#7eb233");
	stroke(255);
	strokeWeight(5);
	ellipse(width / 2, height / 2, 250);
	line(width / 2, 0, width / 2, height);
}

function renderScore(){
	textAlign(CENTER, CENTER);
	fill(127,0,0);
	noStroke();
	textSize(92);
	text(player.score, width / 4, height / 2);
	text(ai.score, 3 * width / 4, height / 2);
}

function renderGameState() {
	textAlign(CENTER, CENTER);
	noStroke();
	textSize(92);
	switch(gameState){
		case GameState.PAUSE:
			fill("#9f7adf");
			text("GAME PAUSED", width / 2, height / 2);
			break;
		case GameState.HUMAN_WON:
			fill(0,127,0);
			text("YOU WON!!!", width / 2, height / 2);
			break;
		case GameState.COMPUTER_WON:
			fill(255,0,0);
			text("YOU LOST!!!", width / 2, height / 2);
			break;
		default:
			break;
	}
}