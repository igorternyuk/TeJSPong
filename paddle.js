class Paddle{
	constructor(){
		this.x = 1;
		this.y = height / 2;
		this.velY = 3;
		this.width = 20;
		this.height = 80;
	}

	render(farbe = color(255,0,0)){
		fill(farbe);
		rectMode(CENTER);
		rect(this.x, this.y, this.width, this.height);
	}
}