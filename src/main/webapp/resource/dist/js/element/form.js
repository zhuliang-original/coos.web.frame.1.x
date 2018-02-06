(function() {
	co.element.initAddChildButton = function(content) {
		content = content || $('body');
		var elements = $(content).find('.coos-form-add-child-button');

		$(elements).each(function(index, element) {
			element = $(element);
			if (element.data('inited')) {
				return;
			}
			var canbind = false;
			var coreChildForm = element.closest('.coos-child-form');
			var coreChildFormParentContent = coreChildForm.closest('.coos-form-content');
			var mustinit = element.data('mustinit');
			if (mustinit) {
				canbind = true;
			} else if (coreChildFormParentContent.length == 0) {
				canbind = true;
			} else if (coreChildFormParentContent.length > 0) {

			}

			if (canbind) {
				element.data('inited', true);
				bindAddButton(element);
			} else {
			}
		});

		function bindAddButton(element) {
			element = $(element);
			var coreChildForm = element.closest('.coos-child-form');

			var $coreChildFormModel = coreChildForm.find('.coos-form-model:first');
			$coreChildFormModel.remove();
			var coreChildFormModel = $coreChildFormModel.clone();
			var modelName = coreChildFormModel.attr('model-name');
			if (coreChildForm.find('.coos-child-form').length > 0) {

			} else {
				coreChildForm.data('init', function() {
					var forms = coreChildForm.find('[model-name="' + modelName + '"]');
					$(forms).each(function(index, form) {
						form = $(form);
						var sequence = index + 1;
						var data = {};
						form.find('.coos-form-sequence:first').text(sequence);

						var sequence = form.find('[for-sequence]:first');
						if (sequence.length > 0) {
							var sequenceName = sequence.attr('name');
							data[sequenceName] = sequence;
							co.form.full(form, data);
						}
					});
				});
				coreChildForm.data('append', function() {
					var coreFormAddBefore = coreChildForm.attr('coos-form-add-before');
					var coreFormAddAfter = coreChildForm.attr('coos-form-add-after');
					var model = coreChildFormModel.clone();
					var aids = model.find('.coos-need-init-group-aid');
					var modelName = model.attr('model-name');
					$(aids).each(function(index, aid) {
						aid = $(aid);
						var aidModelName = aid.closest('[model-name]').attr('model-name');
						if (aidModelName == modelName) {
							aid.removeClass('coos-need-init-group-aid').addClass('coos-need-init-group');
							aid.removeClass('inputtype-select-aid').addClass('inputtype-select');
						}
					});
					model.removeAttr('coos-model')
					element.closest('.coos-child-form-footer').before(model);
					co.element.init(model);
					if (!co.isEmpty(coreFormAddBefore)) {
						eval('(' + coreFormAddBefore + ')')(model);
					}
					if (coreChildForm.data('coos-form-add-before')) {
						coreChildForm.data('coos-form-add-before')(model);
					}
					model.find('.coos-form-add-child-button').data('mustinit', true);
					co.element.initAddChildButton(coreChildForm);

					model.find('.coos-form-delete-button:first').click(function() {
						var button = $(this);
						var form = button.closest('.coos-form');
						co.box.confirm("确定要删除该表单？", function() {
							var coreFormDeleteBeforeFun = button.attr('coos-form-delete-before');
							var coreFormDeleteAfterFun = button.attr('coos-form-delete-after');
							var coreFormDeleteBefore = button.data('coos-form-delete-before');
							var coreFormDeleteAfter = button.data('coos-form-delete-after');
							if (!co.isEmpty(coreFormDeleteBeforeFun)) {
								var result = eval('(' + coreFormDeleteBeforeFun + ')')(form);
								if (co.isBoolean(result) && !result) {
									return;
								}
							}
							if (coreFormDeleteBefore) {
								var result = coreFormDeleteBefore(form);
								if (co.isBoolean(result) && !result) {
									return;
								}
							}
							model.remove();
							coreChildForm.data('init')();
							if (!co.isEmpty(coreFormDeleteAfterFun)) {
								var result = eval('(' + coreFormDeleteAfterFun + ')')(form);
								if (co.isBoolean(result) && !result) {
									return;
								}
							}
							if (coreFormDeleteAfter) {
								var result = coreFormDeleteAfter(form);
								if (co.isBoolean(result) && !result) {
									return;
								}
							}

						}, function() {
						})
					});
					model.find('.coos-form-minus-button:first').click(function() {
						if ($(this).data('minus-status') == 1) {
							$(this).data('minus-status', 0);
							model.find('.coos-form-content:first').show();
						} else {
							$(this).data('minus-status', 1);
							model.find('.coos-form-content:first').hide();

						}
					});

					coreChildForm.data('init')();
					if (coreChildForm.data('coos-form-add-after')) {
						coreChildForm.data('coos-form-add-after')(model);
					}
					if (!co.isEmpty(coreFormAddAfter)) {
						eval('(' + coreFormAddAfter + ')')(model);
					}
				});
				element.click(function() {
					coreChildForm.data('append')();

				});
				if (coreChildForm.find('.coos-form:first').length > 0) {

				} else {
					if (!co.isEmpty(element.attr('need-init-one'))) {
						element.click();
					}
				}
			}
		}
	};
})();