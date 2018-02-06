(function() {

	var SelectBind = function($selector, config) {
		config = config || {};
		this.$selector = $selector;
		this.tagName = $selector[0].tagName;
		this.config = config;
		var ismulti = config.ismulti;
		this.ismulti = ismulti;
		this.isSelectTag = (this.tagName === 'SELECT');
		this.isInputTag = (this.tagName === 'INPUT');
		this.init();

	};
	SelectBind.prototype.init = function() {
		this.rulerelation = this.$selector.attr('rule-relation');

		var isreadonly = this.$selector.attr('isreadonly');
		isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
		this.isreadonly = isreadonly;
		var needaddon = this.$selector.attr('need-addon');
		needaddon = needaddon != null && needaddon == 'true' ? true : false;
		this.needaddon = needaddon;
		this.initView();
		this.initDatas();
		this.bindWindowEvent();
		this.binTextEvent();

		// 组合级联菜单
		if (this.rulerelation != null) {
			co.input.relation.bind(this.$selector);
		}
	};

	SelectBind.prototype.initView = function() {
		this.$viewBtn = null;
		if (this.needaddon) {
			this.$viewBtn = $('<span class="coos-input-addon coos-input-addon-after coos-pointer" ><i class="fa fa-circle-o"></i></span>');
			this.$selector.after(this.$viewBtn);
		}
		this._need_create_text_input = false;
		this._need_create_value_input = false;
		if (this.ismulti) {
			this._need_create_text_input = true;
		}
		this.$select = null;
		if (this.isSelectTag) {
			if (this.ismulti) {
				this._need_create_text_input = true;
				this._need_create_value_input = true;
			}
			this.$select = this.$selector;
		} else if (this.isInputTag) {
			this._need_create_text_input = true;
			this.$select = this.$selector.parent().find('select.option-select');
		}
		this.$text = null;
		this.$value = this.$selector;
		if (this._need_create_text_input) {
			if (this.isInputTag) {
				this.$text = this.$selector.clone();
			} else {
				this.$text = $('<input/>');
				this.$text.addClass(this.$selector.attr('class'));
				this.$text.attr('placeholder', this.$selector.attr('placeholder'));
			}
			this.$text.removeClass('input-rule-select input-rule-multi-select input-rule-group parameter');
			this.$text.removeAttr('name');
			this.$selector.after(this.$text);
			this.$selector.hide();
		}
		if (this._need_create_value_input) {
			if (this.isInputTag) {
				this.$value = this.$selector;
			} else if (this.isSelectTag) {
				if (this.ismulti) {
					this.$value = $('<input/>');
					this.$selector.after(this.$value);
					this.$value.hide();
				} else {
					this.$value = this.$selector;
				}
			}
		}

		var value = this.$value.val();
		this.setValue(value, false);
	};

	SelectBind.prototype.bindWindowEvent = function() {
		var this_ = this;
		if (this.$viewBtn) {
			var $select = this.$select;
			var $value = this.$value;
			var ismulti = this.ismulti;
			this.$viewBtn.click(function() {
				var value = $value.val();
				viewSelectWindow({
					$select : $select,
					ismulti : ismulti,
					value : value,
					callback : function(value) {
						this_.setValue(value, true);
					}
				});
			});
		}
	};

	SelectBind.prototype.binTextEvent = function() {
		var this_ = this;
		if (this.$text) {
			var selecting = false;
			this.$text.change(function() {

				// 去除不完整的TEXT
				var text = $(this).val();

				var value = getValueByText(text, this_.$select, this_.ismulti);
				this_.setValue(value);
			});
			co.plugin.load("jquery_ui_widgets", function() {

				this_.$text.on("keydown", function(event) {
					if (event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete("instance").menu.active) {
						event.preventDefault();
					}
				});
				var autoc = this_.$text.autocomplete({
					minLength : 0,
					source : function(request, response) {
						response($.ui.autocomplete.filter(this_.datas, extractLast(request.term)));
					},
					focus : function() {
						return false;
					},
					select : function(event, ui) {
						if (co.isEmpty(ui.item.value)) {
							return false;
						}
						var value = ui.item.value || "";
						if (this_.ismulti) {
							var valueterms = split(this_.$text.data('bind-value'));
							valueterms.pop();
							valueterms.push(ui.item.value);
							valueterms.push("");
							value = valueterms.join(",");
						} else {
						}
						this_.setValue(value, true);
						return false;
					}
				});
				// var uiAutocomplete = autoc.data('uiAutocomplete');
				// this_.$text.on('mouseup', function() {
				// var data = this_.$text.filter(datas, "");
				// console.log(uiAutocomplete);
				// });
			});
		}
	};

	SelectBind.prototype.initDatas = function() {
		this.datas = getSelectOptionDatas(this.$select);
		var this_ = this;
		this.$selector.data('select-option-change', function() {
			this_.optionChange();
		});
	};
	SelectBind.prototype.optionChange = function() {
		this.initDatas();
		if (this.$text) {
			// 去除不完整的TEXT
			var text = this.$text.val();
			var value = getValueByText(text, this.$select, this.ismulti);

			this.setValue(value);
		}
	};

	SelectBind.prototype.setValue = function(value, needEvent) {
		value = trimValue(value, this.ismulti);
		if (this.$text) {
			var showText = getShowText(value, this.$select, this.ismulti);
			this.$text.val(showText);
			this.$text.data('bind-value', value);
		}
		if (this.$value) {
			this.$value.val(value);
			if (needEvent) {
				this.$value.change();
			}
		}
	};
	function trimValue(value, ismulti) {
		value = value || "";
		var values = [ value ];
		if (ismulti) {
			values = split(value);
		}
		var joinValueMap = {};
		var vs = [];
		$(values).each(function(index, v) {
			if (v == null || v == '') {
				return;
			}
			if (joinValueMap[v] == null) {
				vs.push(v);
			}
			joinValueMap[v] = v;
		});
		vs.push("");
		var v = vs.join("");
		if (ismulti) {
			v = vs.join(",");
		}
		return v;

	}

	function split(val) {
		return val.split(/,\s*/);
	}
	function extractLast(term) {
		return split(term).pop();
	}
	function getSelectOptionDatas($select) {
		var $options = $select.find('option');
		var datas = [];
		$($options).each(function(index, $option) {
			$option = $($option);
			var text = $option.text();
			var value = $option.attr('value');
			var image = $option.attr('image');
			var parent = $option.attr('parent');
			var data = {};
			data.text = text;
			data.label = text;
			data.value = value;
			data.image = image;
			data.parent = parent;
			datas[datas.length] = data;
		});
		return datas;
	}
	function getValueByText(text, $select, ismulti) {
		var valueterms = [];
		if (!co.isEmpty(text)) {
			var texts = [ text ];
			if (ismulti) {
				texts = split(text);
			}
			var textmap = {};
			var $options = $select.find('option');
			$options.each(function(index, one) {
				one = $(one);
				textmap[one.text()] = one.attr('value');
			});

			$(texts).each(function(index, one) {
				if (!co.isEmpty(one) && textmap[one]) {
					valueterms.push(textmap[one]);
				}
			});
		}
		valueterms.push("");
		var value = valueterms.join("");
		if (ismulti) {
			value = valueterms.join(",");
		}
		return value;
	}

	function getShowText(value, $select, ismulti) {
		var textterms = [];
		if (!co.isEmpty(value)) {
			var values = [ value ];
			if (ismulti) {
				values = split(value);
			}
			var valuemap = {};
			var $options = $select.find('option');
			$options.each(function(index, one) {
				one = $(one);
				valuemap[one.attr('value')] = one.text();
			});

			$(values).each(function(index, one) {
				if (!co.isEmpty(one) && valuemap[one]) {
					textterms.push(valuemap[one]);
				}
			});
		}
		textterms.push("");
		var text = textterms.join("");
		if (ismulti) {
			text = textterms.join(", ");
		}
		return text;
	}

	function viewSelectWindow(config) {
		var label = config.label;
		var callback = config.callback;
		var ismulti = config.ismulti;
		var value = config.value;
		var $options = config.$select.find('option');
		var datas = [];
		$($options).each(function(index, $option) {
			$option = $($option);
			var text = $option.text();
			var value = $option.attr('value');
			if (ismulti && co.isEmpty(value)) {
				return;
			}
			var image = $option.attr('image');
			var parent = $option.attr('parent');
			var data = {};
			data.text = text;
			data.value = value;
			data.image = image;
			data.parent = parent;
			datas[datas.length] = data;
		});
		var windowConfig = {};
		windowConfig.title = "选择" + label;
		windowConfig.datas = datas;
		if (ismulti) {
			if (!co.isEmpty(value)) {
				windowConfig.values = split(value);
			} else {
				windowConfig.values = [];
			}
			windowConfig.isradio = false;
		} else {
			windowConfig.value = value;
		}
		windowConfig.callback = function(values, texts) {
			var textterms = [];
			var valueterms = [];
			for (var i = 0; i < values.length; i++) {
				valueterms.push(values[i]);
			}
			valueterms.push("");
			for (var i = 0; i < texts.length; i++) {
				textterms.push(texts[i]);
			}
			textterms.push("");
			var value = valueterms.join("");
			var text = textterms.join("");
			if (ismulti) {
				value = valueterms.join(",");
				text = textterms.join(", ");
			}
			callback && callback(value, text);
		};
		co.box.window.select(windowConfig);
	}

	co.input.select = new Object();
	co.input.select.bind = function($selector, config) {
		return new SelectBind($selector, config)
	}
})();