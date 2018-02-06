(function() {
	co.element.initRadio = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-radio');
		if (elements.length > 0) {

			$(elements).each(function(index, element) {
				if (co.element.isInited(element, 'inputtype-radio')) {
					return;
				}
				element = $(element);
				var optionGroup = $('<div class="core-radio-group"></div>');
				var name = element.attr('name');
				var name = name;
				element.before(optionGroup);
				element.hide();
				element.removeAttr('name');
				var options = element.parent().find('select.core-select-option').find('option');
				options.each(function(index, option) {
					option = $(option);
					var value = option.attr('value');
					var text = option.text();
					var $input = $('<input class="parameter " name="' + name + '" value="' + value + '" type="radio" />');
					var $span = $('<span class="label">' + text + '</span>');
					optionGroup.append($input);
					optionGroup.append($span);
				});
			});
		}
	};
})();