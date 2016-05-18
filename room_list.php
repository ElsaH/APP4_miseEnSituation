<?php include("./include/header.php"); ?>

<?php
	if(!isset($_SESSION["login"]) || !isset($_GET["type"])){
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
	$i_idMembre = $_SESSION["id_user"];
	$type = $_GET["type"];
	
	// GET ALL room of type GET:type
	try
	{
		$s_select = "SELECT * ";
		$s_from = "FROM salle ";
		$s_where = "WHERE id_type_salle = ".$type.";";
		
		$s_request = $s_select.$s_from.$s_where;
		
		$statement = $db->prepare($s_request);
		$statement->execute();
		$result = $statement->fetch();
	
	}
	catch (PDOException $ex)
	{
		echo ($s_erreurSQL);
	}
?>
	<div class='row'>
		<div class='col-md-8'>
			<form method="post" action="create_room_form.php">
				<h1>Liste des salles de type <?php $_GET["type"]?></h1>
				
				
			
				<!-- données additionelles cachées pour la modification -->
				<p hidden>
					<input id='idMembre' type='text' name='idMembre' value="<?php echo $i_idMembre;?>"
					<input id='idtype' type='text' name='idtpe' value="<?php echo $type;?>">
				</p>
		
					
				<!-- Bonton creer salle -->
				<input id='submit' class='btn btn-success btn-lg' type='submit' value='Crée une salle'>
			</form>
		</div> <!-- ./col -->
</div> <!-- row -->


<?php include("./include/footer.php"); ?>