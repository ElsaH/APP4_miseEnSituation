<?php include("./include/header.php");?>
	<p>
		Choix du personnage :
	</p>
	<p>
  	<canvas id="canvas_choose" width="500" height="300"></canvas>
  </p>
  <p>
		Interface de combat :
	</p>
	<p>
  	<canvas id="canvas_game" width="500" height="300"></canvas>
  </p>
  <script src="js/game/draw_character.js"></script>
  <script src="js/game/game.js"></script>
  <script src="js/game/choose_character.js"></script>
  <script src="js/game/main.js"></script>
<?php include ("./include/footer.php"); ?>
