<?php include("./include/header.php"); ?>

<?php
	if(!isset($_GET["type"])){
		//ERREUR si non connecté 
		echo "<script>";
		echo "javascript:window.location.replace('erreur404.php?url='+document.URL);" ; 
		echo "</script>";
	}
		
	// ===variables "globales"===
	$s_select;
	$s_from;
	$s_where;
	$s_request;
	$statement;
	$result;
	$s_erreurProfil = "Erreur : Profil invalide.";
	$s_erreurSQL = "Erreur : impossible d'effectuer la requete SQL.";
	
	// connexion à la base de données
	$db = new PDO("mysql:host=localhost;dbname=polyquest;charset=utf8",'root','');
	// récupération de l'ID User pour le profil
	$type = $_GET["type"];
	
	if($type==1)
		$type="1 vs 1";
	else if($type==2)
		$type="2 vs 2";
	else
		$type="tournoi";
		
	// GET ALL room of type GET:type
	try
	{
		$s_select = "SELECT * ";
		$s_from = "FROM salle s, type_salle t ";
		$s_where = "WHERE libelle_type_salle = '".$type."' AND s.id_type_salle=t.id_type_salle;";
		$s_request = $s_select.$s_from.$s_where;

		$statement = $db->prepare($s_request);
		$statement->execute();
		$result = $statement->fetchAll();
	
	}
	catch (PDOException $ex)
	{
		echo ($s_erreurSQL);
	}
?>
	<div class='row'>
		<form class="content_body" method="post" action="create_room_form.php">
			<h1>Liste des salles de type <?php echo $type?></h1>
			
			
			<?php if(is_array($result)){ 
				foreach($result as $row ) { ?>
					<div class="row room">
						<div class='col-xs-3'>
							<img class="door" alt='door' src='./images/door.png'>
						</div>
						
						<div class='col-xs-2'>
							<div class="row type_label">
								<?php echo $type?>
							</div>
							
							<div class="row">
								<?php if(!isset($_SESSION["login"]) || $_SESSION["xp"]<$row["xp_min"] || $_SESSION["xp"]>$row["xp_max"] || $_SESSION["id_user"] == $row["cree_par"]){
									echo "<button type='button' class='btn btn-warning' disabled='disabled'>Rejoindre</button>";
								}else{
									echo "<button type='button' class='btn btn-warning'>Rejoindre</button>"; 
								}?>
							</div>
						</div>
						
						<div class='col-xs-2'>
							<label for='photolink'>Participants : </label>
							<ul class="fa-ul">
							<?php
								$s_select = "SELECT * ";
								$s_from = "FROM salle_user s, user u ";
								$s_where = "WHERE s.id_salle = '".$row['id_salle']."' AND s.id_user=u.id_user;";
								$s_request = $s_select.$s_from.$s_where;

								$statement = $db->prepare($s_request);
								$statement->execute();
								$result_participants = $statement->fetchAll();
								
								if(is_array($result_participants)){ 
									foreach($result_participants as $row_particiapants ) { ?>
										<li><i class="fa-li fa fa-check-square"></i><?php echo $row_particiapants["pseudo"]; ?></li>
										
										
								<?php	}
								}
							?>
							</ul>

						</div>
						
						<div class='col-xs-4'>
							<label for='photolink'>Xp demandé : entre <?php echo $row["xp_min"];?> et <?php echo $row["xp_max"];?></label>
						</div>
						
					</div>
			<?php	}
			}?>
		
			<!-- données additionelles cachées pour la creation -->
			<p hidden>
				<input id='idMembre' type='text' name='idMembre' value="<?php echo $_SESSION["id_user"];?>"
				<input id='idtype' type='text' name='idtpe' value="<?php echo $type;?>">
			</p>
	
				
			<!-- Bonton creer salle -->
			<?php if(!isset($_SESSION["login"]))
				echo "<input id='submit' class='btn btn-success btn-lg' type='submit' disabled='disabled' value='Crée une salle'>";
			else
				echo "<input id='submit' class='btn btn-success btn-lg' type='submit' value='Crée une salle'>";
			?>
		</form>
</div> <!-- row -->


<?php include("./include/footer.php"); ?>