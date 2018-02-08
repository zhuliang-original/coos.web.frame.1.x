(function() {
	co.element.bind(function(content) {
		content = content || $('body');
		content.find('input:not([autocomplete]),textarea:not([autocomplete]),select:not([autocomplete])').each(function(index, input) {
			var $input = $(input);
			input.setAttribute('autocomplete', 'off');
		});
	});
})();