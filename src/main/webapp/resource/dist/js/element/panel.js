(function() {
	var html = '<div class="core-column-12 core-panel" >' + '<div class="core-panel-header bordered">' + '<h3 class="core-panel-title"> </h3>' + '<div class="core-panel-menu">'
			+ '<div class=" core-menu baseMinimizeBtn"> ' + '<i class="fa fa-minus"></i> ' + '</div>	' + '<div class=" core-menu removePanelBtn"> ' + '<i class="fa fa-remove"></i> ' + '</div>'
			+ '</div>' + '</div>' + '' + '<div class="core-panel-body">' + '</div>' + '' + '</div>';

	co.element.initElementPanel = function(content) {
		content = content || $('body');
		// 获取所有需要组合的元素
		var elements = $(content).find('.core-need-init-panel');
		elements.each(function(index, element) {
			if (co.element.isInited(element, 'core-need-init-panel')) {
				return;
			}
			element = $(element);
			var type = element.attr('core-panel-type');
			// 列尺寸
			var columnsize = element.attr('column-size');
			var coreheight = element.attr('core-height');
			var corewidth = element.attr('core-width');

			columnsize = columnsize || 12;
			columnsize = columnsize > 12 ? 12 : columnsize;
			var title = element.attr('core-title');
			var panelClass = element.attr('core-panel-class');
			var panelHeaderClass = element.attr('core-panel-header-class');
			var panelBodyClass = element.attr('core-panel-body-class');
			if (co.isEmpty(type)) {
				type = 1;
			}
			var panel = $(html);
			var content = panel.find('.core-panel-body');
			if (!co.isEmpty(coreheight)) {
				content.css("height", coreheight);
				panel.addClass("fixed-height");
			}
			if (!co.isEmpty(corewidth)) {
				panel.css("width", corewidth);
				panel.addClass("fixed-width");
			}
			panel.find('.core-panel-title').text(title);
			if (type == 1) {
				panel.addClass('core-panel-light core-panel-bd-top');
			} else if (type == 2) {
				panel.addClass('core-panel-light ');
			} else if (type == 3) {
				panel.find('.core-panel-header ').hide();
			} else if (type == 4) {
				panel.addClass('core-panel-light ');
				panel.find('.core-panel-header ').removeClass('bordered');
				panel.find('.core-panel-title').html('&nbsp;');
			}
			panel.addClass('core-column-' + columnsize);
			if (!co.isEmpty(panelClass)) {
				panel.addClass(panelClass);
			}
			if (!co.isEmpty(panelHeaderClass)) {
				panel.find('.core-panel-header ').addClass(panelHeaderClass);
			}
			if (!co.isEmpty(panelBodyClass)) {
				panel.find('.core-panel-body ').addClass(panelBodyClass);
			}
			element.before(panel);
			element.appendTo(content);

		});
	}

	$(function() {
		$('html').on('click', '.core-panel .removePanelBtn', function(e) {
			$(this).closest('.core-panel').remove();
		});
		$('html').on('click', '.coreSetPanelColorBtn', function(e) {
			var $panel = $(this).closest('.core-panel');
			var place = $(this).attr('core-place');
			var color = $(this).attr('core-color');
			place = co.isEmpty(place) ? '' : place;
			var places = place.split(',');
			var hasBody = false;
			$(places).each(function(index, place) {
				var $content = null;
				if (place == 'header') {
					$content = $panel.find('.core-panel-header:first');
				} else if (place == 'body') {
					$content = $panel.find('.core-panel-body:first');
					hasBody = true;
				} else {
					$content = $panel;
				}
				$content.removeClass('core-bg-red core-bg-green core-bg-grey core-bg-blue core-bg-yellow  ');
				$content.addClass(color);
			});
			if (hasBody) {
				$panel.addClass('core-panel-dark').removeClass('core-panel-light');
			}
		});

		$('html').on('click', '.core-panel .baseMinimizeBtn', function(e) {
			var content = $(this).closest('.core-panel').find('.core-panel-body');
			var $panel = $(this).closest('.core-panel');
			if ((content).is(":hidden")) {
				content.slideDown('fast');
			} else {
				content.slideUp('fast');
			}
		});
	});

})();