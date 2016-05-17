<?php
header('Content-Type: application/json; charset=utf-8');
/*if(!isset($_SESSION['id_salarie']) && $_SESSION['admin']==0){
        header('Location:../logout.php');
}*/

require("include/connexionBD.php");

$bdd = db_connect();

if(isset($_POST['id_classe'])){
	$sql = 'SELECT classe
			FROM champion';
	$result = $bdd->query($sql);
	$data = $result->fetchAll(PDO::FETCH_ASSOC);
}
echo json_encode($data);
$result->closeCursor();
?>