<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Socket.io</title>
    </head>
 
    <body>
        <h1>Combat !</h1>
	<div id="text"></div>
	<input type="text" value="" id="message"/>
	<input type="button" value="Envoyer" id="send"/><br/>
	<input type="button" value="Sort" id="Sort" disabled/>
	<input type="button" value="Passer" id="Passer" disabled />
	<input type="button" value="Abandonner" id="Abandonner" disabled/>
	<div style="display:none" id="sorts"></div>
	<div style="position:absolute; top : 100px; right: 100px;">
		<div id="infosJ1">
			Pseudo : <span id="pseudo1"></span><br/>
			Level : <span id="level1"></span><br/>
			Classe :<span id="class1"></span><br/>
			PV : <span id="pv1"></span><br/>
			Mana : <span id="mana1"></span><br/>
		</div>
		<div id="infosJ2">
			Pseudo : <span id="pseudo2"></span><br/>
                        Level : <span id="level2"></span><br/>
                        Classe : <span id="class2"></span><br/>
                        PV : <span id="pv2"></span><br/>
                        Mana : <span id="mana2"></span><br/>
		</div>
	</div>
	<div id="bottom"></div>	

        <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
        <script src="http://82.239.215.158:8080/socket.io/socket.io.js"></script>
        <script src="./js/combat.js"></script>
    </body>
</html>
