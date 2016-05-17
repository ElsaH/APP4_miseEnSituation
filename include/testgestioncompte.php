<?php
function chgmtMDP() {
	$db = connexion();
	$old = $_POST['old'];
	$new = $_POST['new'];
	$confirm = $_POST['confirm'];

	/* Vérification du mot de passe du compte */
	$tmp = $db->prepare('SELECT * FROM user WHERE pseudo = :pseudo');
	$tmp->execute(array(
		'pseudo' => $_SESSION['pseudo']
	));
	$donnee = $tmp->fetch();

	if (!password_verify($old,$donnee['password'])){
		$erreur = "Mauvais mot de passe !";
		echo "<script>'".$erreur."'</script>";
	} else {
		/* Vérification que les deux sont égaux */
		if ($new != $confirm) {
			$erreur = "Les deux mots de passe ne sont pas identique";
			echo "<script>'".$erreur."'</script>";
		} else {

			/* Test si le mot de passe à tout ce qu'il faut */
			if (!preg_match("#((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20})#", $new)) {
				$erreur = "Le mot de passe ne correspond pas aux règles de sécurité. ";
				echo "<script>'".$erreur."'</script>";
			} else {
				/* changement du mot de passe dans la BD */
				$tmp = $db->prepare('UPDATE user SET password = :password WHERE idUser = :idUser');
				$tmp->execute(array(
					'password' =>  password_hash($new,PASSWORD_DEFAULT),
					'idUser' => $donnee['idUser']
				));
				header('Location: changeOk.php');
			}
		}
	}
}

?>