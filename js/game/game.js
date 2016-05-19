var GAME = {};

GAME.init = function(nbJoueurs) {
	GAME.nbJoueurs = nbJoueurs;

	// joueurs en jeu
	GAME.player = new Array(GAME.nbJoueurs);
	for (var i=0; i<GAME.nbJoueurs; i++) {
		GAME.player[i] = {};
		GAME.player[i].pers = null;
		// infos des perso en base 1
		GAME.player[i].life = 0.75;
		GAME.player[i].mana = 0.5;
	}
}

GAME.initJoueurs = function(joueur) {
	GAME.player[0].pseudo = joueur.j1.pseudo;
	GAME.player[0].pers = joueur.j1.classe; // FIXME
	GAME.player[0].lvl = joueur.j1.level;
	GAME.player[0].mana = joueur.j1.mana;
	GAME.player[0].pv = joueur.j1.pv;
	GAME.player[1].pseudo = joueur.j2.pseudo;
	GAME.player[1].pers = joueur.j2.classe; // FIXME
	GAME.player[1].lvl = joueur.j2.level;
	GAME.player[1].mana = joueur.j2.mana;
	GAME.player[1].pv = joueur.j2.pv;
}

GAME.draw = function() {
	GAME.drawBackground(canvas_game, ctx_game);
	GAME.drawCharactersInfos(canvas_game, ctx_game);
	GAME.drawCharacters(canvas_game, ctx_game);
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
	// dessin du mana
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y);
	ctx.lineTo(pos.x+style.len*GAME.player[i].mana, pos.y);
	ctx.lineWidth = style.width;
	ctx.strokeStyle = style.mana_color;
	ctx.lineCap = style.cap;
	ctx.stroke();

	// dessin de la vie
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y+style.mbetween);
	ctx.lineTo(pos.x+style.len*GAME.player[i].life, pos.y+style.mbetween);
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

GAME.drawCharacters = function(canvas, ctx) {
	// positions des personnages
	GAME.charPos = new Array(GAME.nbJoueurs);

	for (var i=0; i<GAME.nbJoueurs; i++)
		GAME.charPos[i] = {};

	GAME.charPos[0] = {x:100, y:100};
	GAME.charPos[1] = {x:350, y:100};
	CHARACTER.draw(ctx, GAME.charPos[0], false, GAME.player[0].pers);
	CHARACTER.draw(ctx, GAME.charPos[1], false, GAME.player[1].pers);

	if (GAME.nbJoueurs == 4) {
		GAME.charPos[2] = {x:50, y:160};
		GAME.charPos[3] = {x:400, y:160};
		CHARACTER.draw(ctx, GAME.charPos[2], false, GAME.player[2].pers);
		CHARACTER.draw(ctx, GAME.charPos[3], false, GAME.player[3].pers);
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