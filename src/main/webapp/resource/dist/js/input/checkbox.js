(function() {

	co.input.bind('checkbox', function($selector) {
		var optionGroup = $('<div class="coos-checkbox-group"></div>');
		var name = $selector.attr('name');
		$selector.before(optionGroup);
		$selector.hide();
		$selector.removeAttr('name');
		if (co.isEmpty(name)) {
			name = "checkbox_" + co.getNumber();
		}
		var options = $selector.parent().find('select.option-select').find('option');
		options.each(function(index, option) {
			option = $(option);
			var value = option.attr('value');
			var text = option.text();
			var $input = $('<input class="parameter " name="' + name + '" value="' + value + '" type="checkbox" />');
			var $span = $('<span class="label">' + text + '</span>');
			optionGroup.append($input);
			optionGroup.append($span);
		});
		optionGroup.find('[name="' + name + '"]').change(function() {
			var value = '';
			$(optionGroup.find('[name="' + name + '"]')).each(function(index, one) {
				if (one.checked) {
					value += one.value + ',';
				}
			});
			$selector.val(value);
			$selector.change();
		});
	});

	$(function() {

		$('html').on('click', '.coos-checkbox-group .label', function() {
			var $label = $(this);
			var $input = $label.prev();
			if ($input.length > 0 && $input[0].type == 'checkbox') {
				$input.click();
			}
		});

	});
})();