<?php

include("header.php");
include("connexionBD.php");

echo "
<script>

</script>
";

$db = connexion();
$res = $db->query('SELECT * FROM user ORDER BY id_user ASC ');

echo "<table>";

while($ligne = $res->fetch()){

	echo "<tr><td> Name : " . $ligne["pseudo"] . "</td><td><input type=\"button\" value=\"Supprimer\" id=\"suppr".$ligne["id_user"]."\"/></td><td><input type=\"button\" value=\"Modifier\" id=\"modif".$ligne["id_user"]."\"/></td><tr/>";
}

echo "</table>";
include("footer.php");

?>