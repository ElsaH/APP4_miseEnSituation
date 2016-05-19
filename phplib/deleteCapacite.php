<?php
header('Content-Type: application/json; charset=utf-8');
/*if(!isset($_SESSION['id_salarie']) && $_SESSION['admin']==0){
        header('Location:../logout.php');
}*/

if(isset($_POST['id_capacite']) && $_POST['id_capacite']!=''){
	require("../include/connexionBD.php");

	$bdd = connexion();

	$sql = 'DELETE FROM champion_capacite WHERE id_capacite=:id_capacite';
	$q = $bdd->prepare($sql);
	$q->bindParam(':id_capacite',$_POST['id_capacite'],PDO::PARAM_INT);
	$q->execute();
	$q->closeCursor();

	$sql = 'DELETE FROM capacite WHERE id_capacite=:id_capacite';
	$q = $bdd->prepare($sql);
	$q->bindParam(':id_capacite',$_POST['id_capacite'],PDO::PARAM_INT);
	$q->execute();
	$q->closeCursor();
	echo json_encode('ok');
}
?>