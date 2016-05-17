// ** FONCTIONS JS POUR VERIF VISUELLES ** //
// initialise tous les marqueurs à caché

// images de vérif
var imgV = "./ressources/images/valider.png";
var imgA = "./ressources/images/annuler.png";

//booleans de champs a verifier
var bmail,bnom,bpre,bmdp1,bmdp2,bville,bCP;
var modifOk = false;

// vérifie que toutes le variables sont correctes
function toutOk()
{
	// maj de la valeur
	modifOk = (bmail==true && bnom==true && bpre==true && bmdp1==true && bmdp2==true && bville==true && bCP==true);
	// activation ou non du bouton modifier
	if(modifOk)
	{
		// retirer l'info sur modification impossible
		 document.getElementById('lblindic').innerHTML = '';
		// activer la modif
		document.getElementById("submit").disabled=false;
	}
	else
	{
		// informer la raison de la désactivation de la modif
		document.getElementById('lblindic').innerHTML = 'Attention, vous devez remplir correctement tous les champs avant de pouvoir modifier votre profil.';
		// désactiver la modif
		document.getElementById("submit").disabled=true;
	}
}

function initialiser(){
	// initialiser les champs
	mailOk();
	mdp1Ok();
	nomOk();
	preOk();
	villeOk();
	CPOk();
}

// Affiche un marqueur selon si le mail est valide ou non
function mailOk() {
	var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
	if (reg.test(document.getElementById("mail").value)) {
			document.getElementById("val2").src=imgV;
		bmail = true;
	} else {
		document.getElementById("val2").src=imgA;
		bmail = false;
	}
	// maj etat bouton modifier
	toutOk();
}

// teste si le premier mot de passe est valide
function mdp1Ok() {
	var reg = new RegExp('^[a-zA-Z0-9?@\.;:!_-]{1,12}$', 'i');
	if (reg.test(document.getElementById("mdp1").value)) {
		document.getElementById("val8").src=imgV;
		bmdp1 = true;
	} else {
		document.getElementById("val8").src=imgA;
		bmdp1 = false;

	}
	// maj mdp2
	mdp2Ok();
	// maj etat bouton modifier
	toutOk();
}

// teste si le deuxième mot de passe est égal au premier
function mdp2Ok() {
	if (document.getElementById("mdp1").value == document.getElementById("mdp2").value && document.getElementById("mdp1").value!="") {
		document.getElementById("val9").src=imgV;
		bmdp2 = true;
	} else {
		document.getElementById("val9").src=imgA;
		bmdp2 = false;
	}
	// maj etat bouton modifier
	toutOk();
}

// teste si le nom est valide
function nomOk() {
	var reg = new RegExp('^[a-zA-Zéèàê]+$', 'i');
	if (reg.test(document.getElementById("nom").value)) {
		document.getElementById("val3").src=imgV;
		bnom = true;
	} else {
		document.getElementById("val3").src=imgA;
		bnom = false;
	}
	document.getElementById("val3").show;
	// maj etat bouton modifier
	toutOk();
}


function suppression(email,iduser)
{	
	$("#"+iduser).remove(); //Suppression visuelle de la liste
	$.post("deleteUser.php",{mail : email, test : iduser},function(result){}); //Suppression en base
}