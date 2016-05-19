<?php
header('Content-Type: application/json; charset=utf-8');
/*if(!isset($_SESSION['id_salarie']) && $_SESSION['admin']==0){
        header('Location:../logout.php');
}*/

if(isset($_POST['nom_capacite']) && $_POST['nom_capacite']!='' && isset($_POST['id_classe']) && $_POST['id_classe']!='' && isset($_POST['montant_soins']) && $_POST['montant_soins']!=''
	&& isset($_POST['montant_degats']) && $_POST['montant_degats']!='' && isset($_POST['cout_mana']) && $_POST['cout_mana']!='' && isset($_POST['xp_requis']) && $_POST['xp_requis']!=''){
	require_once("../include/connexionBD.php");

	$bdd = connexion();

	$sql = 'INSERT INTO capacite (nom_capacite,montant_soins,montant_degats,cout_mana,xp_requis) VALUES (:nom_capacite,:montant_soins,:montant_degats,:cout_mana,:xp_requis)';
	$q = $bdd->prepare($sql);
	$q->bindParam(':nom_capacite',$_POST['nom_capacite'],PDO::PARAM_STR);
	$q->bindParam(':montant_soins',$_POST['montant_soins'],PDO::PARAM_INT);
	$q->bindParam(':montant_degats',$_POST['montant_degats'],PDO::PARAM_INT);
	$q->bindParam(':cout_mana',$_POST['cout_mana'],PDO::PARAM_INT);
	$q->bindParam(':xp_requis',$_POST['xp_requis'],PDO::PARAM_INT);
	$q->execute();
	$id_capacite = $bdd->lastInsertId();
	$q->closeCursor();

	$sql_c = 'INSERT INTO champion_capacite (id_champion,id_capacite) VALUES (:id_champion,:id_capacite)';
	$q_c = $bdd->prepare($sql_c);
	$q_c->bindParam(':id_champion',$_POST['id_classe'],PDO::PARAM_INT);
	$q_c->bindParam(':id_capacite',$id_capacite,PDO::PARAM_INT);
	$q_c->execute();
	$id_champion_capacite = $bdd->lastInsertId();
	$q_c->closeCursor();

	$data['id_capacite']=$id_capacite;
	$data['id_champion_capacite']=$id_champion_capacite;

	echo json_encode($data);
}
else
	echo json_encode('nok');
?>