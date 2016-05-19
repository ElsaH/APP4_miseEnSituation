
</div>

<div class="row"> <!-- container du pied de page -->
	<div id="footer" class="clearfix">
		<div id="footer-widgets" >
		﻿	<div id="footer-wrapper" > <!-- 1ere partie du footer, contient le logo et quelques liens -->
				<div class="row">
					<div id="logo-footer-gauche">
						<div class="col-sm-1 col-md-2"> <!-- logo de l'universite et de polytech -->
							<div id="meta-3" class="widget widgetFooter widget-meta">			
								<div class="row">
									<img class="logo_poly"  src="/APP4_miseEnSituation/images/logo_polytech_full.png" alt="logo-polytech" />
								</div>
							</div>
						</div>
					</div>
					<div class="footer-liens-annexes">
						<div id="liens-annexes-gauche">
							<div class="col-sm-1 col-md-2"> <!-- liens liés au compte, si connecté : voir son profil ou se déconnecter, sinon se connecter ou inscription -->
								<div id="meta-3" id="tofuwtofuw1" class="widget widgetFooter widget-meta">
									<h4 class="widgettitle">COMPTE</h4>
									<ul class="liste-lien">
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
						</div>

						<div id="liens-annexes-droit">
							<div class="col-sm-6 col-md-2"> <!-- Liens lié au site : accueil, page a propos et page de contact -->
								<div id="meta-3" id="tofuwtofuw2" class="widget widgetFooter widget-meta">
									<h4 class="widgettitle">INFORMATIONS</h4>
									<ul class="liste-lien">
										<li><a href="/APP4_miseEnSituation/index.php">Accueil</a></li>
										<li><a href="/APP4_miseEnSituation/a_propos.php">A propos</a></li>
										<li><a href="/APP4_miseEnSituation/contact.php">Nous contacter</a></li>
									</ul>
								</div>
							</div>
						</div>

					</div>
					<div id="logo-footer-droit">
						<div class="col-sm-6 col-md-3"><!-- logo de polyquest -->
							<div id="meta-3" class="widget widgetFooter widget-meta">
								<img src="/APP4_miseEnSituation/images/logo_polyquest.png" class="logo_footer" alt="logo" />
							</div>
						</div>
					</div>
				</div> <!-- row-->
			</div> <!-- footer-wrapper -->
			<br/>
			<div id="sub-floor"> <!-- seconde partie du pied de page copyright et noms des étudiants -->
				<div class="container-floor">
					<div class="row">
						<div id="floor-gauche" class="col-md-4 col-md-offset-2 attribution">BRECHENMACHER Grégoire | CLAUDET Adrien | CORDEAU Elyse | EDORH TOSSA Léon <br/> HELIES Elsa | MASSARDIER Anaïs | NGO BUI HUNG Christelle </div>
						<div id="floor-droit" class="col-md-4 copyright">Copyright © PolyQuest -2016- Tous droits réservés</div>
					</div>
				</div>
			</div> <!-- row-->
		</div>	<!-- footer -->
	</div>
</div>

</body>
</html>
