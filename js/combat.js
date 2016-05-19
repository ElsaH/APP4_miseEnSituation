var socket = io.connect('http://82.239.215.158:8080');

var sorts = [];

// Et on l'envoie avec le signal "petit_nouveau" (pour le différencier de "message")
//socket.emit('pseudo', pseudo);
socket.on('nouveau', function(message) {
     document.getElementById("text").innerHTML=document.getElementById("text").innerHTML + message + "<br/>";
})
// On affiche une boîte de dialogue quand le serveur nous envoie un "message"
socket.on('message', function(message) {
	//alert('Le serveur a un message pour vous : ' + message);
        document.getElementById("text").innerHTML = document.getElementById("text").innerHTML + message + "<br/>";
        document.getElementById( 'bottom' ).scrollIntoView();
})
socket.on('erreur', function(message) {
	document.getElementById("text").innerHTML = document.getElementById("text").innerHTML + '<span style="color:red;">ERREUR : ' + message + "</span><br/>";
	document.getElementById('bottom').scrollIntoView();
})
socket.on('enable', function(message) {
	document.getElementById("Sort").disabled = false;
	document.getElementById("Passer").disabled = false;
	document.getElementById("Abandonner").disabled = false;
})
socket.on('disable', function(message) {
	document.getElementById("Sort").disabled = true;
	document.getElementById("Passer").disabled = true;
	document.getElementById("Abandonner").disabled = true;
})

// Lorsqu'on clique sur le bouton, on envoie un "message" au serveur
$("#message").keyup(function(event){
	if(event.keyCode == 13){
        	$("#send").click();
        }
});
$('#send').click(function () {
	socket.emit('message', {pseudo: pseudo, message: document.getElementById("message").value} );
        document.getElementById("message").value = "";
})
$('#Sort').click(function() {
	socket.emit('attaquer',{numS : 2}); //document.getElementById...
})
$('#Passer').click(function() {
	socket.emit('passer');
})
$('#Abandonner').click(function() {
	socket.emit('abandonner');
})


socket.on('infos', function(joueur) {
	document.getElementById("pseudo1").innerHTML = joueur.j1.pseudo;
	document.getElementById("class1").innerHTML = joueur.j1.classe;
	document.getElementById("level1").innerHTML = joueur.j1.level;
	document.getElementById("mana1").innerHTML = joueur.j1.mana;
	document.getElementById("pv1").innerHTML = joueur.j1.pv;

	if (typeof joueur.j2 != 'undefined') {
		document.getElementById("pseudo2").innerHTML = joueur.j2.pseudo;
	        document.getElementById("class2").innerHTML = joueur.j2.classe;
        	document.getElementById("level2").innerHTML = joueur.j2.level;
	        document.getElementById("mana2").innerHTML = joueur.j2.mana;
        	document.getElementById("pv2").innerHTML = joueur.j2.pv;
	}


});
