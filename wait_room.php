<?php
	include("./include/header.php");
	
	if(isset($_GET["numS"])){
		echo "<script type=\"text/javascript\">socket.emit('join',{numS:".$_GET["numS"].", idUser: ".$_GET["idUser"].", pseudo:'".$_SESSION["pseudo"]."', xp:".$_SESSION["xp"]."});</script>";
	}
	else
		echo "<script type='text/javascript'>socket.emit('changedSocket',{idUser: ".$_SESSION["id_user"]."});</script>";
	
?>
	<script type="text/javascript">
		socket.on('begin',function(){
			document.location.href="./game.php";
		});
		
		socket.on('attente',function(param){
			document.getElementById("compteur_joueurs").innerHTML = param.nbJ+"/"+param.nbJMax;
		
		});
	
	</script>
	
	<div id="container content_body">
		<div class="row">
			<h2>En attente de joueurs...</h2>
		</div>
		<div class="row">
			<div class='col-lg-4 col-lg-offset-6'>
				<div class="fa-li fa fa-spinner fa-spin" stype="font-size: 100px;"></div>	
			</div>
		</div>
		<div class="row">
			<div class='col-lg-4 col-lg-offset-6'>
				<div id="compteur_joueurs">1/2</div>
			</div>
		</div>
	</div>
	
<?php	
	include ("./include/footer.php");
?>