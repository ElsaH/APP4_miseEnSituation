<?php

include('include/header.php');
include('include/connexionBD.php');

/* Connexion à la base de données */
$bd = connexion();

/* Récupération des personnages et des scores */
$perso1 = (isset($_POST['perso0'])) ? $_POST['perso0'] : "J1??";
$perso2 = (isset($_POST['perso1'])) ? $_POST['perso1'] : "J2??";

$class1 = (isset($_POST['class0'])) ? intval($_POST['class0']) : 0;
$class2 = (isset($_POST['class1'])) ? intval($_POST['class1']) : 0;

$numWin = (isset($_POST['numWin'])) ? intval($_POST['numWin']) : 0;

if ($numWin == 0) {
	$score1 = "gagné";
	$score2 = "perdu";
}
else {
	$score1 = "perdu";
	$score2 = "gagné";
}

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
?>


<div class="left-resultat">
	<img src="<?= $joueur1['photo'] ?>" height="200"> <br/>
	<?= $joueur1['pseudo'] ?> a <?= $score1?>. <br/>
	Il a gagné <?=$joueur1['combats_gagnes']?> combats sur <?=$joueur1['combats_joues']?>
</div>";


<div class="left-resultat">
	<img src="<?= $joueur2['photo'] ?>" height="200"><br/>
	<?= $joueur2['pseudo'] ?> a <?= $score2?>. <br/>
	Il a gagné <?=$joueur2['combats_gagnes']?> combats sur <?=$joueur2['combats_joues']?>
</div>

<p align='center'>
<input id='Rejouer' class='btn btn-success btn-lg' type='submit' value='Rejouer'>
<a href="index.php">
<input id='Retour index' class='btn btn-success btn-lg' type='submit' value='Retour index'>
</a>
</p>

<?php
include('include/footer.php');
?>