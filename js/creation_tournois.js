(function($){

	//Paramètre du datatable client
	$(document).ready(function(){

		$('#date_debut').datetimepicker({
			keepOpen: false,
			locale: 'fr',
			format: 'DD/MM/YYYY',
			calendarWeeks: true,
			useCurrent: false
		});

	});

})(jQuery);