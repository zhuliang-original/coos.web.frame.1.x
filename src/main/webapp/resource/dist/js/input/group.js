(function() {
	var groupModel = {
		1 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-$label-size coos-label'>$label</label>" +

			"	<div class='coos-col-$input-size coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"</div>"
		},
		2 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-$label-size coos-label'>$label</label>" +

			"	<div class='coos-col-$input-size coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"	<div class='coos-offset-$label-size coos-input-help'>$help-info</div>" +

			"</div>"
		},
		3 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-$label-size coos-label'>$label</label>" +

			"	<div class='coos-col-$input-size/2 coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"	<div class='coos-input-help coos-col-$input-size/2'>$help-info</div>" +

			"</div>"
		},
		4 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-12 coos-label text-left'>$label</label>" +

			"	<div class='coos-col-12 coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"</div>"
		},
		5 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-12 coos-label text-left'>$label</label>" +

			"	<div class='coos-col-12 coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"	<div class='coos-input-help'>$help-info</div>" +

			"</div>"
		},
		6 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-12 coos-label text-left'>$label</label>" +

			"	<div class='coos-col-8 coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"	<div class='coos-col-4 coos-input-help'>$help-info</div>" +

			"</div>"
		}
	}
	co.input.bind('group', function($selector) {

		var value = $selector.attr('value');
		if (co.isEmpty(value)) {
			value = $selector.val();
		}

		var addClass = $selector.attr('addClass');

		var display = $selector.attr('display');
		display = display == null || display == 'true' || display == '1' ? true : false;

		var isreadonly = $selector.attr('isreadonly');
		isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;

		var cannull = $selector.attr('cannull');
		cannull = cannull == null || cannull == 'true' || cannull == '1' ? true : false;

		var design = $selector.attr('design');
		design = design != null && design == 'true' || design == '1' ? true : false;

		// 标签
		var label = $selector.attr('label') || "";
		// 标签长度
		var labelsize = $selector.attr('label-size') || 2;
		labelsize = labelsize > 12 ? 12 : labelsize;

		if (co.isEmpty(label)) {
			//labelsize = 0;
		}

		var inputsize = 12 - labelsize;

		var beforeaddon = $selector.attr('before-addon') || "";
		var afteraddon = $selector.attr('after-addon') || "";
		// 提示信息
		var helpinfo = $selector.attr('help-info') || label;

		if (co.isEmpty($selector.attr('placeholder'))) {
			$selector.attr('placeholder', helpinfo);
		}

		var inputgrouptype = $selector.attr('group-type') || 1;
		// 列尺寸
		var columnsize = $selector.attr('column-size') || 12;
		columnsize = columnsize > 12 ? 12 : columnsize;

		var html = groupModel[inputgrouptype].html;
		if (("" + columnsize).has(".")) {
			html = html.replaceAll(/\$column-size/, ("" + columnsize).replace(".", "-"));
		} else {
			html = html.replaceAll(/\$column-size/, columnsize);
		}
		if (("" + labelsize).has(".")) {
			html = html.replaceAll(/\$label-size/, ("" + labelsize).replace(".", "-"));
		} else {
			html = html.replaceAll(/\$label-size/, labelsize);
		}
		if (("" + inputsize).has(".")) {
			html = html.replaceAll(/\$input-size\/2/, ("" + inputsize / 2).replace(".", "-"));
			html = html.replaceAll(/\$input-size/, ("" + inputsize).replace(".", "-"));
		} else {
			html = html.replaceAll(/\$input-size\/2/, inputsize / 2);
			html = html.replaceAll(/\$input-size/, inputsize);
		}
		html = html.replaceAll(/\$help-info/, helpinfo);
		html = html.replaceAll(/\$label/, label);

		// 元素组合组
		var $group = $(html);
		if (labelsize <= 0) {
			$group.find('.coos-label').remove();
		}
		if (addClass) {
			$group.addClass(addClass);
		}

		if (!display) {
			$group.hide();
			if (("" + columnsize).has(".")) {
				$group.removeClass('coos-col-' + (("" + columnsize).replace(".", "-")));
			} else {
				$group.removeClass('coos-col-' + columnsize);
			}
			$group.addClass('coos-col-3');
			$group.addClass('display-hidden');
		}

		$selector.before($group);
		$selector.data('hideGroup', function() {
			$group.hide();
		});
		$selector.data('showGroup', function() {
			$group.show();
		});

		// 选项
		var $optionselect = null;
		if ($selector.next().length > 0 && $selector.next().hasClass('option-select')) {
			$optionselect = $selector.next();
		}

		var $groupElement = $group.find('.input-place');
		$groupElement.before($selector);
		$groupElement.remove();

		$selector.before($optionselect);

		if (!co.isEmpty(beforeaddon)) {
			var beforeIcon = $('<span class="coos-input-addon coos-input-addon-before " ></span>');
			if (beforeaddon.indexOf('icon') != -1) {
				beforeIcon.addClass(beforeaddon);
			} else {
				beforeIcon.append(beforeaddon);
			}
			if ($selector.attr('before-addon-no-bg')) {
				beforeIcon.addClass('coos-no-bg');
			}
			$selector.before(beforeIcon);
		}
		if (afteraddon) {

			var afterIcon = $('<span class="coos-input-addon coos-input-addon-after " ></span>');

			if (afteraddon.indexOf('icon') != -1) {
				afterIcon.addClass(afteraddon);
			} else {
				afterIcon.append(afteraddon);
			}
			if ($selector.attr('after-addon-no-bg')) {
				afterIcon.addClass('coos-no-bg');
			}
			$selector.after(afterIcon);
		}

		var $label = $group.find('.coos-label');
		// 必须的
		if (isreadonly) {
			$selector.attr('readonly', "readonly");
		} else {
		}
		$selector.attr('cannull', cannull);
		// 是必填项
		if (!cannull) {
			if (!isreadonly) {
				$label.append("<span class=\"coos-red\">*</span>");
			} else {
				$label.append("<span class=\"color-transparent \">*</span>");
			}
		} else {
			$label.append("<span class=\"color-transparent\">*</span>");
		}
		var $options = null;
		if ($optionselect) {
			var $options = $optionselect.find('option');
			$options.each(function(index, $option) {
				$option = $($option);
				if ($option.text() == null || $option.text() == '') {
					$option.text($option.attr('text'));
				}
			});
		}
		var type = 'text';
		if ($selector.get(0).tagName == "TEXTAREA") {
			type = "TEXTAREA";
		}
		if ($selector.hasClass('input-rule-switch')) {
			type = "switch";
		} else if ($selector.hasClass('input-rule-select')) {
			type = "select";
		} else if ($selector.hasClass('input-rule-editor')) {
			type = "editor";
		} else if ($selector.hasClass('input-rule-file')) {
			if ($selector.attr('file-type') == 'image') {
				type = "image";
			} else {
				type = "file";
			}
		}

		if (type == "text") {

		} else if (type == "switch") {
			if (value != null && (value == 'true' || value == '1')) {
				$selector.attr('checked', 'checked');
			}
			$selector.attr('isswitch', true);
			$selector.attr('data-size', 'mini');
			$selector.attr('data-wrapper-class', 'yellow');
			$selector.attr('type', 'checkbox');
		} else if (type == "select") {

			if ($selector.get(0).tagName == "SELECT") {
				var hasNullOption = false;
				$selector.find('option').each(function(index, $option) {
					$option = $($option);
					if (co.isEmpty($option.attr('value'))) {
						hasNullOption = true;
					}
				});
				if (!hasNullOption) {
					if ($selector.find('option').length > 0) {
						$selector.find('option:first').before("<option value=''>请选择</option>");
					} else {
						$selector.append("<option value=''>请选择</option>");
					}
				}
			}
			if ($selector[0].tagName == 'SELECT' && $options) {
				$options.each(function(index, $option) {
					$option = $($option);
					$selector.append($option);
				});
			}
		} else if (type == "textarea") {
			$selector.css('height', '160px');
		} else if (type == "editor") {
			$selector.css('height', '370px');
			$selector.css('width', '100%');

		} else if (type == "file") {

		}
		if (type != "textarea" && type != "editor") {

			$selector.val(value);
		}
		if (isreadonly) {
			$selector.css('background-color', 'white');
			$selector.attr('disabled', true);
			var showvalue = $selector.attr('showvalue');

			if (co.isEmpty(showvalue)) {
				if (!co.isEmpty($selector.data('text-value'))) {
					showvalue = $selector.data('text-value');
				} else if (!co.isEmpty(value)) {
					showvalue = value;
				}
			}
			if ($selector.closest('.table-content').length < 1) {
				if ((type == 'text' || type == "image" || type == "images" || type == "file")) {
					// console.log(showvalue)
					// element.val(showvalue);
				} else if (type == 'select') {
					showvalue = showvalue == null || showvalue == '' || showvalue == 'null' ? '空' : showvalue;
					var showInput = $('<input class=" " readonly="readonly" />');
					showInput.css('background-color', 'white')
					showInput.val(showvalue);
					$selector.before(showInput);
					$selector.hide();
				} else {
					showvalue = showvalue == null || showvalue == '' || showvalue == 'null' ? '空' : showvalue;
					var showDiv = $('<div class=" " style="height: auto;overflow: hidden;border: 1px solid #ddd;padding: 7px 10px 6px;"></div>');
					showDiv.html(showvalue);
					$selector.before(showDiv);
					$selector.hide();
				}
			} else {
				showvalue = showvalue == null || showvalue == '' || showvalue == 'null' ? '空' : showvalue;
				var showDiv = $('<div class=" " style="height: auto;overflow: hidden;border: 1px solid #ddd;padding: 7px 10px 6px;"></div>');
				showDiv.html(showvalue);
				$selector.before(showDiv);
				$selector.hide();
			}

		}
	});
})();