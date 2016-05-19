<?php 
include("./include/header.php");
include("./include/connexionBD.php");

$pseudo = $_SESSION['pseudo'];
$id_champion = "1";
$nbJoueurs = 2;


?>
  <div id="game_content">
	<div id="canvas_choose_container">
  	<canvas id="canvas_choose" width="500" height="300"></canvas>
  </div>
	<div id="canvas_game_container">
  	<canvas id="canvas_game" width="500" height="300"></canvas>
    <div id="choose_action">
      <span>Niveau <?php echo $_SESSION['xp']; ?></span>
        <ul>
          <?php
          $bd = connexion();

          $capacite = $bd->prepare('SELECT * FROM champion_capacite as cp, capacite as c 
            WHERE cp.id_capacite=c.id_capacite AND cp.id_champion=:id_champion');

          $capacite->execute(array(
            'id_champion' => $id_champion
          ));

          while($line = $capacite->fetch()){
            echo"<li>".$line['nom_capacite']."</li>";
          }
          ?>
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
  <input type="hidden" id="pseudo_player" value="<?php echo $pseudo ?>">
  <input type="hidden" id="id_champion" value="<?php echo $id_champion; ?>">
  <input type="hidden" id="nbJoueurs" value="<?php echo $nbJoueurs; ?>"> 
<!--   <script src="http://82.239.215.158:8080/socket.io/socket.io.js"></script> -->
  <script src="js/game/game_socket.js"></script>
  <script src="js/game/character.js"></script>
  <script src="js/game/game.js"></script>
  <script src="js/game/choose_character.js"></script>
  <script src="js/game/main.js"></script>
<?php include ("./include/footer.php"); ?>
