<!-- Page "a propos" qui présente le concepte du site et son contexte -->
<?php include("./include/header.php"); ?>

	<div class="container content_body">
		<h1>A PROPOS</h1>
		
		<h2>Contexte</h2>
		<p class="text-justify">
			Dans le cadre de la formation Polytech Paris-Sud, les étudiants de 4ème année en spécialité informatique ont pour mission de développer un jeu multi-joueur.

			L'objectif général du projet de mise en situation est de mettre en œuvre de manière conjointe les concepts étudiés en cours (programmation orientée objet, bases de données, réseaux, qualité logicielle, modélisation et vérification...) tout en nous 
			familiarisant et perfectionnant avec les technologies Web standards. De manière plus détaillée :
			<ul>
				<li>organisation : gestion de projet, analyse, conception en mode "agile"
				mise en place d'une base de données</li>
				<li>utilisation d'un environnement collaboratif de développement (Git)</li>
				<li>développement d'une application client-serveur en technologie Web (PHP/MySQL...) ou Java, au choix</li>
				<li>réalisation d'un prototype au moins partiellement fonctionnel</li>
			</ul>				
		</p>
		
		<h2>Le projet</h2>
		<p class="text-justify">
			Le projet consiste à développer une application permettant à plusieurs utilisateurs de jouer de manière collaborative à un jeu multi-joueurs à tour, avec un serveur qui centralise l'information et utilise une base de données.
			2 phases vont être suivies pour mettre en place ce projet :
			<ul>
				<li>la planification des parties : 
					<ul>
						<li>un administrateur du site crée des salles de jeu virtuelles, à certains créneaux horaires et pour un nombre limité de joueurs ;</li>
						<li>les joueurs qui se connectent au serveur peuvent s'inscrire à l'une des parties ouvertes et pour laquelle il reste de la place.</li>
					</ul>
				 </li>
				<li>le déroulement des parties :
				 lorsque le créneau prévu pour une partie arrive et que l'ensemble des joueurs prévus se sont connectés, la partie peut démarrer et se déroule ensuite à tour de rôle. Le serveur conserve un historique des résultats des joueurs.</li>
			</ul>
		</p>
		
		<br/>
		<p class="text-justify">
			Afin de mener à bien le projet, ce site a été réalisé grâce à la participation de 	7 étudiants étudiants : BRECHENMACHER Grégoire | CLAUDET Adrien | CORDEAU Elyse | EDORH TOSSA Léon | HELIES Elsa | MASSARDIER Anaïs | NGO BUI HUNG Christelle 
		
			<center><img src="/APP4_miseEnSituation/images/logo_polytech.png"/></center>
		</p>
	</div>
<?php include("./include/footer.php"); ?>
