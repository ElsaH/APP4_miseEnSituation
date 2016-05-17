$(document).ready(function() {

	var canvas_game = document.getElementById("canvas_game");
	var ctx_game = canvas_game.getContext("2d");
	var canvas_choose = document.getElementById("canvas_choose");
	var ctx_choose = canvas_choose.getContext("2d");

	function init() {
		window.addEventListener('resize', updateCanvas, false);
		DRAW_CHARAC.load(updateCanvas);
	}
	
	function drawGameCanvas() {
		GAME.drawBackground(canvas_game, ctx_game);
		GAME.drawCharactersInfos(canvas_game, ctx_game);
		GAME.drawCharacters(canvas_game, ctx_game)
	}

	function drawChooseCanvas() {
		CHOOSE.drawBackground(canvas_choose, ctx_choose);
		CHOOSE.drawCharacters(canvas_choose, ctx_choose);
	}

	function updateCanvas() {
		// canvas_game.width = window.innerWidth;
		// canvas_game.height = window.innerHeight;
		drawGameCanvas();
		drawChooseCanvas();
	}

	$('canvas').click(function(e){
	    var x = e.clientX;
	    var y = e.clientY;     
	    console.log(x, y);
	});

	init();
});