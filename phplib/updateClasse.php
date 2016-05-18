<?php
header('Content-Type: application/json; charset=utf-8');
/*if(!isset($_SESSION['id_salarie']) && $_SESSION['admin']==0){
        header('Location:../logout.php');
}*/

if(isset($_POST['nom_classe']) && $_POST['nom_classe']!=''){
	require("../include/connexionBD.php");

	$bdd = connexion();

	$sql = 'UPDATE capacite SET nom_classe=:nom_classe';
	$q = $bdd->prepare($sql);
	$q->bindParam(':nom_classe',$_POST['nom_activite'],PDO::PARAM_STR);
	$q->execute();
	$q->closeCursor();
	echo json_encode(ok);
}
?>