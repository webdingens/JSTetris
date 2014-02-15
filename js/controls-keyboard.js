
var map = {37:"left", 40: "down", 39: "right", 38: "A",
					65: "A", 68: "B", 32: "drop"};
var keyDown = {"left":false, "up":false, "down": false, "right": false, 
					"A": false, "B": false, "drop": false};
var timeDown = {"left": -1, "up": -1, "down": -1, "right": -1, 
					"A": -1, "B": -1, "drop": -1};
var keyPressed = {"left":false, "up":false, "down": false, "right": false, 
					"A": false, "B": false, "drop": false};
/* thanks to http://stackoverflow.com/a/12444641/1703727  for the key down/up map */
document.onkeydown = document.onkeyup = function(e){
	e = e || window.event; // to deal with IE
	keyDown[map[e.keyCode]] = e.type == 'keydown';
	if (e.type == 'keydown' && timeDown[map[e.keyCode]] == -1){
		timeDown[map[e.keyCode]] = (new Date()).getTime();
		keyPressed[map[e.keyCode]] = true;
	}
	if (e.type == 'keyup'){
		timeDown[map[e.keyCode]] = -1;
	}
};
function checkButtons(){} // only relevant for the mobile version
