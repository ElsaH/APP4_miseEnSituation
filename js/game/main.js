var RATIO = 4;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 300;

$(document).ready(function() {

	var setHiDPICanvas = function(w, h, id) {
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

	var init = function() {
		// Gestion image du curseur
		GAME.pointer = false;
		CHOOSE.pointer = false;

		// Initialisation du jeu
		GAME.init(4);

		// Div du choix d'action
		

		window.addEventListener('resize', updateCanvas, false);
		DRAW_CHARAC.load(updateCanvas);
	}
	
	var drawGameCanvas = function() {
		GAME.drawBackground(canvas_game, ctx_game);
		GAME.drawCharactersInfos(canvas_game, ctx_game);
		GAME.drawCharacters(canvas_game, ctx_game)
	}

	var drawChooseCanvas = function() {
		CHOOSE.drawBackground(canvas_choose, ctx_choose);
		CHOOSE.drawMenu(canvas_choose, ctx_choose);
	}

	var updateCanvas = function() {
		// canvas_game.width = window.innerWidth;
		// canvas_game.height = window.innerHeight;
		drawGameCanvas();
		drawChooseCanvas();
	}

	var getYXcanvas = function(canvas, e) {
		var x;
		var y;
		if (e.pageX || e.pageY) { 
		  x = e.pageX;
		  y = e.pageY;
		}
		else { 
		  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		return {x:x, y:y};
	}

	//$('canvas').addClass('default');

	$('canvas').mousemove(function(e) {
		var pos = getYXcanvas(this, e);
	    var x = pos.x;
		var y = pos.y;
		if (this.id == "canvas_choose") 
			CHOOSE.mouseEvents("move",x,y);
		else if (this.id == "canvas_game")
			GAME.mouseEvents("move",x,y);
	});

	$('canvas').click(function(e){
		var pos = getYXcanvas(this, e);
	    var x = pos.x;
		var y = pos.y;
		if (this.id == "canvas_choose") 
			CHOOSE.mouseEvents("click",x,y);
		else if (this.id == "canvas_game")
			GAME.mouseEvents("click",x,y);
	});

	init();
});