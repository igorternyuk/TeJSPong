class Player extends Paddle{
	constructor(x, y, vx, vy, width, height){
		super(x, y, vx, vy, width, height, "#b70e4d");
		this.score = 0;
	}
	
	reset(){
		super.reset();
		this.score = 0;
	}	
}