var CHOOSE = {};

CHOOSE.drawBackground = function(canvas, ctx) {
	// fond
	ctx.fillStyle="#DDE3FF";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// bordure
	ctx.strokeStyle = 'black';
	ctx.lineWidth = '1';
	ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //FIXME
}

CHOOSE.drawMenu = function(canvas, ctx) {
	var marge = 20;
	var dw = CANVAS_WIDTH/2;
	var dh = CANVAS_HEIGHT/2;

	// choix
	CHOOSE.opt = new Array(4);

	// tailles des rectangles
	for (var i=0; i<4; i++) {
		CHOOSE.opt[i] = {};
		CHOOSE.opt[i].rw = dw-marge*1.5;
		CHOOSE.opt[i].rh = dh-marge*1.5;
	}

	// coordonnées des rectangles
	CHOOSE.opt[0].rx = marge;
	CHOOSE.opt[0].ry = marge;
	CHOOSE.opt[1].rx = dw+marge/2;
	CHOOSE.opt[1].ry = marge;
	CHOOSE.opt[2].rx = dw+marge/2;
	CHOOSE.opt[2].ry = dh+marge/2;
	CHOOSE.opt[3].rx = marge;
	CHOOSE.opt[3].ry = dh+marge/2;

	// coordonnées du personnage
	for (var i=0; i<4; i++) {
		CHOOSE.opt[i].px = CHOOSE.opt[i].rx + 5;
		CHOOSE.opt[i].py = CHOOSE.opt[i].ry + 30;
	}

	CHOOSE.drawOption(canvas, ctx, 0, "charac0");
	CHOOSE.drawOption(canvas, ctx, 1, "charac1");
	CHOOSE.drawOption(canvas, ctx, 2, "charac2");
	CHOOSE.drawOption(canvas, ctx, 3, "charac3");
}

CHOOSE.drawOption = function(canvas, ctx, num, perso) {
	var opt = CHOOSE.opt[num];
	var pos = {x: opt.px, y:opt.py};

	// dessin du rectangle
	ctx.fillStyle = "#B5C2FF";
	ctx.fillRect(opt.rx, opt.ry, opt.rw, opt.rh);

	// infos personnage
	if (perso == "charac0") {
		DRAW_CHARAC.character0(ctx,pos,true);
		ctx.fillStyle = "#000000";
		ctx.font = "bold 12px Arial";
		ctx.fillText("Perso 1", pos.x+40, pos.y-10);
		ctx.font = "12px Arial";
		var txt = "blabla blabla";
		ctx.fillText(txt, pos.x+40, pos.y+10);;
		ctx.fillText(txt, pos.x+40, pos.y+30);
		
	}
	else if (perso == "charac1") {
		DRAW_CHARAC.character1(ctx,pos,true);
		ctx.fillStyle = "#000000";
		ctx.font = "bold 12px Arial";
		ctx.fillText("Perso 1", pos.x+40, pos.y-10);
		ctx.font = "12px Arial";
		var txt = "blabla blabla";
		ctx.fillText(txt, pos.x+40, pos.y+10);;
		ctx.fillText(txt, pos.x+40, pos.y+30);
	}
	else if (perso == "charac2") {
		DRAW_CHARAC.character2(ctx,pos,true);
		ctx.fillStyle = "#000000";
		ctx.font = "bold 12px Arial";
		ctx.fillText("Perso 1", pos.x+40, pos.y-10);
		ctx.font = "12px Arial";
		var txt = "blabla blabla";
		ctx.fillText(txt, pos.x+40, pos.y+10);;
		ctx.fillText(txt, pos.x+40, pos.y+30);
	}
	else if (perso == "charac3") {
		DRAW_CHARAC.character3(ctx,pos,true);
		ctx.fillStyle = "#000000";
		ctx.font = "bold 12px Arial";
		ctx.fillText("Perso 1", pos.x+40, pos.y-10);
		ctx.font = "12px Arial";
		var txt = "blabla blabla";
		ctx.fillText(txt, pos.x+40, pos.y+10);;
		ctx.fillText(txt, pos.x+40, pos.y+30);
	}
}

CHOOSE.mouseEvents = function(event,x, y) {
	var pointer = false;

	for (var i=0; i<4; i++) {

		var x1 = CHOOSE.opt[i].rx;
		var y1 = CHOOSE.opt[i].ry;
		var x2 = x1 + CHOOSE.opt[i].rw;
		var y2 = y1 + CHOOSE.opt[i].rh;

		if (x>=x1 && x<=x2 && y>=y1 && y<=y2) {
			if (event == "click") {
				console.log("click on choice "+i);
			}
			pointer = true;
		}
		else {
			pointer = pointer || false;
		}
	}
	if (CHOOSE.pointer && !pointer) {
		$('canvas').removeClass("pointer");
		CHOOSE.pointer = false;
	}
	else if (!GAME.pointer && pointer) {
		$('canvas').addClass("pointer");
		CHOOSE.pointer = true;
	}
}