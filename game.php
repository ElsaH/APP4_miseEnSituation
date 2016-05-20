<?php 
include("./include/header.php");
include("./include/connexionBD.php");

$pseudo = $_SESSION['pseudo'];
$nbJoueurs = 2;
$id_champion = 1;
$id_joueur = $_SESSION['id_user'];

?>
  
  <div id="game_content" class="content_body">

  <!-- div du choix perso -->
	<div id="canvas_choose_container">
  	<canvas id="canvas_choose" width="500" height="300"></canvas>
  </div>

  <!-- div du jeu -->
	<div id="canvas_game_container">
  	<canvas id="canvas_game" width="500" height="300"></canvas>
    <!-- div du choix d'action -->
    <div id="choose_action">
      <span class="niveau0">Niveau <?php echo $_SESSION['xp']; ?></span>
      <ul id="choose_spells">
      </ul>
      <ul id="game_pass_abd">
          <li><a id="passer">Passer</a></li>
          <li><a id="abandonner">Abandonner</a></li>
      </ul>
    </div>
  </div>

  <!-- Chat -->
  <h1>Chat</h1>
  <div id="text"></div>
  <input type="text" value="" id="message"/>
  <input type="button" value="Envoyer" id="send"/><br/>
  <div id="bottom"></div> 

  <!-- content_body -->
  </div>
  
  <!-- Infos cachées -->
  <input type="hidden" id="pseudo_player" value="<?php echo $pseudo ?>">
  <input type="hidden" id="nbJoueurs" value="<?php echo $nbJoueurs; ?>"> 
  <input type="hidden" id="idJoueur" value="<?php echo $id_joueur; ?>"> 

  <!-- Include JS pour le game -->
  <script src="js/jquery.redirect/jquery.redirect.js"></script>
  <script src="js/game/game_socket.js"></script>
  <script src="js/game/character.js"></script>
  <script src="js/game/game.js"></script>
  <script src="js/game/choose_character.js"></script>
  <script src="js/game/main.js"></script>
<?php include ("./include/footer.php"); ?>
