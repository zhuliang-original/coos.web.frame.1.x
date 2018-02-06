(function() {
	co.element.initCheckbox = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-checkbox');
		if (elements.length > 0) {

			$(elements).each(function(index, element) {
				if (co.element.isInited(element, 'inputtype-checkbox')) {
					return;
				}
				element = $(element);
				var optionGroup = $('<div class="core-checkbox-group"></div>');
				var name = element.attr('name');
				element.before(optionGroup);
				element.hide();
				element.removeAttr('name');
				var options = element.parent().find('select.core-select-option').find('option');
				options.each(function(index, option) {
					option = $(option);
					var value = option.attr('value');
					var text = option.text();
					var $input = $('<input class="parameter " name="' + name + '" value="' + value + '" type="checkbox" />');
					var $span = $('<span class="label">' + text + '</span>');
					optionGroup.append($input);
					optionGroup.append($span);
				});
			});
		}
	};
})();