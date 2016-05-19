<?php
	
	include('connexionBD.php');
	$db = connexion();

	/* Récupération des variables */
	$nbSalles 	=  isset($_POST['nb_salles'])    ? $_POST['nb_salles']     : NULL;
	$tTournoi 	=  isset($_POST['type_tournoi']) ? $_POST['type_tournoi']: NULL;
	$tSalle 	=  isset($_POST['type_salle'])   ? $_POST['type_salle']    : NULL;
	$h_debut 	= (isset($_POST['date_debut']) && isset($_POST['heure_debut'])) ? str_replace('/','-',$_POST['date_debut']) .' '. str_replace(' ','',$_POST['heure_debut']).':00': NULL;
	$h_fin 		= (isset($_POST['date_fin'])   && isset($_POST['heure_fin']  )) ? str_replace('/','-',$_POST['date_fin'])   .' '. str_replace(' ','',$_POST['heure_fin'])  .':00': NULL;	

	/* On récupère l'id de la salle */
	$tmp = $db->query('SELECT id_tournoi FROM tournoi ORDER BY id_tournoi DESC');
	$id_tournoi = $tmp->fetch();
	$id_tournoi = $id_tournoi['id_tournoi'] + 1;

	/* On créé le tournoi */
	$tmp = $db->prepare('INSERT INTO tournoi (id_tournoi, heure_debut, heure_fin, bonus) VALUES (:id_tournoi,:heure_debut,:heure_fin,:tTournoi)');
	$tmp->execute(array(
		'id_tournoi' => $id_tournoi,
		'heure_debut' => $h_debut,
		'heure_fin' => $h_fin,
		'tTournoi' => $tSalle
	));

	for($i=0; $i<$nbSalles; $i++){
		$date = getdate();

		/* On créé les salles */
		$tmp = $db->query('SELECT id_salle FROM salle ORDER BY id_salle DESC');
		$id_salle = $tmp->fetch();
		$id_salle = $id_salle['id_salle'] +1;

		$tmp = $db->prepare('INSERT INTO salle (id_salle, nb_joueurs, id_type_salle, xp_min, xp_max, cree_par, cree_le) VALUES (:id_salle, 0, :id_type_salle, 0, 100,"admin", NOW())');
		$tmp->execute(array(
			'id_salle' => $id_salle,
			'id_type_salle' => $tSalle
		));

		/* On remplit la table table_tournoi */
		$tmp = $db->prepare('INSERT INTO table_tournoi (id_salle, id_tournoi) VALUES (:id_salle,:id_tournoi)');
		$tmp->execute(array(
			'id_salle' => $id_salle,
			'id_tournoi' => $id_tournoi
		));
	}

	header('Location: ../creation_tournoi.php');
?>