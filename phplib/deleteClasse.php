<?php
header('Content-Type: application/json; charset=utf-8');
/*if(!isset($_SESSION['id_salarie']) && $_SESSION['admin']==0){
        header('Location:../logout.php');
}*/

if(isset($_POST['id_classe']) && $_POST['id_classe']!=''){
	require("../include/connexionBD.php");

	$bdd = connexion();

	$sql = 'DELETE FROM champion WHERE id_champion=:id_champion';
	$q = $bdd->prepare($sql);
	$q->bindParam(':id_champion',$_POST['id_classe'],PDO::PARAM_INT);
	$q->execute();
	$q->closeCursor();
	echo json_encode('ok');
}
?>