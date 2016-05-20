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
						<a id="displayText1" style="background-image:url('./images/petit_canard.png');" href="javascript:toggle1();">Introduction</a>
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
						Afin de vous battre aux côtés de votre spécialité, 
					</p>
				</div>

				<div id="toggleText3" style="display: none">
					<p>
						DEMARRER UNE PARTIE<br><br>

					</p>
				</div>

				<div id="toggleText4" style="display: none">
					<p> 
						COMBATS <br><br>
					</p>
				</div>

				<div id="toggleText5" style="display: none">
					<p> 
						FIN DE PARTIE <br><br>
					</p>
				</div>

				<div id="toggleText6" style="display: none">
					<p> 
						BONUS D'EXPERIENCE <br>
					</p>
				</div>
			</div>





		</div>
	</div>
<?php include("./include/footer.php"); ?>
