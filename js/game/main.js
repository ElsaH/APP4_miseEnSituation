// variables globales

var RATIO = 4;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 300;
var canvas_choose;
var ctx_choose;
var canvas_game;
var ctx_game;
var getPlayerSpells;

$(document).ready(function() {

	//Create canvas with a custom resolution.
	var setHiDPICanvas = function(w, h, id) {
	    var can = document.getElementById(id);
	    can.width = w * RATIO;
	    can.height = h * RATIO;
	    can.style.width = w + "px";
	    can.style.height = h + "px";
	    can.getContext("2d").setTransform(RATIO, 0, 0, RATIO, 0, 0);
	    return can;
	}

	canvas_choose = setHiDPICanvas(500, 300, "canvas_choose");
	ctx_choose = canvas_choose.getContext("2d");
	canvas_game = setHiDPICanvas(500, 300, "canvas_game");
	ctx_game = canvas_game.getContext("2d");

	//Création de la fonction requestAnimationFrame
	var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
 
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

	var init = function() {
		// Gestion image du curseur
		GAME.pointer = false;
		CHOOSE.pointer = false;
		SOCKET.emit('changedSocket',{idUser:$('#idJoueur').val()});

		// Initialisation du jeu
		//SOCKET.init();
		var nbJoueurs = $('#nbJoueurs').val();
		GAME.init(nbJoueurs);

		// choix du canvas à afficher
		$('#canvas_game_container').addClass('nodisplay');

		CHARACTER.load(draw);
	}

	var draw = function() {
		CHOOSE.draw();
		GAME.draw();
	}

	getPlayerSpells = function(i) {
		$.getJSON("get_capacites.php?id_champion="+ (i+1), 
			{},
			function (res) {
				SOCKET.emit('capacites', res);
				for (var i=0; i<res.length; i++) {
					console.log(res[i].id_capacite, res[i].nom_capacite);
					var idS = res[i].id_capacite;
					var li = "<li><a id='"+idS+"'>";
					li += res[i].nom_capacite;
					li += "</a></li>";
					$(li).appendTo('#choose_spells');
					$('a#'+idS).click(function(){
						SOCKET.emit('sort', {numSort:idS});
					});
				}
			});
	}
	
	// retourne les coordonnées dans un canvas
	var getYXcanvas = function(canvas, e) {
		var x;
		var y;
		if (e.pageX || e.pageY) { 
		  x = e.pageX;
		  y = e.pageY;
		}
		else { 
			console.log(document.body.scrollLeft, document.documentElement.scrollLeft);
		  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
		  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
		} 
		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		return {x:x-37, y:y-150};
	}

	// gestion des clicks dans canvas
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