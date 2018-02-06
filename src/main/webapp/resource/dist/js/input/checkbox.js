(function() {
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