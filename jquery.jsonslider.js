//JSONslider v.0.1.0
//http://www.github.com/dcdeiv/jsonslider
// GPLv2 http://www.gnu.org/licenses/gpl-2.0-standalone.html
(function($) {
    $.fn.jsonSlider = function(options) {
        var def = {
                json: undefined,
                Class: 'slider-active'
            },
            cfg = $.extend(true, def, options),
            store = cfg.json,
            active = cfg.Class,
            $wrap = $(this);

        $.getJSON(store, function(data) {
            var figs, first, i,
                arr = $.map(data, function(el) {
                    return el;
                });

            for (i = 0; i < arr.length; i++) {
            	var url = arr[i].url;
            	var img = $('<img src="'+ url +'">').load(function(){
            		var imgW = this.width,
            			imgH = this.height;
            			
            			img.attr({
            				width: imgW,
            				height: imgH
            			});
            	});
            	
            	$wrap.append( '<figure>' + img + '</figure>' );
            }

            figs = $wrap.children();
            first = figs.first();

            first.addClass(active);

            figs.not(first).hide();

            function slider(e) {
                var $next,
                    $active = $('.' + e);

                if ($active.next().length === 0) {
                    $next = figs.first();
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

            setTimeout(
                setInterval(function() {
                    slider(active);
                }, 4000), 5000);

        });
    };
})(jQuery);
