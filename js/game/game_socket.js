var SOCKET = {};

SOCKET.init = function() {
	SOCKET.canal = io.connect('http://82.239.215.158:8080');
	SOCKET.pseudo = document.getElementById("pseudo_player").value;
	SOCKET.emit('pseudo', SOCKET.pseudo);
}

SOCKET.emit = function(tag, msg) {
		SOCKET.canal.emit(tag, msg);
}

SOCKET.on = function(tag, callback) {
	SOCKET.canal.on(tag, callback);
}

SOCKET.on('start', function(msg) {
	SOCKET.state = "start";
	GAME.init(msg);
});

SOCKET.on('error', function(msg) {
	window.alert(msg.txt);
});

SOCKET.on('go', function(msg) {
	SOCKET.state = "go";
});

SOCKET.on('update', function(msg) {
	SOCKET.state = "update";
	// msg.J1
	// msg.J2
});

SOCKET.on('alert_mana', function(msg) {
	SOCKET.state = "alert_mana";
	window.alert(msg.txt);
});

SOCKET.on('wait', function(msg) {
	SOCKET.state = "wait";
});

SOCKET.on('action', function(msg) {
	SOCKET.state = "action";
	window.alert(msg.txt);
});

SOCKET.on('win', function(msg) {
	SOCKET.state = "win";
	// msg.J1
	// msg.J2
	// redirection POST vers resultat.php
});

SOCKET.on('loose', function(msg) {
	SOCKET.state = "loose";
	// msg.J1
	// msg.J2
	// redirection POST vers resultat.php
});