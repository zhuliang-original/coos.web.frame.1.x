(function() {
	co.input.bind('tag', function($selector) {
		co.plugin.load("tags_input", function() {
			var isreadonly = $selector.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
			if (isreadonly) {
				return;
			}
			$selector.tagsInput({
				width : 'auto',
				onAddTag : function(tag) {
					$(this).val(this.value);
					$(this).change();
				},
				onRemoveTag : function(tag) {
					$(this).val(this.value);
					$(this).change();
				}
			});
		});
	});

})();