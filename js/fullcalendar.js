
$(document).ready(function() {
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	var events = [{
					title: 'Click for Google',
					start: new Date(y, m, 28),
					end: new Date(y, m, 29),
					url: 'http://google.com/'
				}];

	var calendar = $('#calendar').fullCalendar( {
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},

		defaultView: 'agendaWeek',
		selectable: true,
		selectHelper: true,

		select: function(start, end, allDay) {

			var title = prompt('Event Title:');

			if (title) {
				calendar.fullCalendar('renderEvent', {
						title: title,
						start: start,
						end: end,
						allDay: allDay
					},
					true 
				);
			}
			calendar.fullCalendar('unselect');
		},

		editable: true,
		events: events
	});
	
});