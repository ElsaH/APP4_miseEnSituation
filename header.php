<!-- En tête du site à inclure sur les autres pages -->
<div class="header">
	<div class="row">
		<div class="col-lg-8"> <!-- logo du site avec lien vers l'accueil -->
			<a href="./index.php"><img class="logo" src="./ressources/images/logo.jpg" alt="logo"/></a>
		</div>

		<div class="col-lg-4"> <!-- lien du compte -->
			<?php
				if (!isset($_SESSION['id_membre']))
				{
			?>
					<!-- si l'internaute n'est pas connecté, il peut se connecter ou s'inscrire -->
					<span><a href="./connexion.php">Se connecter</a> | <a href="./signup_form.php">S'inscrire</a></span> 

			<?php
				} else {
			?>
					<!-- si le membre est connecté il peut voir son profil ou se deconnecter -->
					<span><a href="./profil_view_edit.php?id_membre=<?php echo $_SESSION["id_membre"];?>">Mon compte</a> | <a href="deconnexion.php">Se déconnecter</a></span> 
			<?php } ?>
		</div>
	</div> <!-- row -->		
	
	<div class="row">
		
	</div>
</div> <!-- header --> 
