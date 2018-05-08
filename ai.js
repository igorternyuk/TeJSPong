class Ai extends Paddle{
	constructor(x, y, vx, vy, width, height){
		super(x, y, vx, vy, width, height, "#22959b");
		this.score = 0;
	}

	reset(){
		super.reset();
		this.score = 0;
	}	

	update(){
		let stop = false;
		if(puck.x > width / 2){
			if(puck.vy < 0){
				this.isMovingUp = true;
				this.isMovingDown = false;
			} else if(puck.vy > 0){
				this.isMovingUp = false;
				this.isMovingDown = true;
			} else {
				stop = true;
			}	
		} else {
			stop = true;
			
		}

		if(stop){
			this.isMovingUp = false;
			this.isMovingDown = false;
		}		
		super.update();
	}
}