


$(document).ready(function(){ //(fonction inspiré du TP de web sur JQuery)			
	$("span.titreSection").click(function(){
		var className = '';
		var newClassName = '';
		if($(this).parent().is('.section')){
			newClassName='sectionOpen';
			className = '.section';
		}
		else{
			newClassName = 'section';
			className = '.sectionOpen';
		}
							
		var parent = $(this).parent(className);
		$('img:visible', parent).hide().siblings().show();
		parent.find('div.contenuSection').slideToggle();
		
		$(this).parent('.section').toggleClass(newClassName);

	});
});



<script type="text/javascript" >
//Selection d'une ville via le menu
function loadVilleMenu(){
	var ville = document.getElementById("ville-menu").value;
	selectedVille(ville, 0);
}

/* Fonction qui va mettre la ville selectionnée parmis celles proposées à 
la saisie de la ville dans l'input Ville 
@param = nom de la ville selectionnée
@param menu : boolean pour savoir si on est sur le menu ou la recherche	*/
function selectedVille(ville, menu){
	if (menu == 1){ //On est sur le menu
		var id_suggest = "villes_propositions_menu";
		var id_ville = "ville-menu";
	}else{ //Dans la page recherche
		var id_suggest = "villes_propositions";
		var id_ville = "ville";
	}
	
	document.getElementById(id_suggest).innerHTML = "";
	/*Si on choisi "Toutes les villes" le champs se saisie devient vide 
	(sauf si on est sur la page de proposition de diner, dans ce cas on peut mettre une ville qui n'existe pas) */
	if (ville == "Rechercher" && window.location.href != "http://localhost/projet/proposer.php"){ 
		document.getElementById(id_ville).value = "";
	}else if(ville != "Rechercher")
		document.getElementById(id_ville).value = ville;
	
	document.getElementById(id_suggest).hide; //On cache la suggestion	
	
	//Si on est sur la page de recherche on peut charger les diners 
	if(menu != 1)
		loadXMLDoc();
}
			
/* Fonction qui va afficher sous l'input ville une liste de propositions de ville 
qui commence comme la chaine saisie par l'utilisateur
Exemple : saisie de "Or", on propose la ville "Orsay" et "Orlean"	*/
function suggestVille(menu){
	if (window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}				
		else{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				if(menu == 1){
					document.getElementById('villes_propositions_menu').innerHTML  = xmlhttp.responseText;
					document.getElementById('villes_propositions_menu').show;
				}else{
					document.getElementById('villes_propositions').innerHTML  = xmlhttp.responseText;
					document.getElementById('villes_propositions').show;
				}
			}
			if(xmlhttp.status == 404){
				alert("ERROR 404");
			}
		};
		
		//Si la saisie c'est faite sur la menu on prend la ville du menu sinon celle du champs de recherche 
		if(menu == 1)
			ville = document.getElementById('ville-menu').value;
		else 
			ville = document.getElementById('ville').value;
		//On va chercher les villes qui ressembles à la saisie
		xmlhttp.open("GET","http://localhost/projet/searchVille.php?ville="+ville+"&menu="+menu,true);
		xmlhttp.send(null);
}

/* Fonction Ajax qui va, à chaque changement d'un des critère de recherche, va chercher dans la 
base de données les dîners qui repondent à ces derniers et les affiche dans le div "suggestions".	*/
function loadXMLDoc(test){
	var typeRepas = [];
	var checkBoxTypeRepas = document.getElementsByClassName('typeRepas');
	var found = document.getElementById('action').value == "Tous";
	
	//Si on vient de cliquer sur "Tous" les types repas alors on coche tous les autres type
	if (found){
		Array.filter(checkBoxTypeRepas, function(elem){
				if(elem.value == 'Tous')
					found = elem.checked;
			});
	
		Array.filter(checkBoxTypeRepas, function(elem){
			if(elem.value != 'Tous')
				elem.checked = true;
		});
	}else{ //Si on vient de décocher autre chose que "Tous" alors on décoche "tous" car il y a au moins un type exclut de la recherche
		Array.filter(checkBoxTypeRepas, function(elem){
			if(elem.value == 'Tous')
				elem.checked = false;
		});
	}
	
	var typeDest = [];
	var checkBoxTypeDest = document.getElementsByClassName('typeDest');
	var found = document.getElementById('actionDest').value == "Tous";
	//Si on vient de cliquer sur "tous" les type destinataires alors on coche tous les autres destinataires
	if (found){
		Array.filter(checkBoxTypeDest, function(elem){
				if(elem.value == 'Tous')
					found = elem.checked;
			});
		if (found){
			Array.filter(checkBoxTypeDest, function(elem){
					if(elem.value != 'Tous')
						elem.checked = true;
				});
		}
	}else{//Sinon on décoche "Tous" car il y a au moins un type exclut
		Array.filter(checkBoxTypeDest, function(elem){
			if(elem.value == 'Tous')
				elem.checked = false;
		});
	}
	
	if (document.getElementById('villes_propositions').innerHTML == ""){
		if (window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}				
		else{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				//On affiche la liste des dîners résultats 
				document.getElementById('suggestions').innerHTML  = xmlhttp.responseText;
			}
			if(xmlhttp.status == 404){
				alert("ERROR 404");
			}
		};
		
		//Criteres de recherche :
		ville = document.getElementById('ville').value;
		from = document.getElementById('firstinput').value;
		to = document.getElementById('secondinput').value;
		nbParticipants = document.getElementById('nbParticipants').value;
		
		Array.filter(checkBoxTypeRepas, function(elem){
			if (elem.checked){
				typeRepas.push(elem.value);
			}
		});//On garde tous les types de repas cochés
		
		Array.filter(checkBoxTypeDest, function(elem){
			if (elem.checked){
				typeDest.push(elem.value);
				
			}
		}); // On garde tous les destinataires cochés

		if(test!=1){ //Debug si on passe par le menu (Error: cannot call methods on slider prior to initialization; attempted to call method 'values')
			min = $( "#slider" ).slider( "values", 0 );
			max = $( "#slider" ).slider( "values", 1 );
		}else{
			min=0;
			max=200;
		}
		
		//On lance la recherche
		xmlhttp.open("GET","http://localhost/projet/search.php?ville="+ville+"&from="+from+"&to="+to+"&nb="+nbParticipants+"&min="+min+"&max="+max+"&type="+typeRepas+"&dest="+typeDest,true);
		xmlhttp.send(null);
	}
}

