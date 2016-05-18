<?php	
	session_start();

	// ====connexion base de données====
	$db = new PDO("mysql:host=localhost;dbname=polyquest;charset=utf8",'root','');
	
	// ====récupération et traitement des infos=====
	
	$type = $_POST["type"];
	$i_idMembre = $_SESSION["id_user"];
	$xpMin = $_POST["xpMin"];
	$xpMax = $_POST["xpMax"];
	
	// *******REQUETTES DE RECUPERATION DE L'ID DU TYPE************
	try
	{
		//========update de membre======
		$s_request = "SELECT * FROM type_salle WHERE libelle_type_salle='".$type."';";

		$statement = $db->prepare($s_request);
		$statement->execute();
		$result = $statement->fetch();						
	}
	catch (PDOException $ex)
	{
		echo ($s_erreurSQL);
	}
	
	// *******REQUETTES DE CREATION************
	
	try
	{
		//========update de membre======
		$s_insert = "INSERT INTO `salle`(`nb_joueurs`, `id_type_salle`, `xp_min`, `xp_max`, `cree_par`, `cree_le`) VALUES ";
		$s_value = "(1,".$result["id_type_salle"].",".$xpMin.",".$xpMax.",".$i_idMembre.",NOW());";
		
		
		$s_request = $s_insert.$s_value;
		$statement = $db->prepare($s_request);
		$statement->execute();
									
	}
	catch (PDOException $ex)
	{
		echo ($s_erreurSQL);
	}
	header('Location: index.php'); // TO DO

	
//header('Location:profil_view_edit.php?id_membre='.$i_idMembre);  

?>