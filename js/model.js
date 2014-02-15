function Model(width, height){
	this.width = width;
	this.height = height;
	this.points = 0;
	this.tilesDropped = 0;
	this.level = 1;
	this.gameOver = false;
	this.startX = Math.floor(this.width/2);
	this.startY = this.height - 1;
	this.objIdx = Math.floor(Math.random() * shapes.length);
	this.objNew = new shapes[this.objIdx](this.startX, this.startY);
	this.data = []; // 2d array of extent height x width, filled with -1
	// fill data
	for (var r=0;r<height;r++){
		var row = [];
		for (var c=0;c<width;c++){
			row.push(-1);
		}
		this.data.push(row);
	}
	/* functions */
	this.nextLine = function(){
				var spaceNeeded = this.objNew.getSpaceNeeded(this.objNew.state);
				var hasSpace = this.checkSpace(spaceNeeded, [this.objNew.centre[0],this.objNew.centre[1]-1]);
				//document.getElementById("content").innerHTML += "nextLine has space: " + hasSpace + "<br>";
				if (hasSpace) {
					this.objNew.centre = [this.objNew.centre[0], this.objNew.centre[1]-1];
				}else{
					this.lockObject();
				}
				};
	this.dropDead = function(){
				var spaceNeeded = this.objNew.getSpaceNeeded(this.objNew.state);
				var y = this.objNew.centre[1] - 1;
				while (y >= 0 && this.checkSpace(spaceNeeded, [this.objNew.centre[0],y])){
					y--;
				}
				this.objNew.centre = [this.objNew.centre[0], y+1];
				this.lockObject();					
				};
	this.lockObject = function(){
				var space = this.objNew.getSpaceNeeded(this.objNew.state);
				var rows = {};
				for (var s in space){
					var y = space[s][1] + this.objNew.centre[1];
					var x = space[s][0] + this.objNew.centre[0];
					if (x < 0 || x >= this.width || y < 0 || y >= this.height){
						// dude the game is over, you failed
						this.gameOver = true;
						return;
					};
					this.data[space[s][1] + this.objNew.centre[1]][space[s][0] + this.objNew.centre[0]] = this.objIdx;
					rows[space[s][1] + this.objNew.centre[1]] = true;
				}
				this.tilesDropped++;
				if (this.tilesDropped/10 > this.level) this.level++;
				this.checkForFullRows(rows);
				this.createNewObject();
				};
	this.checkForFullRows = function(rows){
				var deleteRows = [];
				for (var r in rows){
					// check if any is missing
					var deleteThisRow = true;
					for (var x=0;x<width;x++){
						if(this.data[r][x] === -1){
							deleteThisRow = false;
							break;
						}
					}
					if (deleteThisRow) deleteRows.push(r);
				}
				if (deleteRows.length === 0) return;
				// update data
				var count = 0;
				for (var d in deleteRows){
					(this.data).splice(deleteRows[d] - count,1);
					var newRow = [];
					newRow.length = this.width;
					for (var i=0;i<newRow.length;i++) newRow[i] = -1;
					this.data.push(newRow);
					count++;
				}
				if (deleteRows.length <= 3) {
					this.points += deleteRows.length * 100;
				}else {
					this.points += 700;
				}
				};
	this.createNewObject = function(){
				var newIdx = Math.floor(Math.random() * shapes.length);
				var newObj = new shapes[newIdx](this.startX, this.startY); 
				if (this.checkSpace(newObj.getSpaceNeeded(newObj.state),newObj.centre)){
					this.objIdx = newIdx;
					this.objNew = newObj;
				}else{
					this.objIdx = newIdx;
					this.objNew = newObj;
					this.gameOver = true; // could not place the new object, stack too high
				}
				};
	this.checkSpace = function(vecs, centre){
				for (var v in vecs){
					var x = vecs[v][0] + centre[0];
					var y = vecs[v][1] + centre[1];
					if (x < 0 || x >= this.width || y < 0) return false;
					if (y < this.height && this.data[y][x] != -1) {
						//document.getElementById("content").innerHTML += "data was written too soon? x " + x + " y " + y + 
						//	" id: " + this.data[y][x] + " at: " + (new Date()).getTime();							
						return false;
					}
				}
				return true;
				};
	this.right = function(){
				var spaceNeeded = this.objNew.getSpaceNeeded(this.objNew.state);
				var hasSpace = this.checkSpace(spaceNeeded, [this.objNew.centre[0]+1,this.objNew.centre[1]]);
				if (hasSpace){
					this.objNew.centre[0] += 1;
					return true;
				} return false;};
	this.left = function(){
				var spaceNeeded = this.objNew.getSpaceNeeded(this.objNew.state);
				var hasSpace = this.checkSpace(spaceNeeded, [this.objNew.centre[0]-1,this.objNew.centre[1]]);
				if (hasSpace){
					this.objNew.centre[0] -= 1;
					return true;
				} return false;};
	this.R = function(){
				var newState = this.objNew.R();
				var spaceNeeded = this.objNew.getSpaceNeeded(newState);
				var hasSpace = this.checkSpace(spaceNeeded, this.objNew.centre);
				if (hasSpace){
					this.objNew.state = newState;
					return true;
				}return false;};
	this.L = function(){
				var newState = this.objNew.L();
				var spaceNeeded = this.objNew.getSpaceNeeded(newState);
				var hasSpace = this.checkSpace(spaceNeeded, this.objNew.centre);
				if (hasSpace){
					this.objNew.state = newState;
					return true;
				}return false;};
}
