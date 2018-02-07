(function() {
	co.element.bind(function($selector) {
		// 下拉框
		var actives = $selector.find('.coos-tab-buttons>[coos-target].active,.coos-tab-one>[coos-target].active');

		$(actives).each(function(index, active) {
			chooseOne($(active));
		});
	});
	function chooseOne($li) {
		var $li = $($li);
		var $tag = $li.closest('.coos-tab');
		var $tag_ones = $tag.find('>.coos-tab-one');
		var $spans = $tag.find('>.coos-tab-spans>.coos-tab-span,>.coos-tab-one>.coos-tab-span');
		var $lis = $tag.find('>.coos-tab-buttons>[coos-target],>.coos-tab-one>[coos-target]');
		var $target = $tag.find($li.attr('coos-target'));
		if ($li.length == 0 || $target.length == 0) {
			return;
		}
		$lis.each(function(index, li) {
			if (li == $li[0]) {
				$li.addClass('active');
			} else {
				$(li).removeClass('active');
			}
		});
		$spans.each(function(index, span) {
			if (span == $target[0]) {
				$target.addClass('active');
				// if ($(span).parent().hasClass('coos-tab-one')) {
				// $(span).slideDown();
				// }
			} else {
				$(span).removeClass('active');
				// if ($(span).parent().hasClass('coos-tab-one')) {
				// $(span).slideUp();
				// }
			}
		});
	}
	$(function() {
		$('html').on('click', '.coos-tab-buttons>[coos-target]', function() {
			var $this = $(this);
			chooseOne($this);
		});
		$('html').on('click', '.coos-tab-one>[coos-target]', function() {
			var $this = $(this);
			chooseOne($this);
		});
	})
})();