<?php
	include('include/header.php');
?>

<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.10.2.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

<link rel="stylesheet" href="./include/wickedpicker/stylesheets/wickedpicker.css">
<script type="text/javascript" src="./include/wickedpicker/src/wickedpicker.js"></script>

<div class='row'>
	<ul class="nav nav-tabs nav-justified">
	  <li class="active"><a data-toggle='tab' href="#creation">Créer un tournoi</a></li>
	  <li><a data-toggle='tab' href="#en_cours">Tournois en cours</a></li>
	  <li><a data-toggle='tab' href="#passes">Tournois passés</a></li>
	  <li><a data-toggle='tab' href="#prevus">Tournois prévus</a></li>
	</ul>
</div>

<div class='container content_body'>
	<div class='tab-content'>
		<div id='creation' class='tab-pane fade in active'>
			<form method="post" action="include/traitement_tournoi.php">
				<h1> Création de tournoi</h1>
				<h3>Nombre de salles</h3>
				<div class='row'>
					<div class='col-md-4'>
						<label for="nb_salles">Nombre de salle (entre 1 et 10): </label>
						<input type="number" min=1 max=10 step=1 name="nb_salles" id="nb_salles"/>
					</div>
				</div>
				<h3>Dates du tournoi</h3>
				<div class='row'>
					<div class='col-md-4'>
						<label for="date_debut">Date de début (aaaa-mm-jj)</label>
						<input type="text" name="date_debut" id="date_debut"></input>
					</div>
					<div class='col-md-4'>
						<label for="heure_debut">Heure de début (hh:mm)</label>
						<input type="text" name="heure_debut" id="heure_debut"></input>
					</div>
				</div>
				<div class='row'>
					<div class='col-md-4'>
						<label for="date_fin">Date de fin (aaaa-mm-jj)</label>
						<input type="text" name="date_fin" id="date_fin"></input>
					</div>
					<div class='col-md-4'>
						<label for="heure_fin">Heure de fin (hh:mm)</label>
						<input type="text" name="heure_fin" id="heure_fin"></input>
					</div>
				</div>
				<h3>Type de tournoi</h3>
				<div class='row'>
					<div class='col-md-3'>
						<input type="radio" name="type_tournoi" id="ami" value="2">
						<label for="ami">Type amical</label>
					</div>
					<div class='col-md-3'>
						<input type="radio" name="type_tournoi" id="ama" value="3">
						<label for="ama">Type amateur</label> 
					</div>
				</div>
				<div class='row'>
					<div class='col-md-4'>
						<input type="radio" name="type_tournoi" id="pro" value="4">
						<label for="pro">Type professionnel</label>
					</div>
				</div>
				<h3>Type de salles</h3>
				<div class='row'>
					<div class='col-md-2'>
						<input type="radio" name="type_salle" id="1vs1" value="1vs1"> 
						<label for="1vs1">1vs1</label>
					</div>
					<div class='col-md-2'>
						<input type="radio" name="type_salle" id="2vs2" value="2vs2">
						<label for="2vs2">2vs2</label>
					</div>
				</div>
					
				<input type="submit" value="Envoyer"/>
				<input type="reset" value="Reset"/>
			</form>
		</div>

		<div id='en_cours' class='tab-pane fade'>

			<?php
				include('include/connexionBD.php');
				$bd = connexion();
				$tmp = $bd->query('SELECT * FROM tournoi');
				$tPasse = "";
				$tCours = "";
				$tVenir = "";
				while($line = $tmp->fetch()){
					if($line['heure_fin'] < date('Y-m-d H:i:s')){
						$tmp2 = $bd->prepare('SELECT * FROM user WHERE id_user=:id_gagnant');
						$tmp2->execute(array(
							'id_gagnant' => $line['user_vainqueur']
						));
						$winner = $tmp2->fetch();
						$tPasse = $tPasse . "Un tournoi a eu lieu du " .$line['heure_debut'] ." au ". $line['heure_fin'] .". Les utilisateurs ont eu un bonus de x". $line['bonus'] ." en gain. Le gagnant est ".$winner['pseudo']."<br>";
					} else if($line['heure_debut'] > date('Y-m-d H:i:s')) {
						$tVenir = $tVenir . "Un tournoi a lieu du " .$line['heure_debut'] ." au ". $line['heure_fin'] .". Les utilisateurs ont un bonus de x". $line['bonus'] ." en gain.<br>";
					} else {
						$tCours = $tCours . "Un tournoi aura lieu du " .$line['heure_debut'] ." au ". $line['heure_fin'] .". Les utilisateurs auront un bonus de x". $line['bonus'] ." en gain.<br>";
					}
				}	
			?>

			<h1>Tournois en cours</h1>
			<?php
				if($tCours != '')
					echo $tCours;
				else
					echo 'Aucun tournoi en cours.';
			?>
		</div>

		<div id='passes' class='tab-pane fade'>
			<h1>Tournois passés</h1>
			<?php
				if($tPasse != '')
					echo $tPasse;
				else
					echo 'Aucun tournoi passé.';
			?>
		</div>

		<div id='prevus' class='tab-pane fade'>
			<h1>Tournois prévus</h1>
			<?php
				if($tVenir!='')
					echo $tVenir;
				else
					echo 'Aucun tournoi prévu.';
			?>
		</div>
	</div>
</div>

<script>
	$(function() {
		 $.datepicker.regional['fr'] = {
			closeText: 'Fermer',
			prevText: '&#x3c;Préc',
	 		nextText: 'Suiv&#x3e;',
			currentText: 'Courant',
			monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin',
			'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
			monthNamesShort: ['Jan','Fév','Mar','Avr','Mai','Jun',
			'Jul','Aoû','Sep','Oct','Nov','Déc'],
			dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
			dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
			dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
			weekHeader: 'Sm',
			//dateFormat: 'dd/mm/yy',
			dateFormat: 'yy-mm-dd',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''};
	   	$.datepicker.setDefaults($.datepicker.regional['fr']);
		$("#date_debut").datepicker();
		$("#date_fin").datepicker();
		$("#heure_debut").wickedpicker({twentyFour:true});
		$("#heure_fin").wickedpicker({twentyFour:true});
	});

</script>
<?php
	include('include/footer.php');
?>