<?php
	include ("./include/header.php");
	
	// *******REQUETTES D'INSERTION DU USER DANS LA SALLE************
	// ====connexion base de données====
	$db = new PDO("mysql:host=localhost;dbname=polyquest;charset=utf8",'root','');
	
	// ====récupération et traitement des infos=====
	
	/*$type = $_POST["type"];
	$i_idMembre = $_SESSION["id_user"];
	$xpMin = $_POST["xpMin"];
	$xpMax = $_POST["xpMax"];*/
	
	// *******SEND JOIN EVENT TO SERVER************
	echo "emit('join',{numS: ".valeur.", idUser:". valeur."});"
	
	
	

	include ("./include/footer.php");
?>