(function() {
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