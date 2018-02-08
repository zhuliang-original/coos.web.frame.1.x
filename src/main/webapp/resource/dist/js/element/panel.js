(function() {
	var html = '<div class="coos-col-12 coos-panel" >' + '<div class="coos-panel-header bordered">' + '<h3 class="coos-panel-title"> </h3>' + '<div class="coos-panel-menu">'
			+ '<div class=" coos-menu baseMinimizeBtn"> ' + '<i class="fa fa-minus"></i> ' + '</div>	' + '<div class=" coos-menu removePanelBtn"> ' + '<i class="fa fa-remove"></i> ' + '</div>'
			+ '</div>' + '</div>' + '' + '<div class="coos-panel-body">' + '</div>' + '' + '</div>';
	co.element.bind('panel', function($selector) {
		var type = $selector.attr('panel-type');
		// 列尺寸
		var columnsize = $selector.attr('column-size');
		var panelheight = $selector.attr('panel-height');
		var panelwidth = $selector.attr('panel-width');

		columnsize = columnsize || 12;
		columnsize = columnsize > 12 ? 12 : columnsize;
		var title = $selector.attr('coos-title');
		var panelClass = $selector.attr('coos-panel-class');
		var panelHeaderClass = $selector.attr('coos-panel-header-class');
		var panelBodyClass = $selector.attr('coos-panel-body-class');
		if (co.isEmpty(type)) {
			type = 1;
		}
		var panel = $(html);
		var content = panel.find('.coos-panel-body');
		if (!co.isEmpty(panelheight)) {
			content.css("height", panelheight);
			panel.addClass("fixed-height");
		}
		if (!co.isEmpty(panelwidth)) {
			panel.css("width", panelwidth);
			panel.addClass("fixed-width");
		}
		panel.find('.coos-panel-title').text(title);
		if (type == 1) {
			panel.addClass('coos-panel-light coos-panel-bd-top');
		} else if (type == 2) {
			panel.addClass('coos-panel-light ');
		} else if (type == 3) {
			panel.find('.coos-panel-header ').hide();
		} else if (type == 4) {
			panel.addClass('coos-panel-light ');
			panel.find('.coos-panel-header ').removeClass('bordered');
			panel.find('.coos-panel-title').html('&nbsp;');
		}
		panel.addClass('coos-col-' + columnsize);
		if (!co.isEmpty(panelClass)) {
			panel.addClass(panelClass);
		}
		if (!co.isEmpty(panelHeaderClass)) {
			panel.find('.coos-panel-header ').addClass(panelHeaderClass);
		}
		if (!co.isEmpty(panelBodyClass)) {
			panel.find('.coos-panel-body ').addClass(panelBodyClass);
		}
		$selector.before(panel);
		$selector.appendTo(content);

	});

	$(function() {
		$('html').on('click', '.coos-panel .removePanelBtn', function(e) {
			$(this).closest('.coos-panel').remove();
		});
		$('html').on('click', '.baseSetPanelColorBtn', function(e) {
			var $panel = $(this).closest('.coos-panel');
			var place = $(this).attr('coos-place');
			var color = $(this).attr('coos-color');
			place = co.isEmpty(place) ? '' : place;
			var places = place.split(',');
			var hasBody = false;
			$(places).each(function(index, place) {
				var $content = null;
				if (place == 'header') {
					$content = $panel.find('.coos-panel-header:first');
				} else if (place == 'body') {
					$content = $panel.find('.coos-panel-body:first');
					hasBody = true;
				} else {
					$content = $panel;
				}
				$content.removeClass('coos-bg-red coos-bg-green coos-bg-grey coos-bg-blue coos-bg-yellow  ');
				$content.addClass(color);
			});
			if (hasBody) {
				$panel.addClass('coos-panel-dark').removeClass('coos-panel-light');
			}
		});

		$('html').on('click', '.coos-panel .baseMinimizeBtn', function(e) {
			var content = $(this).closest('.coos-panel').find('.coos-panel-body');
			var $panel = $(this).closest('.coos-panel');
			if ((content).is(":hidden")) {
				content.slideDown('fast');
			} else {
				content.slideUp('fast');
			}
		});
	});

})();