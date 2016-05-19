<?php 
include("./include/header.php");
include("./include/connexionBD.php");

$pseudo = $_SESSION['pseudo'];
$id_champion = "1";
$nbJoueurs = 2;


?>
  <div id="game_content">
  	<canvas id="test_sprite" width="500" height="300"></canvas>
  </div>
<?php include ("./include/footer.php"); ?>
