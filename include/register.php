<?php
    include('./header.php');
    include('./controle/enregistrement.php');

    if (isset($_POST['username']) || isset($_POST['email']) || isset($_POST['password'])) {
        tests();
    }
?>

    <div class="left">    
        <h1>Enregistrez-vous</h1>
        <?php
        if (!empty($error_msg)) {
            echo $error_msg;
        }
        ?>
        <ul>
            <li>Le pseudo ne peut contenir que des nombres, des lettres en minuscule et majuscule et des underscores.</li>
            <li>Le pseudo doit faire en 4 et 15 caractères.</li>
            <li>Les emails doivent avoir un format valide.</li>
            <li>Le mot de passe doit avoir au moins 6 caractères et 20 caractères maximum.</li>
            <li>Le mot de passe doit contenir :
                <ul>
                    <li>Au moins une lettre majuscule (A..Z) ;</li>
                    <li>Au moins une lettre minuscule (a..z) ;</li>
                    <li>Au moins un chiffre (0..9).</li>
                </ul>
            </li>
            <li>Les deux mots de passe entrés doivent être identique.</li>
        </ul>
        <form method="post" action="register.php">
			<label for='username'>Pseudo : </label>
			<div class='row'>
				<div class='col-xs-4'> 
					<input class='input-sm form-control' type='text' name='username' id='username' />
				</div>
			</div>
            
			<label for='email'>Adresse email : </label>
			<div class='row'>
				<div class='col-xs-4'> 
					<input class='input-sm form-control' type="email" name="email" id="email" />
				</div>
			</div>
			
			<label for='password'>Mot de passe : </label>
			<div class='row'>
				<div class='col-xs-4'> 
					<input class='input-sm form-control' type="password" name="password" id="password"/>
				</div>
			</div>
			
			<label for='confirmpwd'>Confirmez le mot de passe :</label>
			<div class='row'>
				<div class='col-xs-4'> 
					<input class='input-sm form-control' type="password" name="confirmpwd"  id="confirmpwd" />
				</div>
			</div>
			
            <br/>
			<input id='submit' type='submit' class="btn btn-success btn-lg" value="S’enregistrer">
            
        </form>
		<br/>
        <p>Retournez à la page d’<a href="/APP4_miseEnSituation/index.php">accueil</a>.</p>
    </div>
	
<?php
	include('./footer.php');
?>