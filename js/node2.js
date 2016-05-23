var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var server = http.createServer(app);
var session = require('express-session');
var bodyParser = require('body-parser');







var rep = [];
// Chargement de socket.io
var io = require('socket.io').listen(server);



var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 100,
	host : 'localhost',
	user : 'PolyQuest',
	password : 'polypoly',
	database : 'PolyQuest'
});

/*function handle_database(req,res) {
     
//     pool.getConnection(function(err,connection){
//         if (err) {
 //          connection.release();
  //         res.json({"code" : 100, "status" : "Error in connection database"});
 //          return;
 //        }   
// 
 //        console.log('connected as id ' + connection.threadId);
         
         connection.query("select * from user",function(err,rows){
             connection.release();
             if(!err) {
                res = rows;
		return rows;
             }           
         });
 
         connection.on('error', function(err) {      
               res.json({"code" : 100, "status" : "Error in connection database"});
               return;     
         });
   });
 }
 
 app.get("/",function(req,res){-
         handle_database(req,res);
 });
*/
//var connection = mysql.createConnection({host : 'localhost', user:'PolyQuest', password:'polypoly',database : 'PolyQuest'});
	
//fonction qui d'avoir la date actuelle.
function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return day + "/" + month + "/" + year + "  " + hour + ":" + min + ":" + sec;
}
function destroyRoom(numS) {
	if(numS >= nbSMax)
		return;
	

	for(var i = numS; i < (nbSMax-1); i++) {
		salles[i] = salles[i+1];
	}
	for(var i = 0 ; i < nbCo; i++) {
		if(liens[i].numS >= numS)
			liens[i].num--;
	}
	nbSMax--;
	nbS--;
	return;
}

var salles = [];
var nbS = 0;
var nbSMax = 0;
var liens = [];
var nbCo = 0;
//La salle a un etat : 
// 0 : attente de joueurs
// 1 : attente de selection de tous les champions
// 2 : en cours

//Un joueur doit contenir : 
//id / pseudo / champion / xp / mana / pv

