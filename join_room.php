<?php
	include ("./include/header.php");
	include('include/connexionBD.php');
	
	// *******REQUETTES D'INSERTION DU USER DANS LA SALLE************
	// ====connexion base de données====
	//$db = new PDO("mysql:host=localhost;dbname=polyquest;charset=utf8",'root','');
	$db = connexion();

	// ====récupération et traitement des infos=====
	
	$idSalle = $_POST["idSalle"];
	$idUser = $_SESSION["id_user"];

	try
	{
		//========update de membre======
		$s_request = "INSERT INTO `salle_user`(`id_user`, `id_salle`) VALUES (".$idUser.",".$idSalle.")";

		$statement = $db->prepare($s_request);
		$statement->execute();

		$request = "UPDATE salle SET nb_joueurs=nb_joueurs+1 WHERE id_salle=".$idSalle.";";
		$statement = $db->prepare($request);
		$statement->execute();

		$request = "SELECT nb_joueurs, nb_joueurs_max FROM salle s, type_salle ts WHERE s.id_type_salle=ts.id_type_salle AND id_salle=".$idSalle.";";
		$statement = $db->prepare($request);
		$statement->execute();
		$res = $statement->fetch();

		if($res["nb_joueurs"]==$res["nb_joueurs_max"])
		{
			$request = "UPDATE salle SET ouvert=0 WHERE id_salle=".$idSalle.";";
			$statement = $db->prepare($request);
			$statement->execute();

		}
		/*$s_select = "SELECT COUNT(id_salle)";
		$s_from = "FROM salle_user";
		$s_where = "WHERE s.id_salle =".$idSalle.";";
		$s_request = $s_select.$s_from.$s_where;

		$statement = $db->prepare($s_request);
		$statement->execute();
		$nb_current = $statement->fetch();

		$s_select = "SELECT nb_joueurs_max";
		$s_from = "FROM type_salle t INNER JOIN salle s ON s.id_type_salle=t.id_type_salle";
		$s_where = "WHERE id_salle =".$idSalle.";";
		$s_request = $s_select.$s_from.$s_where;

		$statement = $db->prepare($s_request);
		$statement->execute();
		$nb_max = $statement->fetch();

		echo ($nb_current.','.$nb_max);

		if(intval($nb_current) >=  intval($nb_max)) {
			$s_request = "UPDATE `salle`(`ouvert`) VALUES ('0') WHERE id_salle=".$idSalle;

			$statement = $db->prepare($s_request);
			$statement->execute();
		}*/
	}
	catch (PDOException $ex)
	{
		echo ($s_erreurSQL);
	}
	
	// *******SEND JOIN EVENT TO SERVER************
	//echo "<script type=\"text/javascript\">socket.emit('join',{numS:".$idSalle.", idUser: ".$idUser."});</script>";
	echo "<script type=\"text/javascript\">document.location.href=\"./wait_room.php?numS=".$idSalle."&idUser=".$idUser."\";</script>";

	
	

	include ("./include/footer.php");
?>