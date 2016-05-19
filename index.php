<?php
include("./include/header.php");
?>

<div class='container content_body'>
	<div class='row'>
		<div class='col-md-2'>
			<button id='guide' type="button" class="btn btn-default">Guide du jeu</button>
		</div>
	</div>
		<?php if((isset($_SESSION['admin'])) && $_SESSION['admin']==1){ ?>
		<div class='row'>
			<div class='col-md-3'>
				<button id='admin_comptes' type="button" class="btn btn-default">Gestion des comptes</button>
			</div>
			<div class='col-md-3'>
				<button id='admin_tournois' type="button" class="btn btn-default">Gestion des tournois</button>
			</div>
			<div class='col-md-3'>
				<button id='admin_classes' type="button" class="btn btn-default">Gestion des classes</button>
			</div>
			<div class='col-md-3'>
				<button id='admin_capacites' type="button" class="btn btn-default">Gestion des capacités</button>
			</div>
		</div>
		<?php } ?>
</div>

<script>
	document.getElementById("guide").onclick = function () {
        location.href = "guide_du_jeu.php";
    };
    document.getElementById("admin_comptes").onclick = function () {
        location.href = "admin_comptes.php";
    };
    document.getElementById("admin_tournois").onclick = function () {
        location.href = "creation_tournoi.php";
    };
    document.getElementById("admin_classes").onclick = function () {
        location.href = "admin_classes.php";
    };
    document.getElementById("admin_capacites").onclick = function () {
        location.href = "admin_capacites.php";
    };
</script>
<?php
include("./include/footer.php");
?>
