<?php include("./include/header.php");
include('include/connexionBD.php');
 ?>
<script type="text/javascript">
    $(window).load(function(){
        $('#modal-create_room').modal('show');
    });
</script>

<?php
	// get all room type
	try
	{
		//$db = new PDO("mysql:host=localhost;dbname=polyquest;charset=utf8",'root','');
		$db = connexion();
		
		$s_select = "SELECT * ";
		$s_from = "FROM type_salle ";
		$s_where = ";";
		
		$s_request = $s_select.$s_from.$s_where;
		
		$statement = $db->prepare($s_request);
		$statement->execute();
		$result_type_room = $statement->fetchAll();
	
		$s_select = "SELECT * ";
		$s_from = "FROM user ";
		$s_where = "WHERE id_user=".$_SESSION["id_user"].";";
		
		$s_request = $s_select.$s_from.$s_where;
		
		$statement = $db->prepare($s_request);
		$statement->execute();
		$result_user = $statement->fetch();
		
	}
	catch (PDOException $ex)
	{
		echo ($s_erreurSQL);
	}
	
	

?>
				
<!-- Le popup -->
<div class="modal fade" id="modal-create_room" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header"> <!-- On rappel l'identité du membre qui a été modifié -->
				<h1>Création d'une salle</h1>
			</div> <!--/.modal-header-->
				<div class="modal-body">
					<form method="post" action="room_creation_process.php">
						<div class='row'>
							<div class='col-xs-4'>
								<label for='radio'>Type de salle : </label>
								<!-- choix du type de salle (1v1, 2v2) -->
								<?php if(is_array($result_type_room)){ 
									foreach($result_type_room as $row ) {	//Liste des type ?>
											<div class="radio">
												<?php if($row['libelle_type_salle']=="1 vs 1")
													echo "<label><input type='radio' name='type' checked='checked' value='".$row["libelle_type_salle"]."''>".$row["libelle_type_salle"]."</label>";
												else
													echo "<label><input type='radio' name='type' value='".$row["libelle_type_salle"]."''>".$row["libelle_type_salle"]."</label>";
												?>
											</div>
								<?php	} 
								} ?>
							</div> <!-- col -->
						</div> <!-- row -->
						
						
						<div class='row'>
							<div class='col-xs-4'>
								<i>Vous avez <?php echo $result_user["xp"];?> xp</i>						
							</div> <!-- col -->
						</div> <!-- row -->
						
						<div class='row'>
							<div class='col-xs-5'>
								<?php if($result_user["xp"]-10<=0)
											$conseilMin = 0;
										  else 
											$conseilMin = $result_user["xp"]-10; 
									$conseilMax = $result_user["xp"]+10;
								?>
								<i>Niveau de la salle conseillé : de  <?php echo $conseilMin; ?> à <?php echo $conseilMax; ?></i>
									
							</div> <!-- col -->
						</div> <!-- row -->
						
						<br/>
						<label for='xpMin'>Xp minimum de la salle : </label>
						<div class='row'>
							<div class='col-xs-6'>
								<div class='col-xs-3'>
									<input class='input-sm form-control' id='xpMin' onchange='xpMinOk(<?php echo $result_user["xp"];?>)' type='text' name='xpMin' value='<?php echo $conseilMin;?>'>
								</div>
							</div> <!-- col -->
						</div> <!-- row -->
						
						<label for='xpMax'>Xp maximum de la salle : </label>
						<div class='row'>
							<div class='col-xs-6'>
								<div class='col-xs-3'>
									<input class='input-sm form-control' id='xpMax' onchange='xpMaxOk()' type='text' name='xpMax' value='<?php echo $conseilMax;?>'>
								</div>
							</div> <!-- col -->
						</div> <!-- row -->
						
						<br/>
						<input id='submitCreateRoom' class='btn btn-success btn-lg' type='submit' value='Créer la salle'>
					</form>		
				</div><!--/.modal-body-->
				
			<div class="modal-footer">
				
				<form method="link" action="javascript:history.go(-1)"> <!-- Lien de retour au profil -->
					<input type="submit" value="Retour à la liste des salles" class="btn btn-primary">
				</form>
			</div> <!--/.modal-footer-->
			
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<?php include("./include/footer.php"); ?>