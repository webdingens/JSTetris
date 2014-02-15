/*** Author: Martin Senk
	 shape object constructors are defined and gathered in the variable shapes***/

var shapes = [shapeI,shapeO,shapeT,shapeL,shapeJ, shapeS, shapeZ]; // id of object is index

function shapeI(x, y){
	this.centre = [x, y];
	this.color = "#ff0000";
	this.state = 0; // upright;
	this.L = function(){ return (this.state === 0)? -1:0;}; // -1 left or upright if not already
	this.R = function(){ return (this.state === 0)? 1:0;}; // 1 right or upright if not already
	this.getSpaceNeeded = function(state){
		if (state === 0){
			return [[0,2],[0,1],[0,0],[0,-1]];
		}else if (state == 1){
			return [[-1,0],[0,0],[1,0],[2,0]];
		}else if (state == -1){
			return [[-2,0],[-1,0],[0,0],[1,0]];
		}
	};
}
function shapeT(x, y){
	this.centre = [x, y];
	this.color = "#0000ff";
	this.state = 0; // upright;
	this.L = function(){ return (this.state + 3)%4;}; // -1 left or upright if not already
	this.R = function(){ return (this.state + 1)%4;}; // 1 right or upright if not already
	this.getSpaceNeeded = function(state){
		if (state === 0){
			return [[-1,0],[0,0],[0,1],[1,0]];
		}else if (state == 1){
			return [[0,0],[0,1],[0,-1],[1,0]];
		}else if (state == 2){
			return [[0,0],[0,-1],[-1,0],[1,0]];
		}else if (state == 3){
			return [[0,0],[0,-1],[-1,0],[0,1]];
		}
	};
}
function shapeL(x, y){
	this.centre = [x, y];
	this.color = "#00ffff";
	this.state = 0; // upright;
	this.L = function(){ return (this.state + 3)%4;}; // -1 left or upright if not already
	this.R = function(){ return (this.state + 1)%4;}; // 1 right or upright if not already
	this.getSpaceNeeded = function(state){
		if (state === 0){
			return [[-1,1],[0,1],[0,0],[0,-1]];
		}else if (state == 1){
			return [[-1,0],[0,0],[1,0],[1,1]];
		}else if (state == 2){
			return [[0,1],[0,0],[0,-1],[1,-1]];
		}else if (state == 3){
			return [[1,0],[0,0],[-1,0],[-1,-1]];
		}
	};
}
function shapeJ(x, y){
	this.centre = [x, y];
	this.color = "#ffff00";
	this.state = 0; // upright;
	this.L = function(){ return (this.state + 3)%4;}; // -1 left or upright if not already
	this.R = function(){ return (this.state + 1)%4;}; // 1 right or upright if not already
	this.getSpaceNeeded = function(state){
		if (state === 0){
			return [[1,1],[0,1],[0,0],[0,-1]];
		}else if (state == 1){
			return [[-1,0],[0,0],[1,0],[1,-1]];
		}else if (state == 2){
			return [[0,1],[0,0],[0,-1],[-1,-1]];
		}else if (state == 3){
			return [[1,0],[0,0],[-1,0],[-1,1]];
		}
	};
}
function shapeS(x, y){
	this.centre = [x, y];
	this.color = "#ff00ff";
	this.state = 0; // upright;
	this.L = function(){ return (this.state === 0)? 1:0;}; // -1 left or upright if not already
	this.R = function(){ return (this.state === 0)? 1:0;}; // 1 right or upright if not already
	this.getSpaceNeeded = function(state){
		if (state === 0){
			return [[0,1],[0,0],[1,0],[1,-1]];
		}else if (state == 1){
			return [[-1,0],[0,0],[0,1],[1,1]];
		}
	};
}
function shapeZ(x, y){
	this.centre = [x, y];
	this.color = "#666666";
	this.state = 0; // upright;
	this.L = function(){ return (this.state === 0)? 1:0;}; // -1 left or upright if not already
	this.R = function(){ return (this.state === 0)? 1:0;}; // 1 right or upright if not already
	this.getSpaceNeeded = function(state){
		if (state === 0){
			return [[0,1],[0,0],[-1,0],[-1,-1]];
		}else if (state == 1){
			return [[1,0],[0,0],[0,1],[-1,1]];
		}
	};
}
function shapeO(x, y){
	this.centre = [x, y];
	this.color = "#00ff00";
	this.state = 0; // upright;
	this.L = function(){ return 0;}; // -1 left or upright if not already
	this.R = function(){ return 0;}; // 1 right or upright if not already
	this.getSpaceNeeded = function(state){
		return [[0,0],[0,-1],[1,0],[1,-1]];
	};
}
