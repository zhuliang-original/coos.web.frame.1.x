co.frame.theme.getButton = function(button, isChild) {
	var type = button.type;
	var $li = $('<li></li>');
	var $button = $('<a class="" ></a>');
	$li.append($button);
	var USER_INFO = null;
	if (coos.frame.frame) {
		USER_INFO = coos.frame.frame.user_info;
	}
	if (!coos.isEmpty(button.showrule)) {
		try {
			var showrule = button.showrule;
			var functionstr = 'function(){return ' + showrule + ';}()';
			var f = eval("(" + functionstr + ")");
			if (!f) {
				return;
			}
		} catch (e) {
			console.log(e);
			return;
		}
	}
	var hasIcon = false;
	var hasLabel = false;
	if (!coos.isEmpty(button.icon)) {
		var $icon = null;
		if (button.icon.has("<")) {
			var $icon = $(button.icon);
			$icon.addClass('fa coos-icon');
			$button.append($icon);
		} else {
			if (button.icon.has("fa") || button.icon.has("icon")) {
				var $icon = $('<i class="' + button.icon + '"> </i>');
				$icon.addClass('fa coos-icon');
				$button.append($icon);
			} else {
				$button.append(button.icon);

			}
		}
		hasIcon = true;
	}
	if (!coos.isEmpty(button.label)) {
		if (isChild) {
			$button.append(button.label);
		} else {
			var $label = $('<span class="coos-text"></span>');
			$label.append(button.label);
			$button.append($label);
		}
		hasLabel = true;
	}
	if (type == "LOGIN") {
		$button.addClass('coosToActionBtn');
		$button.attr('toAction', coos.config.action.toLogin);
	} else if (type == "LOGOUT") {
		$button.addClass('doLogoutBtn');
	} else if (type == "UPDATE-PASSWORD") {
		$button.addClass('toUpdatePasswordBtn');
	} else if (type == "USER") {

		if (!hasLabel && USER_INFO != null) {
			$button.append(USER_INFO.username);
		}
	}
	if (!coos.isEmpty(button.addClass)) {
		$button.addClass(button.addClass);
	}
	if (button.childbuttons != null && button.childbuttons.length > 0) {
		$button.addClass('coos-dropdown-toggle');
		$button.append('&nbsp;<span class="coos-caret"></span>');
		var $ul = $('<ul class="coos-dropdown-menu coos-dropdown-menu-right"></ul>');
		$li.append($ul);
		$(button.childbuttons).each(function(index, button) {
			var $li = coos.frame.theme.getButton(button, true);
			$ul.append($li);
		});

	}
	return $li;
};