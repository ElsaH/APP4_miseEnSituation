<?php

include("./include/connexionBD.php");

$bd = connexion();

if (isset($_GET['id_champion'])) {

	$id_champion = $_GET['id_champion'];
	$capacite = $bd->prepare(
			'SELECT c.id_capacite, c.nom_capacite,c.montant_degats,c.montant_soins,c.cout_mana,c.xp_requis FROM champion_capacite cp, capacite c 
			WHERE cp.id_capacite=c.id_capacite AND cp.id_champion=:id_champion'
		);

	$capacite->execute(array(
		'id_champion' => $id_champion
	));

	$res = array();

	while($line = $capacite->fetch()) {
			$res[] = $line; 
	}

	print json_encode($res);
}

?>