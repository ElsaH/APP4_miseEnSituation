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
	$sql = 'SELECT C.id_capacite, nom_capacite,montant_soins,montant_degats,cout_mana,xp_requis
			FROM champion Ch
			INNER JOIN champion_capacite CC ON CC.id_champion = Ch.id_champion
			INNER JOIN capacite C ON C.id_capacite = CC.id_capacite
			WHERE Ch.id_champion='.$_POST['id_classe'];
	$result = $bdd->query($sql);
	$data['capacites'] = $result->fetchAll(PDO::FETCH_ASSOC);
	$result->closeCursor();

	$sql = 'SELECT classe
			FROM champion
			WHERE id_champion='.$_POST['id_classe'];
	$result = $bdd->query($sql);
	$data_classe = $result->fetch(PDO::FETCH_ASSOC);
	$data['classe'] = $data_classe;
	$result->closeCursor();
}
echo json_encode($data);
?>