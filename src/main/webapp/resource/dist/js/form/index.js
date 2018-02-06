(function() {
	co.form = {};

	co.form.clear = function(form) {
		var form = $(form);
		var parameters = form.find('.elementparameter,.parameter');
		$(parameters).each(function(index, parameter) {
			parameter = $(parameter);
			if (parameter.attr('not-clear')) {
				return;
			}
			var name = parameter.attr('name');
			var value = parameter.attr('defaultvalue');
			var eles = form.find('[name=' + name + ']');
			if (eles.size() > 0 && eles.get(0).type == 'radio') {
				if (value == true) {
					value = '1';
				}
				if (value == null || value == '' || value == false) {
					value = '0';
				}
				for (var m = 0; m < eles.length; m++) {
					if (eles[m].value == value) {
						eles[m].checked = 'checked';
					}
				}
			} else {
				if (parameter.data('bootstrapSwitch')) {
					var v = false;
					if (co.isBoolean(value)) {
						v = value;
					} else {
						if (co.isEmpty(value) || value == '0') {
							v = false;
						} else {
							v = true;
						}
					}
					parameter.get(0).checked = v;
					parameter.change();
				} else {
					form.find('[name=' + name + ']').val(value).change();
				}
			}
		});
	};
	co.form.full = function(form, data) {
		data = data || {};
		form = $(form);
		var modelName = form.attr('model-name');
		modelName = modelName || '';

		var elements = form.find('[name].parameter');
		for ( var name in data) {
			var $addModelButton = form.find('[add-model-button="' + name + '"]:first');
			if ($addModelButton.length > 0) {
				var value = data[name];
				if (value != null) {
					var object = value;
					if (co.isString(value)) {
						if (co.isEmpty(value)) {
							continue;
						}
						object = JSON.parse(value);
					}
					var list = [ object ];
					if (co.isArray(object)) {
						list = object;
					}
					$(object).each(function(index, one) {
						$addModelButton.click();
						var $form_ = form.find('[model-name="' + name + '"]').get(index);
						$form_ = $($form_);
						co.form.full($form_, one);
					});

				}
			}

		}
		$(elements).each(function(index, element) {

			element = $(element);
			if (element.closest('[model-name]').length > 0 && element.closest('[model-name]').attr('model-name') != modelName) {
				return;
			}
			var name = element.attr('name');
			var needchange = false;
			var relationelements = form.find('[relationname=' + name + ']');
			if (relationelements.length > 0) {
				needchange = true;
			}
			if (element.attr('need-full-change') == 'true') {
				needchange = true;
			}
			var value = data[name];
			if (element.get(0).type == 'radio') {
				if (value != null) {
					if (typeof (value) == 'boolean') {
						if (value) {
							value = 1;
						} else {
							value = 0;
						}
					}
					var radios = form.find('[name=' + name + ']');
					$(radios).each(function(radioindex, radio) {

						if ($(radio).closest('[model-name]').length > 0 && $(radio).closest('[model-name]').attr('model-name') != modelName) {
							return;
						}
						if (radio.value == value) {
							radio.checked = 'checked';
						} else {
							$(radio).removeAttr('checked');
						}
					})
				}
			} else if (element.get(0).type == 'checkbox') {
				var elements = form.find('[name=' + name + ']');
				$(elements).removeAttr('checked');
				if (value != null) {
					if (element.data('bootstrapSwitch') || element.attr('isswitch')) {
						var v = false;
						if (co.isBoolean(value)) {
							v = value;
						} else {
							if (co.isEmpty(value) || value == '0') {
								v = false;
							} else {
								v = true;
							}
						}
						element.get(0).checked = v;
						element.change();
					} else {
						var values = [];
						if (!co.isEmpty(value)) {
							if (co.isBoolean(value)) {
								values = [ value ];
							} else {
								values = value.split(',');
							}
						}
						$(elements).each(function(index, element) {

							if ($(element).closest('[model-name]').length > 0 && $(element).closest('[model-name]').attr('model-name') != modelName) {
								return;
							}
							var has = false;
							$(values).each(function(index, v) {
								if (co.isEmpty(v)) {
									return;
								}
								if (element.value == v) {
									has = true;
								}
							});
							if (has) {
								element.checked = 'checked';
							} else {
								$(element).removeAttr('checked');
							}
						});
					}

				}
			} else {
				if (value != null) {
					element.val(value);
					if (needchange) {
						element.change();
					}
				} else {
					if (typeof (value) != 'undefined') {
						if (element.get(0).type != 'radio') {
							element.val('');
							if (needchange) {
								element.change();
							}
						}
					}
				}
			}
		});
	}

	function validateFormData(form, showerror) {
		if (co.isEmpty(showerror)) {
			showerror = true;
		}
		form = $(form);
		var data = {};
		var parameters = form.find('.elementparameter,.parameter').removeClass('core-validate-error');
		for (var i = 0; i < parameters.length; i++) {
			var element = $(parameters[i]);
			if (element.data('not-get-date')) {
				continue;
			}
			var result = co.element.validate(form, element);
			if (!result.valid) {
				// 验证表单错误显示错误信息
				var code = result.error.code;
				var message = result.error.show;

				(element).addClass('core-validate-error');

				var ishidden = element.is(":hidden");
				if (ishidden) {
					if (!co.isVisible(element.parent())) {
						$("body").animate({
							scrollTop : element.parent().offset().top - 100
						}, 200);
					}
				} else {
					if (!co.isVisible(element)) {
						$("body").animate({
							scrollTop : element.offset().top - 100
						}, 200);
					}
				}
				if (showerror) {
					if (co.isPC()) {
						co.box.info(message);
					} else {
						co.box.info(message);
					}
				}
				// 处理验证错误的字符串
				throw co.error(code, message, element);
			} else {
				$(element).removeClass('core-validate-error');
				data[result.name] = result.value;
			}
		}
		return data;
	}
	/**
	 * 验证表单
	 * 
	 * @param form
	 * @returns {Boolean} 验证失败会抛出异常 可以使用e.message e.description
	 */
	co.form.validate = function(form, showerror) {
		if (co.isEmpty(showerror)) {
			showerror = true;
		}
		form = $(form);

		form.find('.elementparameter,.parameter').data('not-get-date', false);
		var models = form.find('[model-name]');
		models.find('.elementparameter,.parameter').data('not-get-date', true);
		var data = validateFormData(form, showerror);
		var models = form.find('[model-name]');
		var modelMap = {};
		$(models).each(function(index, model) {
			model = $(model);
			var modelName = model.attr('model-name');
			modelMap[modelName] = modelName;
		});

		var m = {};
		for ( var modelName in modelMap) {
			var modelForms = form.find('[model-name="' + modelName + '"]');
			var hasParentModel = false;
			for ( var modelName_ in modelMap) {
				if (modelName_ != modelName) {
					var fs = modelForms.closest('[model-name="' + modelName_ + '"]');
					if (fs.length > 0) {
						hasParentModel = true;
					}
				}
			}
			if (!hasParentModel) {
				m[modelName] = modelName;
			}
		}
		for ( var modelName in m) {
			var modelForms = form.find('[model-name="' + modelName + '"]');

			var modelDatas = [];
			var datatype = "ONE";
			var setname = "";
			$(modelForms).each(function(index, modelForm) {
				modelForm = $(modelForm);
				datatype = modelForm.attr('core-data-type') || 'ONE';
				setname = modelForm.attr('model-set-name') || '';
				var modelData = co.form.validate(modelForm, showerror);
				modelDatas[modelDatas.length] = modelData;
			});
			if (datatype == 'ONE') {
				// data['model_' + modelName] = modelDatas[0];
				if (co.isEmpty(setname)) {
					var modelData = modelDatas[0];
					for ( var n in modelData) {
						data[n] = modelData[n];
					}
				} else {
					data[setname] = JSON.stringify(modelDatas[0]);
				}
			} else {

				var coreChildForm = form.find('[model-name="' + modelName + '"]').closest('.core-child-form');
				var deleteDatas = coreChildForm.data('delete-datas');
				if (co.isEmpty(setname)) {
					setname = modelName + '_datas';
				}
				// data['model_' + modelName] = modelDatas;
				data[setname] = JSON.stringify(modelDatas);
				if (deleteDatas && deleteDatas.length > 0) {
					data[modelName + '_for_delete_jsonarray'] = JSON.stringify(deleteDatas);
				}
			}
		}

		return data;
	}
})();