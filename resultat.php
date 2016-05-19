<?php

include('include/header.php');
include('include/connexionBD.php');

/* Récupération des personnages et des scores */
/* ELYSE */
$perso1 = 'test1';
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
	<img src=\"".$joueur1['photo']."\" height=\"200\">
	Vous avez ".$score1."
</div>";

echo 
"<div class=\"left-resultat\">
	<img src=\"".$joueur2['photo']."\" height=\"200\">
	Vous avez ".$score2."
</div>";

?>



<input id='Rejouer' class='btn btn-success btn-lg' type='submit' value='Rejouer'>
<input id='Retour index' class='btn btn-success btn-lg' type='submit' value='Retour index'>


<?php
include('include/footer.php');
?>