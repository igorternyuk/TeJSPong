class Puck extends Entity{
	constructor(x, y, vx, vy, radius){
		super(x, y, vx, vy, 2 * radius, 2 * radius);
	}

	update(){
		super.update();
		this.keepInScreenBounds();
	}

	collides(paddle){
		return !(this.left() >= paddle.right()
		         || this.right() <= paddle.left()
			     || this.bottom() <= paddle.top()
			     || this.top() >= paddle.bottom());
	}

	handleCollision(paddle){
		if(this.collides(paddle)){
			this.x -= this.vx;
			this.y -= this.vy;
			this.vx = -this.vx;
		}
	}

	keepInScreenBounds(){
		if(this.top() < 0 || this.bottom() > height){
			let dy = 0;
			if(this.top() <= 0){
				dy = -this.top();
			} else {
				dy = height - this.bottom();
			}
			this.y += dy;
			this.vy *= -1;
		}
	}

	render(){
		fill(255,0,0);
		noStroke();
		ellipse(this.x, this.y, this.width, this.height);
	}

}