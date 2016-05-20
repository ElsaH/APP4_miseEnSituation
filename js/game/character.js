var CHARACTER = {};

CHARACTER.load = function(callback) {
	
	var c = 0;
	var isloaded = function() {
		if (c == 5) {
			callback();
		}
	}

	CHARACTER.width = 100;
	CHARACTER.height = 100;

	CHARACTER.pers = new Array(4);
	for (var i=0; i<4; i++)
		CHARACTER.pers[i] = {};

	CHARACTER.pers[0].img = new Image();
	CHARACTER.pers[0].img.src = "images/characters/sprite_blueN.png";
	CHARACTER.pers[0].img.onload = function() {c++; isloaded();}
	CHARACTER.pers[0].name  = "Info";
	CHARACTER.pers[0].bonus = "adaptable"
	CHARACTER.pers[0].malus = "larvaire";

	CHARACTER.pers[1].img = new Image();
	CHARACTER.pers[1].img.src = "images/characters/sprite_redN.png";
	CHARACTER.pers[1].img.onload = function() {c++; isloaded();}
	CHARACTER.pers[1].name  = "Materio";
	CHARACTER.pers[1].bonus = "bourrin";
	CHARACTER.pers[1].malus = "en soirée";

	CHARACTER.pers[2].img = new Image();
	CHARACTER.pers[2].img.src = "images/characters/sprite_yellowN.png";
	CHARACTER.pers[2].img.onload = function() {c++; isloaded();}
	CHARACTER.pers[2].name  = "Elek";
	CHARACTER.pers[2].bonus = "précis";
	CHARACTER.pers[2].malus = "à Cachan";

	CHARACTER.pers[3].img = new Image();
	CHARACTER.pers[3].img.src = "images/characters/sprite_greyN.png";
	CHARACTER.pers[3].img.onload = function() {c++; isloaded();}
	CHARACTER.pers[3].name  = "Optro";
	CHARACTER.pers[3].bonus = "vigilant";
	CHARACTER.pers[3].malus = "en sous-nombre";

	CHARACTER.bg = {};
	CHARACTER.bg.img = new Image();
	CHARACTER.bg.img.src = "images/background.png";
	CHARACTER.bg.img.onload = function() {c++; isloaded();}

	

	/*CHARACTER.coin.img = new Image();
	CHARACTER.coin.img.src = "images/test-sprite.png";
	CHARACTER.coin.img.onload = function() {c++; isloaded();}
	CHARACTER.coin.w = 1000;
	CHARACTER.coin.h = 100;*/

}

CHARACTER.draw = function(ctx, pos, sens, id, emotion) {
	
	if (typeof emotion == 'undefined') {
		emotion = "";
	}

	// source = decoupage de l'image
	var s = {};

	// sens true = orienté droite
	s.x = 0;
	s.y = (sens) ? 0 : 200;
	s.w = CHARACTER.width;
	s.h = CHARACTER.height;

	if (emotion == "happy")
		s.x += 100;
	else if (emotion == "afraid")
		s.x += 300;
	
	// destination = canvas
	var d = {};
	d.x = pos.x - s.w/2;
	d.y = pos.y - s.h/2;
	d.w = CHARACTER.width;
	d.h = CHARACTER.height;

	ctx.drawImage(CHARACTER.pers[id].img,s.x,s.y,s.w,s.h,d.x,d.y,d.w,d.h);
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