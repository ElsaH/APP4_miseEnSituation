
<?php
	include('include/header.php');
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

	echo "<h2>Tournois passés</h2>";
	echo $tPasse;
	echo "<h2>Tournois en cours</h2>";
	echo $tCours;
	echo "<h2>Tournois à venir</h2>";
	echo $tVenir;
	
	include('include/footer.php');
?>