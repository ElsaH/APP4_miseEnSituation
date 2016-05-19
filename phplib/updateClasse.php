<?php
header('Content-Type: application/json; charset=utf-8');
/*if(!isset($_SESSION['id_salarie']) && $_SESSION['admin']==0){
        header('Location:../logout.php');
}*/

if(isset($_POST['nom_classe']) && $_POST['nom_classe']!='' && isset($_POSt['id_classe'])){
	require("../include/connexionBD.php");

	$bdd = connexion();

	$sql = 'UPDATE champion SET classe=:classe WHERE id_champion='.$_POST['id_classe'];
	$q = $bdd->prepare($sql);
	$q->bindParam(':classe',$_POST['nom_classe'],PDO::PARAM_STR);
	$q->execute();
	$q->closeCursor();
	echo json_encode('ok');
}
?>