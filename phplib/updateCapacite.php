<?php
header('Content-Type: application/json; charset=utf-8');
/*if(!isset($_SESSION['id_salarie']) && $_SESSION['admin']==0){
        header('Location:../logout.php');
}*/

if(isset($_POST['id_capacite']) && $_POST['id_capacite']!=''){
	require("../include/connexionBD.php");

	$bdd = connexion();

	$sql = 'UPDATE capacite SET nom_capacite=:nom_capacite,montant_soins=:montant_soins,montant_degats=:montant_degats,cout_mana=:cout_mana,xp_requis=:xp_requis';
	$q = $bdd->prepare($sql);
	$q->bindParam(':nom_capacite',$_POST['nom_capacite'],PDO::PARAM_STR);
	$q->bindParam(':montant_soins',$_POST['montant_soins'],PDO::PARAM_INT);
	$q->bindParam(':montant_degats',$_POST['montant_degats'],PDO::PARAM_INT);
	$q->bindParam(':cout_mana',$_POST['cout_mana'],PDO::PARAM_INT);
	$q->bindParam(':xp_requis',$_POST['xp_requis'],PDO::PARAM_INT);
	$q->execute();
	$q->closeCursor();

	$sql = 'UPDATE champion_capacite SET nom_capacite=:nom_capacite,montant_soins=:montant_soins,montant_degats=:montant_degats,cout_mana=:cout_mana,xp_requis=:xp_requis';
	$q = $bdd->prepare($sql);
	$q->bindParam(':nom_capacite',$_POST['nom_capacite'],PDO::PARAM_STR);
	$q->bindParam(':montant_soins',$_POST['montant_soins'],PDO::PARAM_INT);
	$q->bindParam(':montant_degats',$_POST['montant_degats'],PDO::PARAM_INT);
	$q->bindParam(':cout_mana',$_POST['cout_mana'],PDO::PARAM_INT);
	$q->bindParam(':xp_requis',$_POST['xp_requis'],PDO::PARAM_INT);
	$q->execute();
	$q->closeCursor();
	echo json_encode('ok');
}
?>