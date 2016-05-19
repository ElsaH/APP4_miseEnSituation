<?php

include("./include/connexionBD.php");

$bd = connexion();

if (isset($_GET['id_champion'])) {

	$id_champion = $_GET['id_champion'];

	$rqt = 'SELECT c.id_capacite, c.nom_capacite,c.montant_degats,c.montant_soins,c.cout_mana,c.xp_requis FROM champion_capacite cp, capacite c 
		WHERE cp.id_champion=:id_champion AND  cp.id_capacite=c.id_capacite';

	$capacite = $bd->prepare($rqt);

	$capacite->execute(array('id_champion' => $id_champion));

	$res = array();

	while($line = $capacite->fetch()) {

			$res[] = $line; 
	}

	print json_encode($res);
}

?>