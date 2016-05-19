<?php 
include("./include/header.php");
include("./include/connexionBD.php");

$pseudo = $_SESSION['pseudo'];
$id_champion = "1";
$nbJoueurs = 2;


?>
  <div class="content_body"">
  	<p><br></p>
  	<canvas id="coinAnimation" width="500" height="300"></canvas>
  </div>

<script src="./js/game/test_sprite.js"></script>
<?php include ("./include/footer.php"); ?>
