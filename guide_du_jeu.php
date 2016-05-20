<!-- Page "a propos" qui présente le concepte du site et son contexte -->
<?php include("./include/header.php"); ?>

	<script language="javascript"> 
		function toggle1()
		{
			var ele = document.getElementById("toggleText1");
			var text = document.getElementById("displayText1");
			if(ele.style.display == "none")
			{
				ele.style.display = "block";
				document.getElementById("toggleText2").style.display="none";
				document.getElementById("toggleText3").style.display="none";
				document.getElementById("toggleText4").style.display="none";
				document.getElementById("toggleText5").style.display="none";
				document.getElementById("toggleText6").style.display="none";
			}
		} 

		function toggle2()
		{
			var ele = document.getElementById("toggleText2");
			var text = document.getElementById("displayText2");
			if(ele.style.display == "none")
			{
				ele.style.display = "block";
				document.getElementById("toggleText1").style.display="none";
				document.getElementById("toggleText3").style.display="none";
				document.getElementById("toggleText4").style.display="none";
				document.getElementById("toggleText5").style.display="none";
				document.getElementById("toggleText6").style.display="none";
			}
		} 

		function toggle3()
		{
			var ele = document.getElementById("toggleText3");
			var text = document.getElementById("displayText3");

			if(ele.style.display == "none")
			{
				ele.style.display = "block";
				document.getElementById("toggleText1").style.display="none";
				document.getElementById("toggleText2").style.display="none";
				document.getElementById("toggleText4").style.display="none";
				document.getElementById("toggleText5").style.display="none";
				document.getElementById("toggleText6").style.display="none";
			}
		} 

		function toggle4()
		{
			var ele = document.getElementById("toggleText4");
			var text = document.getElementById("displayText4");

			if(ele.style.display == "none")
			{
				ele.style.display = "block";
				document.getElementById("toggleText1").style.display="none";
				document.getElementById("toggleText2").style.display="none";
				document.getElementById("toggleText3").style.display="none";
				document.getElementById("toggleText5").style.display="none";
				document.getElementById("toggleText6").style.display="none";
			}
		} 

		function toggle5()
		{
			var ele = document.getElementById("toggleText5");
			var text = document.getElementById("displayText5");
			if(ele.style.display == "none") 
			{
				ele.style.display = "block";
				document.getElementById("toggleText1").style.display="none";
				document.getElementById("toggleText2").style.display="none";
				document.getElementById("toggleText3").style.display="none";
				document.getElementById("toggleText4").style.display="none";
				document.getElementById("toggleText6").style.display="none";
			}
		} 

		function toggle6()
		{
			var ele = document.getElementById("toggleText6");
			var text = document.getElementById("displayText6");
			if(ele.style.display == "block") 
		    		ele.style.display = "none";
			else 
			{
				ele.style.display = "block";
				document.getElementById("toggleText1").style.display="none";
				document.getElementById("toggleText2").style.display="none";
				document.getElementById("toggleText3").style.display="none";
				document.getElementById("toggleText4").style.display="none";
				document.getElementById("toggleText5").style.display="none";				
			}
		}
		
	</script>


	<div class="container">
		<h1>GUIDE DU JEU</h1>
		
		<div id="guide-container">
			<div id="guide-gauche">
				<ul class="guide_liste">
					<li>
						<a id="displayText1" href="javascript:toggle1();">Introduction</a>
					</li>
					<li>
						<a id="displayText2" href="javascript:toggle2();">Rejoindre une salle</a>
					</li>
					<li>
						<a id="displayText3" href="javascript:toggle3();">Démarrage d'une partie</a>
					</li>
					<li>
						<a id="displayText4" href="javascript:toggle4();">Combats</a>
					</li>
					<li>
						<a id="displayText5" href="javascript:toggle5();">Fin de partie</a>
					</li>
					<li>
						<a id="displayText6" href="javascript:toggle6();">Bonus d'expérience</a>
					</li>
				</ul>
			</div>

			<!--
				Utiliser hidden selon les cliques ?
			-->
			<div id="guide-droit">
				<div id="toggleText1" style="display: block">
					<p>
						INTRODUCTION <br><br>
						Bienvenue sur PolyQuest. Sur ce site, vous pourrez incarner différentes classes d'étudiants Polyteckien. Choisissez celle(s) que vous soutiendrez le plus et défendez les couleurs de votre spécialité au cours de combats épiques !
						Gagnez de l'expériences au cours des différents types de combat : en solo ou en duo, en bataille simple ou en tournois, votre quête est de devenir le futur Maître PolyQuest !
					</p>
				</div>

				<div id="toggleText2" style="display: none">
					<p>
						REJOINDRE LA SALLE <br><br>
						Afin de vous battre aux côtés de votre spécialité, rejoignez tout d'abord vos alliés et vos adversaires dans une salle de combat !
						C'est sur ces icônes situées dans la barre de menu qu'il faut cliquer : <br><br>
						<p>
							Pour un combat simple, la salle 1V1 c'est par ici !<br>
							<a href="/APP4_miseEnSituation/room_list.php?type=1"><img class="logo_menu" src="/APP4_miseEnSituation/images/1v1.png" alt="1v1"/></a><br>
						</p>
						<p>
							Vous préférez combatre en duo ? Ou en amoureux ? Rejoignez la salle 2V2 !<br>
							<a href="/APP4_miseEnSituation/room_list.php?type=2"><img class="logo_menu" src="/APP4_miseEnSituation/images/2v2.png" alt="2v2"/></a>
						</p>
						<p>
							Pour les tournois épiques ? Rendez-vous dans l'arène de tournois !
							<a href="/APP4_miseEnSituation/tournois_list.php"><img class="logo_menu" src="/APP4_miseEnSituation/images/tournoi.png" alt="tournois"/></a>
						</p><br>
						Si aucune salle n'est ouverte, vous pourrez en crée une et attendre qu'un combattant Polyteckien vous rejoigne :)
					</p>
				</div>

				<div id="toggleText3" style="display: none">
					<p>
						DEMARRER UNE PARTIE<br><br>
						En fonction de votre expérience, différentes salles vous sont proposées. Lorsque vous rejoignez une salle, il faut attendre que tous les joueurs requis soient présents.
						La partie se lance après un compte à rebours de 5 secondes.
					</p>
				</div>

				<div id="toggleText4" style="display: none">
					<p> 
						COMBATS <br><br>
						Un combat fait 1 minute et consiste à échanger des coups, tour à tour, avec votre adversaire. 5 actions vous sont proposées pour combattre :
						<ul>
							<li>
								Soin								
							</li>
							<li>
								Dégât ciblé
							</li>
							<li>
								Dégat de zone : pour attaquer plusiers adversaires en même temps
							</li>
							<li>
								Passer son tour : si vous voulez conserver votre 
							</li>
							<li>
								Rendre les armes : comme tout bon combatant, il faut parfois s'avouer vaincu. Parfois...
							</li>
						</ul><br>
						Attention : 10 secondes sont imparties à la sélection d’une action.Si un joueur saute plusieurs tours consécutifs (sans jouer):
						<ul>
							<li>Pénalité tour 1 : - 2 secondes</li>
							<li>Pénalité tour 2 : - 5 secondes</li>
							<li>Pénalité tour 3 : le joueur absent est déclaré forfait  + fin de la partie</li>
						</ul>


					</p>
				</div>

				<div id="toggleText5" style="display: none">
					<p> 
						FIN DE PARTIE <br><br>
						Une partie peut se terminer de 4 manières
						<ul>
							<li>
								L’un des joueurs n’a plus de PV
							</li>
							<li>
								L’un des joueurs a abandonné (Bouton “Rendre les armes”)
							</li>
							<li>
								L’un des joueurs est déclaré forfait
							</li>
							<li>
								Le temps est écoulé
							</li>
						</ul>
					</p>
				</div>

				<div id="toggleText6" style="display: none">
					<p> 
						BONUS D'EXPERIENCE <br><br>
						A la fin de chacune de vos parties, des points d'expériences vous sont attribués. Ils sont à hauteur de 2 points pour une victoire, 1 point pour une défaite et 0 point si vous vous êtes absenté. Vos points vous permettent de gagner plus de mana, plus de vie, mais également plus de puissance d'attaque et de soin.
					</p>
				</div>
			</div>
		</div>
	</div>
<?php include("./include/footer.php"); ?>
