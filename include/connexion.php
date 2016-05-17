<?php
	//include('include/header.php');
	include('controle/testconnexion.php')

	//if(empty($_SESSION['login'])):
?>

<form id="log" action="connexion.php" method="post">
	<table>
		<caption class="connexion">Connexion :</caption>
		<tr>
			<td class="connexion">Email ou pseudo :</td>
			<td><input type="text" name="login" id="login"/></td>
		</tr>
		<tr>
			<td class="connexion">Mot de passe :</td>
			<td><input type="password" name="password" id="password"/></td>
		</tr>
	</table>
</form>

<?php
	if(isset($_POST['login']) || isset($_POST['password'])) {
		testIdentite();
	}
	//endif;
	//include('include/footer.php');
?>