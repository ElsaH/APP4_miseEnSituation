var DRAW_CHARAC = {};

DRAW_CHARAC.load = function(callback) {
	
	var c = 0;
	var isloaded = function() {
		if (c == 4) {
			callback();
		}
	}

	DRAW_CHARAC.pers = new Array(4);
	for (var i=0; i<4; i++)
		DRAW_CHARAC.pers[i] = {};

	DRAW_CHARAC.pers[0].img = new Image();
	DRAW_CHARAC.pers[0].img.src = "images/characters/sprite_blue.png";
	DRAW_CHARAC.pers[0].img.onload = function() {c++; isloaded();}
	DRAW_CHARAC.pers[0].w = 35;	
	DRAW_CHARAC.pers[0].h = 55;

	DRAW_CHARAC.pers[1].img = new Image();
	DRAW_CHARAC.pers[1].img.src = "images/characters/sprite_grey.png";
	DRAW_CHARAC.pers[1].img.onload = function() {c++; isloaded();}
	DRAW_CHARAC.pers[1].w = 35;	
	DRAW_CHARAC.pers[1].h = 55;

	DRAW_CHARAC.pers[2].img = new Image();
	DRAW_CHARAC.pers[2].img.src = "images/characters/sprite_red.png";
	DRAW_CHARAC.pers[2].img.onload = function() {c++; isloaded();}
	DRAW_CHARAC.pers[2].w = 32;
	DRAW_CHARAC.pers[2].h = 48;

	DRAW_CHARAC.pers[3].img = new Image();
	DRAW_CHARAC.pers[3].img.src = "images/characters/sprite_yellow.png";
	DRAW_CHARAC.pers[3].img.onload = function() {c++; isloaded();}
	DRAW_CHARAC.pers[3].w = 35;	
	DRAW_CHARAC.pers[3].h = 52;

}

DRAW_CHARAC.character0 = function(ctx, pos, sens) {
	// source = decoupage de l'image
	var s = {};

	// orienté droite
	if (sens == true) {
		s.x = 8;
		s.y = 10;
		s.w = DRAW_CHARAC.pers[0].w;
		s.h = DRAW_CHARAC.pers[0].h;
	}
	else {
		s.x = 358;
		s.y = 236;
		s.w = DRAW_CHARAC.pers[0].w;
		s.h = DRAW_CHARAC.pers[0].h;
	}
	
	// destination = canvas
	var d = {};
	d.x = pos.x;
	d.y = pos.y;
	d.w = s.w;
	d.h = s.h;

	ctx.drawImage(DRAW_CHARAC.pers[0].img,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);
}

DRAW_CHARAC.character1 = function(ctx, pos, sens) {
	// source = decoupage de l'image
	var s = {};

	// orienté droite
	if (sens == true) {
		s.x = 10;
		s.y = 6;
		s.w = DRAW_CHARAC.pers[1].w;
		s.h = DRAW_CHARAC.pers[1].h;
	}
	else {
		s.x = 390;
		s.y = 285;
		s.w = DRAW_CHARAC.pers[1].w;
		s.h = DRAW_CHARAC.pers[1].h;
	}
	
	// destination = canvas
	var d = {};
	d.x = pos.x;
	d.y = pos.y;
	d.w = s.w;
	d.h = s.h;

	ctx.drawImage(DRAW_CHARAC.pers[1].img,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);
}

DRAW_CHARAC.character2 = function(ctx, pos, sens) {
	// source = decoupage de l'image
	var s = {};

	// orienté droite
	if (sens == true) {
		s.x = 13;
		s.y = 0;
		s.w = DRAW_CHARAC.pers[2].w;
		s.h = DRAW_CHARAC.pers[2].h;
	}
	else {
		s.x = 368;
		s.y = 225;
		s.w = DRAW_CHARAC.pers[2].w;
		s.h = DRAW_CHARAC.pers[2].h;
	}
	
	// destination = canvas
	var d = {};
	d.x = pos.x;
	d.y = pos.y;
	d.w = s.w;
	d.h = s.h;

	ctx.drawImage(DRAW_CHARAC.pers[2].img,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);
}

DRAW_CHARAC.character3 = function(ctx, pos, sens) {
	// source = decoupage de l'image
	var s = {};

	// orienté droite
	if (sens == true) {
		s.x = 8;
		s.y = 0;
		s.w = DRAW_CHARAC.pers[3].w;
		s.h = DRAW_CHARAC.pers[3].h;
	}
	else {
		s.x = 390;
		s.y = 285;
		s.w = DRAW_CHARAC.pers[3].w;
		s.h = DRAW_CHARAC.pers[3].h;
	}
	
	// destination = canvas
	var d = {};
	d.x = pos.x;
	d.y = pos.y;
	d.w = s.w;
	d.h = s.h;

	ctx.drawImage(DRAW_CHARAC.pers[3].img,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);
}