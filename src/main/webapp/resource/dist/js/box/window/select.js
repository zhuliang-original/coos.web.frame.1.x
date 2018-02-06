(function() {
	co.box = co.box || {};

	co.box.html.select = '<div class="coos-select-content">' + '	<div class="coos-select-header">' + '	检索：<input class="coos-select-search-input" placeholder="请输入关键词检索"/>'
			+ '	<span class="coos-select-search-button">搜索</span>' + '</div>' + '<div class="coos-select-center">' + '	<div class="coos-one-option">'
			+ '		<input type="radio" class="coos-one-option-value" value=""/>' + '		<input type="checkbox" class="coos-one-option-value" value=""/>' + '		<div class="coos-one-option-detail">'
			+ '			<img alt="" class="coos-one-option-image" src="">' + '			<span class="coos-one-option-text"></span>' + '		</div>' + '	</div>' + '</div>';

	co.box.window.select = function(config) {
		var title = config.title;
		var values = config.values;
		var thisvalue = config.value;
		var datas = config.datas;
		var cancelCallback = config.cancelCallback;
		var mincheckedlength = config.mincheckedlength;
		var callback = config.callback;
		var isradio = config.isradio;
		if (typeof (isradio) == 'undefined') {
			isradio = true;
		}
		var optionname = co.getNumber();
		var $model = $(co.box.html.select);
		var $select_conter = $model.find('.coos-select-center');
		var $option_one_model = $model.find('.coos-one-option').clone();
		$model.find('.coos-one-option').remove();
		datas = datas || [];
		var hasNullOption = false;
		var hasImage = false;
		$(datas).each(function(index, data) {

			if (co.isEmpty(data.value)) {
				hasNullOption = true;
			}
			if (!co.isEmpty(data.image)) {
				hasImage = true;
			}

			var $option_one = getOptionOne(data);
			$select_conter.append($option_one);
		});

		if (isradio && !hasNullOption) {
			var $option_one = getOptionOne({
				text : '请选择',
				value : ''
			});
			if (hasImage) {
				$option_one = getOptionOne({
					text : '请选择',
					value : '',
					image : co.config.images.noimg
				});
			}
			$select_conter.prepend($option_one);
		}
		values = values || [ "" ];
		$(values).each(function(index, value) {
			setValue(value);
		});
		function setValue(value) {
			var $option = $model.find('.coos-one-option-value[value="' + value + '"]');
			if ($option.length > 0) {

				if (isradio) {
					$model.find('.coos-one-option-value').removeAttr('checked');
					$option[0].checked = true;
				} else {
					if ($option[0].checked) {
						$option[0].checked = false;
					} else {
						$option[0].checked = true;
					}
				}
			}
		}
		if (thisvalue) {
			setValue(thisvalue);
		}
		function getOptionOne(data) {
			var $option_one = $option_one_model.clone();
			$option_one.find('.coos-one-option-text').text(data.text);
			$option_one.find('.coos-one-option-value').attr("value", data.value);

			$option_one.find('input').attr('name', optionname);

			if (isradio) {
				$option_one.find('[type=checkbox]').remove();
			} else {
				$option_one.find('[type=radio]').remove();
			}
			if (data.image) {
				$option_one.find('img').attr('coos-path', data.image);
				$option_one.find('img').addClass('coos-need-init-image');
				$select_conter.addClass('coos-has-image')
			} else {
				$option_one.find('img').remove();
			}
			$option_one.find('.coos-one-option-detail').click(function() {
				setValue(data.value);
			});

			return $option_one;
		}
		co.element.initImage($model);

		var windowconfig = {};
		windowconfig.title = title;
		windowconfig.cancelCallback = function() {
			//
			cancelCallback && cancelCallback();

		};
		$model.find('.coos-select-search-button').click(function() {
			$model.find('.coos-one-option').show();
			var searchInfo = $model.find('.coos-select-search-input').val();
			$($model.find('.coos-one-option-text')).each(function(index, v) {
				var inputInfo = $(this).text();
				if (inputInfo.indexOf(searchInfo) == -1) {
					$(this).closest('.coos-one-option').hide();
				}
			});
		});
		function getCheckedInputs() {
			var $checkedInputs = [];
			var $inputs = $model.find('.coos-one-option-value');

			$($inputs).each(function(index, input) {

				if (input.checked) {
					$checkedInputs[$checkedInputs.length] = $(input);
				}
			});
			return $checkedInputs;
		}
		var buttons = [ {
			label : '确定',
			style : "",
			className : "coos-box-define",
			before : function() {
				var $checkedInputs = getCheckedInputs();

				if (isradio && $checkedInputs.length <= 0) {

					co.box.alert('请选择一项！');
					return false;
				} else {
					return true;
				}

				return true;
			},
			callback : function() {
				// 找出所有选中的选项
				var $checkedInputs = getCheckedInputs();

				var values = [];
				var texts = [];
				$($checkedInputs).each(function(index, checkedInput) {
					values[values.length] = $(checkedInput).attr('value');
					texts[texts.length] = $(checkedInput).parent().find('.coos-one-option-text').text();
				});
				w.remove();
				callback && callback(values, texts);
			}
		} ];
		windowconfig.buttons = buttons;
		windowconfig.html = $model;
		var w = co.box.window(windowconfig);
		w.show();
	};
})();