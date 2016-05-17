<!-- Page php qui enregistre la modification d'un profile (on previent à la fin le membre pour lui dire si tout est Ok ou s'il y a une erreur -->
<?php include ("./include/header.php"); ?>
<!-- Popup qui donne les informations à la fin du traitement -->
<script type="text/javascript">
    $(window).load(function(){
        $('#modal-edit_profil').modal('show');
    });
</script>


<!-- Le popup -->
<div class="modal fade" id="modal-edit_profil" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header"> <!-- On rappel l'identité du membre qui a été modifié -->
				<h1>Modification du profil de <?php echo $_POST["pseudo"];?>.</h1>
			</div> <!--/.modal-header-->
			<div class="modal-body">
				<?php
					
					// ===variables====
					$b_modificationValide = true;
					
					// ====connexion base de données====
					$db = new PDO("mysql:host=localhost;dbname=polyquest;charset=utf8",'root','');
					
					// ====récupération et traitement des infos=====
					$s_photo = '"'.$_POST["photolink"].'"';
					$i_idMembre = $_POST["idMembre"];
					$s_pseudo = '"'.$_POST["pseudo"].'"';
					$s_email = '"'.$_POST["email"].'"';
					$s_mdp = '"'.$_POST["mdp1"].'"';
					
					// *******REQUETTES DE VERIFICATIONS************
					
					// adresse mail unique
					$s_select = " SELECT * ";
					$s_from = "FROM user ";
					$s_where = "WHERE UPPER(email) = ".strtoupper($s_email).";";

					$s_request = $s_select.$s_from.$s_where;
					$statement = $db->prepare($s_request);
					$statement->execute();
					$result = $statement->fetch();
					// si personne n'a la même adresse ou si l'adresse appartient dejà au meme membre
					$b_modificationValide = ($result["id_user"]==$i_idMembre) || ($result["id_user"]=="");
					// message d'erreur mail déjà pris
					if(!$b_modificationValide)
					{
						echo("L'adresse mail ".$s_email." est déjà utilisée.<br/>");
					}
					
					// pas d'autres vérif serveur ??
					
					// *******REQUETTES DE MODIFICATION************
					if($b_modificationValide)
					{
						try
						{
							//========update de membre======
							$s_update = "UPDATE user";
							$s_set = " SET";
							$s_set = $s_set." photo = ".$s_photo." ,";
							$s_set = $s_set." pseudo = ".$s_pseudo." ,";
							$s_set = $s_set." mail_user = ".$s_email." ,";
							$s_set = $s_set." password = ".$s_mdp;
							$s_where = " WHERE id_user = ".$i_idMembre." ;";
							
							$s_request = $s_update.$s_set.$s_where;
							$statement = $db->prepare($s_request);
							$statement->execute();
														
						}
						catch (PDOException $ex)
						{
							echo ($s_erreurSQL);
						}
						// proposer un retour au profil (recharger la page)
						if($b_modificationValide)
						{
							echo("Le profil a bien été modifié.<br/>");
						}
					}
				//header('Location:profil_view_edit.php?id_membre='.$i_idMembre);  

				?>
			</div><!--/.modal-body-->
						
			<div class="modal-footer">
				<form method="link" action="javascript:history.go(-1)"> <!-- Lien de retour au profil -->
					<input type="submit" value="Retour au profil" class="btn btn-primary">
				</form>
			</div> <!--/.modal-footer-->
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<?php include("./include/footer.php");
