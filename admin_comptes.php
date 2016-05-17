<?php

include("include/header.php");
include("include/connexionBD.php");

echo "<script src=\"../js/admin_comptes.js\"></script>";

$db = connexion();
$res = $db->query('SELECT * FROM user ORDER BY id_user ASC ');

echo "<table>";

while($ligne = $res->fetch()){

	echo "<tr><td>".$ligne["id_user"].".</td><td>". $ligne["pseudo"] . "</td><td><input type=\"button\" value=\"Supprimer\" onClick=\"suppr(".$ligne["id_user"].")\"/></td><td><input type=\"button\" value=\"Modifier\" onClick=\"modif(".$ligne["id_user"].")\"/></td><tr/>";
}

echo "</table>";
include("include/footer.php");

?>