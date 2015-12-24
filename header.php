<head>
    <meta charset="UTF-8">
    <title>POLO - Air France</title>

    <!-- Include meta tag to ensure proper rendering and touch zooming -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <!-- Au dessus : désactive le zoom
    En dessous : désactive les on touch move (zoom, pinch, scrolling) -->
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script>
        document.ontouchmove = function(event){
            event.preventDefault();
        }
    </script>

    <link rel="manifest" href="/manifest.json">

    <!-- CSS -->
    <link rel="stylesheet" href="css/polo.css">
    <link rel="stylesheet" href="css/formulaire.css">
    <link rel="stylesheet" href="css/menu.css">
    <link rel="stylesheet" href="css/pages.css">


</head>