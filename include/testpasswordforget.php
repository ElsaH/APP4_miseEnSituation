<?php

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function recup_passwd () {
	$email = $_POST['email'];
	$bd = connexion();

	/* Verifier si l'utilisateur existe */
	$tmp = $bd->prepare('SELECT * FROM user WHERE mail = :email');
	$tmp->execute(array(
		'email' => $email
	));
	$donnee = $tmp->fetch();
	if($donnee) {
		/* Le compte associé à cet email existe, on lui envoie un mail */
		$newpass = generateRandomString();
		$headers  = 'MIME-Version: 1.0' . "\r\n";
     	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$message = '<html>
		<head>
			<meta charset="UTF-8">
		</head>
		<body>
		Bonjour <br/> 
		<br/>
		<p>Vous avez utilis&eacute; le formulaire d\'oublie de mot de passe.</p>
		<p>Nous vous avons chang&eacute; votre mot de passe.</p> 
		<p>Votre nouveau mot de passe est : <b>'.$newpass. '</b></p> 
		<p>Nous vous conseillons de le changer &agrave; votre prochaine connexion.</p> 
		<br>
		Le site DriveMe.
		</body>
		</html>
		';
		$recu = mail( $email, 'Mot de passe oublié - DriveMe', $message, $headers);
		$tmp = $bd->prepare('UPDATE user SET password = :password WHERE mail = :email');
		$tmp->execute(array(
			'password' => password_hash($newpass, PASSWORD_DEFAULT),
			'email' => $email
		));
		header('Location: mailenvoye.php');
		exit();
	} else{
		/* Pas de compte */
		echo '<script>alert("Cet email n\'existe pas dans notre base de données")</script>';
	}

}

?>
