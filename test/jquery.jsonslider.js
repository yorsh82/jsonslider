//JSONslider v.0.2.0
//http://www.github.com/dcdeiv/jsonslider
// GPLv2 http://www.gnu.org/licenses/gpl-2.0-standalone.html
(function($) {
	$.fn.jsonSlider = function(options) {
		var $wrapW, newHeight, wrap,
			def = {
				json: undefined,
				Class: 'slider-active',
				orientation: 'landscape', //'portrait'
				aspectRatio: '16:9'
			},
			cfg = $.extend(true, def, options),
			store = cfg.json,
			active = cfg.Class,
			orient = cfg.orientation,
			aspect = cfg.aspectRatio,
			$wrap = $(this),
			AR = aspect.split(':'),
			ARx = parseInt(AR[0]),
			ARy = parseInt(AR[1]),
			arI = ARx / ARy;

		$wrapW = $wrap.width();

		$wrap.append('<div>');
		wrap = $wrap.children();

		$(window).resize(function() {
			if ('landscape' === orient) {
				newHeight = $wrapW / arI;

				$wrap.height(newHeight);
			} else if ('portrait' === orient) {
				newHeight = $wrapW * arI;

				$wrap.height(newHeight);
			}

			wrap.css({
				position: 'relative',
				width: $wrapW,
				minHeight: newHeight,
				margin: '0 auto',
				padding: 0,
				backgroundColor: 'inherit',
				overflow: 'hidden'
			});
		});

		$.getJSON(store, function(data) {
			var $figs, first, i,
				arr = $.map(data, function(el) {
					return el;
				});

			for (i = 0; i < arr.length; i++) {
				wrap.append($('<figure><img src="' + arr[i].url + '" alt="' + arr[i].alt + '"/></figure>'));
			}

			$figs = wrap.children();

			$figs.children().height('height', newHeight);

			first = $figs.first();

			first.addClass(active);

			$figs.not(first).hide();

			function slider(e) {
				var $next,
					$active = $('.' + e);

				if ($active.next().length === 0) {
					$next = $figs.first();
				} else {
					$next = $active.next();
				}

				$active.fadeOut(1000, function() {
					$(this).removeClass(e);
				});
				$next.fadeIn(1000, function() {
					$(this).addClass(e);
				});
			}

			setTimeout(setInterval(function() {
				slider(active);
			}, 4000), 5000);

			$(window).resize();
		});
	};
})(jQuery);
