var SOCKET = {};

var DEBUG = true;

SOCKET.init = function() {
	SOCKET.canal = io.connect('http://82.239.215.158:8080');
	SOCKET.idJoueur;
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
	GAME.updateJoueurs(msg);
	$('#canvas_choose_container').addClass('nodisplay');
	$('#canvas_game_container').removeClass('nodisplay');
});

SOCKET.on('error', function(msg) {
	SOCKET.onDebugDisplay('error', msg);
	alert(msg.txt);
});

SOCKET.on('go', function(msg) {
	SOCKET.onDebugDisplay('go', msg);
	SOCKET.state = "go";
	$('#choose_action').removeClass('nodisplay');
});

SOCKET.on('update', function(msg) {
	SOCKET.onDebugDisplay('update', msg);
	SOCKET.state = "update";
	GAME.updateJoueurs(msg);
});

SOCKET.on('alert_mana', function(msg) {
	SOCKET.onDebugDisplay('alert_mana', msg);
	SOCKET.state = "alert_mana";
	alert(msg.txt);
});

SOCKET.on('wait', function(msg) {
	SOCKET.onDebugDisplay('wait', msg);
	SOCKET.state = "wait";
	$('#choose_action').addClass('nodisplay');
});

SOCKET.on('action', function(msg) {
	SOCKET.onDebugDisplay('action', msg);
	SOCKET.state = "action";
	//alert(msg.txt);
});

SOCKET.on('win', function(msg) {
	SOCKET.onDebugDisplay('win', msg);
	SOCKET.state = "win";
	alert("Vous avez gagné");
	$.redirect('resultat.php', 
		{'perso0': GAME.player[0].pseudo,
		 'perso1': GAME.player[1].pseudo,
		 'class0': GAME.player[0].pers,
		 'class1': GAME.player[1].pers,
		 'numWin': msg.numJ,
		 'numS'  : msg.numS
		}
	);
	// redirection POST vers resultat.php
});

SOCKET.on('loose', function(msg) {
	SOCKET.onDebugDisplay('loose', msg);
	SOCKET.state = "loose";
	alert("Vous avez perdu !");
	$.redirect('resultat.php',
		{'perso0': GAME.player[0].pseudo,
		 'perso1': GAME.player[1].pseudo,
		 'class0': GAME.player[0].pers,
		 'class1': GAME.player[1].pers,
		 'numWin': msg.numJ,
		 'numS'  : msg.numS
		}
	);
	// redirection POST vers resultat.php
});


/* BOUTONS ACTION */

$('.sort').click(function() {
	$('#choose_action').addClass('nodisplay');
	var id = this.attr('value');
	SOCKET.emit('sort', {numSort : id});
})
$('#passer').click(function() {
	$('#choose_action').addClass('nodisplay');
	SOCKET.emit('passer');
})
$('#abandonner').click(function() {
	$('#choose_action').addClass('nodisplay');
	SOCKET.emit('abandonner');
})

/* CHAT */

//socket.on('m')


SOCKET.on('message', function(msg) {
	SOCKET.onDebugDisplay(arguments[0], msg);
	var string = "<span class='msg'>"+msg + "<br/><span>";
//	$(string).appendTo( "#text" );
	document.getElementById('text').innerHTML = msg+"<br/>"+document.getElementById('text').innerHTML;
  	//document.getElementById( 'bottom' ).scrollIntoView();
})

$("#message").keyup(function(event){
	if(event.keyCode == 13) {
    	$("#send").click();
  }
});

$('#send').click(function () {
	SOCKET.emit('message', {pseudo: SOCKET.pseudo, message: document.getElementById("message").value} );
  	document.getElementById("message").value = "";
})


