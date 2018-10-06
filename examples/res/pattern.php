<!DOCTYPE HTML>
<head>
	<title><?= $title ? $title : "Moockup" ?></title>
	<meta name="description" content="<?= $description ? $description : "A web tool by Tin.cat to present your drafts, designs or mockups to your client in a professional way while being in control of the way it's presented, and keeping the value and \"wow\" effect your work deserves." ?>" />
	<meta name="keywords" content="<?= $keywords ? $keywords : "mockup,draft,web,wireframe,client,present,presenter,tool,javascript" ?>" />
	<meta name="distribution" CONTENT="global" />
	<link rel="canonical" href="https://moockup.tin.cat" />
	<link rel="stylesheet" type="text/css" href="res/css/main.css?v=7"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="moockup.css?v=1"/>
	<script type="text/javascript" src="moockup.js?v=1"></script>
	<link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
</head>
<body>

<?= $header ? "<header><h1>$header</h1>".($headerSubtitle ? "<h2>$headerSubtitle</h2>" : null)."".($headerSubSubtitle ? "<h3>$headerSubSubtitle</h3>" : null)."</header>" : null ?>

<?= $mosaic ? $mosaic : null ?>

<?= $content ? $content : null ?>

<?= $footer ? "<div class=\"footer\">$footer</div>" : null ?>

<?php if (file_exists("res/additional_footer.php")) include "res/additional_footer.php"; ?>

</body>
</html>