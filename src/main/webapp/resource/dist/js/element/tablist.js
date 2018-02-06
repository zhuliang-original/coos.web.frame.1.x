(function() {
	co.element.initTablist = function(content) {
		content = content || $('body');
		// 下拉框
		var actives = $(content).find('.core-tab-buttons>[core-target].active,.core-tab-one>[core-target].active');

		$(actives).each(function(index, active) {
			chooseOne($(active));
		});
	};
	function chooseOne($li) {
		var $li = $($li);
		var core_tag = $li.closest('.core-tab');
		var core_tag_ones = core_tag.find('>.core-tab-one');
		var $spans = core_tag.find('>.core-tab-spans>.core-tab-span,>.core-tab-one>.core-tab-span');
		var $lis = core_tag.find('>.core-tab-buttons>[core-target],>.core-tab-one>[core-target]');
		var core_target = core_tag.find($li.attr('core-target'));
		if ($li.length == 0 || core_target.length == 0) {
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
			if (span == core_target[0]) {
				core_target.addClass('active');
				// if ($(span).parent().hasClass('core-tab-one')) {
				// $(span).slideDown();
				// }
			} else {
				$(span).removeClass('active');
				// if ($(span).parent().hasClass('core-tab-one')) {
				// $(span).slideUp();
				// }
			}
		});
	}
	$(function() {
		$('html').on('click', '.core-tab-buttons>[core-target]', function() {
			var $this = $(this);
			chooseOne($this);
		});
		$('html').on('click', '.core-tab-one>[core-target]', function() {
			var $this = $(this);
			chooseOne($this);
		});
	})
})();