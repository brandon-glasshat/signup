<?php
  $data = $_POST['data'];
?>
<!DOCTYPE html>
<html lang="en">
	<head>
    <meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Signup Walkthrough | Glasshat</title>

		<!-- CSS -->
		<link href="assets/css/normalize.css" rel="stylesheet"></link>
		<link href="assets/css/theme.css" rel="stylesheet"></link>
		<link href="assets/css/responsive.css" rel="stylesheet"></link>
		<link href="assets/css/hopscotch.css" rel="stylesheet"></link>
		<link href="assets/css/tour.css" rel="stylesheet"></link>

		<!-- Fonts -->
		<link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'>
		<script src="https://use.fontawesome.com/71a11b95d2.js"></script>

		<!-- Scripts -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
		<script src="assets/js/utils.js"></script>
		<script src="assets/js/create.js"></script>
		<script src="assets/js/tracking.js"></script>

		<!-- Retrieve and store data from previous page -->
		<script> creator.tempStore = <?php echo $data ?>; </script>

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>

	<body class="bg-color">
		<header class="header walkthrough-header">
			<img class="logo" src="assets/img/logo-color.png">
		</header><!-- .header -->
		<div class="walkthrough-timer timer">
			<img src="assets/img/walkthrough-loader.gif" />
			<div class="timer-complete">
				<div class="shape"></div>
				<i class="tick-white hidden"></i>
			</div><!-- .timer-complete -->
			<div class="wstep wstep2">Crunching data</div>
			<div class="wstep wstep3">Creating actions</div>
			<div class="wstep wstep4">Generating plan</div>
			<div class="wstep wstep5"><a id="ready" class="ready-class" href="walkthrough.php#">READY. LETS GO!</a></div>
			<div class="bubble bubble1 orange"></div>
			<div class="bubble bubble2 orange"></div>
			<div class="bubble bubble3 red"></div>
			<div class="bubble bubble4 orange"></div>
			<div class="bubble bubble5 red"></div>
			<div class="bubble bubble6 orange"></div>
			<div class="bubble bubble7 red"></div>
			<div class="bubble bubble8 red"></div>
			<div class="bubble bubble9 orange"></div>
			<div class="bubble bubble10 orange"></div>
			<div class="bubble bubble11 red"></div>
			<div class="bubble bubble12 orange"></div>
			<div class="bubble bubble13 red"></div>
			<div class="bubble bubble14 orange"></div>
			<div class="bubble bubble15 orange"></div>
			<div class="bubble bubble16 red"></div>
			<div class="bubble bubble17 red"></div>
			<div class="bubble bubble18 red"></div>
		</div><!-- .walkthrough-timer -->
		<div class="walkthrough">
			<div class="walkthrough-wrapper">
				<!--<h2>While you’re waiting take a tour of our dashboard</h2> -->
					<div class="walkthrough-area" id="screenshot">
						<div class="bg-image" id="middle"></div>
						<div class="bg-image" id="action"></div>
						<div class="bg-image" id="actiondesc"></div>
						<div class="bg-image" id="exporttocsv"></div>
						<div class="bg-image" id="actionstab"></div>
						<div class="bg-image" id="filter"></div>
						<div class="bg-image" id="healthcheck"></div>
						<div class="bg-image" id="performance"></div>
					</div>
				<script src="assets/js/hopscotch.js"></script>
				<script src="assets/js/tour.js"></script>
				<!-- .walkthrough-area -->
				<div class="skip ready-class action"><a href="walkthrough.php#">SKIP TOUR</a></div>
			</div><!-- .walkthrough-wrapper -->
		</div><!-- .walkthrough -->

		<div class="keyword-popup">
			<div class="keyword-popup-inner">
				<h2>One last thing...</h2>
				<p>
          Below is a keyword we've detected as potentially relavent for your website. Doesn't look right?
          Lets work together to improve it. <i class="question-mark"></i><br><br>
				  If you have a specific keyword you want to target, you can edit it below.</p>
				<form onsubmit="return false;" novalidate>
					<input type="text" name="keyword" id="user-kw">
					<input type="submit" name="keyword-submit" value="PLEASE WAIT..." id="user-kw-submit">
				</form>
        <div class='question'>
          <div class='question-container'>
            <h3 class='hopscotch-title'>What is a Keyword?</h3>
            <div class='question-content'>
            A Keyword is word or phrase that customers type into Google when they're looking for your business.
            </div>
          </div>
          <div class='question-arrow-container arrow left'>
            <div class='question-arrow-border'></div>
            <div class='question-arrow'></div>
          </div>
        </div> <!-- .question -->
			</div><!-- .keyword-popup-inner -->
		</div><!-- .keyword-popup -->
	<div class="mask"></div>
	</body>
</html>
