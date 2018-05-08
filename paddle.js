class Paddle extends Entity{
	constructor(x, y, vx, vy, width, height, color = "#67c700"){
		super(x, y, vx, vy, width, height);
		this.color = color;
		this.isMovingUp = false;
		this.isMovingDown = false;
		constrain(this.y, 55, 350);
	}

	update(){
		if(this.isMovingUp){
			this.vy = -PADDLE_VELOCITY;
		} else if(this.isMovingDown){
			this.vy = +PADDLE_VELOCITY;
		} else {
			this.vy = 0;
		}
		super.update();
		this.y = constrain(this.y, this.height / 2, height - this.height / 2);
	}

	render(){
		fill(this.color);
		noStroke();
		rect(this.x, this.y, this.width, this.height);
	}
}