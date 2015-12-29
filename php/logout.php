<!DOCTYPE html>
<html lang="en">
<body>
    <?php
    session_start();
    session_unset();
    session_destroy();

    ?>
        <script>window.location.href = "../index.php";</script>

</body>
<?php include '../footer.php';?>
</html>
