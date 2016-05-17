<?php

include("include/header.php");
include("include/connexionBD.php");

if(!isset($_SESSION["admin"]) || !$_SESSION["admin"]) {
	header('HTTP/1.0 403 Not Found');
	echo "<h1>403 Access Denied/Forbidden</h1>";
	echo "Vous ne disposez pas des droits suffisants pour acceder a cette page";
	exit();
}

?>

<body>
	<div class='row'>
		<div class='col-md-8'>
		  <h1>Page d'administration</h1>
		  <div id='tableusers'>
				<table class="table table-striped">
					<thead> <!-- en tête de la table des utilisateur -->
					  <tr>
						<th>Pseudo</th>
						<th>Email</th>
						<th>Action</th>
					  </tr>
					 
					</thead>
					
					<tbody> <!-- contenu de la table -->
					<?php
						try{
							//===== On va chercher tous les utilisateurs =====
							$rqt_users = "SELECT * FROM user ORDER BY pseudo ";
							
							//==== connexion a la base de données ====
							$db = connexion();
							
							$stmt = $db->prepare($rqt_users);
							$stmt->execute();
							$result = $stmt->fetchAll();
							
							if(is_array($result)){	
								foreach($result as $row ) {	
									//==== Info de l'utilisateur
									$iduser = $row["id_user"];
									$idemail = $row["mail_user"];
									$idpseudo = $row["pseudo"];
									$admin = $row["admin"];
									if ($admin == 1){$activite = 'disabled="disabled"';}
									else $activite = "";
					?>
									<tr id=<?= $iduser ?> >
										<td> <?= $idpseudo ?> </td>
										<td> <?= $idemail ?> </td>
										
										<td> <!-- Les actions (supprimer, modifier ou contacter) -->
											<button class="btn btn-danger" type="button" <?= $activite ?> onclick='suppression("<?= $idemail?>","<?=$iduser?>")'> <span class="glyphicon glyphicon-remove"></span> </button>
											<button class="btn btn-primary" type="button" onclick="location.href='profil_view_edit.php?id_membre=<?= $iduser ?>';"> <span class="glyphicon glyphicon-pencil"></span> </button>
											<a href="mailto:<?= $idemail ?>" class="btn btn-info" type="button"><span class="glyphicon glyphicon-envelope"></span></a>
										</td>
									</tr>
									<?php
									}
									} 
							
						}catch (PDOException $ex){
							echo "Problème de connexion MySQL";
						}
					?>
					</tbody>
				</table>
			</div> <!-- ./tableUsers -->
		</div> <!-- ./col -->
	</div> <!-- ./row -->


<?php


include("include/footer.php");

?>