//JSONslider v.0.3.0
//http://www.github.com/dcdeiv/jsonslider
// GPLv2 http://www.gnu.org/licenses/gpl-2.0-standalone.html
(function($) {
	$.fn.jsonSlider = function(options) {
		var $parentW, $parentH, $wrap,
			def = {
				json: undefined,
				Class: 'slider-active',
				aspectRatio: '16:9',
				css: {
					parent: {
						position: 'relative'
					},
					wrap: {
						position: 'relative',
						width: '100%',
						height: '100%',
						margin: '0 auto',
						padding: 0,
						backgroundColor: 'inherit',
						overflow: 'hidden'
					},
					figure: {
						position: 'absolute'
					},
					img: {
						width: 'auto',
						maxWidth: '100%',
						lineHeight: 0,
						margin: '0 auto'
					}
				}
			},
			cfg = $.extend(true, def, options),
			store = cfg.json,
			active = cfg.Class,
			aspect = cfg.aspectRatio,
			css = cfg.css,
			$parent = $(this),
			AR = aspect.split(':'),
			ARx = parseInt(AR[0]),
			ARy = parseInt(AR[1]),
			arI = ARx / ARy;

		$parentW = parseInt($parent.css('width'));
		$parentH = parseInt($parent.css('height'));

		$parent.append('<div>');
		$wrap = $parent.children();

		$(window).resize(function() {
			var parentStyle = {
					height: $parentW / arI
				},
				newStyle = $.extend({}, css.parent, parentStyle);

			if ($parentH === 0) {
				$parent.css(newStyle);
			}

			$wrap.css(css.wrap);
		});

		$.getJSON(store, function(data) {
			var $figs, $first, i,
				arr = $.map(data, function(el) {
					return el;
				});

			for (i = 0; i < arr.length; i++) {
				$wrap.append($('<figure><img src="' + arr[i].url + '" alt="' + arr[i].alt + '"/></figure>'));
			}

			$figs = $wrap.children();
			$figs.css(css.figure);

			$first = $figs.first();
			$first.addClass(active);

			$figs.not($first).hide();

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
