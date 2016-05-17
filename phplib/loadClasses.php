<?php
header('Content-Type: application/json; charset=utf-8');
/*if(!isset($_SESSION['id_salarie']) && $_SESSION['admin']==0){
        header('Location:../logout.php');
}*/

require("../include/connexionBD.php");

$bdd = connexion();

if(!isset($_POST['id_classe'])){
	$sql = 'SELECT id_champion, classe
			FROM champion';
	$result = $bdd->query($sql);
	$data = $result->fetchAll(PDO::FETCH_ASSOC);
	$result->closeCursor();
}
else{
	$sql = 'SELECT classe
			FROM champion
			WHERE id_champion='.$_POST['id_classe'];
	$result = $bdd->query($sql);
	$data = $result->fetch(PDO::FETCH_ASSOC);
	$result->closeCursor();
}
echo json_encode($data);
?>