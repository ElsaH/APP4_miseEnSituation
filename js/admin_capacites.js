(function($){

	//Paramètre du datatable client
	$(document).ready(function(){

		var mybutton;
		var myindex = 0;
		var table_index;
		var id_capacite;
		var tableau_capacite = [];

		var tableToolsOptions = {
		};

		var table_capacites = $('#table_capacites').DataTable({
			"language": {"url": "./plugins/datatables/french.json"},
			"bPaginate": true,
			"bLengthChange": true,
			"bFilter": true,
			"bSort": true,
			"bInfo": true,
			"bAutoWidth": true,
			"iDisplayLength": 5,
		    "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Tous"]],
			"ajax": {
				"url": "phplib/loadCapacites.php",
				"type": "post"
			},
			"sAjaxDataProp": "",
			"order": [[1, "asc"]],
			"columns": [
				{ "name": "id_capacite", "data": "id_capacite", "visible": false, "searchable": false },
				{ "name": "nom_capacite", "data": "nom_capacite" },
				{ "name": "montant_soins", "data": "montant_soins" },
				{ "name": "montant_degats", "data": "montant_degats" },
				{ "name": "cout_mana", "data": "cout_mana" },
				{ "name": "xp_requis", "data": "xp_requis" }
	        ],
	        "fnInitComplete": function(oSettings, json){
	        	$('#main_list_button').trigger('click');
	        	var tt = new $.fn.dataTable.TableTools( table_capacites, tableToolsOptions );
				$( tt.fnContainer() ).insertBefore('#table_capacites');
	        }
        });

        //Sélection
        table_capacites.on("click","tr", function(event){
		    table_capacites.$('.selected-row').removeClass('selected-row');
		  	$(event.target).parent().addClass('selected-row');
		  	id_capacite = table_capacites.cell('.selected-row',0).data();
		    $.ajax({
		        dataType:   'json',
		        type: 		'post',
		        data: 		{'id_capacite':id_capacite},
		        url:        'phplib/loadCapacites.php',
		        success:    function(data){
		                        if(data){
		                        	//clear_form();
	                        		$('#nom_capacite').val(data.nom_capacite);
	                        		$('#montant_soins').val(data.montant_soins);
	                        		$('#montant_degats').val(data.montant_degats);
	                        		$('#cout_mana').val(data.cout_mana);
	                        		$('#xp_requis').val(data.xp_requis);
	                        		
	                        		$('#create').addClass('disabled');
	                        		$('#update').removeClass('disabled');
	                        		$('#cancel').removeClass('disabled');
	                        		$('#delete').removeClass('disabled');
		                        }
		                    }
		    });
	    });

        //Validation du formulaire
	    $('#polyform').formValidation({
	        framework: 'bootstrap',
	       	locale: 'fr_FR',
	        icon: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
		    addOns: {
		        mandatoryIcon: {
		            icon: 'glyphicon glyphicon-asterisk'
		        }
		    },
	        fields: {
	            /*id_classe: { validators: { notEmpty: { message: 'Le choix de la classe est requis' } } },*/
	            nom_capacite: { validators: { notEmpty: { message: 'Le nom de la capacite est requis' } } }
	        }
	    }).on('success.form.fv', function(e) {
	    	//Le formulaire est validé. On peut faire l'opération souhaitée
            e.preventDefault();
			var $form 	= $(e.target);
            switch (mybutton) {
                case 'create':
                    $.ajax({
				        dataType:   'json',
				        type: 		'post',
				        data: 		$('#polyform').serialize(),
				        url:        'phplib/createClasse.php',
				        success:    function(data){
				                        if(data!='nok'){
			                        		table_capacites.ajax.reload(null,false);
								        	bootbox.dialog({message:'Classe créée avec succès.', title: '<span class="text-green">Création validée <i class="ion ion-checkmark-circled"></i></span>'});
								        	clear_form();
				                        }
				                    }
				    });
                    break;
                case 'update':
                    $.ajax({
				        dataType:   'json',
				        type: 		'post',
				        data: 		$('#polyform').serialize()+'&id_classe='+id_classe,
				        url:        'phplib/updateClasse.php',
				        success:    function(data){
				                        if(data!='nok'){
			                        		table_capacites.ajax.reload(null,false);
								        	bootbox.dialog({message:'Classe mise à jour avec succès.',title:'<span class="text-green">Mise à jour validée <i class="ion ion-checkmark-circled"></i></span>'});
								        	if($('#valide').prop('checked') || $('#non_valide').prop('checked')){
								        		clear_form();
								        	}
				                        }
				                    }
				    });
                    break;
				default:
                    break;
            }
        });

	    //Création
	    $(document).on('click','#create',function(e){
	    	mybutton = 'create';
	    	$('#polyform').submit();
	    });

	    //Mise à jour
	    $(document).on('click','#update',function(e){
	    	mybutton = 'update';
	    	$('#polyform').submit();
	    });

	    //Bouton cancel
	    $(document).on('click','#cancel',function(e){
	    	table_classes.$('.selected-row').removeClass('selected-row');
	    	clear_form();
	    });

	    //Bouton Supprimer
	    $(document).on('click','#delete',function(e){
	    	bootbox.confirm({
	    		title: 		'<span class="text-yellow"><i class="ion ion-trash-b"></i> Suppression Classe <i class="ion ion-help-circled"></i></span>',
	    		closeButton: true,
	    		animate: 	true,
	    		buttons: 	{
	    			'cancel': 	{
	    				label: 		"Non",
	    				className: "btn-success"
	    			},
	    			'confirm': {
	    				label: 		"Oui",
	    				className: "btn-danger",
	    			}
	    		},
	    		message: 	'Confirmez-vous la suppression de la classe '+$('#id_classe option:selected').text()+' ?',
	    		callback: 	function(answer){
	    			if(answer){
		    			$.ajax({
					        dataType:   'html',
					        type: 		'post',
					        data: 		{'id_classe':id_classe},
					        url:        'phplib/deleteClasse.php',
					        success:    function(data){
					        				if(data=='ok'){
					        					table_classes.ajax.reload(null,false);
	    										clear_form();
	    									}
					                    }
					    });
		    		}
				}
	    	});
	    });

		$('#polyform').on('change',function(e){
			$('#cancel').removeClass('disabled');
		});
	    
	    function clear_form(){
	    }
	});

	function findObject(source,field,id){
    	for (var i = 0; i < source.length; i++) {
    		if (source[i][field] === id) {
			      	return source[i];
			}
	  	}
	  	return false;
    }

    function findObjectIndex(source,field,id){
    	for (var i = 0; i < source.length; i++) {
    		if (source[i][field] === id) {
			      	return i;
			}
	  	}
	  	return false;
    }

})(jQuery);