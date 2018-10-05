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

		base.init = function() {
			// Priority of parameters : JS options > HTML data options > DEFAULT options
			base.options = o = $.extend({}, $.Moockup.defaults, base.$el.data(), options);
			
			$(base.el).addClass("jQueryMoockup");
		}

		base.init();
	}

	$.Moockup.defaults = {
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