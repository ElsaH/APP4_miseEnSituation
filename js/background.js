var drawBackground = function(canvas, ctx) {
	// bordure
	ctx.strokeStyle = 'black';
	ctx.lineWidth = '1';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// 
}

var drawCharactersInfos = function(canvas, ctx) {
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
	drawInfos(ctx, pos, style);
	pos.x = canvas.width - style.len - mx;
	pos.y = my;
	drawInfos(ctx, pos, style);
	pos.x = mx;
	pos.y = canvas.height - my - style.mbetween;
	drawInfos(ctx, pos, style);
	pos.x = canvas.width - style.len - mx;
	pos.y = canvas.height - my - style.mbetween;
	drawInfos(ctx, pos, style);

}

var drawInfos = function(ctx, pos, style) {
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

var drawCharacters = function(canvas, ctx) {
	var img = new Image();
	img.src = "images/characters/sprite_blue.png";

	img.onload = function() {
		var pos = {x:350, y:100};
		drawCharacter1(ctx, img, pos);
		pos = {x:400, y:160};
		drawCharacter1(ctx, img, pos);
		pos = {x:100, y:100};
		drawCharacter2(ctx, img, pos);
		pos = {x:50, y:160};
		drawCharacter2(ctx, img, pos);
	}

}

var drawCharacter1 = function(ctx, img, pos) {
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

var drawCharacter2 = function(ctx, img, pos) {
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


/////////////////////
var testSprite = function(ctx) {
	
	var coinImage = new Image();
	coinImage.src = "images/test-sprite.png";
	ctx.drawImage(coinImage,0,0);

	var sprite = function (options) {
					
    var that = {};
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.render = function () {
        // Draw the animation
        that.context.drawImage(
           that.image,
           30,
           30,
           that.width,
           that.height,
           20,
           20,
           that.width,
           that.height);
    };

    return that;
	}

	var coin = sprite({
    context: ctx,
    width: 100,
    height: 100,
    image: coinImage
	});
	console.log(coin);
	coin.render();

}