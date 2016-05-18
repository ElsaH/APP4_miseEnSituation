var GAME = {};

GAME.nbJoueurs = 4;

GAME.drawBackground = function(canvas, ctx) {
	// fond
	ctx.fillStyle="#DDE3FF";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// bordure
	ctx.strokeStyle = 'black';
	ctx.lineWidth = '1';
	ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
		GAME.drawInfos(ctx, GAME.barresPos[i], style);
}

GAME.drawInfos = function(ctx, pos, style) {
	// dessin du mana
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y);
	ctx.lineTo(pos.x+style.len, pos.y);
	ctx.lineWidth = style.width;
	ctx.strokeStyle = style.mana_color;
	ctx.lineCap = style.cap;
	ctx.stroke();

	// dessin de la vie
	ctx.beginPath();
	ctx.moveTo(pos.x, pos.y+style.mbetween);
	ctx.lineTo(pos.x+style.len, pos.y+style.mbetween);
	ctx.lineWidth = style.width;
	ctx.strokeStyle = style.life_color;
	ctx.lineCap = style.cap;
	ctx.stroke();
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
	
	DRAW_CHARAC.character1(ctx,GAME.charPos[0],false);
	DRAW_CHARAC.character1(ctx,GAME.charPos[1],true);
	if (GAME.nbJoueurs == 4) {
		DRAW_CHARAC.character1(ctx,GAME.charPos[2],false);
		DRAW_CHARAC.character1(ctx,GAME.charPos[3],true);
	}

}

GAME.onclick = function(x, y) {
	for (var i=0; i<GAME.nbJoueurs; i++) {

		var x1 = GAME.charPos[i].x;
		var y1 = GAME.charPos[i].y;
		var x2 = x1 + DRAW_CHARAC.pers[0].w;
		var y2 = y1 + DRAW_CHARAC.pers[0].h;
		//console.log("x=",x1,x2,"y=",y1,y2);
		if (x>=x1 && x<=x2 && y>=y1 && y<=y2) {
			console.log("click on perso "+i);
		}
	}
}