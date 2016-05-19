<?php

include('include/header.php');
include('include/connexionBD.php');

/* Récupération des personnages et des scores */
/* ELYSE */
$perso1 = 'test';
$perso2 = 'test2';

$score1 = 'gagné';
$score2 = 'perdu';

/* Connexion à la base de données */
$bd = connexion();

$joueur1 = $bd->prepare('SELECT * FROM user WHERE pseudo=:perso1');
$joueur1->execute(array(
	'perso1' => $perso1
));
$joueur1 = $joueur1->fetch();

$joueur2 = $bd->prepare('SELECT * FROM user WHERE pseudo=:perso2');
$joueur2->execute(array(
	'perso2' => $perso2
));
$joueur2 = $joueur2->fetch();

/* Afficher les résultats du match */
echo 
"<div class=\"left-resultat\">
	<img src=\"".$joueur1['photo']."\" height=\"200\"> <br/>
	".$joueur1['pseudo']." a ".$score1. "<br/>
	Il a gagné ".$joueur1['combats_gagnes']." combats sur ".$joueur1['combats_joues']."
</div>";

echo 
"<div class=\"left-resultat\">
	<img src=\"".$joueur2['photo']."\" height=\"200\"><br/>
	".$joueur2['pseudo']." a ".$score2."<br/>
	Il a gagné ".$joueur2['combats_gagnes']." combats sur ".$joueur2['combats_joues']."
</div>";

?>


<p align='center'>
<input id='Rejouer' class='btn btn-success btn-lg' type='submit' value='Rejouer'>
<a href="index.php">
<input id='Retour index' class='btn btn-success btn-lg' type='submit' value='Retour index'>
</a>
</p>

<?php
include('include/footer.php');
?>