<?php

include("include/header.php");
//include("include/connexionBD.php");

/*if(!isset($_SESSION["admin"]) || !$_SESSION["admin"]) {
	header('HTTP/1.0 403 Not Found');
	echo "<h1>403 Access Denied/Forbidden</h1>";
	echo "Vous ne disposez pas des droits suffisants pour acceder a cette page";
	exit();
}*/

?>

<body>
	<div class='row'>
		<div class='col-md-12'>
		<h1>Gestion des capacités</h1>
			<div>
		  		<table id="table_capacites" class="table table-bordered table-hover">
	                <thead>
	                	<tr>
		                    <th>ID capacité</th>
		                    <th>Classe associée</th>
		                    <th>Nom capacité</th>
		                    <th>Montant soins</th>
		                    <th>Montant dégâts</th>
		                    <th>Coût en mana</th>
		                    <th>XP requis</th>
		                    <!--<th>Nombre de parties jouées</th>-->
	                	</tr>
	                </thead>
	            </table>
	        </div>
	    </div>
	    <div class="row">
            <div class="col-md-12">
              	<div class="box box-primary">
                	<div class="box-header">
                  		<h3 class="box-title">Informations Capacité</h3>
                	</div>
	                <div class="box-body">
                  	<form id="polyform" role="form" class="form_horizontal">
	                    <div class="row">
	                      	<div class="col-md-4">
	                        	<div class="form-group">
	                          		<label for="nom_capacite" class="control-label">Nom capacité</label>
	                          		<input class="form-control input-sm" id="nom_capacite" name="nom_capacite" />
	                        	</div>
	                      	</div>
	                      	<div class="col-md-4">
	                        	<div class="form-group">
	                          		<label for="id_classe" class="control-label">Classe associée</label>
	                          		<select class="form-control input-sm" id="id_classe" name="id_classe"></select>
	                        	</div>
	                      	</div>
	                      	<div class="col-md-4">
	                        	<div class="form-group">
	                          		<label for="montant_soins" class="control-label">Montant de soins</label>
	                          		<input class="form-control input-sm" id="montant_soins" name="montant_soins" />
	                        	</div>
	                      	</div>
	                  	</div>

	                  	<div class="row">
	                  		<div class="col-md-4">
	                        	<div class="form-group">
	                          		<label for="montant_degats" class="control-label">Montant de dégâts</label>
	                          		<input class="form-control input-sm" id="montant_degats" name="montant_degats" />
	                        	</div>
	                      	</div>
	                      	<div class="col-md-4">
	                        	<div class="form-group">
	                          		<label for="cout_mana" class="control-label">Coût en mana</label>
	                          		<input class="form-control input-sm" id="cout_mana" name="cout_mana" />
	                        	</div>
	                      	</div>
	                      	<div class="col-md-4">
	                        	<div class="form-group">
	                          		<label for="xp_requis" class="control-label">XP requis</label>
	                          		<input class="form-control input-sm" id="xp_requis" name="xp_requis" />
	                        	</div>
	                      	</div>
	                  	</div>
                    </div>
                    <div class="box-footer">
	                    <button id="create" type="button" class="btn btn-sm btn-primary">Créer</button>
	                    <button id="update" type="button" class="btn btn-sm btn-primary disabled">Mettre à jour</button>
	                    <button id="cancel" type="button" class="btn btn-sm btn-primary disabled">Annuler</button>
	                    <button id="delete" type="button" class="btn btn-sm btn-primary disabled">Supprimer</button>
                    </div>
                	</form>
	          	</div>
	        </div>
        </div>
    </div>
    <script src="./js/admin_capacites.js"></script>

<?php
include("include/footer.php");
?>