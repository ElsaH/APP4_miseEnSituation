<?php

include("include/connexionBD.php");

$res = $db->query('SELECT * FROM user ORDER BY id_user DESC ');
if($res->num_rows > 0){
	while($ligne = $res->fetch_assoc()){
		echo " id: ". $ligne["id_user"] . " Name : " . $row["pseudo"] . "<br/>"
	}
}


?>