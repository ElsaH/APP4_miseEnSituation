<?php

	include('include/header.php');
	/* On tue les cookies */
	if (isset($_COOKIE['cookname']) && isset($_COOKIE['cookpass'])) { 
		setcookie("cookname","",0,"/","",0);
		setcookie("cookpass","",0,"/","",0);
		unset($_COOKIE["cookname"]);
		unset($_COOKIE["cookpass"]);
	} 

	/* On tue la session */
	if(!empty($_SESSION['login'])){
		session_destroy();
		$_SESSION = array();
	  	unset($_SESSION);
	}

	//include('include/header.php');
	echo "Vous avez été déconnecté.";
	//include("include/footer.php");
	include('include/footer.php');

	header ("Refresh: 2;URL=./index.php");  
?>