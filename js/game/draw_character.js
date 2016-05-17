var DRAW_CHARAC = {};

DRAW_CHARAC.load = function(callback) {
	
	var c = 0;
	var isloaded = function() {
		if (c == 4) {
			callback();
		}
	}

	DRAW_CHARAC.img1 = new Image();
	DRAW_CHARAC.img1.src = "images/characters/sprite_blue.png";
	DRAW_CHARAC.img1.onload = function() {c++; isloaded();}

	DRAW_CHARAC.img2 = new Image();
	DRAW_CHARAC.img2.src = "images/characters/sprite_grey.png";
	DRAW_CHARAC.img2.onload = function() {c++; isloaded();}

	DRAW_CHARAC.img3 = new Image();
	DRAW_CHARAC.img3.src = "images/characters/sprite_red.png";
	DRAW_CHARAC.img3.onload = function() {c++; isloaded();}

	DRAW_CHARAC.img4 = new Image();
	DRAW_CHARAC.img4.src = "images/characters/sprite_yellow.png";
	DRAW_CHARAC.img4.onload = function() {c++; isloaded();}

}

DRAW_CHARAC.character1 = function(ctx, pos, sens) {
	// source = decoupage de l'image
	var s = {};

	// orienté droite
	if (sens == true) {
		s.x = 8;
		s.y = 10;
		s.w = 35;
		s.h = 55;
	}
	else {
		s.x = 358;
		s.y = 236;
		s.w = 35;
		s.h = 55;
	}
	
	// destination = canvas
	var d = {};
	d.x = pos.x;
	d.y = pos.y;
	d.w = s.w;
	d.h = s.h;

	ctx.drawImage(DRAW_CHARAC.img1,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);
}
