/*** Game[-loop] object ***/

function Game(model, renderer){
	this.model = model;
	this.renderer = renderer;
	this.dropInterval = 2000;
	this.timeTillDrop = this.dropInterval;	// reduce time after events to 90% each time
	this.checkButtonsInterval = 100;
	this.moveSidewaysInterval = 250; // 4 per second, but this will increase if direction is held, 
									 // reset after direction change
	var UPS = 50;
	var UPSinc = 1000/UPS;
	var date = new Date();
	this.createdAtTime = date.getTime();
	this.timeNextDrop = this.createdAtTime + this.timeTillDrop;
	this.timeNextButtonCheck = this.createdAtTime + this.checkButtonsInterval;
	this.lastDirection = "";
	this.timeLastMove = this.createdAtTime;
	this.run = function(){
		if (this.model.gameOver){
			return;	// return without rescheduling this.run()
		}
		this.timeTillDrop = Math.max(this.checkButtonsInterval, this.dropInterval - this.model.level * 150);
		var needsRedraw = false;
		// react to input
		//needsRedraw = true; // if input was there and model was updated
		var timeNow = (new Date()).getTime();
		var droppedOneLine = false;
		if (timeNow > this.timeNextButtonCheck) {
			checkButtons();
			buttonsAreBeingChecked = true;
			// check buttons L on "A key", R on "D key"
			if (keyPressed["A"] || (timeDown["A"]!= -1 && timeNow > timeDown["A"] + this.moveSidewaysInterval)){
				if (this.model.L()) needsRedraw = true;
				keyPressed["A"] = false;
				keyPressed["B"] = false;
			}else if (keyPressed["B"] || (timeDown["B"]!= -1 && timeNow > timeDown["B"] + this.moveSidewaysInterval)){
				if (this.model.R()) needsRedraw = true;
				keyPressed["A"] = false;
				keyPressed["B"] = false;
			}	// omit the up key => A, that was only for convenience on keyboards
			// check cursor keys (left right)
			if (keyPressed["left"]|| (timeDown["left"]!= -1 && timeNow > timeDown["left"] + this.moveSidewaysInterval)){
				if (this.model.left()) needsRedraw = true;
				keyPressed["left"] = false;	// finger lifted and processed it
			}else if (keyPressed["right"]|| (timeDown["right"]!= -1 && timeNow > timeDown["right"] + this.moveSidewaysInterval)){
				if (this.model.right()) needsRedraw = true;
				keyPressed["right"] = false;
			}else if (keyPressed["drop"]){ // TODO: implement another key? use downwards for drop instead of newline?
				this.model.dropDead();
				droppedOneLine = true;
				needsRedraw = true;
				keyPressed["drop"] = false;	// wait till finger lifts (pressing and holding the button is just one press)
			}else if (keyPressed["down"]){
				this.model.nextLine();
				droppedOneLine = true;
				needsRedraw = true;
				if (!keyDown["down"]) keyPressed["down"] = false;
			}
			this.timeNextButtonCheck = timeNow + this.checkButtonsInterval;
			buttonsAreBeingChecked = false;
		}
		
		// drop one line if it's time
		timeNow = (new Date()).getTime();
		// check if we already dropped one line, then we don't repeat in this cycle (too fast and jerky)
		if (!droppedOneLine && timeNow > this.timeNextDrop){
			//document.getElementById("content").innerHTML += "Callto model.nextLine() <br>";
			this.model.nextLine();
			this.timeNextDrop += this.timeTillDrop;
			needsRedraw = true;
		}
		
		// redraw if necessary
		if (needsRedraw){
			this.renderer.draw(this.model);
		}
		
		// reschedule the function with a static time
		var self = this;
		setTimeout(function(){self.run();}, UPSinc);
	};
}
