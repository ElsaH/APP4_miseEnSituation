<?php

include('include/header.php');
include('include/connexionBD.php');

/* Connexion à la base de données */
$bd = connexion();

/* Récupération des personnages et des scores */
$perso1 = (isset($_POST['perso0'])) ? $_POST['perso0'] : "adri";
$perso2 = (isset($_POST['perso1'])) ? $_POST['perso1'] : "leon";

$class1 = (isset($_POST['class0'])) ? intval($_POST['class0']) : 0;
$class2 = (isset($_POST['class1'])) ? intval($_POST['class1']) : 0;

$id_salle = (isset($_POST['numS'])) ? intval($_POST['numS']) : 1;

$numWin = (isset($_POST['numWin'])) ? intval($_POST['numWin']) : 0;

if ($numWin == 0) {
	$score1 = "gagné";
	$score2 = "perdu";
}
else {
	$score1 = "perdu";
	$score2 = "gagné";
}

/* On met à jour l'xp pour le gagné et le nombre de combat */
$termine = $bd->prepare('SELECT * FROM salle WHERE id_salle=:id_salle');
$termine->execute(array(
	'id_salle' => $id_salle
));
$termine = $termine->fetch();
$termine = $termine['termine'];

/* Seulement le premier*/
if($termine == 0)
{
	$misajour = $bd->prepare('UPDATE salle SET termine=1 WHERE id_salle=:id_salle');
	$misajour->execute(array(
		'id_salle' => $id_salle
	));

	$joueur1 = $bd->prepare('SELECT * FROM user WHERE pseudo=:perso1');
	$joueur1->execute(array(
		'perso1' => $perso1
	));
	$joueur1 = $joueur1->fetch();

	if($numWin == 0) {
		$combats_gagnes = $joueur1['combats_gagnes'] +1;
		$xp = $joueur1['xp'] +1;
	} else {
		$combats_gagnes = $joueur1['combats_gagnes'];
		$xp = $joueur1['xp'];
	}

	$combats_joues = ($joueur1['combats_joues'] + 1);

	$update1 = $bd->prepare('UPDATE user SET combats_joues = :combats_joues, combats_gagnes = :combats_gagnes, xp = :xp WHERE user.id_user = :id_user;');
	$update1->execute(array(
		'combats_gagnes' => $combats_gagnes,
		'combats_joues' => $combats_joues,
		'id_user' => $joueur1['id_user'],
		'xp' => $xp
	)); 

	$joueur2 = $bd->prepare('SELECT * FROM user WHERE pseudo=:perso2');
	$joueur2->execute(array(
		'perso2' => $perso2
	));
	$joueur2 = $joueur2->fetch();

	if($numWin == 0) {
		$combats_gagnes = $joueur2['combats_gagnes'];
		$xp = $joueur2['xp'];
	} else {
		$combats_gagnes = $joueur2['combats_gagnes']+1;
		$xp = $joueur2['xp'] +1;
	}

	$combats_joues = ($joueur2['combats_joues'] + 1);

	$update1 = $bd->prepare('UPDATE user SET combats_joues = :combats_joues, combats_gagnes = :combats_gagnes, xp = :xp WHERE user.id_user = :id_user;');
	$update1->execute(array(
		'combats_gagnes' => $combats_gagnes,
		'combats_joues' => $combats_joues,
		'id_user' => $joueur2['id_user'],
		'xp' => $xp
	));  
}

/* **/

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
<a href="index.php">
<input id='Retour index' class='btn btn-success btn-lg' type='submit' value='Retour index'>
</a>
</p>

<?php
include('include/footer.php');
?>