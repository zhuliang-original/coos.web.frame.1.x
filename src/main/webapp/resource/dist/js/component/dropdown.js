(function() {
	$(function() {
		$('html').on('click', '.coos-dropdown-toggle', function(e) {
			var $parent = $(this).parent();
			if ($parent.hasClass('open')) {
				$parent.removeClass('open');
			} else {
				$parent.removeClass('open');
				$parent.addClass('open');
			}
		});
		$('html').on('click', '.coos-dropdown-menu', function(e) {
			$(this).parent().removeClass('open');
		});
		$(window.document).on('click', function(e) {
			e = window.event || e;
			var obj = $(e.srcElement || e.target);
			var $obj = null;
			var $toggle = obj.closest('.coos-dropdown-toggle');
			if ($toggle.length > 0) {
				$obj = $toggle.parent();
			}
			var $menu = obj.closest('.coos-dropdown-menu');
			if ($menu.length > 0) {
				$obj = $menu.parent();
			}
			if ($obj == null) {
				$('.coos-dropdown-toggle').parent().removeClass('open');
				return;
			}
			var $dropdowntoggles = $('.coos-dropdown-toggle');
			$($dropdowntoggles).each(function(index, $dropdowntoggle) {
				var $parent = $($dropdowntoggle).parent();
				if ($parent.hasClass('open')) {
					if ($obj[0] == $parent[0]) {
					} else {
						$parent.removeClass('open');
					}
				}
			});
		});

	});
})();