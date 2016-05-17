var GAME = {};

GAME.drawBackground = function(canvas, ctx) {
	// fond
	ctx.fillStyle="#DDE3FF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// bordure
	ctx.strokeStyle = 'black';
	ctx.lineWidth = '1';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
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

	var pos = {x:mx, y:my};
	GAME.drawInfos(ctx, pos, style);
	pos.x = canvas.width - style.len - mx;
	pos.y = my;
	GAME.drawInfos(ctx, pos, style);
	pos.x = mx;
	pos.y = canvas.height - my - style.mbetween;
	GAME.drawInfos(ctx, pos, style);
	pos.x = canvas.width - style.len - mx;
	pos.y = canvas.height - my - style.mbetween;
	GAME.drawInfos(ctx, pos, style);

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
	var img = new Image();
	img.src = "images/characters/sprite_blue.png";

	img.onload = function() {
		var pos = {x:350, y:100};
		DRAW_CHARAC.character1(ctx,pos,true);
		pos = {x:400, y:160};
		DRAW_CHARAC.character1(ctx,pos,true);
		pos = {x:100, y:100};
		DRAW_CHARAC.character1(ctx,pos,false);
		pos = {x:50, y:160};
		DRAW_CHARAC.character1(ctx,pos,false);
	}

}

GAME.drawCharacter1 = function(ctx, img, pos) {
	// source = decoupage de l'image
	var s = {};
	s.x = 8;
	s.y = 10;
	s.w = 35;
	s.h = 55;
	// destination = canvas
	var d = {};
	d.x = pos.x;
	d.y = pos.y;
	d.w = s.w;
	d.h = s.h;
	ctx.drawImage(img,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);

}

GAME.drawCharacter2 = function(ctx, img, pos) {
	// source = decoupage de l'image
	var s = {};
	s.x = 358;
	s.y = 236;
	s.w = 35;
	s.h = 55;
	// destination = canvas
	var d = {};
	d.x = pos.x;
	d.y = pos.y;
	d.w = s.w;
	d.h = s.h;
	ctx.drawImage(img,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);
}