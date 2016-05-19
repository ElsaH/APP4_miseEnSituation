var SOCKET = {};

var DEBUG = true;

SOCKET.init = function() {
	SOCKET.canal = io.connect('http://82.239.215.158:8080');
	console.log(SOCKET.canal);
};

SOCKET.init();

SOCKET.emit = function(tag, msg) {
	if (DEBUG)
		console.log("emit : ", tag, msg);
	SOCKET.canal.emit(tag, msg);
}

SOCKET.on = function(tag, callback) {
	SOCKET.canal.on(tag, callback);
}

SOCKET.onDebugDisplay = function(tag, msg) {
	if (DEBUG)
		console.log("on : ", tag, msg);
}

SOCKET.on('start', function(msg) {
	onDebugDisplay(arguments[0], msg);
	SOCKET.state = "start";
	GAME.updateJoueurs(msg);
	$('#canvas_choose_container').addClass('nodisplay');
	$('#canvas_game_container').removeClass('nodisplay');
});

SOCKET.on('error', function(msg) {
	onDebugDisplay(arguments[0], msg);
	window.alert(msg.txt);
});

SOCKET.on('go', function(msg) {
	onDebugDisplay(arguments[0], msg);
	SOCKET.state = "go";
});

SOCKET.on('update', function(msg) {
	onDebugDisplay(arguments[0], msg);
	SOCKET.state = "update";
	GAME.updateJoueurs(msg);
});

SOCKET.on('alert_mana', function(msg) {
	onDebugDisplay(arguments[0], msg);
	SOCKET.state = "alert_mana";
	window.alert(msg.txt);
});

SOCKET.on('wait', function(msg) {
	onDebugDisplay(arguments[0], msg);
	SOCKET.state = "wait";
});

SOCKET.on('action', function(msg) {
	onDebugDisplay(arguments[0], msg);
	SOCKET.state = "action";
	window.alert(msg.txt);
});

SOCKET.on('win', function(msg) {
	onDebugDisplay(arguments[0], msg);
	SOCKET.state = "win";
	GAME.updateJoueurs(msg);
	// redirection POST vers resultat.php
});

SOCKET.on('loose', function(msg) {
	onDebugDisplay(arguments[0], msg);
	SOCKET.state = "loose";
	GAME.updateJoueurs(msg);
	// redirection POST vers resultat.php
});


/* BOUTONS ACTION */

$('.sort').click(function() {
	var id = this.attr('value');
	socket.emit('sort', {numSort : id});
})
$('#passer').click(function() {
	socket.emit('passer');
})
$('#abandonner').click(function() {
	socket.emit('abandonner');
})

/* CHAT */

socket.on('message', function(message) {
	//alert('Le serveur a un message pour vous : ' + message);
  document.getElementById("text").innerHTML = document.getElementById("text").innerHTML + message + "<br/>";
  document.getElementById( 'bottom' ).scrollIntoView();
})

$("#message").keyup(function(event){
	if(event.keyCode == 13){
        	$("#send").click();
        }
});

$('#send').click(function () {
	socket.emit('message', {pseudo: pseudo, message: document.getElementById("message").value} );
        document.getElementById("message").value = "";
})


