<?php
	include('include/header.php');
?>

<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.10.2.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

<link rel="stylesheet" href="./include/wickedpicker/stylesheets/wickedpicker.css">
<script type="text/javascript" src="./include/wickedpicker/src/wickedpicker.js"></script>


<p><a href="tournois_planifies.php"> Voir les tournois planifiés </a></p>

<form method="post" action="include/traitement_tournoi.php">
	<table>
		<tr>
			<label for="nb_salles">Nombre de salle : </label>
			<input type="number" min=0 max=10 step=1 name="nb_salles" id="nb_salles"/>
		</tr>
		<tr>
			<script>
				$(function() {
					$("#date_debut").datepicker();
					$("#date_fin").datepicker();
					$("#heure_debut").wickedpicker();
					$("#heure_fin").wickedpicker();
				});
			</script>
			<td><label for="date_debut">Date de début (jj/mm/aaaa) </label></td>
			<td><input type="text" name="date_debut" id="date_debut"></code></td>
			<td><label for="heure_debut">Heure de début (hh:mm) </label></td>
			<td><input type="text" name="heure_debut" id="heure_debut"></code></td>
		</tr>
		<tr>
			<td><label for="date_fin">Date de fin (jj/mm/aaaa)</label></td>
			<td><input type="text" name="date_fin" id="date_fin"></code></td>
			<td><label for="heure_fin">Heure de fin (hh:mm) </label></td>
			<td><input type="text" name="heure_fin" id="heure_fin"></code></td>
		</tr>
		<tr><td><label>Type du tournoi :</label></td></tr>
		<tr>
			<td> <input type="radio" name="type_tournoi" id="ami" value="2"> 
				 <label for="ami">Type amical</label> </td>
			<td> <input type="radio" name="type_tournoi" id="ama" value="3">
				 <label for="ama">Type amateur</label> </td>
			<td> <input type="radio" name="type_tournoi" id="pro" value="4">
				 <label for="pro">Type professionel</label> </td>
		</tr>
		<tr><td><label>Type de la salle :</label></td></tr>
		<tr>
			<td> <input type="radio" name="type_salle" id="1vs1" value="1vs1"> 
				 <label for="1vs1">1vs1</label> </td>
			<td> <input type="radio" name="type_salle" id="2vs2" value="2vs2">
				 <label for="2vs2">2vs2</label> </td>
		</tr>
	</table>

	<input type="submit" value="Envoyer"/>
	<input type="reset" value="Reset"/>
</form>

<?php
	include('include/footer.php');
?>