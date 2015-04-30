(function($) {
	$.fn.jsonSlider = function(options) {
		var def = {
				json: undefined,
				Class: 'slider-active'
			},
			cfg = $.extend(true, def, options),
			store = cfg.json,
			$wrap = $(this);

		$.getJSON(store, function(data) {
			var figs, first, i,
				arr = $.map(data, function(el) {
					return el;
				});

			for (i = 0; i < arr.length; i++) {
				$wrap.append($('<figure><img src="' + arr[i].url + '" alt="' + arr[i].alt + '"/></figure>'));
			}

			figs = $wrap.children();
			first = figs.first();

			first.addClass( Class );

			figs.not(first).hide();

			function slider() {
				var $next,
					$active = $( Class );
					
					console.log( Class );

				if ($active.next().length === 0) {
					$next = figs.first();
				} else {
					$next = $active.next();
				}

				$active.fadeOut(1000, function() {
					$(this).removeClass( Class );
				});
				$next.fadeIn(1000, function() {
					$(this).addClass( Class );
				});
			}

			setTimeout(
				setInterval(function() {
					slider();
				}, 4000), 5000);

		});
	};
})(jQuery);
