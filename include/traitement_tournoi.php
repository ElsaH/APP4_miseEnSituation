<?php
	include('include/header.php');
	include('connexionBD.php');
	$db = connexion();

	/* Récupération des variables */
	$nbSalles = isset($_POST['truc']) ? $_POST['nb_salles'] : NULL;
	$h_debut = (isset($_POST['date_debut']) && isset($_POST['heure_debut'])) ? $_POST['date_debut'] .' '. $_POST['heure_debut'].':00': NULL;
	$h_fin = (isset($_POST['date_fin']) && isset($_POST['heure_fin'])) ? $_POST['date_fin'] .' '. $_POST['heure_fin'].':00': NULL;	
	$tTournoi =  isset($_POST['type_tournoi']) ? $_POST['type_tournoi']: NULL;
	$tSalle =  isset($_POST['type_salle']) ? $_POST['type_salle']: NULL;

	if($nbSalles == NULL || $h_debut == NULL || $h_fin == NULL || $tTournoi == NULL || $tSalle == NULL ){
		echo "<script> alert('Vous n\'avez pas rempli tous les champs.') </script>"
		header("Refresh: 5;URL=../create_tournoi.php")
	}

	/* On créé le tournoi */
	$tmp = $db->prepare('INSERT INTO tournoi (heure_debut, heure_fin, pourcentage_bonus) VALUES (:heure_debut,:heure_fin,:pourcentage_bonus)');
	$tmp->execute(array(
		'heure_debut' => $h_debut,
		'heure_fin' => $h_fin,
		'pourcentage_bonus' => $tSalle
	));


	/* On créé les salles */
	for($i=0; $i<$nbSalles; $i++){
		$tmp = $db->prepare('INSERT INTO salle (nb_joueurs, id_type_salle, cree_par, cree_le) VALUES (0, :id_type_salle, "admin", getdate())');
		$tmp->execute(array(
			'id_type_salle' => $tSalle
		));
	}

	/* On remplit la table tournoi_salle */


	include('include/footer.php');
?>