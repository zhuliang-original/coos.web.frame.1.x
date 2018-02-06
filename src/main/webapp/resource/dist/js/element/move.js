(function() {
	co.element.initMoveTool = function(content) {
		content = content || $('body');

		var moves = $(content).find('.coos-move-tool');
		if (moves.length > 0) {
			co.plugins.load("draggabilly", function() {
				$(moves).each(function(index, move) {
					$(move).draggabilly({
						handle : '.handle'
					});
				});
			});
		}

	};
})();