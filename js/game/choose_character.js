var CHOOSE = {};

CHOOSE.init = function() {
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
		CHOOSE.opt[i].emotion = "";
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
		CHOOSE.opt[i].px = CHOOSE.opt[i].rx + 10;
		CHOOSE.opt[i].py = CHOOSE.opt[i].ry + 30;
	}
}

CHOOSE.draw = function(emotion) {
	CHOOSE.drawBackground(canvas_choose, ctx_choose);
	CHOOSE.drawMenu(canvas_choose, ctx_choose);
}

CHOOSE.drawBackground = function(canvas, ctx) {
	// fond
	ctx.fillStyle="#DDE3FF";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

CHOOSE.drawMenu = function(canvas, ctx) {
	CHOOSE.drawOption(canvas, ctx, 0);
	CHOOSE.drawOption(canvas, ctx, 1);
	CHOOSE.drawOption(canvas, ctx, 2);
	CHOOSE.drawOption(canvas, ctx, 3);
}

CHOOSE.drawOption = function(canvas, ctx, num) {
	var opt = CHOOSE.opt[num];
	var pos = {x: opt.px+20, y:opt.py+20};

	// dessin du rectangle
	ctx.fillStyle = "#B5C2FF";
	ctx.fillRect(opt.rx, opt.ry, opt.rw, opt.rh);

	// portrait du perso
	CHARACTER.draw(ctx, pos, true, num, CHOOSE.opt[num].emotion);

	// infos personnage
	ctx.fillStyle = "#000000";
	ctx.font = "bold 12px Arial";
	ctx.fillText(CHARACTER.pers[num].name, pos.x+40, pos.y-10);
	ctx.font = "12px Arial";
	var txt = " (+) "+CHARACTER.pers[num].bonus;
	ctx.fillText(txt, pos.x+40, pos.y+20);;
	txt = " (-)  "+CHARACTER.pers[num].malus;
	ctx.fillText(txt, pos.x+40, pos.y+40);
}

CHOOSE.mouseEvents = function(event,x, y) {
	var pointer = false;
	var choix = null;

	for (var i=0; i<4; i++) {

		var x1 = CHOOSE.opt[i].rx;
		var y1 = CHOOSE.opt[i].ry;
		var x2 = x1 + CHOOSE.opt[i].rw;
		var y2 = y1 + CHOOSE.opt[i].rh;

		if (x>=x1 && x<=x2 && y>=y1 && y<=y2) {
			if (event == "click") {
				getPlayerSpells(i);
				SOCKET.emit("select", {numChampion: i});
			}
			pointer = true;
			choix = i;
		}
		else {
			pointer = pointer || false;
		}
	}
	// on ne pointe pas un choix
	if (CHOOSE.pointer && !pointer) {
		$('canvas').removeClass("pointer");
		CHOOSE.pointer = false;
		for (var i=0; i<4; i++)
			CHOOSE.opt[i].emotion = "";
	}
	// on pointe un choix
	else if (!CHOOSE.pointer && pointer) {
		$('canvas').addClass("pointer");
		CHOOSE.pointer = true;
		for (var i=0; i<4; i++)
			CHOOSE.opt[i].emotion = "";
		CHOOSE.opt[choix].emotion = "happy";
		CHOOSE.draw();
	}
}