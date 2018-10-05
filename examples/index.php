<?php

	include "res/common.php";

	// Build how to use
	$content .= "
		<div class=\"contentWrapper\"><div class=\"content\">
			<a name=\"basicUsage\"></a>
			<h1>Key features</h1>
			<ul class=\"fancy\">
				<li>Keep control of the way your drafts and mockups will be shown to your client.</li>
				<li>Choose between desktop/laptop, Mac/PC, iPhone/Android and tablet themes for your mockup.</li>
				<li>Upload your presentation to your web server and share the URL for easy access.</li>
			</ul>
		</div></div>

		<hr>

		<div class=\"contentWrapper\"><div class=\"content\">
			<a name=\"basicUsage\"></a>
			<h1>Version history</h1>
			<ul class=\"fancy\">
				<li>
					<b>v0.1</b><br>
					First official release!
				</li>
			</ul>
		</div></div>

		<hr>

		<div class=\"contentWrapper\"><div class=\"content\">
			<a name=\"basicUsage\"></a>
			<h1>Basic usage</h1>
			<ul class=\"fancy\">
				<li>
					Download <a href=\"https://github.com/tin-cat/moockup\">Moockup</a>, unzip it and rename the folder to your liking.
				</li>
				<li>
					Copy your mockup PNG or JPG files inside the <i>images</i> folder.
				</li>
			</ul>
		</div></div>

		<hr>
	";

	pattern([
		"title" => "Moockup",
		"header" => "Moockup",
		"headerSubtitle" => "with <div class=\"love\"></div> by <a href=\"http://tin.cat\">tin.cat</a> · download on <a href=\"https://github.com/tin-cat/jquery-mockup\">Github</a> · see <a href=\"#examples\">examples</a>",
		"headerSubSubtitle" => "An web tool by Tin.cat to present your drafts, designs or mockups to your client in a professional way while being in control of the way it's presented, and keeping the value and \"wow\" effect your work deserves.",
		"footer" => "with <div class=\"love\"></div> by <a href=\"http://tin.cat\">tin.cat</a>",
		"mosaic" => $mosaic,
		"content" => $content
	]);
