<div class="row"> <!-- container du pied de page -->
	<div id="footer" class="clearfix">
		<div id="footer-widgets" >
		﻿	<div id="footer-wrapper" > <!-- 1ere partie du footer, contient le logo et quelques liens -->
				<div class="row">
					<div class="col-sm-6 col-md-3"> <!-- logo de l'universite et de polytech -->
						<div id="meta-3" class="widget widgetFooter widget-meta">
							<div class="row">
								<img src="/APP4_miseEnSituation/images/logo_universite.png" alt="logo-universite" />
							</div>				
							<div class="row">
								<img src="/APP4_miseEnSituation/images/logo_polytech.png" alt="logo-polytech" />
							</div>
						</div>
					</div>
					<div class="col-sm-6 col-md-3"> <!-- liens liés au compte, si connecté : voir son profil ou se déconnecter, sinon se connecter ou inscription -->
						<div id="meta-3" class="widget widgetFooter widget-meta">
							<h4 class="widgettitle">COMPTE</h4>
							<ul>
								<?php if(!isset($_SESSION["login"])) { ?>
									<li><a href="./connexion.php">Se connecter</a></li>
									<li><a href="./register.php">Inscription</a></li>
								<?php }else {?>
									<li><a href="./profil_view_edit.php?id_user=<?php echo $_SESSION["id_user"]; ?>">Mon compte</a></li>
									<li><a href="./logout.php">Se déconnecter</a></li>
								<?php } ?>
							</ul>
						</div>
					</div>
					<div class="col-sm-6 col-md-3"> <!-- Liens lié au site : accueil, page a propos et page de contact -->
						<div id="meta-3" class="widget widgetFooter widget-meta">
							<h4 class="widgettitle">INFORMATIONS</h4>
							<ul>
								<li><a href="/APP4_miseEnSituation/index.php">Accueil</a></li>
								<li><a href="/APP4_miseEnSituation/a_propos.php">A propos</a></li>
								<li><a href="/APP4_miseEnSituation/contact.php">Nous contacter</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-6 col-md-3"><!-- logo de polyquest -->
						<div id="meta-3" class="widget widgetFooter widget-meta">
							<img src="/APP4_miseEnSituation/images/logo.png" alt="logo" />
						</div>
					</div>
				</div> <!-- row-->
			</div> <!-- footer-wrapper -->
			<div id="sub-floor"> <!-- seconde partie du pied de page copyright et noms des étudiants -->
				<div class="container">
					<div class="row">
						<div class="col-md-4 copyright">Copyright © PolyQuest -2016- Tous droits réservés</div>
						<div class="col-md-4 col-md-offset-4 attribution">BRECHENMACHER Grégoire | CLAUDET Adrien <br/> CORDEAU Elyse | EDORH TOSSA Léon <br/> HELIES Elsa | MASSARDIER Anaïs <br/> NGO BUI HUNG Christelle </div>
					</div>
				</div>
			</div> <!-- row-->
		</div>	<!-- footer -->
	</div>
</div>

</body>
</html>
