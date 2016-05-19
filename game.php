<?php include("./include/header.php");?>
  <div id="game_content">
	<div id="canvas_choose_container">
  	<canvas id="canvas_choose" width="500" height="300"></canvas>
  </div>
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
        <ul id="game_pass_abd">
          <li><a>Passer</a></li>
          <li><a>Abandonner</a></li>
        </ul>
      </div>
    </div>
  </div>
  <h1>Chat</h1>
  <div id="text"></div>
  <input type="text" value="" id="message"/>
  <input type="button" value="Envoyer" id="send"/><br/>
  <input type="hidden" id="pseudo_player" value="<?php echo $_SESSION['pseudo']; ?>">
   <input type="hidden" id="pseudo_player" value="0"> 
<!--   <script src="http://82.239.215.158:8080/socket.io/socket.io.js"></script> -->
  <script src="js/game/game_socket.js"></script>
  <script src="js/game/character.js"></script>
  <script src="js/game/game.js"></script>
  <script src="js/game/choose_character.js"></script>
  <script src="js/game/main.js"></script>
<?php include ("./include/footer.php"); ?>
