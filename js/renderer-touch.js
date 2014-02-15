function Renderer(width, height){
	this.width = width;
	this.height = height;
	this.padding = 0.02;
	this.splitAt = 0.5;
	this.padding = 3;
	this.drawControls = function(canvas, context){
		var ctx = context;
		var cursorFieldWidth = (canvas.width<canvas.height)?canvas.width/2:canvas.width*0.2;
		var bbox = canvas.getBoundingClientRect();
		var portrait = canvas.width < canvas.height;
		if (portrait){ // portrait -> buttons and cursor field under stone drop field
			var center = [cursorFieldWidth/2, canvas.height - cursorFieldWidth/2];
			var pos = [0, canvas.height - cursorFieldWidth]
		}else{ // landscape -> cursor field left, then stone drop field and then the buttons
			var center = [cursorFieldWidth/2, canvas.height/2];
			var pos = [0, (canvas.height - cursorFieldWidth)/2];
		}
		ctx.beginPath();
		// draw the cursor field outline
		ctx.clearRect(0,0,canvas.width, canvas.height);
		ctx.strokeStyle = "#000";
		ctx.lineWidth = "4px";
		ctx.strokeRect(pos[0], pos[1], cursorFieldWidth, cursorFieldWidth);
		// draw the circle
		ctx.beginPath();
		ctx.arc(center[0], center[1], cursorFieldWidth/2, 0, 2*Math.PI);
		var gradient = ctx.createRadialGradient(center[0], center[1], 0, center[0], center[1], cursorFieldWidth);
		gradient.addColorStop(0.8,"#BBB");
		gradient.addColorStop(0,"#FFF");
		ctx.fillStyle = gradient;	// seems to cause flickering on android browser
		ctx.strokeStyle = "#222";
		ctx.fill();
		ctx.stroke();
		// draw the cursor keys
		ctx.beginPath();
		ctx.fillStyle = "#AAA";
		ctx.strokeStyle = "#222";
		ctx.lineWidth = "2px";
		ctx.fillRect(pos[0] + cursorFieldWidth * 0.4, pos[1], cursorFieldWidth * 0.2, cursorFieldWidth);
		ctx.fillRect(pos[0], pos[1] + cursorFieldWidth * 0.4, cursorFieldWidth, cursorFieldWidth * 0.2);
		ctx.strokeRect(pos[0] + cursorFieldWidth * 0.4, pos[1], cursorFieldWidth * 0.2, cursorFieldWidth);
		ctx.strokeRect(pos[0], pos[1] + cursorFieldWidth * 0.4, cursorFieldWidth, cursorFieldWidth * 0.2);
		// put little triangles on top
		var _r1 = (cursorFieldWidth/2) * 0.95;
		var _r2 = (cursorFieldWidth/2) * 0.9;
		var alphaStep = Math.PI/4;
		var alphaDiff = Math.PI/32;
	
		for (var _x=0;_x<8;_x++){
			if (_x%2 == 0){
				var r1 = _r1;
				var r2 = _r2;
			}else{
				var r1 = 0.95 * _r1;
				var r2 = 0.95 * _r2;
			}
			ctx.beginPath();
			ctx.moveTo(center[0] + r1 * Math.cos(alphaStep * _x),
						center[1] + r1 * Math.sin(alphaStep * _x));
			ctx.lineTo(center[0] + r2 * Math.cos(alphaStep * _x - alphaDiff),
						center[1] + r2 * Math.sin(alphaStep * _x - alphaDiff));
			ctx.lineTo(center[0] + r2 * Math.cos(alphaStep * _x + alphaDiff), 
						center[1] + r2 * Math.sin(alphaStep * _x + alphaDiff));
			ctx.closePath();
			ctx.fillStyle = "#999";
			ctx.fill();
			ctx.stroke();
		}
		
		/*** draw the active directions above the cursor field ***/
		if (!portrait){
			var _d = (cursorFieldWidth/2) * 0.1;
			// left
			ctx.beginPath();
			ctx.moveTo(center[0] + _d*-4,_d*3);
			ctx.lineTo(center[0] + _d*-3,_d*1);
			ctx.lineTo(center[0] + _d*-3,_d*5);
			ctx.closePath();
			if (keyDown["left"]) {
				ctx.fillStyle = "#F00";
				ctx.fill();
			}
			ctx.strokeStyle = "#000";
			ctx.lineWidth = "2px";
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(center[0] + _d*0,_d*1);
			ctx.lineTo(center[0] + _d*-2,_d*2);
			ctx.lineTo(center[0] + _d*2,_d*2);
			ctx.closePath();
			if (keyDown["up"]) {
				ctx.fillStyle = "#F00";
				ctx.fill();
			}
			ctx.strokeStyle = "#000";
			ctx.lineWidth = "2px";
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(center[0] + _d*0,_d*5);
			ctx.lineTo(center[0] + _d*-2,_d*4);
			ctx.lineTo(center[0] + _d*2,_d*4);
			ctx.closePath();
			if (keyDown["down"]) {
				ctx.fillStyle = "#F00";
				ctx.fill();
			}
			ctx.strokeStyle = "#000";
			ctx.lineWidth = "2px";
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(center[0] + _d*4,_d*3);
			ctx.lineTo(center[0] + _d*3,_d*1);
			ctx.lineTo(center[0] + _d*3,_d*5);
			ctx.closePath();
			if (keyDown["right"]) {
				ctx.fillStyle = "#F00";
				ctx.fill();
			}
			ctx.strokeStyle = "#000";
			ctx.lineWidth = "2px";
			ctx.stroke();
		}

		/*** draw the buttons ***/
		if (portrait){
			// A
			ctx.beginPath()
			ctx.arc(canvas.width - 0.75*cursorFieldWidth, canvas.height - cursorFieldWidth/2 + (cursorFieldWidth/4),
					cursorFieldWidth/4, 0, 2*Math.PI);
			ctx.fillStyle = "orchid";
			ctx.fill();
			ctx.strokeStyle = "#000";
			ctx.lineWidth = "2px";
			ctx.stroke();
			// Text A
			ctx.beginPath();
			ctx.font = (cursorFieldWidth/3) + 'px sans-serif';
			ctx.fillStyle = "mistyrose";
			ctx.fillText("A",canvas.width - 0.75*cursorFieldWidth - (cursorFieldWidth/9), 
							canvas.height - cursorFieldWidth/2 + (cursorFieldWidth/4) + (cursorFieldWidth/9));
			// B
			ctx.beginPath()
			ctx.arc(canvas.width - 0.25*cursorFieldWidth, canvas.height - cursorFieldWidth/2 - (cursorFieldWidth/4),
					cursorFieldWidth/4, 0, 2*Math.PI);
			ctx.fillStyle = "orchid";
			ctx.fill();
			ctx.strokeStyle = "#000";
			ctx.lineWidth = "2px";
			ctx.stroke();
			// Text B
			ctx.beginPath();
			ctx.font = (cursorFieldWidth/3) + 'px sans-serif';
			ctx.fillStyle = "mistyrose";
			ctx.fillText("B",canvas.width - 0.25*cursorFieldWidth - (cursorFieldWidth/9), 
							canvas.height - cursorFieldWidth/2 - (cursorFieldWidth/4) + (cursorFieldWidth/9));
		}else{
			// A
			ctx.beginPath()
			ctx.arc(canvas.width - 0.75*cursorFieldWidth, (canvas.height/2) + (cursorFieldWidth/4),
					cursorFieldWidth/4, 0, 2*Math.PI);
			ctx.fillStyle = "orchid";
			ctx.fill();
			ctx.strokeStyle = "#000";
			ctx.lineWidth = "2px";
			ctx.stroke();
			// Button A feedback lamp
			ctx.beginPath();
			ctx.moveTo(canvas.width - 0.75*cursorFieldWidth, (canvas.height/2));
			ctx.lineTo(canvas.width - 0.75*cursorFieldWidth, 
					(canvas.height/2) - (canvas.height/4) + 0.3 * (cursorFieldWidth/4));
			ctx.strokeStyle = "#000";
			ctx.lineWidth = "2px";
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(canvas.width - 0.75*cursorFieldWidth, (canvas.height/2) - (canvas.height/4),
					0.3 * (cursorFieldWidth/4), 0, Math.PI * 2);
			if (keyDown["A"]){
				ctx.fillStyle = "red";
				ctx.fill();
			}
			ctx.stroke();
			// Text A
			ctx.beginPath();
			ctx.font = (cursorFieldWidth/3) + 'px sans-serif';
			ctx.fillStyle = "mistyrose";
			ctx.fillText("A",canvas.width - 0.75*cursorFieldWidth - (cursorFieldWidth/9), 
							(canvas.height/2) + (cursorFieldWidth/4) + (cursorFieldWidth/9));
			// B
			ctx.beginPath()
			ctx.arc(canvas.width - 0.25*cursorFieldWidth, (canvas.height/2) - (cursorFieldWidth/4),
					cursorFieldWidth/4, 0, 2*Math.PI);
			ctx.fillStyle = "orchid";
			ctx.fill();
			ctx.strokeStyle = "#000";
			ctx.lineWidth = "2px";
			ctx.stroke();
			// Button B feedback lamp
			ctx.beginPath();
			ctx.moveTo(canvas.width - 0.25*cursorFieldWidth, (canvas.height/2) - 2 * (cursorFieldWidth/4));
			ctx.lineTo(canvas.width - 0.25*cursorFieldWidth, 
					(canvas.height/2) - (canvas.height/4) - 1.7 * (cursorFieldWidth/4));
			ctx.strokeStyle = "#000";
			ctx.lineWidth = "2px";
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(canvas.width - 0.25*cursorFieldWidth, (canvas.height/2) - (canvas.height/4) - 2 * (cursorFieldWidth/4),
					0.3 * (cursorFieldWidth/4), 0, Math.PI * 2);
			if (keyDown["B"]){
				ctx.fillStyle = "red";
				ctx.fill();
			}
			ctx.stroke();
			// Text B
			ctx.beginPath();
			ctx.font = (cursorFieldWidth/3) + 'px sans-serif';
			ctx.fillStyle = "mistyrose";
			ctx.fillText("B",canvas.width - 0.25*cursorFieldWidth - (cursorFieldWidth/9), 
							(canvas.height/2) - (cursorFieldWidth/4) + (cursorFieldWidth/9));
		}
	};
	this.resizeEventHandler = function(e){
		var canvas = document.getElementById("drawing-area");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	
	this.init = function(){
		this.canvas = document.getElementById("drawing-area");
		/*
		// setting the canvas to the style implied heights (FF: style.width wasn't set)
		if (this.canvas.width != this.canvas.clientWidth) this.canvas.width = this.canvas.clientWidth;
		if (this.canvas.height != this.canvas.clientHeight) this.canvas.height = this.canvas.clientHeight;
		*/
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		// define drawing rectangle
		this.portrait = this.canvas.height>this.canvas.width;
		if (this.portrait){
			this.dRect = {"x": 0, "y": 0, "width":this.canvas.width, 
				"height":this.canvas.height-this.canvas.width/2};
			this.size = [(this.dRect.width - 2*this.padding - 20)/this.width,
							(this.dRect.height - 2*this.padding - 20)/(this.height + 2)];
		}else{
			this.dRect = {"x": this.canvas.width * 0.2, "y": 0, 
				"width":this.canvas.width * 0.6, "height":this.canvas.height};
			this.size = [(this.dRect.width * this.splitAt - 2*this.padding - 20)/this.width,
							// height reduced 2*10 margin and 2*padding, also additional 4 tiles are made to (over-)fit
							(this.dRect.height - 2*this.padding - 20)/(this.height + 2)];
		}
		
		// draw the elements in initial state
		this.ctx = this.canvas.getContext('2d');
		this.ctx.fillStyle = "#FFF";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		// draw the control part
		this.drawControls(this.canvas, this.ctx);
		
		// set context up to the draw area of dRect
		this.ctx.save();
		this.ctx.translate(this.dRect.x, this.dRect.y);
		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.dRect.width, this.dRect.height);
		this.ctx.clip();

		// draw game container and information
		this.ctx.strokeStyle = "#000";
		this.ctx.lineWidth = 2;
		this.ctx.strokeRect(10 ,this.size[1]*2 + 10,
							this.width*this.size[0]+this.padding*2, 
							this.height*this.size[1]+this.padding*2);
		// draw 0 points
		this.ctx.strokeStyle = "#000";
		this.ctx.lineWidth = 2;
		if (this.portrait){
			this.ctx.strokeRect(10, 10, 0.6* (this.width*this.size[0]+this.padding*2) ,30);
			this.ctx.fillStyle = "#000";
			this.ctx.lineWidth = 0;
			this.ctx.font = "25px sans-serif";
			this.ctx.fillText("0", 10 + 10, 10 + 25);
		}else {
			this.ctx.strokeRect(10 + this.width*this.size[0]+this.padding*2 + 20,
								this.size[1]*2 + 10, 
								this.dRect.width - 10 - (10 + this.width*this.size[0]+this.padding*2 + 20),30);
			this.ctx.fillStyle = "#000";
			this.ctx.lineWidth = 0;
			this.ctx.font = "25px sans-serif";
			this.ctx.fillText("0", 10 + this.width*this.size[0]+this.padding*2 + 10 + 10 + 10, this.size[1]*2 + 10 + 25);
		}
		this.ctx.restore();
		window.addEventListener("resize", this.resizeEventHandler);
	};
	this.init();
	this.draw = function(model){
		this.ctx.fillStyle = "#FFF";
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		// draw the control part
		this.drawControls(this.canvas, this.ctx);

		
		this.portrait = this.canvas.height>this.canvas.width;
		if (this.portrait){
			this.dRect = {"x": 0, "y": 0, "width":this.canvas.width, 
				"height":this.canvas.height-this.canvas.width/2};
			this.size = [(this.dRect.width - 2*this.padding - 20)/this.width,
							(this.dRect.height - 2*this.padding - 20)/(this.height + 2)];
		}else{
			this.dRect = {"x": this.canvas.width * 0.2, "y": 0, 
				"width":this.canvas.width * 0.6, "height":this.canvas.height};
			this.size = [(this.dRect.width * this.splitAt - 2*this.padding - 20)/this.width,
							// height reduced 2*10 margin and 2*padding, also additional 4 tiles are made to (over-)fit
							(this.dRect.height - 2*this.padding - 20)/(this.height + 2)];
		}
		
		// set context up to the draw area of dRect
		this.ctx.save();
		this.ctx.translate(this.dRect.x, this.dRect.y);
		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.dRect.width, this.dRect.height);
		this.ctx.clip();

		// draw playfield			
		this.ctx.strokeStyle = "#000";
		this.ctx.lineWidth = 2;
		this.ctx.strokeRect(10,this.size[1]*2 + 10,
							this.width*this.size[0]+this.padding*2, 
							this.height*this.size[1]+this.padding*2);
		// draw data
		for (var r=0;r<model.height;r++){
			for (var c=0;c<model.width;c++){
				if (model.data[r][c] !== -1){
					this.ctx.fillStyle = (new shapes[model.data[r][c]]()).color;
					this.ctx.fillRect(10+this.padding + c*this.size[0],
					2 * this.size[1] + 10 +this.padding + this.height*this.size[1] - (r+1)*this.size[1],
					this.size[0], this.size[1]);
					this.ctx.strokeRect(10+this.padding + c*this.size[0],
					2 * this.size[1] + 10 +this.padding + this.height*this.size[1] - (r+1)*this.size[1],
					this.size[0], this.size[1]);
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
			this.ctx.fillRect(10+this.padding + c*this.size[0],
			2 * this.size[1] + 10 +this.padding + this.height*this.size[1] - (r+1)*this.size[1],
			this.size[0], this.size[1]);
			this.ctx.strokeRect(10+this.padding + c*this.size[0],
			2 * this.size[1] + 10 +this.padding + this.height*this.size[1] - (r+1)*this.size[1],
			this.size[0], this.size[1]);
		}
		// draw points
		this.ctx.strokeStyle = "#000";
		this.ctx.lineWidth = 2;			
		if (this.portrait){
			this.ctx.strokeRect(10, 10, 0.6* (this.width*this.size[0]+this.padding*2) ,30);
			this.ctx.fillStyle = "#000";
			this.ctx.lineWidth = 0;
			this.ctx.font = "25px sans-serif";
			this.ctx.fillText(model.points, 10 + 10, 10 + 25);
		}else {
			this.ctx.strokeRect(10 + this.width*this.size[0]+this.padding*2 + 20,
								this.size[1]*2 + 10, 
								this.dRect.width - 10 - (10 + this.width*this.size[0]+this.padding*2 + 20),30);
			this.ctx.fillStyle = "#000";
			this.ctx.lineWidth = 0;
			this.ctx.font = "25px sans-serif";
			this.ctx.fillText(model.points, 10 + this.width*this.size[0]+this.padding*2 + 10 + 10 + 10, 
					this.size[1]*2 + 10 + 25);
		}
		// draw level
		if (this.portrait){
			this.ctx.fillText("L-" + model.level, 
						10 + 0.6* (this.width*this.size[0]+this.padding*2) + 10,
						10 + 25);
		}else{
			this.ctx.fillText("Level: " + model.level, 
						10 + this.width*this.size[0]+this.padding*2 + 10 + 10 + 10,
						this.dRect.height/2);
		}
		if (model.gameOver) {
			if (this.portrait){
				this.ctx.fillStyle = "#000";
				this.ctx.lineWidth = 0;
				this.ctx.font = 2 * this.size[1] + "px sans-serif";
				this.ctx.fillText("Game Over,", 
						10 + this.padding + 10,
						this.dRect.height/2 - 5);
				this.ctx.fillText("Buddy.", 
						10 + this.padding + 10,
						this.dRect.height/2 + 5 + 2 * this.size[1]);
			}else{
				this.ctx.fillStyle = "#000";
				this.ctx.lineWidth = 0;
				this.ctx.font = "20px sans-serif";
				this.ctx.fillText("Game Over,", 
						10 + this.width*this.size[0]+this.padding*2 + 10 + 10 + 10,
						3*this.dRect.height/4);
				this.ctx.fillText("Buddy.", 
						10 + this.width*this.size[0]+this.padding*2 + 10 + 10 + 10,
						7*this.dRect.height/8);
			}
		}
		
		this.ctx.restore();
	};
}
