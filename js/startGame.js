// register the start function
window.addEventListener("load", function(){
	var game = new Game(new Model(10,20), new Renderer(10,20));
	game.run();
});