io.sockets.on('connection', function (socket, pseudo) {

	socket.on('message', function (message) {
        	// On récupère le pseudo de celui qui a cliqué dans les variables de session
	        // console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
	        socket.broadcast.emit('message', getDateTime() + " " + message.pseudo + " : " + message.message);
        	socket.emit('message',getDateTime() + " " + message.pseudo + " : " + message.message);
		console.log('message');
	});

	
	socket.on('create', function(params) {
		//Initialisation de la salle
		console.log('Creation de la salle...');
		console.log(params);
		salles[nbS] = new Object();
		salles[nbS].nbJ = params.nbJ;
		salles[nbS].numSBD = params.numS;
		salles[nbS].tour = 0;
		salles[nbS].etat = 0;
		//salles[nbS].idTypeSalle = params.idTypeSalle;
		salles[nbS].xpMin = params.xpMin;
		salles[nbS].xpMax = params.xpMax;
		salles[nbS].socket = [];
		salles[nbS].joueur = [];
		
		//Ajout de l'utilisateur dans la salle directement.
		salles[nbS].tour++;
		salles[nbS].socket[0] = socket;
		salles[nbS].joueur[0] = new Object();
		salles[nbS].joueur[0].id = params.idUser;
	
		//On ajoute la personne au gens connecte
                liens[nbCo] = new Object();
                liens[nbCo].socket = socket;
                liens[nbCo].numS = nbS;
                liens[nbCo].numJ = 0; //C'est l'identifiant du joueur dans la partie dans laquelle il est
                liens[nbCo].id = params.idUser;
		liens[nbCo].sorts = 0;

                console.log('Liens');
                console.log(liens);
                nbCo++;

		salles[nbSMax].joueur[0].pseudo = params.pseudo;
		salles[nbSMax].joueur[0].xp = params.xp;
		salles[nbSMax].joueur[0].champion = -1;
		salles[nbSMax].joueur[0].manaTot = 200 * (1 + params.xp / 100);
		salles[nbSMax].joueur[0].mana = 200 * (1 + params.xp / 100);
		salles[nbSMax].joueur[0].pvTot = 100 * (1 + params.xp / 100);
		salles[nbSMax].joueur[0].pv = 100 * (1 + params.xp / 100);
		nbSMax++;
		console.log(salles);
		
		
		
		socket.emit('roomCreated',{numSalle: nbS}); //Ce numero doit etre stocké dans la base de données
//		alles[numS].socket[i].emit('attente',{nbJ: salles[numS].tour, nbJMax: salles[numS].nbJ});
		//console.log("Creation de salle : "+salles);
		nbS++;
	});
	socket.on('changedSocket', function(params) {
		console.log('Changed Socket');
		var idUser = params.idUser;
		var trouve = false;
		var numTemp = 0;
		while(!trouve && numTemp < nbCo) {
			trouve = (liens[numTemp].id == idUser);
			numTemp++;
		}
		numTemp--;
		if(trouve) {
			console.log('Ancien socket : ');
//			console.log(salles[liens[numTemp].numS].joueur[liens[numTemp].numJ].socket);
			console.log(liens[numTemp].socket.id);
			console.log('Nouveau socket : ');
//			console.log(socket);
			console.log(socket.id);
			liens[numTemp].socket = socket;
			salles[liens[numTemp].numS].socket[liens[numTemp].numJ] = socket;	
		}
	});
	socket.on('join',function(params) {
		//On rejoint la salle en question
		console.log('Join');
		console.log(params);
		var numS = params.numS;
		var trouve = false;
		var nbSTemp = 0;
		while(!trouve && nbSTemp < nbS) {
			trouve = (salles[nbSTemp].numSBD == numS); 
			nbSTemp++;
		}
		nbSTemp--;
		numS = nbSTemp;


		if(trouve) {
			var numJ = salles[numS].tour;
			if(salles[numS].etat != 0) {
				//Le joueur est déjà rempli donc la salle est pleine et nous sommes sur une partie qui est en cours
			}
			else {
				salles[numS].socket[numJ] = socket;
				salles[numS].joueur[numJ] = new Object();
				salles[numS].joueur[numJ].pseudo = params.pseudo;
				salles[numS].joueur[numJ].xp = params.xp;
				salles[numS].joueur[numJ].id = params.idUser;
				salles[numS].joueur[numJ].champion = -1;
				salles[numS].joueur[numJ].manaTot = 200 * (1 + params.xp / 100);
				salles[numS].joueur[numJ].pvTot = 100 * (1 + params.xp / 100);
				salles[numS].joueur[numJ].mana = 200 * (1 + params.xp / 100);
				salles[numS].joueur[numJ].pv = 100 * (1 + params.xp / 100);
				
				liens[nbCo] = new Object();
				liens[nbCo].socket = socket;
				liens[nbCo].numS = numS;
				liens[nbCo].numJ = numJ;
				liens[nbCo].id = params.idUser;
				liens[nbCo].sorts = 0;
				nbCo++;
		
				salles[numS].tour++;
				if(salles[numS].tour == salles[numS].nbJ) { //La salle vient de se remplir, il faut lancer la partie
					for( var i = 0; i < salles[numS].nbJ ; i++) {
						salles[numS].socket[i].emit('begin',{joueur: salles[numS].joueur});
						console.log("Emit begin");
						console.log(salles[numS].socket[i].id);
					}
					salles[numS].tour = 0;
					salles[numS].etat++; //On passe a l'état suivant (qui est choix de tous les champions).
				}
				else {
					for( var i = 0; i < salles[numS].tour ; i++) {
                                                       salles[numS].socket[i].emit('attente',{nbJ: salles[numS].tour, nbJMax: salles[numS].nbJ});
                                                       console.log("Emit attente");
                                               }
				}
				console.log("Quelqu'un a rejoint une salle.");
			}
		}
		else {
			//Erreur on tente de rejoindre une salle non existante
			
		}
	});

	socket.on('select',function(params) {
		//boucle pour retrouver l'emmetteur 
		console.log('Select');
		var trouve = false;
		var nbTest = 0;
		while(!trouve && nbTest < nbCo) {
			trouve = (liens[nbTest].socket == socket);
			nbTest++;
		}
		nbTest--;
		if(trouve) {
			console.log('Trouve');
			var numS = liens[nbTest].numS;
			var numJ = liens[nbTest].numJ;
			console.log("NumS "+ numS + " numJ " + numJ);
			if(salles[numS].etat != 1) {
				//si on n'est pas a l'étape choix du champion
				if(salles[numS].etat == 2 ) {
					salles[numS].socket[numJ].emit('start',{joueur: salles[numS].joueur});
					if(salles[numS].tour == numJ )
						salles[numS].socket[numJ].emit('go');
					else 
						salles[numS].socket[numJ].emit('wait');
				}
					
			} else {
				console.log('Salle en bon etat');
				if(salles[numS].joueur[numJ].champion != -1) {
					//on a deja choisi un champion
					console.log('Champion deja choisi');
				} else {
					salles[numS].joueur[numJ].champion = params.numChampion;
					var cpt = 0;
					for( var i = 0; i < salles[numS].nbJ ; i++) {
						if( salles[numS].joueur[i].champion != -1) 
							cpt++;
					}
					console.log('Nombre de champions choisis : '+cpt);	
					if( cpt == salles[numS].nbJ) {
						for( var i = 1; i < salles[numS].nbJ ; i++) {
                                         	        salles[numS].socket[i].emit('start',{joueur: salles[numS].joueur});
						/*	console.log("Voici la salle envoyée : ");
							console.log(salles[numS]);
							console.log("Voici les joueurs : ");
							console.log(salles[numS].joueur);*/
							salles[numS].socket[i].emit('wait');
                                        	}
						salles[numS].socket[0].emit('start',{joueur: salles[numS].joueur});
						salles[numS].socket[0].emit('go');
                                       		salles[numS].tour = 0;
	                                        salles[numS].etat++; //On passe a l'état suivant (qui est en combat).
					}
					console.log(salles[numS].joueur[0]);
					console.log(salles[numS].joueur[1]);
					console.log(salles[numS]);
				}
			}
		}
		else {
			//Socket non trouvé.
		}
	});

	socket.on('capacites', function(params) {
//		console.log(params);
		console.log("Ajout des sorts");

		var trouve = false;
                var nbTest = 0;
                while(!trouve && nbTest < nbCo) {
                        trouve = (liens[nbTest].socket == socket);
                        nbTest++;
                }
                nbTest--;
                if(trouve) {
			console.log('joueur trouve' + liens[nbTest].numS + " " + liens[nbTest].numJ);
			console.log(liens[nbTest].sorts);
			if(liens[nbTest].sorts == 0) 
				liens[nbTest].sorts = params;
		}
			
	});

	socket.on('sort', function(params) {
		var trouve = false;
                var nbTest = 0;
		console.log('recherche du joueur qui lance un sort');
                while(!trouve && nbTest < nbCo) {
                        trouve = (liens[nbTest].socket == socket);
                        nbTest++;
                }
                nbTest--;
                if(trouve) {
                        var numS = liens[nbTest].numS;
                        var numJ = liens[nbTest].numJ;
			//salles[numS].tour = (salles[numS].tour + 1 )% salles[numS].nbJ;
			//var cpt = 0;
			//while(salle[numS].joueur[numJ].
	

			//on recherche le sort
			var numSort = 0;
			var trouve2 = false;
			console.log('recherche du sort lance');
//			console.log('Tableau de recherche de longueur ' + liens[nbTest].sorts.length);
			console.log(liens[nbTest].sorts);
			
			
			while(!trouve2 && numSort < liens[nbTest].sorts.length ) {
//				console.log("Peut etre ce sort ?");
//				console.log(liens[nbTest].sorts[numSort]);
				trouve2 = ( liens[nbTest].sorts[numSort].id_capacite == params.numSort) ;
				numSort++;
			}
			numSort--;
			var lance = false;
			if(trouve2) {
				var lesort = liens[nbTest].sorts[numSort];
				console.log('Joueur : '+numJ+' de la salle ' + numS + ' lance le sort : ');
				console.log(lesort);
				if(salles[numS].joueur[numJ].mana < lesort.cout_mana ) {
					salles[numS].socket[numJ].emit('alert_mana',{txt:'Vous n\'avez pas assez de mana pour lancer ce sort.'});
				}
				else {
					salles[numS].joueur[numJ].mana -= lesort.cout_mana;
					lance = true;
					console.log(salles[numS].joueur[numJ].pv);
					console.log(salles[numS].joueur[numJ].pvTot);
					console.log(lesort.montant_soins);
					var pvtemp = parseInt(salles[numS].joueur[numJ].pv);
					pvtemp += parseInt(lesort.montant_soins);
					console.log(pvtemp);
					salles[numS].joueur[numJ].pv = Math.min(salles[numS].joueur[numJ].pvTot, pvtemp);
					
					for(var i = 0 ; i < salles[numS].nbJ; i++) {
						salles[numS].socket[i].emit('message',getDateTime()+" " + salles[numS].joueur[numJ].pseudo + " lance " + lesort.nom_capacite + " qui inflige " + lesort.montant_degats*4 + " et soigne de " + lesort.montant_soins);
						salles[numS].socket[i].emit('action',{type:'sort', lanceur:liens[nbTest].id});
						if(numJ != i) 
							salles[numS].joueur[i].pv = Math.max(salles[numS].joueur[i].pv - lesort.montant_degats*4, 0);
					}
				}
				
			}
			var nbRestant = 0;
			var numW = 0;
			if(lance) {
				for(var i = 0 ; i < salles[numS].nbJ; i++) {
					salles[numS].socket[i].emit('update',{joueur:salles[numS].joueur});
					if(salles[numS].joueur[i].pv > 0) {
						nbRestant++;
						numW = i;
					}
				}
				if(nbRestant <= 1) {
					for(var i = 0 ; i < salles[numS].nbJ; i++) {
						if(salles[numS].joueur[i].pv > 0 ) {
							salles[numS].socket[i].emit('message',"BRAVO VOUS AVEZ GAGNE !!");
							salles[numS].socket[i].emit('win',{numJ:numW,numS:salles[numS].id});
							salles[numS].socket[i].emit('wait');
							var trouve = false;
							var nbTemp = 0;
							while(!trouve && nbTemp < nbCo) {
								trouve = (liens[nbTemp].socket == salles[numS].socket[i]);
								nbTemp++;
							}
							nbTemp--;
							if(trouve3) {
								for(var j = nbTemp; j < (nbCo-1); j++) {
									liens[j] = liens[j+1];
								}
								nbCo--;
							}
						}
						else {
							salles[numS].socket[i].emit('message',"VOUS AVEZ PERDU !!");
							salles[numS].socket[i].emit('loose',{numJ:numW,numS:numS});
							salles[numS].socket[i].emit('wait');
							var trouve3 = false;
                                                        var nbTemp = 0;
                                                        while(!trouve3 && nbTemp < nbCo) {
                                                                trouve3 = (liens[nbTemp].socket == salles[numS].socket[i]);
                                                                nbTemp++;
                                                        }
                                                        nbTemp--;
                                                        if(trouve3) {
                                                                for(var j = nbTemp; j < (nbCo-1); j++) {
                                                                        liens[j] = liens[j+1];
                                                                }
                                                                nbCo--;
                                                        }

						}
					}
					destroyRoom(numS);
				}
				else {
					var cpt = 1;
                		        var nextTrouve = false;
		                        while(!nextTrouve && cpt < (salles[numS].nbJ) ) {
                                		nextTrouve = ( salles[numS].joueur[(numJ+cpt)%salles[numS].nbJ].pv >= 0 );
                		                cpt++;
		                        }
                		        cpt--;
		
		                        if(nextTrouve) {
                		                salles[numS].tour = (salles[numS].tour + cpt) % salles[numS].nbJ;
		                        }
					for(var i = 0; i < salles[numS].nbJ; i++) {
                                	        salles[numS].socket[i].emit('wait');
                        	        }
                	                if(nextTrouve) {
        	                                salles[numS].socket[salles[numS].tour].emit('go');
	                                }

					
				}
			}

		} else {
			//Socket non trouvé.
		}
	});
	socket.on('passer', function(params) {
		console.log('Un joueur a passé');
		var trouve = false;
                var nbTest = 0;
		console.log('Recherche du joueur');
                while(!trouve && nbTest < nbCo) {
                        trouve = (liens[nbTest].socket == socket);
                        nbTest++;
                }
                nbTest--;
                if(trouve) {
			console.log('trouve');
                        var numS = liens[nbTest].numS;
                        var numJ = liens[nbTest].numJ;
			salles[numS].joueur[numJ].mana = Math.min(salles[numS].joueur[numJ].manaTot, salles[numS].joueur[numJ].mana + 20);
			
			var cpt = 1;
                        var nextTrouve = false;
                        while(!nextTrouve && cpt < (salles[numS].nbJ) ) {
                                nextTrouve = ( salles[numS].joueur[(numJ+cpt)%salles[numS].nbJ].pv >= 0 );
                                cpt++;
                        }
                        cpt--;

                        if(nextTrouve) {
                                salles[numS].tour = (salles[numS].tour + cpt) % salles[numS].nbJ;
                        }



                        for(var i = 0 ; i < salles[numS].nbJ; i++) {
				salles[numS].socket[i].emit('message',getDateTime()+" Le joueur "+salles[numS].joueur[numJ].pseudo+" passe son tour et gagne 20 de mana.");
				if (i == salles[numS].tour) {
					salles[numS].socket[i].emit('go');
				}
				else {
					salles[numS].socket[i].emit('wait');
				}

                                salles[numS].socket[i].emit('update',{joueur:salles[numS].joueur});
                        }
                } else {
                        //Socket non trouvé.
                }
	});
	socket.on('abandonner', function(params) {
		var trouve = false;
                var nbTest = 0;
                while(!trouve && nbTest < nbCo) {
                        trouve = (liens[nbTest].socket == socket);
                        nbTest++;
                }
                nbTest--;
                if(trouve) {
			console.log('trouve');
                        var numS = liens[nbTest].numS;
                        var numJ = liens[nbTest].numJ;
                        


			salles[numS].joueur[numJ].pv = 0;
			
			for(var i = 0; i < salles[numS].nbJ ; i++) {
				salles[numS].socket[i].emit('message',getDateTime()+" Le joueur "+ salles[numS].joueur[numJ].pseudo + " a abandonné la partie.");
			}
			var nbRestant = 0;
			var numW = 0;
			for(var i = 0 ; i < salles[numS].nbJ; i++) {
                                salles[numS].socket[i].emit('update',{joueur:salles[numS].joueur});
                                if(salles[numS].joueur[i].pv > 0) {
                                	nbRestant++;
                                        numW = i;
                                }
                        }
			if(nbRestant <= 1) {
                                for(var i = 0 ; i < salles[numS].nbJ; i++) {
                                        if(salles[numS].joueur[i].pv > 0 ) {
                                                salles[numS].socket[i].emit('message',"BRAVO VOUS AVEZ GAGNE !!");
                                                salles[numS].socket[i].emit('win',{numJ:numW,numS:numS});
                                                salles[numS].socket[i].emit('wait');
                                                var trouve = false;
                                                var nbTemp = 0;
                                                while(!trouve && nbTemp < nbCo) {
                                                        trouve = (liens[nbTemp].socket == salles[numS].socket[i]);
                                                        nbTemp++;
                                                }
                                                nbTemp--;
                                                if(trouve3) {
                                                        for(var j = nbTemp; j < (nbCo-1); j++) {
                                                                liens[j] = liens[j+1];
                                                        }
                                                        nbCo--;
                                                }
                                        }
                                        else {
                                                salles[numS].socket[i].emit('message',"VOUS AVEZ PERDU !!");
                                                salles[numS].socket[i].emit('loose',{numJ:numW,numS:numS});
                                                salles[numS].socket[i].emit('wait');
                                                var trouve3 = false;


                                                var nbTemp = 0;
                                                while(!trouve3 && nbTemp < nbCo) {
                                                        trouve3 = (liens[nbTemp].socket == salles[numS].socket[i]);
                                                        nbTemp++;
                                                }
                                                nbTemp--;
                                                if(trouve3) {
                                                        for(var j = nbTemp; j < (nbCo-1); j++) {
                                                                liens[j] = liens[j+1];
                                                        }
                                                        nbCo--;
                                                }

                                        }
                                }
				destroyRoom(numS);
                        }
                        else {
                                var cpt = 1;
                                var nextTrouve = false;
                                while(!nextTrouve && cpt < (salles[numS].nbJ) ) {
                                        nextTrouve = ( salles[numS].joueur[(numJ+cpt)%salles[numS].nbJ].pv >= 0 );
                                        cpt++;
                                }
                                cpt--;

                                if(nextTrouve) {
                                        salles[numS].tour = (salles[numS].tour + cpt) % salles[numS].nbJ;
                                }
				for(var i = 0; i < salles[numS].nbJ; i++) {
					salles[numS].socket[i].emit('wait');
				}
				if(nextTrouve) {
					salles[numS].socket[salles[numS].tour].emit('go');
				}

                        }	
			


                } else {
                        //Socket non trouvé.
                }
	});

});


server.listen(8080);
