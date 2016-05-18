var RATIO = 4;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 300;

$(document).ready(function() {

	setHiDPICanvas = function(w, h, id) {
	    var can = document.getElementById(id);
	    can.width = w * RATIO;
	    can.height = h * RATIO;
	    can.style.width = w + "px";
	    can.style.height = h + "px";
	    can.getContext("2d").setTransform(RATIO, 0, 0, RATIO, 0, 0);
	    return can;
	}

	//Create canvas with a custom resolution.
	var canvas_choose = setHiDPICanvas(500, 300, "canvas_choose");
	var ctx_choose = canvas_choose.getContext("2d");
	var canvas_game = setHiDPICanvas(500, 300, "canvas_game");
	var ctx_game = canvas_game.getContext("2d");

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
		CHOOSE.drawMenu(canvas_choose, ctx_choose);
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