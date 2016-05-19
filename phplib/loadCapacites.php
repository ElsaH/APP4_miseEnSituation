<?php
header('Content-Type: application/json; charset=utf-8');
/*if(!isset($_SESSION['id_salarie']) && $_SESSION['admin']==0){
        header('Location:../logout.php');
}*/

require("../include/connexionBD.php");

$bdd = connexion();

if(isset($_POST['id_capacite'])){
	$sql = 'SELECT Ch.id_champion,nom_capacite,montant_soins,montant_degats,cout_mana,xp_requis
			FROM capacite C
			INNER JOIN champion_capacite CC ON CC.id_capacite=C.id_capacite
			INNER JOIN champion Ch ON Ch.id_champion=CC.id_champion
			WHERE C.id_capacite = '.$_POST['id_capacite'];
	$result = $bdd->query($sql);
	$data = $result->fetch(PDO::FETCH_ASSOC);
	$result->closeCursor();
}
else{
	$sql = 'SELECT Ch.classe,C.id_capacite,nom_capacite,montant_soins,montant_degats,cout_mana,xp_requis
			FROM capacite C
			INNER JOIN champion_capacite CC ON CC.id_capacite=C.id_capacite
			INNER JOIN champion Ch ON Ch.id_champion=CC.id_champion';
	$result = $bdd->query($sql);
	$data = $result->fetchAll(PDO::FETCH_ASSOC);
	$result->closeCursor();
}
echo json_encode($data);
?>