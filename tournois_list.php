<?php include("./include/header.php"); ?>

<?php		
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
		
	// GET ALL room of type GET:type
	try
	{
		$s_select = "SELECT * ";
		$s_from = "FROM tournoi t, table_tournoi tt, salle s";
		$where = "WHERE t.id_tournoi=tt.id_tournoi AND tt.id_salle=s.id_salle;";
		$s_request = $s_select.$s_from.$where;

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
		<div class="content_body">
			<h1>Liste des tournois</h1>
			
			
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
							
							<form method="post" action="join_room.php">
								<div class="row">
									<p hidden>
										<input id='idTournoi' name='idTournoi' type="number" value="<?php echo $row["id_tournoi"];?>"/>
									</p>
									<?php 
									$debut = strtotime($row["heure_debut"]);
									$end = strtotime($row["heure_fin"]);
									$current = strtotime(now);
									if(!isset($_SESSION["login"]) || $debut>$current 
									|| $end<$current){
										echo "<input type='submit' class='button btn btn-warning' name='join' value='Rejoindre' disabled='disabled' />";
									}else{
										echo "<input type='submit' class='join btn btn-warning' name='join' value='Rejoindre' />";
									}?>
								</div>
							</form>
						</div>
						
						<div class='col-xs-2'>
							<label for='photolink'>Participants : </label>
							<ul class="fa-ul">
							<?php
								$s_select = "SELECT * ";
								$s_from = "FROM salle_user s, user u ";
								$s_where = "WHERE s.id_salle = '".$row['s.id_salle']."' AND s.id_user=u.id_user;";
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
							<label for='xpRquest'>Xp demandé : entre <?php echo $row["xp_min"];?> et <?php echo $row["xp_max"];?></label>
						</div>
						
					</div>
			<?php	}
			}?>
		
			<form class="content_body" method="post" action="create_room_form.php">

				<!-- données additionelles cachées pour la creation -->
				<p hidden>
					<input id='idMembre' type='text' name='idMembre' value="<?php echo $_SESSION["id_user"];?>"
					<input id='idtype' type='text' name='idtpe' value="<?php echo $type;?>">
				</p>
		
					
				<!-- Bonton creer salle -->
				<?php /* if(!isset($_SESSION["login"]))
					echo "<input id='submit' class='btn btn-success btn-lg' type='submit' disabled='disabled' value='Crée une salle'>";
				else
					echo "<input id='submit' class='btn btn-success btn-lg' type='submit' value='Crée une salle'>";*/
				?>
			</form>
		</div>
</div> <!-- row -->


<?php include("./include/footer.php"); ?>