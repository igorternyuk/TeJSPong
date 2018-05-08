class Entity{
	constructor(x, y, vx, vy, width, height){
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.width = width;
		this.height = height;
		this.spawnX = x;
		this.spawnY = y;
	}

	reset(){
		this.x = this.spawnX;
		this.y = this.spawnY;
	}
	
	update(){
		this.x += this.vx;
		this.y += this.vy;
	}

	render(){}

	top(){
		return this.y - this.height / 2;
	}

	bottom(){
		return this.y + this.height / 2;
	}

	left(){
		return this.x - this.width / 2;
	}

	right(){
		return this.x + this.width / 2;
	}
}