//FONCTION POUR L'HISTORIQUE DES DINERS 
//Avec le meme fichier que pour la recherche on va chercher les dîners passés pour le membre id_membre
function loadHistorique(id_membre){
	if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}				
	else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			rep = xmlhttp.responseText;
			if (rep=="<div id='portfolio' style='overflow-y:scroll;'></div>") //Pas de résultats
				rep = "<i>Vous n'avez participé à aucun dîner.</i>";
			document.getElementById('historique').innerHTML = rep;
		}
		if(xmlhttp.status == 404){
			alert("ERROR 404");
		}
	};
	
	membre = id_membre;

	to = Date.now(); //Les dîners sont d'avant aujourd'hui (date <= maintenant )
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	
	var date = month + "/" + day + "/" + year; //Format pour la base de données
					
	xmlhttp.open("GET","http://localhost/projet/search.php?membre="+membre+"&to="+date,true);
	xmlhttp.send(null);
	

}

// FONCTION POUR LA LISTE DES DINERS A VENIR 
// Même fichier que pour la recherche mais pour afficher les diners à venir du membre id_membre
function loadProchainsDiners(id_membre){
	if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}				
	else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var rep = xmlhttp.responseText;
			if (rep == "<div id='portfolio' style='overflow-y:scroll;'></div>") //Pas de résultats
				rep = "<i>Vous n'avez pas de dîner à venir.</i>"
			document.getElementById('nextDiners').innerHTML = rep;
		}
		if(xmlhttp.status == 404){
			alert("ERROR 404");
		}
	};
	membre = id_membre;

	from = Date.now(); //Les dîners à venir on un date >= maintenant
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	
	var date = month + "/" + day + "/" + year; //format pour la base de données
					
	xmlhttp.open("GET","http://localhost/projet/search.php?membre="+membre+"&from="+date,true);
	xmlhttp.send(null);
	

}

/*Fonction qui initialise la recherche avec les paramètres par defauts */
function initSuggestions(){
	document.getElementById('suggestions').innerHTML = "<label >Suggestions...</label>";
}

</script>


<!-- FONCTION POUR LA FICHE DINER -->
<script type='text/javascript' >
//Affiche ou cache le bouton participer/se retirer d'un dîner
$(document).ready(function(){
	$("#yes").click(function(){
		$("#yes").hide();
		$("#no").show();
		participer(true);
	}); 

	$("#no").click(function(){
		$("#no").hide();
		$("#yes").show();
		participer(false);

	}); 
});

//Fonction qui va ajouter une note à un dîner(ou non) 
//@param : val : boolean pour savoir si le membre dit vouloir noter ou si il dit ne pas avoir participé 
function addNote(val){
	var diner = document.getElementById('dinerANoter').innerHTML;
	var membre = document.getElementById('idMembre').innerHTML;
	var note = document.getElementById('valNote').value;
	var comment = document.getElementById('commentNote').value;
	
	if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}				
	else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var res = xmlhttp.responseText;
		}
		if(xmlhttp.status == 404){
			alert("ERROR 404");
		}
		
	};

	//Ajout de la note en base ou suppression du membre de la liste des participants
	xmlhttp.open("GET","http://localhost/projet/noterDiner.php?diner="+diner+"&membre="+membre+"&note="+note+"&comment="+comment+"&val="+val,false);
	xmlhttp.send(null);

}

