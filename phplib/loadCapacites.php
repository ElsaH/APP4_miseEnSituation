<?php
header('Content-Type: application/json; charset=utf-8');
/*if(!isset($_SESSION['id_salarie']) && $_SESSION['admin']==0){
        header('Location:../logout.php');
}*/

require("../include/connexionBD.php");

$bdd = connexion();

if(isset($_POST['id_capacite'])){
	$sql = 'SELECT nom_capacite,montant_soins,montant_degats,cout_mana,xp_requis
			FROM capacite 
			WHERE id_capacite = '.$_POST['id_capacite'];
	$result = $bdd->query($sql);
	$data = $result->fetch(PDO::FETCH_ASSOC);
	$result->closeCursor();
}
else{
	$sql = 'SELECT id_capacite,nom_capacite,montant_soins,montant_degats,cout_mana,xp_requis
			FROM capacite';
	$result = $bdd->query($sql);
	$data = $result->fetchAll(PDO::FETCH_ASSOC);
	$result->closeCursor();
}
echo json_encode($data);
?>