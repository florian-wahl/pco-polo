<footer>
    <br>
    &copy; 2015<?php if( date("Y") != 2015) {
        echo " - " . date("Y") . " POLO - Air France - INSA Lyon";
    }
    else{
        echo " POLO - Air France - INSA Lyon";
    }?>
    &mdash; <a id="credits" href="credits.php">Crédits</a>
    <?php $poloDB = null; ?>
    <br>
</footer>