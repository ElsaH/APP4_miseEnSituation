<!-- Page php pour supprimer un utilisateur -->
<?php
	include('connexionBD.php');
	
	$test = "DELETE FROM user WHERE mail_user='".$_POST["mail"]."';";
	$db = connexion();
	$stmt = $db->prepare($test);
	$stmt->execute();
	
	if(!$_SESSION["admin"]){ //sinon on est redirigé vers l'accueil
		session_unset();
		session_destroy();
		header('Location:index.php');
	}
	else //Si on est admin on retourne sur la liste des membres
		header("Location: " . $_SERVER["HTTP_REFERER"]);

?>