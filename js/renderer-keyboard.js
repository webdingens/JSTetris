function Renderer(width, height){
	this.width = width;
	this.height = height;
	this.size = 12;
	this.padding = 3;
	this.init = function(){
		this.canvas = document.getElementById("drawing-area");
		this.ctx = this.canvas.getContext('2d');
		this.ctx.fillStyle = "#FFF";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.strokeStyle = "#000";
		this.ctx.lineWidth = 2;
		this.ctx.strokeRect(10,40,
							this.width*this.size+this.padding*2, 
							this.height*this.size+this.padding*2);
		// draw 0 points
		this.ctx.strokeStyle = "#000";
		this.ctx.lineWidth = 2;
		this.ctx.strokeRect(10 + this.width*this.size+this.padding*2 + 20,40, 
							this.canvas.width - 10 - (10 + this.width*this.size+this.padding*2 + 20),30);
		this.ctx.fillStyle = "#000";
		this.ctx.lineWidth = 0;
		this.ctx.font = "25px sans-serif";
		this.ctx.fillText("0", 10 + this.width*this.size+this.padding*2 + 10 + 10 + 10, 65);
	};
	this.init();
	this.draw = function(model){
		this.ctx.fillStyle = "#FFF";
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.strokeStyle = "#000";
		this.ctx.lineWidth = 2;
		this.ctx.strokeRect(10,40,
							this.width*this.size+this.padding*2, 
							this.height*this.size+this.padding*2);
		// draw data
		for (var r=0;r<model.height;r++){
			for (var c=0;c<model.width;c++){
				if (model.data[r][c] !== -1){
						this.ctx.fillStyle = (new shapes[model.data[r][c]]()).color;
						this.ctx.fillRect(10+this.padding + c*this.size,
						40+this.padding + this.height*this.size - (r+1)*this.size,
						this.size, this.size);
						this.ctx.strokeRect(10+this.padding + c*this.size,
						40+this.padding + this.height*this.size - (r+1)*this.size,
						this.size, this.size);
				}
			}
		}
		// draw model
		var vecs = model.objNew.getSpaceNeeded(model.objNew.state);
		var ctr = model.objNew.centre;
		for (v in vecs) {
			var c = ctr[0] + vecs[v][0];
			var r = ctr[1] + vecs[v][1];
			this.ctx.fillStyle = (new shapes[model.objIdx]()).color;
			this.ctx.fillRect(10+this.padding + c*this.size,
			40+this.padding + this.height*this.size - (r+1)*this.size,
			this.size, this.size);
			this.ctx.strokeRect(10+this.padding + c*this.size,
			40+this.padding + this.height*this.size - (r+1)*this.size,
			this.size, this.size);
		}
		// draw points
		this.ctx.strokeStyle = "#000";
		this.ctx.lineWidth = 2;
		this.ctx.strokeRect(10 + this.width*this.size+this.padding*2 + 20,40, 
							this.canvas.width - 10 - (10 + this.width*this.size+this.padding*2 + 20),30);
		this.ctx.fillStyle = "#000";
		this.ctx.lineWidth = 0;
		this.ctx.font = "25px sans-serif";
		this.ctx.fillText(model.points, 
					10 + this.width*this.size+this.padding*2 + 10 + 10 + 10,
					65);
		// draw level
		this.ctx.fillText("Level: " + model.level, 
					10 + this.width*this.size+this.padding*2 + 10 + 10 + 10,
					100);
		if (model.gameOver) {
			this.ctx.fillStyle = "#000";
			this.ctx.lineWidth = 0;
			this.ctx.font = "20px sans-serif";
			this.ctx.fillText("Game Over, Buddy.", 
					10 + this.width*this.size+this.padding*2 + 10 + 10 + 10,
					150);
		}
	};
}
