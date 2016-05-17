window.onload = function() {

	var htmlCanvas = document.getElementById("canvas_game");
	var ctx = htmlCanvas.getContext("2d");

	
	init();

	function init() {
		window.addEventListener('resize', resizeCanvas, false);
		resizeCanvas();
	}
				
	function draw() {
		ctx.strokeStyle = 'black';
		ctx.lineWidth = '5';
		ctx.strokeRect(0, 0, htmlCanvas.width, htmlCanvas.height);
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,0,150,75);

		/*var img = new Image();
		img.onload = function() {
			img.width = 50;
		  ctx.drawImage(img, 0, 0);
		}
		img.src = "images/finn.svg";*/

	}

	function resizeCanvas() {
		// htmlCanvas.width = window.innerWidth;
		// htmlCanvas.height = window.innerHeight;
		draw();
	}
	
}