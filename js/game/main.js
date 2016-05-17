window.onload = function() {

	var canvas_game = document.getElementById("canvas_game");
	var ctx_game = canvas_game.getContext("2d");

	function initGameCanvas() {
		window.addEventListener('resize', updateGameCanvas, false);
		updateGameCanvas();
	}
	
	function drawGameCanvas() {
		drawBackground(canvas_game, ctx_game);
		drawCharactersInfos(canvas_game, ctx_game);
		drawCharacters(canvas_game, ctx_game)
	}

	function updateGameCanvas() {
		// canvas_game.width = window.innerWidth;
		// canvas_game.height = window.innerHeight;
		drawGameCanvas();
	}

	initGameCanvas();
}