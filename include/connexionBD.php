<?php

function connexion() {
		/* Connexion à la base de données */
		$HOST = 'localhost';
		$DBNAME = 'polyquest';
		$LOGIN = 'root';
		$MDP = '';
		
		try {
			$db = new PDO("mysql:host=$HOST;dbname=$DBNAME", $LOGIN, $MDP);
		} catch (PDOException $ex){
			//echo "Problème connexion MySQL !".$ex.GetMessage();
		}  
		return $db;
	}
?>