<?php

	include "res/common.php";

	// Build how to use
	$content .= "
		<div class=\"contentWrapper\"><div class=\"content\">
			<a name=\"basicUsage\"></a>
			<h1>Key features</h1>
			<ul class=\"fancy\">
				<li>Keep control of the way your client sees your drafts and mockups.</li>
				<li>Choose between desktop/laptop, phone and tablet themes for your mockups, and combine them in multiple screens.</li>
				<li>Upload your presentation to your web server and share the URL for easy access, no PHP nor database needed.</li>
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
			<a name=\"howto\"></a>
			<h1>How to create your Moockup</h1>
			<ul class=\"fancy\">
				<li>
					Download <a href=\"https://github.com/tin-cat/moockup\">Moockup</a>, unzip it and rename the folder to your liking.
				</li>
				<li>
					Copy your mockup PNG or JPG files inside the <i>images</i> folder.
				</li>
				<li>
					Edit the <i>setup.json</i> file to your needs. Take a look at the default provided file or read the <a href=\"#jsonfile\">setup.json documentation</a> section to discover all the available options.
				</li>
				<li>
					Preview your Moockup locally by opening the <i>index.html</i> file in your browser
				</li>
				<li>
					Upload the entire folder to your server and it's ready to share! <i>(You can omit the examples folder)</i>
				</li>
			</ul>
		</div></div>

		<hr>

		<div class=\"contentWrapper\"><div class=\"content\">
			<a name=\"jsonfile\"></a>
			<h1>setup.json documentation</h1>
			<p>
				The setup.json contains all the specs of your Moockup: Edit it to compose your Moockup, and preview it by opening the <i>index.html</i> locally in your browser.
			</p>
			<p>
				If you're familiar with the JSON format, take a look at the provided setup.json file and you'll easily understand how it works. If you don't know what JSON is, don't worry, it's quite easy to understand and a fast way to create your Moockup.
			</p>
			<p>
				Now, some basics you should understand:
			</p>
			<p><b>Your Moockup can be divided in multiple screens. The user can navigate between screens using the top menu:</b></p>

			[screenshot here]

			<p><b>Each screen can have more than one mockups:</b></p>

			[screenshot here]

			<p><b>Each mockup in your screens can be of any of the different available types:</b></p>

			[screenshot here]

			<p>
				Now, let's start creating your Moockup. This <i>setup.json</i> file is a very minimal example of a Moockup containing only one screen, with only one mockup:
			</p>

			<code class=\"isolated html\">".formatHtml("
{
	\"screens\": [
		{
			\"title\": \"Home\",
			\"mockups\": [
				{
					\"type\": \"MacDesktop\",
					\"image\": \"images/mockup.jpg\"
				}
			]
		}
	]
}
			")."</code>

			<p>
				The title of the screen is <i>\"Home\"</i>, and the only mockup it contains is a <i>\"MacDesktop\"</i> type mockup, and the image of the mockup is <i>\"images/mockup.jpg\"</i>. Got it? A Moockup with this <i>setup.json</i> would like this:				
			</p>

			[screenshot here]

			<p>
				Now let's add another mockup:
			</p>

			<code class=\"isolated html\">".formatHtml("
{
	\"screens\": [
		{
			\"title\": \"Home\",
			\"mockups\": [
				{
					\"type\": \"MacDesktop\",
					\"image\": \"images/mockup.jpg\"
				},
				[b]{
					\"type\": \"iPhoneXPortrait\",
					\"image\": \"images/mockup_mobile.jpg\"
				}[/b]
			]
		}
	]
}
			")."</code>

			<p>
				Pay special attention to colons: When you have multiple <span class=\"inlineCode\">{ &hellip; }</span> blocks, they must be separated by colons.
			</p>

			<p>
				It would like this this:
			</p>

			[screenshot here]

			<p>
				See how we did it? Simply adding another <span class=\"inlineCode\">{ &hellip; }</span> block inside the <span class=\"inlineCode\">\"mockups\": [ &hellip; ]</span> section was enough. This time it's an <i>\"iPhoneXPortrait\"</i> type mockup, and the image is <i>\"images/mockup_mobile.jpg\"</i>. You can add more mockups to each screen, but more than 3 or 4 will look too crumpled.
			</p>

			<p>
				Now let's add another screen to your Moockup, take a look:
			</p>

			<code class=\"isolated html\">".formatHtml("
{
	\"screens\": [
		{
			\"title\": \"Home\",
			\"mockups\": [
				{
					\"type\": \"MacDesktop\",
					\"image\": \"images/mockup.jpg\"
				},
				{
					\"type\": \"iPhoneXPortrait\",
					\"image\": \"images/mockup_mobile.jpg\"
				}
			]
		},
		[b]{
			\"title\": \"About us\",
			\"mockups\": [
				{
					\"type\": \"MacDesktop\",
					\"image\": \"images/about_us.jpg\"
				}
			]
		}[/b]
	]
}
			")."</code>

			<p>
				See? This time we've added an entire screen block instead of a mockup block. This new screen is titled <i>\"About us\"</i> and it contains one mockup. It should look something like this:
			</p>

			[screenshot here]

			<p>
				See how a menu appeared at the top? Now the user can navigate through the screens in your Moockup. You can add as many screens as you need, but take into account loading times of your mockup JPGs and PNGs, remember your client will see this as a webpage on his browser, via his internet connection!
			</p>

			<p>
				If you're not fluent in JSON, take special care also with the <span class=\"inlineCode\">{ &hellip; }</span> and <span class=\"inlineCode\">[ &hellip; ]</span> brackets. See how in the examples we never forget to close them, even when we have bracket blocks inside other bracket blocks!
			</p>

			<p>
				Now that you've got the basics, let's take a look at some interesting customization options. First, let's set a background color for each screen. Do it simply by adding a <i>\"backgroundColor\"</i> item to your screen block:
			</p>

			<code class=\"isolated html\">".formatHtml("
{
	\"screens\": [
		{
			\"title\": \"Home\",
			[b]\"backgroundColor\": \"#E01A4F\",[/b]
			\"mockups\": [
				{
					\"type\": \"MacDesktop\",
					\"image\": \"images/mockup.jpg\"
				},
				{
					\"type\": \"iPhoneXPortrait\",
					\"image\": \"images/mockup_mobile.jpg\"
				}
			]
		},
		{
			\"title\": \"About us\",
			[b]\"backgroundColor\": \"#F15946\",[/b]
			\"mockups\": [
				{
					\"type\": \"MacDesktop\",
					\"image\": \"images/about_us.jpg\"
				}
			]
		}
	]
}
			")."</code>

		</div>

		<hr>
	";

	pattern([
		"title" => "Moockup",
		"header" => "Moockup",
		"headerSubtitle" => "with <div class=\"love\"></div> by <a href=\"http://tin.cat\">tin.cat</a> · download on <a href=\"https://github.com/tin-cat/jquery-mockup\">Github</a> · see <a href=\"#examples\">examples</a>",
		"headerSubSubtitle" => "A web tool by Tin.cat to present your drafts, designs or mockups to your client in a professional way while being in control of the way it's presented, and keeping the value and \"wow\" effect your work deserves.",
		"footer" => "with <div class=\"love\"></div> by <a href=\"http://tin.cat\">tin.cat</a>",
		"mosaic" => $mosaic,
		"content" => $content
	]);
