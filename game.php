<?php include("./include/header.php");?>
  <div id="game_content">
	<p>
		Choix du personnage :
	</p>
	<div id="canvas_choose_container">
  	<canvas id="canvas_choose" width="500" height="300"></canvas>
  </div>
  <p>
		Interface de combat :
	</p>
	<div id="canvas_game_container">
  	<canvas id="canvas_game" width="500" height="300"></canvas>
    <div id="choose_action">
      <span>Niveau <?php echo $_SESSION['xp']; ?></span>
      <ul>
        <li><a>Action 1</a></li>
        <li><a>Action 2</a></li>
        <li><a>Action 3</a></li>
        <li><a>Action 4</a></li>
      </ul>
    </div>
  </div>
  </div>
  <script src="js/game/draw_character.js"></script>
  <script src="js/game/game.js"></script>
  <script src="js/game/choose_character.js"></script>
  <script src="js/game/main.js"></script>
<?php include ("./include/footer.php"); ?>
