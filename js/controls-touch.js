/*** 	Author Martin Senk
		This file registers touch handlers and tracks touches. It also defines
		a checkButtons function that checks where the touches are at the
		time of the call and sets the the control variables ***/

var canvasId = "drawing-area";

/*** control variables ***/
var keyDown = {"left":false, "up":false, "down": false, "right": false, 
					"A": false, "B": false, "drop": false};
var timeDown = {"left": -1, "up": -1, "down": -1, "right": -1, 
					"A": -1, "B": -1, "drop": -1};
var keyPressed = {"left":false, "up":false, "down": false, "right": false, 
					"A": false, "B": false, "drop": false};

// the received touches have to be stored to handle end, cancel and leave events properly
var ongoingTouches = {};
function touchStartHandler(e){
	e.preventDefault();
	var touches = e.changedTouches;
	for (var i=0; i < touches.length; i++) {
		ongoingTouches[touches[i].identifier] = touches[i];
	}
}
function touchMoveHandler(e){
	e.preventDefault();
	var touches = e.changedTouches;
	for (var i=0; i < touches.length; i++) {
		ongoingTouches[touches[i].identifier] = touches[i];
	}
}
function touchEndHandler(e){
	e.preventDefault();
	var touches = e.changedTouches;
	for (var i=0; i < touches.length; i++) {
		delete ongoingTouches[touches[i].identifier];
	}
}

function checkButtons(){
	var canvas = document.getElementById(canvasId);
	var ctx = canvas.getContext("2d");
	var bbox = canvas.getBoundingClientRect();
	var portrait = canvas.height> canvas.width;

	var cursorFieldWidth = (canvas.width<canvas.height)?canvas.width/2:canvas.width*0.2;
	if (canvas.width < canvas.height){ // portrait -> buttons and cursor field under stone drop field
		var center = [cursorFieldWidth/2, canvas.height - cursorFieldWidth/2];
		var pos = [0, canvas.height - cursorFieldWidth]
		
	}else{ // landscape -> cursor field left, then stone drop field and then the buttons
		var center = [cursorFieldWidth/2, canvas.height/2];
		var pos = [0, (canvas.height - cursorFieldWidth)/2];
	}

	// register the incoming touches
	var keysTouched = {};
	for (var _idx in ongoingTouches) {
		var tx = ongoingTouches[_idx].pageX - bbox.left;
		var ty = ongoingTouches[_idx].pageY - bbox.top;
		if (tx > pos[0] && tx < pos[0] + cursorFieldWidth && // x bounds
			ty > pos[1] && ty < pos[1] + cursorFieldWidth && // y bounds
			// also ignore when in the middle of the field:
			Math.sqrt(Math.pow(tx-center[0],2) + Math.pow(ty-center[1],2)) > cursorFieldWidth/5){ 
			var alpha = Math.atan2(ty-center[1], tx-center[0]) + (Math.PI/8);
			if (alpha < 0) alpha = (alpha + 2* Math.PI) % (2*Math.PI);
			alpha = Math.floor(alpha/(Math.PI/4));
			if (alpha == 0){
				keysTouched["right"] = true;
			}else if (alpha == 1){
				keysTouched["right"] = true;
				keysTouched["down"] = true;
			}else if (alpha == 2){
				keysTouched["down"] = true;
			}else if (alpha == 3){
				keysTouched["down"] = true;
				keysTouched["left"] = true;
			}else if (alpha == 4){
				keysTouched["left"] = true;
			}else if (alpha == 5){
				keysTouched["left"] = true;
				keysTouched["up"] = true;
			}else if (alpha == 6){
				keysTouched["up"] = true;
			}else{ // alpha == 7
				keysTouched["up"] = true;
				keysTouched["right"] = true;
			}
		}
		if (portrait) {
			if (ty > canvas.height - cursorFieldWidth && // further than the display area
						Math.sqrt(Math.pow(tx - (canvas.width - 0.75*cursorFieldWidth),2) +
						Math.pow(ty - (canvas.height - cursorFieldWidth/2 + (cursorFieldWidth/4)),2)) < cursorFieldWidth/4) {
				keysTouched["A"] = true; 
			}
			if (ty > canvas.height - cursorFieldWidth && // further than the display area
						Math.sqrt(Math.pow(tx - (canvas.width - 0.25*cursorFieldWidth),2) + 
						Math.pow(ty - (canvas.height - cursorFieldWidth/2 - (cursorFieldWidth/4)),2)) < cursorFieldWidth/4) {
				keysTouched["B"] = true;
			}
		}else{
			if (tx > canvas.width * 0.8 && // further than the display area
						Math.sqrt(Math.pow(tx - (canvas.width - 0.75*cursorFieldWidth),2) +
						Math.pow(ty - ((canvas.height/2) + (cursorFieldWidth/4)),2)) < cursorFieldWidth/4) {
				keysTouched["A"] = true; 
			}
			if (tx > canvas.width * 0.8 && // further than the display area
						Math.sqrt(Math.pow(tx - (canvas.width - 0.25*cursorFieldWidth),2) + 
						Math.pow(ty - ((canvas.height/2) - (cursorFieldWidth/4)),2)) < cursorFieldWidth/4) {
				keysTouched["B"] = true;
			}
		}
	}
	// update depending on where the ongoing Touches are situated
	for (k in keyDown){
		if (!(k in keysTouched)){
			keyDown[k] = false;
			timeDown[k] = -1;
		}else if (timeDown[k] == -1){
			keyDown[k] = true;
			timeDown[k] = (new Date()).getTime();
			keyPressed[k] = true;
		}else{
			keyDown[k] = true;
		}
	}
}

// register the handlers
document.getElementById("drawing-area").addEventListener("touchstart", touchStartHandler, false);
document.getElementById("drawing-area").addEventListener("touchmove", touchMoveHandler, false);
document.getElementById("drawing-area").addEventListener("touchend", touchEndHandler, false);
document.getElementById("drawing-area").addEventListener("touchleave", touchEndHandler, false);
document.getElementById("drawing-area").addEventListener("touchcancel", touchEndHandler, false);
