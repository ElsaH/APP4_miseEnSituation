var GAME = {};

GAME.init = function(nbJoueurs) {
	GAME.nbJoueurs = nbJoueurs;
	GAME.pers = new Array(GAME.nbJoueurs);
	for (var i=0; i<GAME.nbJoueurs; i++) {
		GAME.pers[i] = {};
		// infos des perso en base 1
		GAME.pers[i].life = 0.75;
		GAME.pers[i].mana = 0.5;
	}
	GAME.pers[0].bonus = "adaptable";
	GAME.pers[0].malus = "larvaire";
	GAME.pers[1].bonus = "vigilant";
	GAME.pers[1].malus = "en sous-nombre";
	GAME.pers[2].bonus = "bourrin";
	GAME.pers[2].malus = "en soirée";
	GAME.pers[3].bonus = "précis";
	GAME.pers[3].malus = "à Cachan";
}

GAME.drawBackground = function(canvas, ctx) {
	// fond
	ctx.fillStyle="#DDE3FF";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

GAME.drawCharactersInfos = function(canvas, ctx) {
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

	for (var i=0; i<4; i++)
		GAME.barresPos[i] = {};

	GAME.barresPos[0].x = mx;
	GAME.barresPos[0].y = my;
	GAME.barresPos[1].x = CANVAS_WIDTH - style.len - mx;
	GAME.barresPos[1].y = my;
	GAME.barresPos[2].x = mx;
	GAME.barresPos[2].y = CANVAS_HEIGHT - my - style.mbetween;
	GAME.barresPos[3].x = CANVAS_WIDTH - style.len - mx;
	GAME.barresPos[3].y = CANVAS_HEIGHT - my - style.mbetween;

	for (var i=0; i<4; i++)
		GAME.drawInfos(ctx, GAME.barresPos[i], style, i);
}

GAME.drawInfos = function(ctx, pos, style, i) {
	// dessin du mana
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y);
	ctx.lineTo(pos.x+style.len*GAME.pers[i].mana, pos.y);
	ctx.lineWidth = style.width;
	ctx.strokeStyle = style.mana_color;
	ctx.lineCap = style.cap;
	ctx.stroke();

	// dessin de la vie
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y+style.mbetween);
	ctx.lineTo(pos.x+style.len*GAME.pers[i].life, pos.y+style.mbetween);
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
	if (GAME.nbJoueurs == 4) {
		GAME.charPos[2] = {x:50, y:160};
		GAME.charPos[3] = {x:400, y:160};
	}
	
	DRAW_CHARAC.character0(ctx,GAME.charPos[0],false);
	DRAW_CHARAC.character0(ctx,GAME.charPos[1],true);
	if (GAME.nbJoueurs == 4) {
		DRAW_CHARAC.character0(ctx,GAME.charPos[2],false);
		DRAW_CHARAC.character0(ctx,GAME.charPos[3],true);
	}

}

GAME.mouseEvents = function(event,x, y) {
	var pointer = false;

	for (var i=0; i<GAME.nbJoueurs; i++) {

		var x1 = GAME.charPos[i].x;
		var y1 = GAME.charPos[i].y;
		var x2 = x1 + DRAW_CHARAC.pers[0].w;
		var y2 = y1 + DRAW_CHARAC.pers[0].h;

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
