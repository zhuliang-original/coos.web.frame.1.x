(function() {
	var alleditors = {};
	co.input.bind('codemirror', function($selector) {
		co.plugin.load("codemirror", function() {
			co.plugin.load("emmet", function() {
				$selector = $($selector);
				$selector.attr('must-validate', true);
				var mode = $selector.attr('codemirror-mode');
				if (co.isEmpty(mode)) {
					mode = "text/html";
				}
				var editorchangeed = false;
				var editor = CodeMirror.fromTextArea($selector[0], {
					mode : mode,
					lineNumbers : true,
					profile : 'xhtml',
					theme : 'zenburn'
				});
				editor.on("change", function() {
					editorchangeed = true;
					$selector.val(editor.getValue());
					$selector.change();
				});
				$selector.change(function() {
					if (!editorchangeed) {
						editor.setValue($selector.val());
					}
					editorchangeed = false;
				});
				emmetCodeMirror(editor);

			});
		});
	});

})();