//Fonction pour ajouter/retirer un membre de la liste des participants
//@param : boolean (vrai si participe faux sinon)
function participer(val){
	var diner = document.getElementById('idDiner').innerHTML;
	var membre = document.getElementById('idMembre').innerHTML;
	
	if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}				
	else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			res = xmlhttp.responseText;
			document.getElementById('listParticipants').innerHTML  = document.getElementById('listParticipants').innerHTML + res; //Ajout a la liste des participants
			
			if(!val){ //Il faut retirer le membre de la liste des participant
				document.getElementById("participant"+membre).remove();
			}
		}
		if(xmlhttp.status == 404){
			alert("ERROR 404");
		}
		
	};

	xmlhttp.open("GET","http://localhost/projet/changeParticipant.php?diner="+diner+"&membre="+membre+"&participe="+val,false);
	xmlhttp.send(null);
}

//Fonction pour ajouter un commentaires sur la fiche dun diner 
function addCommentaire(){	
	var comment = document.getElementById('comment').value.split(' ').join('+');
	var diner = document.getElementById('idDiner').innerHTML;
	var membre = document.getElementById('idMembre').innerHTML;
	
	if (comment != ""){
		if (window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}				
		else{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				res = xmlhttp.responseText;
				document.getElementById('portfolio').innerHTML  = document.getElementById('portfolio').innerHTML + res; //ajout du commentaires sur la fiche du dîner
				document.getElementById('comment').value = ""; //Champ de saisie de commentaires initialisé
			}
			if(xmlhttp.status == 404){
				alert("ERROR 404");
			}
			
		};
	
		xmlhttp.open("GET","http://localhost/projet/addCommentaire.php?diner="+diner+"&membre="+membre+"&comm="+comment,false);
		xmlhttp.send(null);
		
					
	}
}
</script>


<!-- FONCTION POUR EDITION DU PROFIL -->
<script type='text/javascript'>
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

// teste si le nom est valide
function preOk() {
	var reg = new RegExp('^[a-zA-Zéèàê]+$', 'i');
	if (reg.test(document.getElementById("prenom").value)) {
		document.getElementById("val4").src=imgV;
		bpre = true;
	} else {
		document.getElementById("val4").src=imgA;
		bpre = false;
	}
	// maj etat bouton modifier
	toutOk();
}

// teste si la ville est valide
function villeOk()
{
	var reg = new RegExp('^[a-zA-Z]+(?:[\ s-][a-zA-Z]+)*$', 'i');
	if (reg.test(document.getElementById("ville").value))
	{
		document.getElementById("val6").src=imgV;
		bville = true;
	}
	else {
		document.getElementById("val6").src=imgA;
		bville = false;
	}
	// maj etat bouton modifier
	toutOk();
}

// teste si le CP est valide
function CPOk() {
	var reg = new RegExp('^[0-9]{5,5}$', 'i');;
	if (reg.test(document.getElementById("CP").value)) {
		document.getElementById("val7").src=imgV;
		bCP = true;
	} else {
		document.getElementById("val7").src=imgA;
		bCP = false;
	}
	// maj etat bouton modifier
	toutOk();
}

</script>


<!-- FONCTION POUR CREER DINER -->
<script type='text/javascript'>
// initialise tous les marqueurs à caché
function initialiser_Proposer(){
	participantsOk();
	moneyOk();
	dateOk();
	themeOk();
	villePropositionOk();
	titreOk();
}

// verifie que le titre est mit
function titreOk(){
	var reg = new RegExp('^[a-zA-Z0-9éèàêï?@\.; :!_-]{1,50}$', 'i');
	if (reg.test(document.getElementById("titreMenu").value)) {
		document.getElementById("val6").src=imgV;
		return true;
	} else {
		document.getElementById("val6").src=imgA;
		return false;
	}
}

// verifie que le nombre de participants est correct (nbMin <= nb places)
function participantsOk() {
	if (parseInt(document.getElementById("number").value) >= parseInt(document.getElementById("numMin").value)) {
		document.getElementById("val4").src=imgV;
		return true;
	} else {
		document.getElementById("val4").src=imgA;
		return false;
	}
}

// verifie que la contribution est correcte
function moneyOk() {
	var reg = new RegExp('[0-9]', 'i');
	if (reg.test(document.getElementById("money").value)) {
		document.getElementById("val1").src=imgV;
		return true;
	} else {
		document.getElementById("val1").src=imgA;
		return false;
	}
}
	
// verifie que la date est correcte ( saisie > aujourd'hui)
function dateOk() {
	chosenDate = document.getElementById("firstinput");
	if (!chosenDate.value == "") {
		dateCh = new Date(chosenDate.value);
		if(dateCh >= Date.now()){
			document.getElementById("val3").src=imgV;
		return true;
		}
		else {
			document.getElementById("val3").src=imgA;
		return false;
		}
	}
	else {
		document.getElementById("val3").src=imgA;
		return false;
	}
}


function suppression(email,iduser)
{	
	$("#"+iduser).remove(); //Suppression visuelle de la liste
	$.post("deleteUser.php",{mail : email, test : iduser},function(result){}); //Suppression en base
}