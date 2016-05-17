<?php
    //include('include/header.php');
    include('controle/enregistrement.php');
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
            <table>
            <tr><td class="right">Pseudo: </td><td> <input type='text' name='username' id='username' /></td></tr>
            <tr><td class="right">Adresse email: </td><td><input type="email" name="email" id="email" /></td></tr>
            <tr><td class="right">Mot de passe: </td><td><input type="password" name="password" id="password"/></td></tr>
            <tr><td class="right">Confirmez le mot de passe: </td><td><input type="password" name="confirmpwd"  id="confirmpwd" /></td></tr>
            <tr><td class="right"><input type="submit" value="S’enregistrer"/> </td></tr>
            </table>
        </form>
        <p>Retournez à la page d’<a href="index.php">accueil</a>.</p>
    </div>