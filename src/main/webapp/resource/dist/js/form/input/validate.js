(function() {
	co.form.input.getForm = function(element) {
		return $(element).closest('form');
	}
	co.form.input.validate = function(form, element) {
		var data = {};
		data.valid = true;
		var $form = $(form);
		var $element = $(element);
		var name = $element.attr('name');
		data.name = name;
		var pattern = $element.attr('pattern') || false;

		var label = $element.attr('label');
		var re = new RegExp(pattern);
		var $radioGroup = null;
		var $checkboxGroup = null;
		var value = null;
		if ($element.is('[type=checkbox]')) {
			if ($element.data('bootstrapSwitch')) {
				if ($element.val() == 'true' || $element.val() == '1' || $element[0].checked) {
					value = 1;
				} else {
					value = 0;
				}
			} else {

				$checkboxGroup = $form.find('input[name="' + name + '"]');
				$element = $checkboxGroup.first();
				var thisvalue = "";
				$form.find("input[name='" + name + "']:checked").each(function() {
					thisvalue += $(this).val() + ',';
				});
				if (thisvalue.length > 0) {
					thisvalue = thisvalue.substring(0, thisvalue.length - 1);
					value = thisvalue;
				}
				if ($element.attr('isswitch')) {
					if (co.isEmpty(value)) {
						value = 0;
					} else {
						value = 1;
					}
				}
			}
		} else if ($element.is('[type=radio]')) {
			$radioGroup = $form.find('input[name="' + name + '"]');
			$element = $radioGroup.first();
			value = $form.find("input[name='" + name + "']:checked").val();
		} else {
			value = $element.val();
		}
		var filterMode = $element.attr('filterMode');
		if (co.isEmpty(filterMode)) {
			filterMode = false;
		}
		if (co.isString(filterMode)) {
			if (filterMode == 'true' || filterMode == '1') {
				filterMode = true;
			} else {
				filterMode = false;
			}
		}
		if (filterMode) {
			value = co.filterMode(value);
		} else {
		}
		data.value = value;
		var cannull = element.attr('cannull');
		cannull = cannull == null || cannull == 'true' || cannull == '1' ? true : false;
		var ishidden = $element.is(":hidden");
		var mustvalidate = $element.attr('mustvalidate') != null;
		var isreadonly = $element.attr('readonly') != null;

		var valueType = $element.attr('value-type');
		// 验证规则
		var validateRule = $element.attr('validate-rule');
		var validateRuleErrmsg = $element.attr('validate-rule-errmsg') || '$label数据验证失败！';

		var validate = $element.attr('coos-validate');
		var minlength = parseInt($element.attr('minlength'), 10);
		var maxlength = parseInt($element.attr('maxlength'), 10);
		// 隐藏和不是必须验证的直接返回
		if ((ishidden || isreadonly) && !mustvalidate) {
			data.valid = true;
		} else {
			if (!cannull && co.isEmpty(value)) {
				data.valid = false;
				data.error = co.config.error.isNull;
			} else if (!co.isEmpty(value)) {
				if (pattern && !re.test(value)) {
					data.valid = false;
					data.error = co.config.error.patternMismatch;
				}
				if (value.length > maxlength) {
					data.valid = false;
					data.error = co.config.error.isLong;
				}
				if (value.length < minlength) {
					data.valid = false;
					data.error = co.config.error.isShort;
				}
				if (!co.isEmpty(valueType)) {
					var vR = validateValueType(value, valueType);
					if (vR) {
						data = vR;
					}
				}
				if (!co.isEmpty(validateRule)) {
					var formData = co.form.getData($form);
					formData.value = value;
					var validateRule = validateRule;
					var resolveValue = co.resolve.value({
						value : validateRule,
						data : formData
					});
					var resolveResult = resolveValue.getResult();
					if (!co.isEmpty(resolveResult)) {
						var funstr = "function(){return " + resolveResult + ";}";
						var r = eval('(0,' + funstr + ')')();
						if (co.isTrue(r)) {

							data.valid = false;
							data.error = {
								show : validateRuleErrmsg
							};
						}
					}
				}
			}
		}

		if (validate) {
			validate = eval('(' + validate + ')');
			validate(data, $element, $form);
		}

		if (data.error) {
			var error = jQuery.extend(true, {}, {}, data.error);
			var show = error.show;
			show = show.replace(/\$label/g, label).replace(/\$minlength/g, minlength).replace(/\$maxlength/g, maxlength);

			error.show = show;
			data.error = error;
		}

		return data;
	};

	var validateValueType = function(value, valueType) {
		if (!co.isEmpty(value) && !co.isEmpty(valueType)) {
			var result = {
				valid : true
			};
			switch (valueType.toUpperCase()) {
				case "URL":
					if (!co.isUrl(value)) {
						result.valid = false;
						result.error = co.config.error.isNotUrl;
					}
					break;
				case "PHONE":
					if (!co.isPhone(value)) {
						result.valid = false;
						result.error = co.config.error.isNotPhone;
					}
					break;
				case "TEL":
					if (!co.isTel(value)) {
						result.valid = false;
						result.error = co.config.error.isNotTel;
					}
					break;
				case "MAILBOX":
					if (!co.isMailbox(value)) {
						result.valid = false;
						result.error = co.config.error.isNotMail;
					}
					break;
				case "IDCARD":
					if (!co.isIDCard(value)) {
						result.valid = false;
						result.error = co.config.error.isNotIDCard;
					}
					break;
				case "NUMBER":
					if (!co.isNumber(value)) {
						result.valid = false;
						result.error = co.config.error.isNotNumber;
					}
					break;
				case "INTEGER":
					if (!co.isInteger(value)) {
						result.valid = false;
						result.error = co.config.error.isNotInteger;
					}
					break;
				case "DATE":
					if (!co.isDate(value)) {
						result.valid = false;
						result.error = co.config.error.isNotDate;
					}
					break;
				case "DATETIME":
					if (!co.isDatetime(value)) {
						result.valid = false;
						result.error = co.config.error.isNotDatetime;
					}
					break;
				case "TIME":
					if (!co.isTime(value)) {
						result.valid = false;
						result.error = co.config.error.isNotTime;
					}
					break;
				case "CN":
					if (!co.isChinese(value)) {
						result.valid = false;
						result.error = co.config.error.isNotChinese;
					}
					break;
				case "EN":
					if (!co.isEnglish(value)) {
						result.valid = false;
						result.error = co.config.error.isNotEnglish;
					}
					break;
				case "CN_OR_EN":
					if (!co.isChineseOrEnglish(value)) {
						result.valid = false;
						result.error = co.config.error.isNotChineseOrEnglish;
					}
					break;
				case "EN_OR_NUM":
					if (!co.isEnglishOrNumber(value)) {
						result.valid = false;
						result.error = co.config.error.isNotEnglishOrNumber;
					}
					break;
				case "NO_SYMBOL":
					if (co.hasSymbol(value)) {
						result.valid = false;
						result.error = co.config.error.isNotNoSymbol;
					}
					break;
			}
			return result;
		}

	};
})();