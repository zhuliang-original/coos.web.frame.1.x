(function() {
	co.element = {};
	co.element.getForm = function(element) {
		return $(element).closest('form');
	}
	co.element.validate = function(form, element) {
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
		var ismailbox = $element.attr('ismailbox') != null;
		var isnumber = $element.attr('isnumber') != null;
		var isphone = $element.attr('isphone') != null;
		var istel = $element.attr('istel') != null;
		var isurl = $element.attr('isurl') != null;
		var isdate = $element.attr('isdate') != null;
		var istime = $element.attr('istime') != null;
		var isdatetime = $element.attr('isdatetime') != null;
		var isinteger = $element.attr('isinteger') != null;
		var isidcard = $element.attr('isidcard') != null;
		var validate = $element.attr('coos-validate');
		var minlength = parseInt($element.attr('minlength'), 10);
		var maxlength = parseInt($element.attr('maxlength'), 10);
		var eq = $element.attr('eq');
		var gt = $element.attr('gt');
		var gte = $element.attr('gte');
		var lt = $element.attr('lt');
		var lte = $element.attr('lte');
		var eqTo = $element.data('eqTo');
		var gtTo = $element.attr('gtTo');
		var gteTo = $element.attr('gteTo');
		var ltTo = $element.attr('ltTo');
		var lteTo = $element.attr('lteTo');
		if (eqTo) {
			eq = $(eqTo).val();
		}
		if (gtTo) {
			gt = $(gtTo).val();
		}
		if (gteTo) {
			gte = $(gteTo).val();
		}
		if (ltTo) {
			lt = $(ltTo).val();
		}
		if (lteTo) {
			lte = $(lteTo).val();
		}

		if (eq || gt || gte || lt || lte) {
			var v = co.getNowDate();
			if (isdate) {
				v = co.getNowDate();
			} else if (isdatetime) {
				v = co.getNowDatetime();
			} else if (istime) {
				v = co.getNowTime();
			}
			if (co.has(eq, '$now')) {
				eq = v;
			}
			if (co.has(gt, '$now')) {
				gt = v;
			}
			if (co.has(gte, '$now')) {
				gte = v;
			}
			if (co.has(lt, '$now')) {
				lt = v;
			}
			if (co.has(lte, '$now')) {
				lte = v;
			}
		}
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
				if (isurl && !co.isUrl(value)) {
					data.valid = false;
					data.error = co.config.error.isNotUrl;
				}
				if (isphone && !co.isPhone(value)) {
					data.valid = false;
					data.error = co.config.error.isNotPhone;
				}
				if (istel && !co.isTel(value)) {
					data.valid = false;
					data.error = co.config.error.isNotTel;
				}
				if (ismailbox && !co.isMailbox(value)) {
					data.valid = false;
					data.error = co.config.error.isNotMail;
				}
				if (isidcard && !co.isIDCard(value)) {
					data.valid = false;
					data.error = co.config.error.isNotIDCard;
				}
				if (isnumber && !co.isNumber(value)) {
					data.valid = false;
					data.error = co.config.error.isNotNumber;
				}
				if (isinteger && !co.isInteger(value)) {
					data.valid = false;
					data.error = co.config.error.isNotInteger;
				}
				if (isdate && !co.isDate(value)) {
					data.valid = false;
					data.error = co.config.error.isNotDate;
				}
				if (isdatetime && !co.isDatetime(value)) {
					data.valid = false;
					data.error = co.config.error.isNotDatetime;
				}
				if (istime && !co.isTime(value)) {
					data.valid = false;
					data.error = co.config.error.isNotTime;
				}
				var value_ = value;

				var eq_ = eq;
				var gt_ = gt;
				var gte_ = gte;
				var lt_ = lt;
				var lte_ = lte;
				if (isdate || isdatetime || istime) {
					value_ = value.replace(/\D/g, "");
					if (eq_) {
						eq_ = eq_.replace(/\D/g, "");
					}
					if (gt_) {
						gt_ = gt_.replace(/\D/g, "");
					}
					if (gte_) {
						gte_ = gte_.replace(/\D/g, "");
					}
					if (lt_) {
						lt_ = lt_.replace(/\D/g, "");
					}
					if (lte_) {
						lte_ = lte_.replace(/\D/g, "");
					}
				}
				if (eq_ && value_ != eq_) {
					data.valid = false;
					data.error = co.config.error.notEq;
				}
				if (gt_ && Number(value_) <= Number(gt_)) {
					data.valid = false;
					data.error = co.config.error.notGt;
				}
				if (gte_ && Number(value_) < Number(gte_)) {
					data.valid = false;
					data.error = co.config.error.notGte;
				}
				if (lt_ && Number(value_) >= Number(lt_)) {
					data.valid = false;
					data.error = co.config.error.notLt;
				}
				if (lte_ && Number(value_) > Number(lte_)) {
					data.valid = false;
					data.error = co.config.error.notLte;
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
			show = show.replace(/\$label/g, label).replace(/\$minlength/g, minlength).replace(/\$maxlength/g, maxlength).replace(/\$eq/g, eq).replace(/\$gte/g, gte).replace(/\$gt/g, gt).replace(
					/\$lte/g, lte).replace(/\$lt/g, lt);

			error.show = show;
			data.error = error;
		}

		return data;
	};
})();