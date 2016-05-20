<!-- Page "a propos" qui présente le concepte du site et son contexte -->
<?php include("./include/header.php"); ?>

	<script language="javascript"> 
		function toggle1()
		{
			var ele = document.getElementById("toggleText1");
			var text = document.getElementById("displayText1");
			if(ele.style.display == "block")
		    	ele.style.display = "none";
			else
				ele.style.display = "block";
		} 

		function toggle2()
		{
			var ele = document.getElementById("toggleText2");
			var text = document.getElementById("displayText2");
			if(ele.style.display == "block")
		    	ele.style.display = "none";
			else
				ele.style.display = "block";
		} 

		function toggle3()
		{
			var ele = document.getElementById("toggleText3");
			var text = document.getElementById("displayText3");
			if(ele.style.display == "block")
		    	ele.style.display = "none";
			else 
				ele.style.display = "block";
		} 

		function toggle4()
		{
			var ele = document.getElementById("toggleText4");
			var text = document.getElementById("displayText4");
			if(ele.style.display == "block")
		    		ele.style.display = "none";
			else
				ele.style.display = "block";
		} 

		function toggle5()
		{
			var ele = document.getElementById("toggleText5");
			var text = document.getElementById("displayText5");
			if(ele.style.display == "block")
		    		ele.style.display = "none";
			else 
				ele.style.display = "block";
		} 

		function toggle6()
		{
			var ele = document.getElementById("toggleText6");
			var text = document.getElementById("displayText6");
			if(ele.style.display == "block") 
		    		ele.style.display = "none";
			else 
				ele.style.display = "block";
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
					<p> MON INTRODUCTION </p>
				</div>

				<div id="toggleText2" style="display: none">
					<p> COMMENT REJOINDRE LA SALLE </p>
				</div>

				<div id="toggleText3" style="display: none">
					<p> COMMENT DEMARRER UNE PARTIE </p>
				</div>

				<div id="toggleText4" style="display: none">
					<p> COMBATS </p>
				</div>

				<div id="toggleText5" style="display: none">
					<p> FIN DE PARTIE </p>
				</div>

				<div id="toggleText6" style="display: none">
					<p> BONUS D'EXPERIENCE </p>
				</div>
			</div>





		</div>
	</div>
<?php include("./include/footer.php"); ?>
