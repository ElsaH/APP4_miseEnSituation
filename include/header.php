<?php 
	if(!isset($_SESSION)) 
    { 
        session_start(); 
    }  
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<!-- Le jeu de caractères de la page (encodage) -->
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		
		<!-- Pour le navigateur, l'historique et les moteurs de recherche -->
		<title>PolyQuest</title>
		
		<!-- Pour les moteurs de recherche -->
		<meta name="description" lang="fr" content="jeu de combat en ligne"/>
		<meta name="keywords" lang="fr" content="game, polytech, online"/>
		
		<!-- Liens vers le css et les scripts pour la selection des dates -->
		<link rel="stylesheet" type="text/css" href="./include/bootstrap/css/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" href="./include/bootstrap/css/custom.css">
		
		<!-- font -->
		<!--<link href='http://fonts.googleapis.com/css?family=Indie+Flower' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Marck+Script' rel='stylesheet' type='text/css'>-->
		
		<!-- Liens pour l'utilisation de JQuery -->
		<link rel="stylesheet" href="./include/jquery-ui-1.11.4/jquery-ui.css">
		<script type="text/javascript" src="./include/jquery-1.11.2.js" ></script>
		<script src="./include/jquery-ui-1.11.4/jquery-ui.js"></script>
		<script src="./include/bootstrap/js/bootstrap.min.js"></script>
		<script src="./js/modif_comptes.js"></script>
		<script src="./js/admin_classes.js"></script>

		<!-- trucs méchants
		<link rel='stylesheet' href='./include/fullcalendar/fullcalendar.css' />
		<script src='./include/fullcalendar/lib/jquery.min.js'></script>
		<script src='./include/fullcalendar/lib/moment.min.js'></script>
		<script src='./include/fullcalendar/fullcalendar.js'></script>
		<script src='./js/fullcalendar.js'></script>
		-->

		<!-- Liens, a nettoyer -->
	    <link href="plugins/datatables/dataTables.bootstrap.css" rel="stylesheet" type="text/css" />
	    <link href="plugins/datatables/TableTools/css/dataTables.tableTools.css" rel="stylesheet" type="text/css" />
	    <link href="plugins/formvalidation/dist/css/formvalidation.min.css" rel="stylesheet" type="text/css" />
	    <link href="plugins/datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css" />
	    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />

	    <script src="plugins/datatables/jquery.dataTables.min.js" type="text/javascript"></script>
	    <script src="plugins/datatables/dataTables.bootstrap.js" type="text/javascript"></script>
	    <script src="plugins/datatables/datetime-moment.js" type="text/javascript"></script>
	    <script src="plugins/datatables/TableTools/js/dataTables.tableTools.min.js" type="text/javascript"></script>
	    <script src="plugins/slimScroll/jquery.slimscroll.min.js" type="text/javascript"></script>
	    <script src="plugins/formvalidation/dist/formvalidation.min.js" type="text/javascript"></script>
	    <script src="plugins/formvalidation/dist/language/fr_FR.js" type="text/javascript" ></script>
	    <script src="plugins/formvalidation/dist/framework/bootstrap.min.js"></script>
	    <script src="plugins/mandatoryIcon/mandatoryIcon.min.js" type="text/javascript"></script>
	    <script src="plugins/bootbox/bootbox.min.js" type="text/javascript"></script>
	    <script src="plugins/moment/moment-with-locales.min.js" type="text/javascript"></script>
	    <script src="plugins/datetimepicker/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
	    <script src="plugins/bootstrap-fileupload/js/fileinput.min.js" type="text/javascript"></script>
	    <script src="plugins/bootstrap-fileupload/js/fileinput_locale_fr.js" type="text/javascript"></script>
	    <script src="plugins/bootstrap-notify/bootstrap-notify.min.js" type="text/javascript"></script>
		
	</head>
	<body>			
		<!-- En tête du site à inclure sur les autres pages -->
		<div class="header">
			<div class="row">
				<div class="col-lg-8"> <!-- logo du site avec lien vers l'accueil -->
					<a href="/APP4_miseEnSituation/index.php"><img class="logo_header" src="/APP4_miseEnSituation/images/logo_polyquest.png" alt="logo"/></a>
				</div>

				<div id="connexion_link" class="col-lg-2"> <!-- lien du compte -->
					<?php if (!isset($_SESSION['login'])): ?>
							<!-- si l'internaute n'est pas connecté, il peut se connecter ou s'inscrire -->
							<span><a href="./connexion.php">Se connecter</a> | <a href="./register.php">S'inscrire</a></span> 

					<?php else: ?>
							<!-- si le membre est connecté il peut voir son profil ou se deconnecter -->
							<span><a href="./profil_view_edit.php?id_user=<?= $_SESSION["id_user"]?>">Mon compte</a> | <a href="./logout.php">Se déconnecter</a></span> 
					<?php endif; ?>
				</div>
			</div> <!-- row -->		
			
			<div class="row">
				<div class="col-sm-2 col-md-offset-2"> <!-- lien salle 1v1 -->
					<a href="/APP4_miseEnSituation/room_list.php?type=1"><img class="logo_menu" src="/APP4_miseEnSituation/images/1v1.png" alt="1v1"/></a>
				</div>
				
				<div class="col-sm-2 "> <!-- lien salle 1v1 -->
					<a href="/APP4_miseEnSituation/room_list.php?type=2"><img class="logo_menu" src="/APP4_miseEnSituation/images/2v2.png" alt="2v2"/></a>
				</div>
				
				<div class="col-sm-2 "> <!-- lien salle 1v1 -->
					<a href="/APP4_miseEnSituation/room_list.php?type=3"><img class="logo_menu" src="/APP4_miseEnSituation/images/tournoi.png" alt="tournois"/></a>
				</div>
				
				<div class="col-sm-2 "> <!-- lien salle 1v1 -->
					<a href="/APP4_miseEnSituation/classement.php"><img class="logo_menu" src="/APP4_miseEnSituation/images/rank.png" alt="classement"/></a>
				</div>
			</div> <!-- row -->
			
		</div> <!-- header --> 

		<div class="body_general">