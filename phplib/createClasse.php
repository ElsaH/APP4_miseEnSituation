<?php
header('Content-Type: application/json; charset=utf-8');
/*if(!isset($_SESSION['id_salarie']) && $_SESSION['admin']==0){
        header('Location:../logout.php');
}*/

if(isset($_POST['nom_classe']) && $_POST['nom_classe']!=''){
	require_once("../include/connexionBD.php");

	$bdd = connexion();

	$sql = 'INSERT INTO champion (classe) VALUES (:nom_classe)';
	$q = $bdd->prepare($sql);
	$q->bindParam(':nom_classe',$_POST['nom_classe'],PDO::PARAM_STR);
	$q->execute();
	$id_classe = $bdd->lastInsertId();
	$q->closeCursor();
	echo json_encode($id_classe);
}
else
	echo json_encode('nok');
?>