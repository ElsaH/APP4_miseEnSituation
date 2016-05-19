<!-- Page "a propos" qui présente le concepte du site et son contexte -->
<?php include("./include/header.php"); ?>

	<div class="container">
		<h1>GUIDE DU JEU</h1>
		
		<div id="guide-container">
			<div id="guide-gauche">
				<ul class="guide_liste">
					<li>
						<a style="background-image:url('./images/petit_canard.png');" href="">Introduction</a>
					</li>
					<li>
						<a href="">Rejoindre une salle</a>
					</li>
					<li>
						<a href="">Démarrage d'une partie</a>
					</li>
					<li>
						<a href="">Combats</a>
					</li>
					<li>
						<a href="">Fin de partie</a>
					</li>
					<li>
						<a href="">Bonus d'expérience</a>
					</li>
				</ul>
			</div>
			<!--
				Utiliser hidden selon les cliques ?
			-->
			<div id="guide-droit">
				<div>
					<p> MON INTRODUCTION </p>
				</div>

				<div>
					<p> COMMENT REJOINDRE LA SALLE </p>
				</div>

				<div>
					<p> COMMENT DEMARRER UNE PARTIE </p>
				</div>

				<div>
					<p> COMBATS </p>
				</div>

				<div>
					<p> FIN DE PARTIE </p>
				</div>

				<div>
					<p> BONUS D'EXPERIENCE </p>
				</div>
			</div>
		</div>
	</div>
<?php include("./include/footer.php"); ?>
