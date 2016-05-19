var GAME = {};

GAME.init = function(nbJoueurs) {
	GAME.nbJoueurs = nbJoueurs;
	// joueurs en jeu
	GAME.player = new Array(GAME.nbJoueurs);
	for (var i=0; i<GAME.nbJoueurs; i++) {
		GAME.player[i] = {};
	}
}

GAME.updateJoueurs = function(msg) {
	console.log("bonjour", msg);

	for (var i=0; i<GAME.nbJoueurs; i++ ) {
		console.log("coucou", msg.joueur[i]);
		GAME.player[i].pseudo = msg.joueur[i].pseudo;
		GAME.player[i].pers = msg.joueur[i].champion;
		GAME.player[i].manatot = msg.joueur[i].manaTot;
		GAME.player[i].mana = msg.joueur[i].mana;
		GAME.player[i].pvtot = msg.joueur[i].pvTot;
		GAME.player[i].pv = msg.joueur[i].pv;
		GAME.player[i].id = msg.joueur[i].id;
		GAME.player[i].xp = msg.joueur[i].xp;
	}
	GAME.draw();
}

GAME.draw = function() {
	GAME.drawBackground(canvas_game, ctx_game);
	GAME.drawPersosInfos(canvas_game, ctx_game);
	GAME.drawPersos(canvas_game, ctx_game);
}

GAME.drawBackground = function(canvas, ctx) {
	// fond
	ctx.fillStyle="#DDE3FF";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

GAME.drawPersosInfos = function(canvas, ctx) {
	// marges
	var mx = 10; 
	var my = 10;

	// style
	var style = {};
	style.len = 150; // longueur
	style.width = 5; // epaisseur
	style.mbetween = 10; // espace entre les 2 barres
	style.mana_color = "blue"; // couleur mana
	style.life_color = "red"; // couleur vie
	style.cap = "round"; // bords arrondis

	// positions des barres
	GAME.barresPos = new Array(GAME.nbJoueurs);
	
	for (var i=0; i<GAME.nbJoueurs; i++)
		GAME.barresPos[i] = {};

	GAME.barresPos[0].x = mx;
	GAME.barresPos[0].y = my;
	GAME.drawInfos(ctx, GAME.barresPos[0], style, 0);
	GAME.barresPos[1].x = CANVAS_WIDTH - style.len - mx;
	GAME.barresPos[1].y = my;
	GAME.drawInfos(ctx, GAME.barresPos[1], style, 1);

	if (GAME.nbJoueurs == 4) {
		GAME.barresPos[2].x = mx;
		GAME.barresPos[2].y = CANVAS_HEIGHT - my - style.mbetween;
		GAME.drawInfos(ctx, GAME.barresPos[2], style, 2);
		GAME.barresPos[3].x = CANVAS_WIDTH - style.len - mx;
		GAME.barresPos[3].y = CANVAS_HEIGHT - my - style.mbetween;
		GAME.drawInfos(ctx, GAME.barresPos[3], style, 3);
	}
}

GAME.drawInfos = function(ctx, pos, style, i) {

	// dessin du mana courant
	var cur_mana = GAME.player[i].mana/GAME.player[i].manatot;
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y);
	ctx.lineTo(pos.x+style.len*cur_mana, pos.y);
	ctx.lineWidth = style.width;
	ctx.strokeStyle = style.mana_color;
	ctx.lineCap = style.cap;
	ctx.stroke();

	// dessin de la vie courante
	var cur_pv = GAME.player[i].pv/GAME.player[i].pvtot;
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y+style.mbetween);
	ctx.lineTo(pos.x+style.len*cur_pv, pos.y+style.mbetween);
	ctx.lineWidth = style.width;
	ctx.strokeStyle = style.life_color;
	ctx.lineCap = style.cap;
	ctx.stroke();

	ctx.globalAlpha = 0.2;

	// dessin du mana bg
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y);
	ctx.lineTo(pos.x+style.len, pos.y);
	ctx.lineWidth = style.width;
	ctx.strokeStyle = style.mana_color;
	ctx.lineCap = style.cap;
	ctx.stroke();

	// dessin de la vie bg
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y+style.mbetween);
	ctx.lineTo(pos.x+style.len, pos.y+style.mbetween);
	ctx.lineWidth = style.width;
	ctx.strokeStyle = style.life_color;
	ctx.lineCap = style.cap;
	ctx.stroke();

	ctx.globalAlpha = 1;
}

GAME.drawPersos = function(canvas, ctx) {
	// positions des personnages
	GAME.charPos = new Array(GAME.nbJoueurs);

	for (var i=0; i<GAME.nbJoueurs; i++)
		GAME.charPos[i] = {};

	GAME.charPos[0] = {x:100, y:100};
	GAME.charPos[1] = {x:350, y:100};
	console.log(GAME.player[0].pers);
	CHARACTER.draw(ctx, GAME.charPos[0], false, GAME.player[0].pers);
	CHARACTER.draw(ctx, GAME.charPos[1], true, GAME.player[1].pers);

	if (GAME.nbJoueurs == 4) {
		GAME.charPos[2] = {x:50, y:160};
		GAME.charPos[3] = {x:400, y:160};
		CHARACTER.draw(ctx, GAME.charPos[2], false, GAME.player[2].pers);
		CHARACTER.draw(ctx, GAME.charPos[3], true, GAME.player[3].pers);
	}

}

GAME.mouseEvents = function(event,x, y) {
	var pointer = false;

	for (var i=0; i<GAME.nbJoueurs; i++) {

		var x1 = GAME.charPos[i].x;
		var y1 = GAME.charPos[i].y;
		var x2 = x1 + CHARACTER.pers[GAME.player[i].pers].w;
		var y2 = y1 + CHARACTER.pers[GAME.player[i].pers].h;

		if (x>=x1 && x<=x2 && y>=y1 && y<=y2) {
			if (event == "click") {
				console.log("click on perso "+i);
			}
			pointer = true;
		}
		else {
			pointer = pointer || false;
		}
	}
	if (GAME.pointer && !pointer) {
		$('canvas').removeClass("pointer");
		GAME.pointer = false;
	}
	else if (!GAME.pointer && pointer) {
		$('canvas').addClass("pointer");
		GAME.pointer = true;
	}
}

// Ajouter events des actions