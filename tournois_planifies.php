
<?php
	include('include/header.php');
	include('include/connexionBD.php');

	$bd = connexion();
	$tmp = $bd->query('SELECT * FROM tournoi');
	
	$tPasse = "<table>"; 
	$tCours = "<table>"; 
	$tVenir = "<table>";

	while($line = $tmp->fetch()){

		if($line['heure_fin'] < date('Y-m-d H:i:s')){
			$tmp2 = $bd->prepare('SELECT * FROM user WHERE id_user=:id_gagnant');
			$tmp2->execute(array(
				'id_gagnant' => $line['user_vainqueur']
			));
			$winner = $tmp2->fetch();
			echo $line['id_tournoi'] . " " . $line['heure_debut'] ." ". $line['heure_fin'];
			$tPasse += "<tr><td> Le " .$line['id_tournoi']."eme tournoi a eu lieu du " .$line['heure_debut'] ." au ". $line['heure_fin'] .". Les utilisateurs ont eu un bonus de x". $line['bonus'] ." en gain. Le gagnant est ".$winner['pseudo']."</td></tr>";
		} else if($line['heure_debut'] > date('Y-m-d H:i:s')) {
			$tVenir += "<tr><td> Le " .$line['id_tournoi']."eme tournoi a lieu du " .$line['heure_debut'] ." au ". $line['heure_fin'] .". Les utilisateurs ont un bonus de x". $line['bonus'] ." en gain.</td></tr>";
			echo $line['id_tournoi'] . " " . $line['heure_debut'] ." ". $line['heure_fin'];
		} else {
			$tCours += "<tr><td> Le " .$line['id_tournoi']."eme tournoi aura lieu du " .$line['heure_debut'] ." au ". $line['heure_fin'] .". Les utilisateurs auront un bonus de x". $line['bonus'] ." en gain.</td></tr>";
			echo $line['id_tournoi'] . " " . $line['heure_debut'] ." ". $line['heure_fin'];			
		}

	}		
	
	$tPasse += "</table>"; 
	$tCours += "</table>"; 
	$tVenir += "</table>";

	echo "<h2>Tournoi passé</h2>";
	echo $tPasse;
	echo "<h2>Tournoi en cours</h2>";
	echo $tCours;
	echo "<h2>Tournoi à venir</h2>";
	echo $tVenir;
	
	include('include/footer.php');
?>