var CHOOSE = {};

CHOOSE.drawBackground = function(canvas, ctx) {
	// fond
	ctx.fillStyle="#DDE3FF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// bordure
	ctx.strokeStyle = 'black';
	ctx.lineWidth = '1';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

CHOOSE.drawCharacters = function(canvas, ctx) {
	var marge = 20;
	var dw = canvas.width/2;
	var dh = canvas.height/2;
	var pos = {}; //position de l'image des persos

	// choix
	ctx.fillStyle = "#B5C2FF";

	ctx.fillRect(marge, marge, dw-marge*1.5, dh-marge*1.5);
	pos = {x:25, y:50};
	DRAW_CHARAC.character1(ctx,pos,true);

	ctx.fillRect(dw+marge/2, marge, dw-marge*1.5, dh-marge*1.5);
	pos = {x:25+dw-marge/2, y:50};
	DRAW_CHARAC.character1(ctx,pos,true);

	ctx.fillRect(dw+marge/2, dh+marge/2, dw-marge*1.5, dh-marge*1.5);
	pos = {x:25+dw-marge/2, y:50+dh-marge/2};
	DRAW_CHARAC.character1(ctx,pos,true);

	ctx.fillRect(marge, dh+marge/2, dw-marge*1.5, dh-marge*1.5);
	pos = {x:25, y:50+dh-marge/2};
	DRAW_CHARAC.character1(ctx,pos,true);
}

CHOOSE.drawOption = function() {
	
}