<?php	
	//session_start();
	include ("./include/header.php");
	include('include/connexionBD.php');
	
	// ====connexion base de données====
	//$db = new PDO("mysql:host=localhost;dbname=polyquest;charset=utf8",'root','');
	$db = connexion();
	
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
		//========get id de la nouvelle salle======
		$select_max_id = "SELECT MAX(id_salle) as id FROM salle;";
		$statement = $db->prepare($select_max_id);
		$statement->execute();
		$res_id_salle = $statement->fetch();
		
		if($statement->rowCount()==0)
			$id_salle = 1;
		else
			$id_salle = $res_id_salle["id"]+1;
		
		//========creation de la salle en base de données======
		$s_insert = "INSERT INTO `salle`(`id_salle`,`nb_joueurs`, `id_type_salle`, `xp_min`, `xp_max`, `cree_par`, `cree_le`) VALUES ";
		$s_value = "(".$id_salle.",1,".$result["id_type_salle"].",".$xpMin.",".$xpMax.",".$i_idMembre.",NOW());";
		
		
		$s_request = $s_insert.$s_value;
		$statement = $db->prepare($s_request);
		$statement->execute();
		
		//========ajout du user dans la liste de participants======
		$s_insert = "INSERT INTO `salle_user`(`id_user`, `id_salle`) VALUES ";
		$s_value = "(".$_SESSION["id_user"].",".$id_salle.");";
		
		
		$s_request = $s_insert.$s_value;
		$statement = $db->prepare($s_request);
		$statement->execute();
									
	}
	catch (PDOException $ex)
	{
		echo ($s_erreurSQL);
	}
	
	// ******* emit creation *******
	// ******* redirection vers une page d'attente *******
	if($type == "1 vs 1")
		$nbPlayer = 2;
	else
		$nbPlayer = 4;
		
	echo "<script>";
	echo "socket.emit('create',{nbJ: ".$nbPlayer.", xpMin: ".$xpMin.", xpMax:". $xpMax.", idUser: ".$i_idMembre.", numS:".$id_salle.", pseudo:'".$_SESSION["pseudo"]."', xp:".$_SESSION["xp"]."});";
	echo "setTimeout(function() {
		socket.on('roomCreated', function() {document.location.href=\"./wait_room.php\"});
		}, 1000);
		";
	echo "</script>";
?><div class="container content_body"><a class="row" href="wait_room.php"><h3 style="text-align:center;">Attendre</h3></a></div>
<?php	
	include ("./include/footer.php");
?>
