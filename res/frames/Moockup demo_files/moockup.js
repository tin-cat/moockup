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

		var currentScreen;

		base.init = function() {
			// Priority of parameters : JS options > HTML data options > DEFAULT options
			base.options = o = $.extend({}, $.Moockup.defaults, base.$el.data(), options);
			
			$(base.el).addClass('moockup');

			if (o.isFullScreen)
				$(base.el).addClass('fullScreen');

			if (o.screens)
				base.setSetup(o.setup);
			else
				base.loadSetup(o.setupFileName);	

			$(window).on('resize', null, null, function() {
				base.reflow();
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

			// Add mockups
			$(screen.mockups).each(function (mockupIdx, mockup) {
				base.addMockup(screenIdx, mockup);				
			});

			base.addHeaderMenuItem(screenIdx, screen.title, function() {
				base.showScreen(screenIdx, true);
			});
		}

		base.addMockup = function(screenIdx, mockup) {
			var screen = base.getScreen(screenIdx);

			if (!base.getType(mockup.type)) {
				base.error('Wrong type "' + mockup.type + '"');
				return;
			}

			var mockupType = base.getType(mockup.type);

			var mockupElement =
				$('<div></div>', {id: 'mockup' + $(screen).attr('id') + '_' + screenIdx})
					.addClass('mockup')
					.addClass(mockup.type)
					.appendTo(screen);
			
			$('<img>', {src: mockupType.frameSrc})
				.addClass('frame')
				.appendTo(mockupElement);
			
			// var containerElement =
			// 	$('<div></div>')
			// 		.addClass('container')
			// 		.appendTo(mockupElement);
			
			// if (mockupType.containerPosition)
			// 	$(containerElement)
			// 		.css('top', mockupType.containerPosition.top + '%')
			// 		.css('bottom', mockupType.containerPosition.bottom + '%')
			// 		.css('left', mockupType.containerPosition.left + '%')
			// 		.css('right', mockupType.containerPosition.right + '%');

			// var frameElement =
			// 	$('<img>', {src: mockupType.frameSrc})
			// 		.addClass('frame')
			// 		.addClass(mockupType.orientation)
			// 		.appendTo(mockupElement);
			
			// if (mockup.maxHeightVMin)
			// 	$(mockupElement).css('max-height', mockup.maxHeightVMin + 'vmin');
			// else if (mockupType.maxHeightVMin)
			// 	$(mockupElement).css('max-height', mockupType.maxHeightVMin + 'vmin');

			// if (mockup.notchBackgroundColor && mockupType.notch) {
			// 	if (mockupType.notch.top) {
			// 		$(containerElement)
			// 			.css('padding-top', mockupType.notch.top.height + '%')
			// 			.css('background-color', mockup.notchBackgroundColor);
			// 	}
			// 	else
			// 	if (mockupType.notch.bottom) {
			// 		$(containerElement)
			// 			.css('padding-bottom', mockupType.notch.bottom.height + '%')
			// 			.css('background-color', mockup.notchBackgroundColor);
			// 	}
			// }

			// if (mockup.title) {
			// 	$('<div></div>').addClass('title').appendTo(mockupElement).html(mockup.title);
			// }

			// if (mockup.image) {
			// 	$(mockupElement).addClass('image');
			// 	$('<img>', {src: mockup.image}).addClass('frame').appendTo(containerElement);
			// }
		}

		base.getType = function(type) {
			return o.types[type];
		}

		base.getScreen = function(screenIdx) {
			return $('#screen' + screenIdx);
		}

		base.getMockup = function(screenIdx, mockupIdx) {
			return $('#mockup' + screenIdx + '_' + mockupIdx);
		}

		base.getMockups = function(screenIdx) {
			return $('> .mockup', base.getScreen(screenIdx));
		}

		base.showScreen = function(screenIdx, isAnimation) {
			var screen = base.getScreen(screenIdx);
			base.setLightOrDarkBackgroundClass(screen, base.el);
			var screenTopPosition = base.getScreen(screenIdx).offset().top + $(screens).scrollTop();
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
			currentScreen = screenIdx;
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

		base.reflow = function() {
			var scrollTop = $(screens).scrollTop();
			$('.screen', base.el).each(function(idx, element) {
				$('.screen', base.el).css('display', 'none');
				$('.screen', base.el).height();
				$('.screen', base.el).css('display', 'flex');
			});
			base.showScreen(currentScreen, false);
		}

		base.init();
	}

	$.Moockup.defaults = {
		isFullScreen: true, // Set it to true to make Moockup take the entire screen.
		setup: false, // If specific, this setup options will be used instead of reading the setup file.
		setupFileName: 'setup.json', // The setup file name
		types: {
			'MacDesktop': {
				'frameSrc': 'res/frames/imac.svg',
				'containerPosition': {
					"left": 4.2,
					"top": 4.1,
					"right": 4.2,
					"bottom": 33
				}
			},
			'iPhoneXPortrait': {
				'frameSrc': 'res/frames/iphone_x.svg',
				'containerPosition': {
					"left": 6.5,
					"top": 2.9,
					"right": 6.5,
					"bottom": 3
				},
				'notch': {
					'top': {
						'height': 7
					}
				}
			}
		},
		isCacheJson: false
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