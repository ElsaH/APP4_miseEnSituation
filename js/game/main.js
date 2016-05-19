// variables globales

var RATIO = 4;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 300;
var canvas_choose;
var ctx_choose;
var canvas_game;
var ctx_game;

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
	canvas_choose = setHiDPICanvas(500, 300, "canvas_choose");
	ctx_choose = canvas_choose.getContext("2d");
	canvas_game = setHiDPICanvas(500, 300, "canvas_game");
	ctx_game = canvas_game.getContext("2d");

	var init = function() {
		// Gestion image du curseur
		GAME.pointer = false;
		CHOOSE.pointer = false;

		// Initialisation du jeu
		SOCKET.init();
		var nbJoueurs = $('#nbJoueurs').val();
		GAME.init(nbJoueurs);

		// choix du canvas à afficher
		if (SOCKET.statut == "choose_perso") {
			$('#canvas_game_container').addClass('nodisplay');
		}

		CHARACTER.load(draw);
	}

	var draw = function() {
		CHOOSE.draw();
		GAME.draw();
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