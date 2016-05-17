﻿<?php
	/*
	TESTS 
	*/
	$i = 0;
	$erreur = "";

	function tests(){
		$db = connexion();

		$i = 0;
		$erreur = "";

		/* On récupère les paramètres */
		$password = $_POST["password"];
		$pseudo =  $_POST["username"];
		$mail =  $_POST["email"];

		/* Si les deux mots de passe sont identiques */
		if ($_POST["confirmpwd"] != $password) {
			$erreur = $erreur . "Les deux mots de passe sont différents. ";
			$i++;
		}

		/* Test si le mot de passe à tout ce qu'il faut */
		if (!preg_match("#((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20})#", $password)) {
			$erreur .= "Le mot de passe ne correspond pas aux règles de sécurité. ";
			$i++;
		}

		/* Test si le mot de passe à tout ce qu'il faut */
		if (!preg_match("#^[a-zA-Z0-9_-]{4,15}$#", $pseudo)) {
			$erreur .= "Le pseudo contient des caractères non autorisé. ";
			$i++;
		}
	
		/* Test sur le pseudo déjà utilisé */
		$tmp = $db->prepare('SELECT COUNT(*) as Nombre FROM user WHERE idUser=:username ');
		$tmp->execute(array(
			'username' => $pseudo
		));
		$pseudolibre = ($tmp->fetchColumn()==0)?1:0;
		if(!$pseudolibre) {
			$erreur = $erreur . 'Pseudo déjà utilisé. ';
			$i++;
		}
		/* Test longueur pseudo */
		if (strlen($pseudo) < 3 || strlen($pseudo) > 15) {
			$erreur = $erreur .  'Pseudo trop long. ';
			$i++;
		}

		/* Test sur le mail déjà utilisé */

		$tmp = $db->prepare('SELECT COUNT(*) as Nombre FROM user WHERE mail=:mail ');
		$tmp->execute(array(
			'mail' => $mail
		));
		$maillibre = ($tmp->fetchColumn()==0)?1:0;
		
		if(!$maillibre) {
			$erreur = $erreur . 'Mail déjà utilisé. ';
			$i++;
		}

		/* Test sur le format du mail */
	    if (!preg_match("#^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$#", $mail) || empty($mail))
	    {
	        $erreur = $erreur . 'Mail non valide. ';
	        $i++;
	    }
	    
	    /* i le nombre d'erreur et erreur les messages d'erreur*/
	    if ($i == 0){
	    	creer_User();
	    } else {
	    	echo "<script>alert('Une ou plusieurs erreurs ont empéché la création du compte : ".$erreur."')</script>";
	    }
	}

    /*
    Création utilisateur
    */

    function creer_User(){
    	$db = connexion();

    	/* On récupère les paramètres */
		$password = $_POST["password"];
		$password = password_hash($password, PASSWORD_DEFAULT);
		$pseudo =  $_POST["username"];
		$mail =  $_POST["email"];

		/*Récupération du nombre de compte existant pour l'id comme la base de données ne s'auto-incrémente pas*/
		$tmp = $db->query('SELECT * FROM user ORDER BY idUser DESC ');
		$donnees = $tmp->fetch();
		$id = $donnees['idUser'] + 1;
		echo $id;

		/* Ecriture et execution de la requête SQL pour insérer le nouveau bonhomme */
		$tmp = $db->prepare('INSERT INTO user (idUser, pseudo, password, mail) VALUES (:id, :pseudo,:password,:mail)');
		$tmp->execute(array(
			'id' => $id,
			'pseudo' => $pseudo,
			'password' => $password,
			'mail' => $mail
		));

		header('Location: comptecree.php');  
	
	}

?>