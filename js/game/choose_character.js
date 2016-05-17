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

	// choix1
	ctx.fillStyle = "#B5C2FF";
	ctx.fillRect(marge, marge, dw-marge*1.5, dh-marge*1.5);
	ctx.fillRect(dw+marge/2, marge, dw-marge*1.5, dh-marge*1.5);
	ctx.fillRect(dw+marge/2, dh+marge/2, dw-marge*1.5, dh-marge*1.5);
	ctx.fillRect(marge, dh+marge/2, dw-marge*1.5, dh-marge*1.5);
}