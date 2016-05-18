<!-- Page de modification du profil 
@GET : id_membre : id du membre a qui on modifie le profil -->
<?php include("./include/header.php"); 

if(!isset($_SESSION["id_user"]) || !isset($_GET["id_user"])){
		//ERREUR si non connecté 
		echo "<script>";
		echo "javascript:window.location.replace('erreur404.php?url='+document.URL);" ; 
		echo "</script>";
}?>

<!-- <body onload='initialiser()'>initialisation des images OK/NOK -->
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
		$b_profilModifiable = false;
		// booleens de modification
		$b_photoV = true;
		$b_nomV = true;
		$b_prenomV = true;
		$b_emailV = true;
		$b_villeV = true;
		$b_CPV = true;
		$b_mdp1V = true;
		$b_mdp2V = true;
		// images valider/annuler
		$s_V = "./images/valider.png";
		$s_A = "./images/annuler.png";

		
		// connexion à la base de données
		$db = new PDO("mysql:host=localhost;dbname=polyquest;charset=utf8",'root','');
		// récupération de l'ID User pour le profil
		$i_idMembre = $_GET["id_user"];
		
		// Récupérer les informations membre en base de données
		try
		{
			$s_select = "SELECT * ";
			$s_from = "FROM user ";
			$s_where = "WHERE id_user = ".$i_idMembre.";";
			
			$s_request = $s_select.$s_from.$s_where;
			
			$statement = $db->prepare($s_request);
			$statement->execute();
			$result = $statement->fetch();
		}
		catch (PDOException $ex)
		{
			echo ($s_erreurSQL);
		}
		
		// Voir si la personne a les droits de modification du profil 
		// on peut modifier son propre profil ou l'admin peut modifier le profil des utilisateur
		$b_profilModifiable = ( ($i_idMembre == $_SESSION["id_user"]) || ($_SESSION["admin"]) );
		if($b_profilModifiable)
		{
			 $s_isChampModifiable = "";
		}
		else
		{
			$s_isChampModifiable = " disabled = 'disabled' ";
		}
		// Affichage du profil
		// les champs sont modifiables uniquement si l'utilisateur a les droits (meme profil ou admin)
		?>
		<div class='row'>
			<?php //include("menu_profil.php"); ?>
			<div class='col-md-8'>
				<form method="post" action="profil_edit_process.php">
					<?php 
					//Si pas de photo -> photo par defaut 
					if ($result["photo"] == "")
						$result["photo"] = "./images/no_profile_picture.jpg";
					
					// On affiche l'image de profil
					echo("<img class='img-circle' alt='profil_picture' src='".$result["photo"]."'>"); echo("<br/>");
					
					//Si on est sur son propre profil on l'affiche sinon on donne le nom de la personne sur qui on est -->
					if($_GET["id_user"] == $_SESSION["id_user"]){ ?>
						<h1>Mon profil</h1>
					<?php
					}else
						echo "<h1>Profil de ".$result["pseudo"].".</h1>"; 
					
					//Champs de modification
					if($b_profilModifiable)
					{ ?>				
						<div class='row'>
							<div class='col-xs-4'>
								<label for='photolink'>Lien photo : </label>
								<input  class='input-sm form-control' id='photolink' type='text' name='photolink' value="<?php echo $result["photo"]?>">
							</div>
						</div>
					<?php } ?>
					
					<label for='mail'>Adresse e-mail : </label>
					<div class='row'>
						<div class='col-xs-4'>
							<input class='input-sm form-control' id='mail' onchange='mailOk()' type='email' name='email' value='<?php echo $result["mail_user"]."'".$s_isChampModifiable;?>'>
						</div>
						<div class='col-xs-1'>
							<?php if($b_profilModifiable) {?>
									<img id='val2' src="<?php echo $s_V; ?>" >
							<?php } ?>
						</div>
					</div>
					
					<label for='pseudo'>Pseudo : </label>
					<div class="row">
						<div class='col-xs-4'>
							<input class='input-sm form-control' id='pseudo' onchange='pseudoOk()' type='text' name='pseudo' value='<?php echo $result["pseudo"]."'".$s_isChampModifiable;?>'>
						</div>
						<div class='col-xs-1'>
							<?php if($b_profilModifiable) {?>
								<img id='val3' src="<?php echo $s_V; ?>" >
							<?php } ?>
						</div>
					</div>
				
					<div class='row'>
						<div class='col-xs-4'>
							<label for='xp'>XP : </label>
							<input class='input-sm form-control' id='xp' type='text' name='xp' value='<?php echo $result["xp"]; ?>' disabled = 'disabled' >
						</div>
					</div>
				
					<div class='row'>
						<div class='col-xs-4'>
							<label for='combats_joues'>Nombre de combats joués : </label>
							<input class='input-sm form-control' id='combats_joues' type='text' name='combats_joues' value='<?php echo $result["combats_joues"]; ?>' disabled = 'disabled' >
						</div>
					</div>
					
					<div class='row'>
						<div class='col-xs-4'>
							<label for='combats_gagnes'>Nombre de combats gagnés : </label>
							<input class='input-sm form-control' id='combats_gagnes' type='text' name='combats_gagnes' value='<?php echo $result["combats_gagnes"]; ?>' disabled = 'disabled' >
						</div>
					</div>
				
					<!-- données additionelles cachées pour la modification -->
					<p hidden>
						<input id='idMembre' type='text' name='idMembre' value="<?php echo $i_idMembre;?>">
					</p>
				
					<?php
					if($b_profilModifiable)
					{ ?>
						<label for='mdp1'>Mot de passe : </label>
						<div class='row'>
							<div class='col-xs-4'>
								<input class='input-sm form-control' id='mdp1' type='password' onchange='mdp1Ok()' name='mdp1' value=''>
							</div>
							<div class='col-xs-1'>
								<img id='val8' src="<?php echo $s_V; ?>" >
							</div>
						</div>
					
						<label for='mdp2'>Confirmation du mot de passe : </label>
						<div class='row'>
							<div class='col-xs-4'>
								<input class='input-sm form-control' id='mdp2' type='password' onchange='mdp2Ok()' name='mdp2' value=''>
							</div>
							<div class='col-xs-1'>
								<img id='val9' src="<?php echo $s_V; ?>" >
							</div>
						</div>
						
						<!-- Bonton modifier -->
						<br/>
						<label id="lblindic"></label>
						<br/>
				
						<input id='submit' class='btn btn-success btn-lg' type='submit' value='Modifier le profil'>
					<?php } ?>
				</form>
				
				<?php
					if($b_profilModifiable) //Si on est sur son profil ou qu'on est admin, on peut supprimer le compte
					{ ?>
						<br/>
						<form action='./include/deleteUser.php' method='post' enctype='multipart/form-data'>
							<input hidden name='mail' value='<?php echo $result["mail_user"];?>' />
							<input type='submit' class='btn btn-danger btn-lg right' value='Supprimer compte'/>
						<form>	
					<?php } ?>
			</div> <!-- ./col -->
	</div> <!-- row -->

<?php include ("./include/footer.php"); ?>