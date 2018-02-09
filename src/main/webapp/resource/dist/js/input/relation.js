(function() {
	var RelationBind = function($selector) {
		$selector = $($selector);
		this.$selector = $selector;
		this.tagName = $selector[0].tagName;
		this.isSelectTag = (this.tagName === 'SELECT');
		this.isInputTag = (this.tagName === 'INPUT');
		this.rulerelation = $selector.attr('rule-relation');
		this.init();
	};

	RelationBind.prototype.init = function() {
		var rulerelationRule = this.rulerelation;
		if (coos.isEmpty(rulerelationRule)) {
			return;
		}
		if (rulerelationRule.indexOf('[') == 0 || rulerelationRule.indexOf('.') == 0 || rulerelationRule.indexOf('#') == 0) {

		} else {
			rulerelationRule = '[name="' + rulerelationRule + '"]';
		}
		if (this.$selector.closest('.coos-form').length < 1) {
			this.$relation = $(rulerelationRule);
		} else {
			this.$relation = this.$selector.closest('.coos-form').find(rulerelationRule);
		}
		this.$select = null;
		this.$options = null;
		if (this.isInputTag) {
			this.$select = this.$selector.parent().find('select.option-select');
		}
		if (this.isSelectTag) {
			this.$select = this.$selector;
		}

		this.$options = this.$select.find('option');

		this.valueChange();
		var this_ = this;
		this.$relation.change(function() {
			this_.valueChange();
		});
	};

	RelationBind.prototype.valueChange = function() {
		var this_ = this;
		var newoptions = this.$select.find('option');
		if (newoptions.length > 0) {
			$(newoptions).each(function(index, newoption) {
				var has = false;
				$(this_.$options).each(function(index, $option) {
					if ($($option).attr('value') == $(newoption).attr('value')) {
						has = true;
						return false;
					}
				});
				if (!has) {
					this_.$options.push($(newoption));
				}
			});
		}

		var value = this.$selector.val();
		var relationvalue = this.$relation.val();
		this.$select.html('<option value="">请选择</option>');
		var have = false;
		for (var i = 0; i < this.$options.length; i++) {
			var $option = $(this.$options[i]);
			if (!co.isEmpty($option.attr('value'))) {
				if ($option.attr('relationvalue') == relationvalue) {
					this.$select.append($option);
					if ($option.attr('value') == value) {
						have = true;
					}
				}
			}
		}
		if (have) {
			this.$selector.val(value);
		} else {
			if (this.$options.length > 0) {
				$(this.$select.find('option')[0]).attr('selected', 'selected');
			}
		}
		this.$selector.data('select-option-change') && this.$selector.data('select-option-change')();
		this.$selector.change();
	};

	co.input.relation = new Object();
	co.input.relation.bind = function($selector, config) {
		return new RelationBind($selector, config)
	}
})();