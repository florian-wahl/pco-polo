<!DOCTYPE html>
<html>
	<head>
		<title>Labyrinth</title>

		<link rel="stylesheet" type="text/css" href="style.css">

		<script src="js/phaser.min.js"></script>
		<script src="js/gyro.min.js"></script>

		<script src="js/boot.js"></script>
		<script src="js/preloader.js"></script>
		<script src="js/mainMenu.js"></script>
		<script src="js/levelSelect.js"></script>
		<script src="js/game.js"></script>
		<script src="js/won.js"></script>

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	</head>
	<script>
		document.ontouchmove = function(event){
			event.preventDefault();
		}
	</script>
	<body>
		<!--<a href="http://games-reachtheflag.rhcloud.com/">Portfolio</a>//-->
		<script type="text/javascript">
			function boot()
			{
				var game = new Phaser.Game(640, 960);

				game.state.add('boot', Main.Boot, true);
				game.state.add('preloader', Main.Preloader);
				game.state.add('mainMenu', Main.MainMenu);
				game.state.add('levelSelect', Main.LevelSelect);
				game.state.add('game', Main.Game);
				game.state.add('won', Main.Won);
			}

			window.onload = function ()
			{
				boot();
			}
		</script>
	</body>
</html>