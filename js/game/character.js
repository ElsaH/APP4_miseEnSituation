var CHARACTER = {};

CHARACTER.load = function(callback) {
	
	var c = 0;
	var isloaded = function() {
		if (c == 4) {
			callback();
		}
	}

	CHARACTER.pers = new Array(4);
	for (var i=0; i<5; i++)
		CHARACTER.pers[i] = {};

	CHARACTER.pers[0].img = new Image();
	CHARACTER.pers[0].img.src = "images/characters/sprite_blue.png";
	CHARACTER.pers[0].img.onload = function() {c++; isloaded();}
	CHARACTER.pers[0].w = 35;	
	CHARACTER.pers[0].h = 55;
	CHARACTER.pers[0].name  = "Info";
	CHARACTER.pers[0].bonus = "adaptable"
	CHARACTER.pers[0].malus = "larvaire";

	CHARACTER.pers[1].img = new Image();
	CHARACTER.pers[1].img.src = "images/characters/sprite_grey.png";
	CHARACTER.pers[1].img.onload = function() {c++; isloaded();}
	CHARACTER.pers[1].w = 35;	
	CHARACTER.pers[1].h = 55;
	CHARACTER.pers[1].name  = "Optro";
	CHARACTER.pers[1].bonus = "vigilant";
	CHARACTER.pers[1].malus = "en sous-nombre";

	CHARACTER.pers[2].img = new Image();
	CHARACTER.pers[2].img.src = "images/characters/sprite_red.png";
	CHARACTER.pers[2].img.onload = function() {c++; isloaded();}
	CHARACTER.pers[2].w = 32;
	CHARACTER.pers[2].h = 48;
	CHARACTER.pers[2].name  = "Materio";
	CHARACTER.pers[2].bonus = "bourrin";
	CHARACTER.pers[2].malus = "en soirée";

	CHARACTER.pers[3].img = new Image();
	CHARACTER.pers[3].img.src = "images/characters/sprite_yellow.png";
	CHARACTER.pers[3].img.onload = function() {c++; isloaded();}
	CHARACTER.pers[3].w = 35;	
	CHARACTER.pers[3].h = 52;
	CHARACTER.pers[3].name  = "Elek";
	CHARACTER.pers[3].bonus = "précis";
	CHARACTER.pers[3].malus = "à Cachan";

	CHARACTER.coin.img = new Image();
	CHARACTER.coin.img.src = "images/test-sprite.png";
	CHARACTER.coin.img.onload = function() {c++; isloaded();}
	CHARACTER.coin.w = 1000;
	CHARACTER.coin.h = 100;

}

CHARACTER.draw = function(ctx, pos, sens, id) {
	if (id == 0) {
		CHARACTER.character0(ctx, pos, sens);
	}
	else if (id == 1) {
		CHARACTER.character1(ctx, pos, sens);
	}
	else if (id == 2) {
		CHARACTER.character2(ctx, pos, sens);
	}
	else {
		CHARACTER.character3(ctx, pos, sens);
	}
}

CHARACTER.character = function(name, ctx, pos, sens) {
	if (name == "Info") {
		CHARACTER.character0(ctx, pos, sens);
	}
	else if (name == "Optro") {
		CHARACTER.character1(ctx, pos, sens);
	}
	else if (name == "Materio") {
		CHARACTER.character2(ctx, pos, sens);
	}
	else {
		CHARACTER.character3(ctx, pos, sens);
	}

}

CHARACTER.character0 = function(ctx, pos, sens) {
	// source = decoupage de l'image
	var s = {};

	// orienté droite
	if (sens == true) {
		s.x = 8;
		s.y = 10;
		s.w = CHARACTER.pers[0].w;
		s.h = CHARACTER.pers[0].h;
	}
	else {
		s.x = 358;
		s.y = 236;
		s.w = CHARACTER.pers[0].w;
		s.h = CHARACTER.pers[0].h;
	}
	
	// destination = canvas
	var d = {};
	d.x = pos.x;
	d.y = pos.y;
	d.w = s.w;
	d.h = s.h;

	ctx.drawImage(CHARACTER.pers[0].img,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);
}

CHARACTER.character1 = function(ctx, pos, sens) {
	// source = decoupage de l'image
	var s = {};

	// orienté droite
	if (sens == true) {
		s.x = 10;
		s.y = 6;
		s.w = CHARACTER.pers[1].w;
		s.h = CHARACTER.pers[1].h;
	}
	else {
		s.x = 390;
		s.y = 285;
		s.w = CHARACTER.pers[1].w;
		s.h = CHARACTER.pers[1].h;
	}
	
	// destination = canvas
	var d = {};
	d.x = pos.x;
	d.y = pos.y;
	d.w = s.w;
	d.h = s.h;

	ctx.drawImage(CHARACTER.pers[1].img,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);
}

CHARACTER.character2 = function(ctx, pos, sens) {
	// source = decoupage de l'image
	var s = {};

	// orienté droite
	if (sens == true) {
		s.x = 13;
		s.y = 0;
		s.w = CHARACTER.pers[2].w;
		s.h = CHARACTER.pers[2].h;
	}
	else {
		s.x = 368;
		s.y = 225;
		s.w = CHARACTER.pers[2].w;
		s.h = CHARACTER.pers[2].h;
	}
	
	// destination = canvas
	var d = {};
	d.x = pos.x;
	d.y = pos.y;
	d.w = s.w;
	d.h = s.h;

	ctx.drawImage(CHARACTER.pers[2].img,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);
}

CHARACTER.character3 = function(ctx, pos, sens) {
	// source = decoupage de l'image
	var s = {};

	// orienté droite
	if (sens == true) {
		s.x = 8;
		s.y = 0;
		s.w = CHARACTER.pers[3].w;
		s.h = CHARACTER.pers[3].h;
	}
	else {
		s.x = 390;
		s.y = 285;
		s.w = CHARACTER.pers[3].w;
		s.h = CHARACTER.pers[3].h;
	}
	
	// destination = canvas
	var d = {};
	d.x = pos.x;
	d.y = pos.y;
	d.w = s.w;
	d.h = s.h;

	ctx.drawImage(CHARACTER.pers[3].img,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);
}

CHARACTER.sprite = function (options) {
	
	var that = {};
	var frameIndex = 0;
	var tickCount = 0;
	var ticksPerFrame = options.ticksPerFrame || 0;
	var numberOfFrames = options.numberOfFrames || 1;
	
	that.context = options.context;
	that.image = options.image;
	
	that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

			tickCount = 0;
			
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {	
                // Go to the next frame
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    };
	
	that.render = function () {
	
	  // Clear the canvas
	  // APPELER DRAWBG avant :-)
	  
	  // Draw the animation
	  that.context.drawImage(
	    that.image,
	    frameIndex * that.width / numberOfFrames,
	    0,
	    that.width / numberOfFrames,
	    that.height,
	    0,
	    0,
	    that.width / numberOfFrames,
	    that.height);
	};
	
	return that;
}