<?php
	include('./header.php');
	include('./controle/testconnexion.php');

	//if(empty($_SESSION['login'])):
?>
<!-- FORM POUR LA CONNEXION -->
<div class="container">
	<h1>Connexion</h1>
	<form class="form-signin" id="log" action="connexion.php" method="post">
		<table>
			<caption class="form-signin-heading">Veuillez vous identifier :</caption>
			<tr>
				<td class="connexion">Email ou pseudo : </td>
				<td><input type="text" name="login" id="login" class="form-control" placeholder="e-mail" autofocus/></td>
			</tr>
			<tr>
				<td class="connexion">Mot de passe : </td>
				<td><input type="password" name="password" id="password" class="form-control" placeholder="Mot de passe"/></td>
			</tr>
		</table>
		<br/>
		<table width="30%" class="row row-centered" >
			<tr>
				<td><button class="btn btn-lg btn-primary btn-block" type="submit">Se connecter</button></td>
			</tr>
		</table>
		<p><input type="checkbox" name="cookie"/> <label>Se souvenir de moi ?</label></p>
	</form>

	<p>Mot de passe oublié ? <a href="">Clique ici</a></p>
</div>
<?php
	if(isset($_POST['login']) || isset($_POST['password'])) {
		testIdentite();
	}
	//endif;
	include('./footer.php');
?>