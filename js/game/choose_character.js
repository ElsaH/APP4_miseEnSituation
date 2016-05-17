var CHOOSE = {};

CHOOSE.drawBackground = function(canvas, ctx) {
	// fond
	ctx.fillStyle="#DDE3FF";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	// bordure
	ctx.strokeStyle = 'black';
	ctx.lineWidth = '1';
	ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

CHOOSE.drawMenu = function(canvas, ctx) {
	var marge = 20;
	var dw = CANVAS_WIDTH/2;
	var dh = CANVAS_HEIGHT/2;
	var pos = {}; //position de l'image des persos

	// choix
	CHOOSE.drawOption(canvas, ctx, 0, "charac1");
	CHOOSE.drawOption(canvas, ctx, 1, "charac1");
	CHOOSE.drawOption(canvas, ctx, 2, "charac1");
	CHOOSE.drawOption(canvas, ctx, 3, "charac1");
}

CHOOSE.drawOption = function(canvas, ctx, num, perso) {
	var marge = 20;
	var dw = CANVAS_WIDTH/2;
	var dh = CANVAS_HEIGHT/2;
	var pos = {}; //position de l'image des persos

	ctx.fillStyle = "#B5C2FF";

	if (num == 0) {
		ctx.fillRect(marge, marge, dw-marge*1.5, dh-marge*1.5);
		pos = {x:25, y:50}; 
	}
	else if (num == 1) {
		ctx.fillRect(dw+marge/2, marge, dw-marge*1.5, dh-marge*1.5);
		pos = {x:25+dw-marge/2, y:50}; 
	}
	else if (num == 2) {
		ctx.fillRect(dw+marge/2, dh+marge/2, dw-marge*1.5, dh-marge*1.5);
		pos = {x:25+dw-marge/2, y:50+dh-marge/2};
	}
	else {
		ctx.fillRect(marge, dh+marge/2, dw-marge*1.5, dh-marge*1.5);
		pos = {x:25, y:50+dh-marge/2};
	}

	if (perso == "charac1") {
		DRAW_CHARAC.character1(ctx,pos,true);
		ctx.fillStyle = "#000000";
		ctx.font = "12px Arial";
		ctx.fillText("Perso 1",pos.x+40, pos.y-10);
	}


}