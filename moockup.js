/*
	 Moockup v0.1
	 https://github.com/tin-cat/moockup
	 A jQuery plugin by Tin.cat to present your drafts, designs or mockups to your client in a professional way while being in control of the way it's presented, and keeping the value and "wow" effect your work deserves.
 */

(function($){

	$.Moockup = function(el, options) {
		var base = this, o;
			
		base.el = el;
		base.$el = $(el);

		base.$el.data('Moockup', base);

		var header, headerMenu, footer, screens;

		base.init = function() {
			// Priority of parameters : JS options > HTML data options > DEFAULT options
			base.options = o = $.extend({}, $.Moockup.defaults, base.$el.data(), options);
			
			$(base.el).addClass('moockup');

			if (o.isFullScreen)
				$(base.el).addClass('fullScreen');

			if (o.setup)
				base.setSetup(o.setup);
			else
				base.loadSetup(o.setupFileName);

			$(window).resize(function() {
				base.fitAllMockups();
				base.showScreen(currentScreenIdx, false);
			});
		}

		base.isAttr = function(attrName) {
			return typeof( $(base.el).attr(attrName) ) != 'undefined'
		}

		base.loadSetup = function(fileName) {
			$.ajax({
				cache: o.isCacheJson,
				url: fileName,
				dataType: "json",
				success: function(data) {
					base.setSetup(data);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					base.error('Error loading setup file \'' + fileName + '\' (' + textStatus + ': ' + errorThrown + ')');
				}
			});
		}

		base.reset = function() {
			$('> div', base.el).remove();
		}

		base.setSetup = function(data) {
			if (!data.screens) {
				base.error('No screens specified');
				return;
			}

			base.reset();

			if (data.headerTitle || data.screens.length > 1) {
				$(base.el).addClass('withHeader');
				header = $('<div></div>').addClass('header').appendTo(base.el);
				
				if (data.headerTitle)
					$('<div></div>')
						.addClass('title')
						.appendTo(header)
						.html(data.headerTitle);

				headerMenu =
					$('<div></div>')
						.addClass('menu')
						.appendTo(header);
			}

			if (data.footer) {
				$(base.el).addClass('withFooter');
				footer =
					$('<div></div>')
						.addClass('footer')
						.appendTo(base.el)
						.html(data.footer);
			}

			screens =
				$('<div></div>')
					.addClass('screens')
					.appendTo(base.el);

			if (data.pageTitle)
				document.title = data.pageTitle;

			if (data.backgroundColor)
				$(base.el).css('background-color', data.backgroundColor);
			
			base.setLightOrDarkBackgroundClass(base.el, base.el);

			base.addScreens(data.screens);

			base.showScreen(0, false);
		}

		base.addHeaderMenuItem = function(id, title, onClick) {
			$('<div></div>')
				.addClass('item')
				.addClass('id' + id)
				.appendTo(headerMenu)
				.html(title)
				.on('click', onClick);
		}

		base.setHeaderMenuSelectedItem = function(id) {
			$('> .item', headerMenu).removeClass('selected');
			$('> .item.id' + id, headerMenu).addClass('selected');
		}

		base.message = function(type, text) {
			$(base.el).append('<div class="message ' + type + '">' + text + '</div>');
		}

		base.error = function(description) {
			base.message('error', description);
		}

		base.addScreens = function(screens) {
			$(screens).each(function (idx, screen) {
				base.addScreen(idx, screen);
			});
			base.fitAllMockups();
		}

		base.addScreen = function(screenIdx, screen) {
			var screenElement = $('<div></div>', {id: 'screen' + screenIdx}).addClass('screen').appendTo(screens);
			
			if (screen.backgroundColor) {
				$(screenElement).css('background-color', screen.backgroundColor);
				base.setLightOrDarkBackgroundClass(screenElement, screenElement);
			}
			else
				base.setLightOrDarkBackgroundClass(base.el, screenElement);
			
			if (!screen.mockups) {
				base.error('No mockups on screen ' + (screenIdx + 1));
				return;
			}

			// Add menu item
			base.addHeaderMenuItem(screenIdx, screen.title, function() {
				base.showScreen(screenIdx, true);
			});

			// Add mockups
			$(screen.mockups).each(function (mockupIdx, mockup) {
				base.addMockup(screenIdx, mockup);
			});
		}

		base.addMockup = function(screenIdx, mockup) {
			var screenElement = base.getScreen(screenIdx);

			if (!base.getType(mockup.type)) {
				base.error('Wrong type "' + mockup.type + '"');
				return;
			}

			var mockupType = base.getType(mockup.type);

			var mockupElement =
				$('<div></div>', {id: 'mockup' + $(screenElement).attr('id') + '_' + screenIdx})
					.addClass('mockup')
					.addClass(mockup.type)
					.data('type', mockup.type)
					.css('margin-right', o.gapPercentage + '%')
					.appendTo(screenElement);
			
			var containerElement =
				$('<div></div>')
					.addClass('container')
					.appendTo(mockupElement);
			
			if (mockupType.containerPosition)
				$(containerElement)
					.css('top', mockupType.containerPosition.top + '%')
					.css('bottom', mockupType.containerPosition.bottom + '%')
					.css('left', mockupType.containerPosition.left + '%')
					.css('right', mockupType.containerPosition.right + '%');
			
			if (mockup.maxHeightVMin)
				$(mockupElement).css('max-height', mockup.maxHeightVMin + 'vmin');
			else if (mockupType.maxHeightVMin)
				$(mockupElement).css('max-height', mockupType.maxHeightVMin + 'vmin');

			if (mockup.notchBackgroundColor && mockupType.notch) {
				if (mockupType.notch.top) {
					$(containerElement)
						.css('padding-top', mockupType.notch.top.height + '%')
						.css('background-color', mockup.notchBackgroundColor);
				}
				else
				if (mockupType.notch.bottom) {
					$(containerElement)
						.css('padding-bottom', mockupType.notch.bottom.height + '%')
						.css('background-color', mockup.notchBackgroundColor);
				}
			}

			if (mockup.title) {
				$('<div></div>').addClass('title').appendTo(mockupElement).html(mockup.title);
			}

			if (mockup.image) {
				$(mockupElement).addClass('image');
				$('<img>', {src: mockup.image}).addClass('frame').appendTo(containerElement);
			}

			$('<img>', {src: o.resBaseDir + mockupType.frameSrc})
				.addClass('frame')
				.appendTo(mockupElement);
		}

		base.fitAllMockups = function() {
			$('> .screen', screens).each(function(screenIdx, screen) {
				base.fitMockups(screenIdx);
			});
		}

		base.fitMockups = function(screenIdx) {
			var screenElement = base.getScreen(screenIdx);
			var mockups = base.getMockups(screenIdx);

			var numberOfMockups = mockups.length;

			var screenWidth = $(screenElement).width();
			var screenHeight = $(screenElement).height();
			
			var baseMockupWidth = screenWidth / numberOfMockups;

			var mockupType, aspectRatio, width, marginTop;
			$(mockups).each(function(mockupIdx, mockup) {
				mockupType = base.getType($(mockup).data('type'));
				aspectRatio = mockupType.width / mockupType.height;

				// Try to fit mockup by width
				width = baseMockupWidth - (baseMockupWidth * (o.gapPercentage * 2) / 100);
				height = base.getAspectRatioHeightForGivenWidth(aspectRatio, width);
				if (height >= screenHeight) {
					// If resulting size is higher than available height, fit it by height
					height = screenHeight;
					width = base.getAspectRatioWidthForGivenHeight(aspectRatio, height);
				}

				// Center vertically by adding a margin-top
				marginTop = (screenHeight / 2) - (height / 2);
				
				$(mockup)
					.css('width', width)
					.css('height', height)
					.css('margin-top', marginTop)
					.css('display', 'inline-block');
			});
		}

		base.getAspectRatioWidthForGivenHeight = function(aspectRatio, height) {
			return height * aspectRatio;
		}

		base.getAspectRatioHeightForGivenWidth = function(aspectRatio, width) {
			return width / aspectRatio;
		}

		base.getType = function(type) {
			return o.types[type];
		}

		base.getScreen = function(screenIdx) {
			return $('#screen' + screenIdx, base.el);
		}

		base.getMockup = function(screenIdx, mockupIdx) {
			return $('#mockup' + screenIdx + '_' + mockupIdx, base.el);
		}

		base.getMockups = function(screenIdx) {
			return $('> .mockup', base.getScreen(screenIdx));
		}

		base.showScreen = function(screenIdx, isAnimation) {
			var screen = base.getScreen(screenIdx);
			base.setLightOrDarkBackgroundClass(screen, base.el);
			var screenTopPosition = base.getScreen(screenIdx).position().top + $(screens).scrollTop();
			$(screens)
				.stop()
				.animate(
					{
						scrollTop: screenTopPosition
					},
					isAnimation ? 500 : 0,
					'swing'
				);
			base.setHeaderMenuSelectedItem(screenIdx);
			currentScreenIdx = screenIdx;
		}

		// Function by https://codepen.io/andreaswik
		base.isLightBackgroundColor = function(element){
			var r, b, g, hsp, a = $(element).css('background-color');

			if (a.match(/^rgb/)) {
				a = a.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
				r = a[1];
				g = a[2];
				b = a[3];
			} else {
				a = +("0x" + a.slice(1).replace( // thanks to jed : http://gist.github.com/983661
					a.length < 5 && /./g, '$&$&'
				));
				r = a >> 16;
				b = a >> 8 & 255;
				g = a & 255;
			}
			
			hsp = Math.sqrt( // HSP equation from http://alienryderflex.com/hsp.html
				0.299 * (r * r) +
				0.587 * (g * g) +
				0.114 * (b * b)
			);
			return hsp > 127.5;
		}

		base.setLightOrDarkBackgroundClass = function(elementToTest, elementToSet) {
			$(elementToSet).removeClass('lightBackground').removeClass('darkBackground');
			$(elementToSet).addClass(base.isLightBackgroundColor(elementToTest) ? 'lightBackground' : 'darkBackground');
		}

		base.init();
	}

	$.Moockup.defaults = {
		isFullScreen: false, // If set to true, the Moockup will take the entire available screen. If left to false, the Moockup will take the size of the div it's been created.
		setup: false, // If specified, this setup options will be used instead of reading the setup file. A JSON object must be passed, just like in the file setup.json.
		setupFileName: 'setup.json', // The setup file name to read if no setup option is specified.
		resBaseDir: 'res/', // The base directory where Moockup's own resources are located. Change it if you're calling Moockup from a directory different than its own.
		gapPercentage: 5, // The gap in between mockups on the same screen, expressed as a percentage relative to the screen's width.
		isCacheJson: false, // Whether to cache the setup file ajax query or not.
		types: {
			'MacDesktop': {
				'frameSrc': 'frames/imac.svg',
				'width': 4901,
				'height': 3980.6,
				'containerPosition': {
					"left": 4.2,
					"top": 4.2,
					"right": 4.2,
					"bottom": 34.5
				}
			},
			'iPhoneXPortrait': {
				'frameSrc': 'frames/iphone_x.svg',
				'width': 2328.8,
				'height': 4651.9,
				'containerPosition': {
					"left": 6.3,
					"top": 2.9,
					"right": 6.3,
					"bottom": 3
				},
				'notch': {
					'top': {
						'height': 7
					}
				}
			},
			'Tablet': {
				'frameSrc': 'frames/tablet.svg',
				'width': 2617,
				'height': 3605.81,
				'containerPosition': {
					"left": 3.5,
					"top": 6.6,
					"right": 3.5,
					"bottom": 8.6
				}
			},
			'MacBook': {
				'frameSrc': 'frames/macbook.svg',
				'width': 2429.5,
				'height': 1438.5,
				'containerPosition': {
					"left": 11.3,
					"top": 5.4,
					"right": 11.3,
					"bottom": 13.3
				}
			}
		}
	};

	$.fn.Moockup = function(options, params) {
		return this.each(function(){
			var me = $(this).data('Moockup');
			if ((typeof(options)).match('object|undefined'))
				new $.Moockup(this, options);
			else
				eval('me.'+options)(params);
		});
	}

})(jQuery);