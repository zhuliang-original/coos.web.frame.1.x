(function() {
	co.input.bind('radio', function($selector) {
		var optionGroup = $('<div class="coos-radio-group"></div>');
		var name = $selector.attr('name');
		if (co.isEmpty(name)) {
			name = "radio_" + co.getNumber();
		}
		$selector.before(optionGroup);
		$selector.hide();
		$selector.removeAttr('name');
		var options = $selector.parent().find('select.option-select').find('option');
		options.each(function(index, option) {
			option = $(option);
			var value = option.attr('value');
			var text = option.text();
			var $input = $('<input class="parameter " name="' + name + '" value="' + value + '" type="radio" />');
			var $span = $('<span class="label">' + text + '</span>');
			optionGroup.append($input);
			optionGroup.append($span);
		});
		optionGroup.find('[name="' + name + '"]').change(function() {
			$selector.val(this.value);
			$selector.change();
		});
	});

	$(function() {

		$('html').on('click', '.coos-radio-group .label', function() {
			var $label = $(this);
			var $input = $label.prev();
			if ($input.length > 0 && $input[0].type == 'radio') {
				$input.click();
			}
		});
	});
})();