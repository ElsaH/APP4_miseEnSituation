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
		<h1>Gestion des classes</h1>
			<div>
		  		<table id="table_classes" class="table table-bordered table-hover">
	                <thead>
	                	<tr>
		                    <th>ID Classe</th>
		                    <th>Nom classe</th>
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
                  		<h3 class="box-title">Informations Classe</h3>
                	</div>
	                <div class="box-body">
                  	<form id="polyform" role="form" class="form_horizontal">
	                    <div class="row">
	                      	<div class="col-md-4">
	                        	<div class="form-group">
	                          		<label for="nom_classe" class="control-label">Nom classe</label>
	                          		<input class="form-control input-sm" id="nom_classe" name="nom_classe" />
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
    </div>
    <script src="./js/admin_classes.js"></script>

<?php
include("include/footer.php");
?>