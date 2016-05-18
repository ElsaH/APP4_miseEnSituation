<?php

include('include/header.php');
include('include/connexionBD.php');

$bd = connexion();
$tmp = $bd->query('SELECT * FROM user ORDER BY xp DESC LIMIT 10;');

if(isset($_SESSION['login'])) {
	$tmp2 = $bd->prepare('SELECT * FROM user WHERE pseudo=:pseudo;');
	$tmp2->execute(array(
		'pseudo' => $_SESSION['pseudo']
	));

	$i = 1;?>
	<div class='row content_body'>
		<h1>Classement</h1>
		<table  class="table table-striped">
			<tr>
				<td>Classement</td>
				<td>Pseudo</td>
				<td>xp</td>
				<td>Combats gagnés</td>
				<td>Combats joués</td>
			</tr>
		<?php	
			$test = False;
			while($line=$tmp->fetch()){
				if($line['pseudo'] == 'Admin'){continue;}
				if($line['pseudo'] == $_SESSION['pseudo']){
					echo "<tr style='background : #FF0000; color: #FFFFFF;' scope=\"row\"><td>".$i ."</td><td>".$line['pseudo']."</td><td>".$line['xp']."</td><td>".$line['combats_gagnes']."</td><td>".$line['combats_joues']."</td></tr>";
					$test = True;
				} else {
					echo "<tr scope=\"row\"><td>".$i ."</td><td>".$line['pseudo']."</td><td>".$line['xp']."</td><td>".$line['combats_gagnes']."</td><td>".$line['combats_joues']."</td></tr>";
				}
				$i++;
			}

			if(!$test){
				/*  */
			}
		?>
		</table>
	</div>
<?php

} else {
	/* Affichage du classement général */
	$i = 1; ?>
	<div class='row content_body'>
		<h1>Classement</h1>
		<table  class="table table-striped">
			<tr scope="row">
				<td>Classement</td>
				<td>Pseudo</td>
				<td>xp</td>
				<td>Combats gagnés</td>
				<td>Combats joués</td>
			</tr>
		<?php	
			while($line=$tmp->fetch()){
				if($line['pseudo'] == 'Admin'){continue;}
				echo "<tr scope=\"row\"><td>".$i ."</td><td>".$line['pseudo']."</td><td>".$line['xp']."</td><td>".$line['combats_gagnes']."</td><td>".$line['combats_joues']."</td></tr>";
				$i++;
			}
		?>
		</table>
	</div>
<?php
}

include('include/footer.php');

?>