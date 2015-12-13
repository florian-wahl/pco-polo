<!DOCTYPE html>
<html lang="en">
<?php include '../header.php';?>
<body>
    <?php
    session_start();
    session_unset();
    session_destroy();

    ?>
    <h4> Vous avez étez correctement déconnecté. Vous allez être redirigé automatiquement dans quelques secondes.
        <script>window.location.href = "../index.php";</script>

</body>
<?php include '../footer.php';?>
</html>
