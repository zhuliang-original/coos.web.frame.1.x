(function() {

	co.input.bind('radio-tag', function($selector) {
		var optionGroup = $('<div class="coos-text-tag-group"></div>');
		var name = $selector.attr('name');
		$selector.before(optionGroup);
		$selector.hide();
		var options = $selector.parent().find('select.option-select').find('option');
		options.each(function(index, option) {
			option = $(option);
			var value = option.attr('value');
			var text = option.text();
			var $tag = $('<div class="coos-text-tag"></div>');
			$tag.attr('value', value);
			$tag.attr('text', text);
			$tag.append('<span class="text">' + text + '</span>')
			optionGroup.append($tag);
		});
		optionGroup.find('.coos-text-tag').click(function() {
			var value = '';
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				optionGroup.find('.coos-text-tag').removeClass('active');
			} else {
				optionGroup.find('.coos-text-tag').removeClass('active');
				$(this).addClass('active');

			}
			$(optionGroup.find('.coos-text-tag.active')).each(function(index, one) {
				value += $(one).attr('value');
			});
			$selector.val(value);
			if (co.isEmpty(value)) {
				$(optionGroup.find('.coos-text-tag')).each(function(index, one) {
					if (co.isEmpty($(one).attr('value'))) {
						$(one).addClass('active');
					}
				});
			}
			isFullChange = false;
			$selector.change();
			isFullChange = true;
		});
		var isFullChange = true;
		$selector.change(function() {
			var value = this.value;
			if (isFullChange) {
				var $tags = optionGroup.find('.coos-text-tag');
				$tags.removeClass('active');
				if (!co.isEmpty(value)) {
					optionGroup.find('[value="' + value + '"].coos-text-tag').addClass('active');
				} else {
					optionGroup.find('[value=""].coos-text-tag').addClass('active');
				}
			}
		});
	});

	$(function() {

	});
})();