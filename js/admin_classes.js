(function($){

	//Paramètre du datatable client
	$(document).ready(function(){

		var mybutton;
		var myindex = 0;
		var table_index;
		var id_classe;
		var tableau_classe = [];

		//$('#histo_absence').slideUp(300);

		
		/* GESTION DES DATETIMEPICKERS ! UTILE POUR LES TOURNOIS */
		/*$('#date_debut, #date_fin').datetimepicker({
			keepOpen: true,
			locale: 'fr',
			format: 'DD/MM/YYYY HH:mm',
			showClear: true,
			showTodayButton: true,
			sideBySide: true,
			stepping: 15,
			calendarWeeks: true,
			useCurrent: false
		});*/

		var tableToolsOptions = {
			/*"sSwfPath": "./plugins/datatables/TableTools/swf/copy_csv_xls_pdf.swf",
            "aButtons": [
	            	{
	            		"sExtends": "copy",
	            		"sButtonText": "Copier"
	            	},
	            	{
	            		"sExtends": "csv",
	            		"sButtonText": "CSV"
	            	},
	            	{
	            		"sExtends": "xls",
	            		"sButtonText": "Excel"
	            	},
	            	{
	            		"sExtends": "pdf",
	            		"sButtonText": "PDF"
	            	},
	            	{
	            		"sExtends": "print",
	            		"sButtonText": "Imprimer"
	            	}
	            ]*/
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

        /*var table_capacites = $('#table_capacites').DataTable({
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
				"type": "post",
				"data": function(d){
					d.id_classe = id_classe;
				}
			},
			"sAjaxDataProp": "",
			"order": [[1, "asc"]],
			"columns": [
				{ "name": "id_capacite", "data": "id_champion", "visible": false, "searchable": false },
				{ "name": "nom_capacite", "data": "nom_capacite" },
				{ "name": "montant_soins", "data": "montant_soins" },
				{ "name": "montant_degats", "data": "montant_degats" },
				{ "name": "cout_mana", "data": "cout_mana" },
				{ "name": "xp_requis", "data": "xp_requis" },
	        ],
	        "fnInitComplete": function(oSettings, json){
	        	$('#main_list_button').trigger('click');
	        	var tt = new $.fn.dataTable.TableTools( table_capacites, tableToolsOptions );
				$( tt.fnContainer() ).insertBefore('#table_capacites');
	        }
        });*/

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
	                        		$('#nom_classe').val(data['classe'].classe);
	                        		/*$.each(data['capacites'],function(index,value){
		                        		row='<tr>';
		                        		row+='<td>'+data['capacites'][index].nom_capacite+'</td>';
		                        		row+='<td>'+data['capacites'][index].montant_degats+'</td>';
		                        		row+='<td>'+data['capacites'][index].montant_soins+'</td>';
		                        		row+='<td>'+data['capacites'][index].cout_mana+'</td>';
		                        		row+='<td>'+data['capacites'][index].xp_requis+'</td>';
		                        		row+='</tr>';
										$('#table_capacites tr:last').after(row);
		                        	});*/
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
											"url": "phplib/loadClasses.php",
											"type": "post",
											"data": function(d){
												d.id_classe = id_classe;
											}
										},
										"sAjaxDataProp": "",
										"order": [[1, "asc"]],
										"columns": [
											{ "name": "id_capacite", "data": "id_champion", "visible": false, "searchable": false },
											{ "name": "nom_capacite", "data": "nom_capacite" },
											{ "name": "montant_soins", "data": "montant_soins" },
											{ "name": "montant_degats", "data": "montant_degats" },
											{ "name": "cout_mana", "data": "cout_mana" },
											{ "name": "xp_requis", "data": "xp_requis" },
								        ],
								        "fnInitComplete": function(oSettings, json){
								        	$('#main_list_button').trigger('click');
								        	var tt = new $.fn.dataTable.TableTools( table_capacites, tableToolsOptions );
											$( tt.fnContainer() ).insertBefore('#table_capacites');
								        }
							        });
	                        		$('#create').addClass('disabled');
	                        		$('#update').removeClass('disabled');
	                        		$('#cancel').removeClass('disabled');
	                        		$('#delete').removeClass('disabled');
		                        }
		                    }
		    });
	    });

		/*$('#table_capacites tr').click(function() {
	        var val = $(this).
	        if(href) {
	            window.location = href;
	        }
	    });*/

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
	            id_classe: { validators: { notEmpty: { message: 'Le choix de la classe est requis' } } },
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

		//Chargement des salariés
		/*$.ajax({
	        dataType:   'json',
	        url:        'phplib/loadSalaries.php',
	        success:    function(data){
	                        $('#id_salarie').append($('<option />'));
	                        $.each(data, function(index,object){
						    	$('#id_salarie').append($('<option />').val(data[index].id_salarie).text(data[index].nom));
						    });
						    //Vérification du paramètre id_salarie passé en paramètre à la page
							if($('#get_id_salarie').val()){
								$('#id_salarie').val($('#get_id_salarie').val()).trigger('change');
							}
	                    }
	    });*/

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
	    	/*$('#id_salarie').val('').removeAttr('readonly');
	    	$('#id_type_absence').val('');
	    	$('#date_debut').val('');
	    	$('#date_fin').val('');
	    	$('#commentaire').val('');
	    	$('#ksform').data('formValidation').resetForm();
	    	$('#create').removeClass('disabled');
			$('#update').addClass('disabled');
			$('#cancel').addClass('disabled');
			$('#delete').addClass('disabled');
			$('#histo_absence').slideUp(300);
	    	$('#doc_box').slideUp(300);
	    	$('#myfile').fileinput('clear');
	    	$('#myfile').fileinput('disable');
			$('#date_remise').val('');
			$('#commentaire_doc').val('');
			id_document = null;
        	$('#validate_doc').addClass('disabled');
			$('#delete_doc').addClass('disabled');*/
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