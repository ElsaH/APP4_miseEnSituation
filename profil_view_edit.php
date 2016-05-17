<!-- Page de modification du profil 
$_SESSION[id_user] : id du membre a qui on modifie le profil -->
<?php include("./include/header.php"); 

if(!isset($_SESSION["id_membre"]) || !isset($_GET["id_membre"])){
		//ERREUR si non connecté ou s'il manque un parametre 
		echo "<script>";
		echo "javascript:window.location.replace('erreur404.php?url='+document.URL);" ; 
		echo "</script>";
}?>

<body onload='initialiser()'><!-- initialisation des images OK/NOK -->
	<?php include("menu.php");
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
		$s_V = "./ressources/images/valider.png";
		$s_A = "./ressources/images/annuler.png";

		
		// connexion à la base de données
		$db = new PDO("mysql:host=localhost;dbname=deener;charset=utf8",'root','');
		// récupération de l'ID USer pour le profil
		$i_idMembre = $_GET["id_membre"];
		
		// Récupérer les informations membre en base de données
		try
		{
			$s_select = "SELECT * ";
			$s_from = "FROM Membre M, Ville V ";
			//$s_where = "WHERE id_membre = ".$_SESSION["id_membre"];
			$s_where = "WHERE id_membre = ".$i_idMembre." AND M.id_ville = V.id_Ville;";
			$s_request = $s_select.$s_from.$s_where;
			$statement = $db->prepare($s_request);
			$statement->execute();
			$result = $statement->fetch();
		}
		catch (PDOException $ex)
		{
			echo ($s_erreurSQL);
		}
		
		// calcul de la moyenne du membre
		try
		{
			$s_select = "SELECT SUM(note)/count(note) as moyenne ";
			$s_from = "FROM participant p, diner d ";
			$s_where = "WHERE d.id_diner=p.id_diner and note is not NULL and d.id_membre=".$i_idMembre;
			$s_request = $s_select.$s_from.$s_where;
			$statement = $db->prepare($s_request);
			$statement->execute();
			$res = $statement->fetch();
		}
		catch (PDOException $ex)
		{
			echo ($s_erreurSQL);
		}
		
		// Voir si la personne a les droits de modification du profil
		$b_profilModifiable = ( ($i_idMembre == $_SESSION["id_membre"]) || ($_SESSION["admin"]) );
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
			<?php include("menu_profil.php"); ?>
			<div class='col-md-8'>
				<form method="post" action="profil_edit_process.php">
					<?php 
					//Si pas de photo -> photo par defaut 
					if ($result["photo"] == "")
						$result["photo"] = "./ressources/images/no_profile_picture.jpg";
					
					// On affiche l'image de profil
					echo("<img class='img-circle' alt='profil_picture' src='".$result["photo"]."'>"); echo("<br/>");
					
					//Si on est sur son propre profil on l'affiche sinon on donne le nom de la personne sur qui on est -->
					if($_GET["id_membre"] == $_SESSION["id_membre"]){ ?>
						<h1>Mon profil</h1>
					<?php
					}else
						echo "<h1>Profil de ".$result["prenom"]." ".strtoupper($result["nom"][0]).".</h1>"; 
					
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
							<input class='input-sm form-control' id='mail' onchange='mailOk()' type='email' name='email' value='<?php echo $result["email"]."'".$s_isChampModifiable;?>>
						</div>
						<div class='col-xs-1'>
							<?php if($b_profilModifiable) {?>
									<img id='val2' src="<?php echo $s_V; ?>" >
							<?php } ?>
						</div>
					</div>
						
					<label for='nom'>Nom : </label>
					<div class='row'>
						<div class='col-xs-4'>
							<input class='input-sm form-control' id='nom' onchange='nomOk()' type='text' name='nom' value='<?php echo $result["nom"]."'".$s_isChampModifiable;?>>
						</div>
						<div class='col-xs-1'>
							<?php if($b_profilModifiable) {?>
								<img id='val3' src="<?php echo $s_V; ?>" >
							<?php } ?>
						</div>
					</div>
					
					<label for='prenom'>Prénom : </label>
					<div class="row">
						<div class='col-xs-4'>
							<input class='input-sm form-control' id='prenom' onchange='preOk()' type='text' name='prenom' value='<?php echo $result["prenom"]."'".$s_isChampModifiable;?>>
						</div>
						<div class='col-xs-1'>
							<?php if($b_profilModifiable) {?>
								<img id='val4' src="<?php echo $s_V; ?>" >
							<?php } ?>
						</div>
					</div>
				
					<div class='row'>
						<div class='col-xs-4'>
							<label for='note'>Note : </label>
							<input class='input-sm form-control' id='note' type='text' name='note' value='<?php echo $res["moyenne"]; ?>' disabled = 'disabled' >
						</div>
					</div>
				
					<label for='ville'>Ville : </label>
					<div class='row'>
						<div class='col-xs-4'>
							<input class='input-sm form-control' id='ville' onchange='villeOk()' type='text' name='ville' value='<?php echo $result["libelle_ville"]."'".$s_isChampModifiable;?>>
						</div>
						<div class='col-xs-1'>
							<?php if($b_profilModifiable){ ?>
								<img id='val6' src="<?php echo $s_V; ?>">
							<?php } ?>
						</div>
					</div>
					
					<label for='CP'>Code Postal : </label>
					<div class="row">
						<div class='col-xs-4'>
							<input class='input-sm form-control' id='CP'  onchange='CPOk()' type='text' name='CP' value='<?php echo $result["codepostal"]."'".$s_isChampModifiable;?>>
						</div>
						<div class='col-xs-1'>
							<?php if($b_profilModifiable) {?>
								<img id='val7' src="<?php echo $s_V; ?>" >
							<?php } ?>				
						</div>
					</div>
				
					<!-- données additionelles cachées pour la modification -->
					<p hidden>
						<input id='idMembre' type='text' name='idMembre' value="<?php echo $i_idMembre;?>">
						<input id='idVille' type='text' name='idVille' value="<?php echo $result['id_ville'];?>">
					</p>
				
					<?php
					if($b_profilModifiable)
					{ ?>
						<label for='mdp1'>Mot de passe : </label>
						<div class='row'>
							<div class='col-xs-4'>
								<input class='input-sm form-control' id='mdp1' type='password' onchange='mdp1Ok()' name='mdp1' value='<?php echo $result['password'];?>'>
							</div>
							<div class='col-xs-1'>
								<img id='val8' src="<?php echo $s_V; ?>" >
							</div>
						</div>
					
						<label for='mdp2'>Mot de passe : </label>
						<div class='row'>
							<div class='col-xs-4'>
								<input class='input-sm form-control' id='mdp2' type='password' onchange='mdp2Ok()' name='mdp2' value='<?php echo $result['password'];?>'>
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
						<form action='deleteUser.php' method='post' enctype='multipart/form-data'>
							<input hidden name='mail' value='<?php echo $result["email"];?>' />
							<input type='submit' class='btn btn-danger btn-lg right' value='Supprimer compte'/>
						<form>	
					<?php } ?>
			</div> <!-- ./col -->
	</div> <!-- row -->

<?php include ("footer.php"); ?>