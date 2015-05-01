//JSONslider v.0.2.0
//http://www.github.com/dcdeiv/jsonslider
// GPLv2 http://www.gnu.org/licenses/gpl-2.0-standalone.html
(function($) {
	$.fn.jsonSlider = function(options) {
		var $parentW, $parentH, newHeight, $wrap,
			def = {
				json: undefined,
				Class: 'slider-active',
				orientation: 'landscape', //'portrait'
				aspectRatio: '16:9',
				css: {
					parent: {},
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
			cfg		= $.extend(true, def, options),
			store	= cfg.json,
			active	= cfg.Class,
			orient	= cfg.orientation,
			aspect	= cfg.aspectRatio,
			css		= cfg.css,
			$parent	= $(this),
			AR		= aspect.split(':'),
			ARx		= parseInt(AR[0]),
			ARy		= parseInt(AR[1]),
			arI		= ARx / ARy;

		$parentW = parseInt( $parent.css( 'width' ) );
		$parentH = parseInt( $parent.css( 'height' ) );
		
		console.log( $parentH );
		console.log( $parentW );

		$parent.append('<div>');
		$wrap = $parent.children();

		$(window).resize(function() {
		
			if ( $parentH === 0 ) {
				console.log( 'undefined' );
			} else {
				console.log( 'defined' );
			}
			
			if ('landscape' === orient) {
				newHeight = $parentW / arI;

				$wrap.height(newHeight);
			} else if ('portrait' === orient) {
				newHeight = $parentW * arI;

				$wrap.height(newHeight);
			}

			$wrap.css( css.wrap );
		});

		$.getJSON(store, function(data) {
			var $figs, $first, i, $img,
				arr = $.map(data, function(el) {
					return el;
				});

			for (i = 0; i < arr.length; i++) {
				$wrap.append($('<figure><img src="' + arr[i].url + '" alt="' + arr[i].alt + '"/></figure>'));
			}

			$figs = $wrap.children();
			$figs.css( css.figure );
			
			$img = $figs.each(function() {
				return $( this ).children();
				});
			
			console.log( $img );

			$first = $figs.first();

			$first.addClass( active );

			$figs.not( $first ).hide();

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
