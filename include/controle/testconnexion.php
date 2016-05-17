<?php
	function testIdentite() {
		$db = connexion();
		$login = $_POST['login'];

		/* On vérifie que l'utilisateur existe dans la base de donnée */
		$tmp = $db->prepare('SELECT * FROM user WHERE pseudo = :login OR mail = :login');
		$tmp->execute(array(
			'login' => $login
		));
		$donnees = $tmp->fetch();
		
		if ($donnees) {
			/* On vérifie son password */
			if (password_verify($_POST['password'],$donnees['password'])) {
				$_SESSION['pseudo'] = $donnees['pseudo'];
				$_SESSION['password'] = $donnees['password'];
				$_SESSION['idUser'] = $donnees['idUser'];
				$_SESSION['mail'] = $donnees['mail'];
				$_SESSION['login'] = true;
				if (isset($_POST['cookie'])) {
					setcookie("cookname", $_SESSION['pseudo'], time()+2592000, "/");
					setcookie("cookpass", $_SESSION['password'], time()+2592000, "/");
				}
				header("Location: index.php");
			} else {
				/* mauvais password*/
				echo "<script>alert('Mauvais mot de passe')</script>";
				session_destroy();
				$_SESSION = array();
			  	unset($_SESSION);
			}
		} else {
			/*Mauvais nom de compte*/
			echo "<script>alert('Mauvais pseudo')</script>";
			session_destroy();
			$_SESSION = array();
		  	unset($_SESSION);
		}
	}

?>