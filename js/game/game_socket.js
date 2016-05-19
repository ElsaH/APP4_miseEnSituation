var SOCKET = {};

var DEBUG = true;

SOCKET.init = function() {
	SOCKET.canal = io.connect('http://82.239.215.158:8080');
	console.log(SOCKET.canal);
};

SOCKET.init();

SOCKET.emit = function(tag, msg) {
	if (DEBUG)
		console.log("[emit] ", tag, msg);
	SOCKET.canal.emit(tag, msg);
}

SOCKET.on = function(tag, callback) {
	SOCKET.canal.on(tag, callback);
}

SOCKET.onDebugDisplay = function(tag, msg) {
	if (DEBUG)
		console.log("[on] ", tag, msg);
}

SOCKET.on('start', function(msg) {
	SOCKET.onDebugDisplay('start', msg);
	// class -1
	SOCKET.state = "start";
	var j1 = {
		pseudo: "joueur1",
		classe: 0,
		level: 12,
		mana: 50,
		pv: 60
	};
	var j2 = {
		pseudo: "joueur2",
		classe: 1,
		level: 10,
		mana: 40,
		pv: 50
	};
	var msg = msg || {j1:j1, j2:j2};
	GAME.updateJoueurs(msg);
	$('#canvas_choose_container').addClass('nodisplay');
	$('#canvas_game_container').removeClass('nodisplay');
});

SOCKET.on('error', function(msg) {
	SOCKET.onDebugDisplay(arguments[0], msg);
	window.alert(msg.txt);
});

SOCKET.on('go', function(msg) {
	SOCKET.onDebugDisplay(arguments[0], msg);
	SOCKET.state = "go";
});

SOCKET.on('update', function(msg) {
	SOCKET.onDebugDisplay(arguments[0], msg);
	SOCKET.state = "update";
	GAME.updateJoueurs(msg);
});

SOCKET.on('alert_mana', function(msg) {
	SOCKET.onDebugDisplay(arguments[0], msg);
	SOCKET.state = "alert_mana";
	window.alert(msg.txt);
});

SOCKET.on('wait', function(msg) {
	SOCKET.onDebugDisplay(arguments[0], msg);
	SOCKET.state = "wait";
});

SOCKET.on('action', function(msg) {
	SOCKET.onDebugDisplay(arguments[0], msg);
	SOCKET.state = "action";
	window.alert(msg.txt);
});

SOCKET.on('win', function(msg) {
	SOCKET.onDebugDisplay(arguments[0], msg);
	SOCKET.state = "win";
	GAME.updateJoueurs(msg);
	// redirection POST vers resultat.php
});

SOCKET.on('loose', function(msg) {
	SOCKET.onDebugDisplay(arguments[0], msg);
	SOCKET.state = "loose";
	GAME.updateJoueurs(msg);
	// redirection POST vers resultat.php
});


/* BOUTONS ACTION */

$('.sort').click(function() {
	var id = this.attr('value');
	SOCKET.emit('sort', {numSort : id});
})
$('#passer').click(function() {
	SOCKET.emit('passer');
})
$('#abandonner').click(function() {
	SOCKET.emit('abandonner');
})

/* CHAT */

//socket.on('m')

SOCKET.on('message', function(msg) {
	SOCKET.onDebugDisplay(arguments[0], msg);
	var string = "<span class='msg'>"+msg + "<br/><span>";
	$(string).appendTo( "#text" );
  //document.getElementById( 'bottom' ).scrollIntoView();
})

$("#message").keyup(function(event){
	if(event.keyCode == 13){
    $("#send").click();
  }
});

$('#send').click(function () {
	SOCKET.emit('message', {pseudo: pseudo, message: document.getElementById("message").value} );
  document.getElementById("message").value = "";
})


