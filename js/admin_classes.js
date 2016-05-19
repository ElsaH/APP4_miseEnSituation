(function($){

	//Paramètre du datatable client
	$(document).ready(function(){

		var mybutton;
		var myindex = 0;
		var table_index;
		var id_classe;
		var tableau_classe = [];

		var tableToolsOptions = {
		};

		var table_classes = $('#table_classes').DataTable({
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
				"url": "phplib/loadClasses.php",
				"type": "post"
			},
			"sAjaxDataProp": "",
			"order": [[1, "asc"]],
			"columns": [
				{ "name": "id_classe", "data": "id_champion", "visible": false, "searchable": false },
				{ "name": "nom_classe", "data": "classe" }
	        ],
	        "fnInitComplete": function(oSettings, json){
	        	$('#main_list_button').trigger('click');
	        	var tt = new $.fn.dataTable.TableTools( table_classes, tableToolsOptions );
				$( tt.fnContainer() ).insertBefore('#table_classes');
	        }
        });

        //Sélection
        table_classes.on("click","tr", function(event){
		    table_classes.$('.selected-row').removeClass('selected-row');
		  	$(event.target).parent().addClass('selected-row');
		  	id_classe = table_classes.cell('.selected-row',0).data();
		    $.ajax({
		        dataType:   'json',
		        type: 		'post',
		        data: 		{'id_classe':id_classe},
		        url:        'phplib/loadClasses.php',
		        success:    function(data){
		                        if(data){
		                        	//clear_form();
	                        		$('#nom_classe').val(data.classe);
	                        		
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
	            nom_classe: { validators: { notEmpty: { message: 'Le nom de la classe est requis' } } }
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
			                        		table_classes.ajax.reload(null,false);
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
			                        		table_classes.ajax.reload(null,false);
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
					        				if(data!='nok'){
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
	    	$('#nom_classe').val('');
	    	$('#cancel').addClass('disabled');
	    	$('#create').removeClass('disabled');
	    	$('#update').addClass('disabled');
	    	$('#delete').addClass('disabled');
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