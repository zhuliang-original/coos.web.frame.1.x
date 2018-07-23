(function(window, jQuery) {
	var html = '<div class=" "></div>';
	var Element = function(config) {
		this.config = config;
		this.element = config.element;
		this.design = config.design;
		this.init(config);
		jQuery.extend(true, config.element, this.element);
	};

	Element.prototype.init = function(config) {
		var element = config.element;
		var elementConfig = element.config;
		if (elementConfig != null) {
			if (co.isString(elementConfig)) {
				elementConfig = JSON.parse(elementConfig);
			}
		}
		element.config = elementConfig || {};

		if (this.forsearch && this.element.type == 'SWITCH') {

			this.element.selectdatas = [ {
				text : '是',
				value : '1'
			}, {
				text : '否',
				value : '0'
			} ]
		}
		var selectdatamap = {};
		var selectdatas = this.getSelectDatas();
		$(selectdatas).each(function(index, selectdata) {
			selectdatamap["" + selectdata.value] = selectdata;
		});
		this.selectdatamap = selectdatamap;
	};

	Element.prototype.getSelectDatas = function() {
		return this.element.selectdatas;
	};
	Element.prototype.textUseSelectData = function() {
		return false;
	};

	Element.prototype.getSelectData = function(value) {
		if (!co.isEmpty(value)) {
			var selectdata = this.selectdatamap["" + value];
			if (selectdata == null) {
				if (("" + value) == ("true")) {
					selectdata = this.selectdatamap["1"];
				} else if (("" + value) == ("false")) {
					selectdata = this.selectdatamap["0"];
				}
			}
			return selectdata;
		}
		return null;
	};

	Element.prototype.getSelectDataText = function(value) {
		var text = "";
		if (!co.isEmpty(value)) {
			var vs = ("" + value).split(',');
			var this_ = this;
			$(vs).each(function(index, v) {
				var selectdata = this_.getSelectData(v);
				if (selectdata != null) {
					text += "," + selectdata.text;
				}
			});
		}
		if (!co.isEmpty(text)) {
			text = text.replace(',', '');
		} else {
			text = "";
		}
		return text;
	};

	Element.prototype.initAttribute = function($input) {

		var config = this.element.config;
		var helpinfo = config.helpinfo;
		var minlength = config.minlength;
		var maxlength = config.maxlength;
		var readonly = config.readonly;

		if (this.config.layout && this.config.layout.config) {
			if (coos.isTrue(this.config.layout.config.readonly)) {
				readonly = true;
			}
		}
		var display = config.display;
		var cannull = config.cannull;
		if (!readonly) {
			minlength = 0;
		}
		var linkagename = this.element.linkagename;
		var columnsize = this.element.columnsize;
		var inputgrouptype = config.inputgrouptype;
		var labelsize = config.labelsize;
		inputgrouptype = inputgrouptype || 4;
		labelsize = labelsize || 3;
		var helpinfo = config.helpinfo;
		// 隐藏
		if (!display) {
			this.element.type = "TEXT";
		}
		var name = this.element.name;
		var label = config.label;
		var inputtype = this.element.type;
		if (co.isEmpty(inputtype)) {
			inputtype = "TEXT";
		}
		if (this.forsearch && (inputtype == 'SWITCH')) {
			inputtype = "SELECT";
		}
		if (inputtype == 'IMAGE' || inputtype == 'IMAGES') {
		} else {
			$input.addClass('input-rule-' + inputtype.toLowerCase());
		}

		if (!co.isEmpty(config.pattern)) {
			$input.attr('pattern', config.pattern);
		}
		if (!co.isEmpty(config.validaterule)) {
			$input.attr('validate-rule', config.validaterule);
		}
		if (!co.isEmpty(config.validateruleerrmsg)) {
			$input.attr('validate-rule-errmsg', config.validateruleerrmsg);
		}
		if (!co.isEmpty(config.beforeaddon)) {
			$input.attr('before-addon', config.beforeaddon);
		}
		if (!co.isEmpty(config.afteraddon)) {
			$input.attr('after-addon', config.afteraddon);
		}
		if (!co.isEmpty(config.beforeaddononclick)) {
			$input.attr('before-addon-click', config.beforeaddononclick);
		}
		if (!co.isEmpty(config.afteraddononclick)) {
			$input.attr('after-addon-click', config.afteraddononclick);
		}
		$input.attr('help-info', helpinfo);
		$input.attr('name', name);
		$input.attr('label', label);
		$input.attr('label-size', labelsize);
		$input.attr('filtermode', config.filtermode);
		$input.attr('linkagename', linkagename);
		$input.attr('placeholder', config.oldlabel);
		$input.attr('minlength', minlength);
		if (maxlength > 0) {
			$input.attr('maxlength', maxlength);
		}
		$input.attr('cannull', cannull);
		$input.attr('column-size', columnsize);
		$input.attr('group-type', inputgrouptype);
		$input.attr('isreadonly', readonly);
		$input.attr('display', display);
		$input.attr('coos-validate', config.jsvalidate);
		$input.attr('coos-click', config.onclick);
		$input.attr('need-full-change', "true");
		$input.attr('need-addon', true);
		$input.addClass('parameter');
		$input.addClass('input-rule-group');

		if (!co.isEmpty(this.element.config.defaultvalue)) {
			$input.attr("defaultvalue", this.element.config.defaultvalue);
		}
		if (!this.config.design && this.config.pageObject.config.requestmap) {
			if (co.isEmpty(this.element.config.userrequestmapfordefault) || this.element.config.userrequestmapfordefault) {

				if (this.config.pageObject.config.requestmap[name] != null) {
					$input.attr('defaultvalue', this.config.pageObject.config.requestmap[name]);
				}
			}
		}
		if (!co.isEmpty(this.element.thisvalue)) {
			$input.attr("defaultvalue", this.element.thisvalue);
		}
	};

	Element.prototype.getInput = function() {
		return $("<input type=\"text\" />");
	};

	Element.prototype.getTableThView = function() {
		var $input = $('<th></th>');
		$input.text(this.element.config.label);
		$input.addClass('coos-one-element');
		$input.attr('elementid', this.element.elementid);
		$input.data('element', this.element);
		$input.data('elementObject', this);
		var display = this.element.config.display;
		if (!display) {
			$input.addClass('display-none');
		}
		if (this.element.config.clicktosort) {
			$input.addClass('coos-sort-both');
			$input.attr('rule-sort-name', this.element.name);
			var type = "";
			var this_ = this;
			$input.click(function() {
				var type = $input.attr('rule-sort-type');
				if (coos.isEmpty(type)) {
					type = "asc";
				} else if (type == "asc" || type == "ASC") {
					type = "desc";
				} else {
					type = null;
				}
				$input.removeClass('coos-sort-asc coos-sort-desc');
				if (coos.isEmpty(type)) {
					$input.removeAttr('rule-sort-type');
				} else {
					if (type == "asc") {
						$input.addClass('coos-sort-asc');
					} else if (type == "desc") {
						$input.addClass('coos-sort-desc');
					}
					$input.attr('rule-sort-type', type);
				}
				this_.config.layoutObject.loadData();
			});
		}
		return $input;
	};

	Element.prototype.getTableTdView = function() {
		var $input = $('<td></td>');
		$input.text(this.element.config.label + "显示值");
		$input.addClass('coos-one-element');
		$input.attr('elementid', this.element.elementid);
		var display = this.element.config.display;
		if (!display) {
			$input.addClass('display-none');
		}
		return $input;
	};

	Element.prototype.getTableTdValue = function(value) {
		return value;
	};

	Element.prototype.initView = function() {
		this.initViewBefore();
		this.$view = $(html);
		var $input = null;
		var $td = null;
		var $th = null;
		if (this.place == ('TABLE-TH')) {
			$th = this.getTableThView();
		} else if (this.place == ('TABLE-TD')) {
			$td = this.getTableTdView();
			if (this.config.layoutObject.layout.config.isformtable) {
				$input = this.getInput();
			}
		} else {
			$input = this.getInput();
		}
		if ($th != null) {
			this.$view.append($th);
		}
		if ($td != null) {
			this.$view.append($td);
		}
		if ($input != null) {
			this.initInput($input);
			if ($td != null) {
				$td.empty().append($input);
			} else {
				this.$view.append($input);
			}
		}
		if ($input != null) {
			if ($td == null) {
				$input.attr('elementid', this.element.elementid);
				$input.attr('addClass', 'coos-one-element');

			}
			this.initAttribute($input);
			var datas = this.element.selectdatas;
			if (this.element.config.needwrap) {
				$input.before("<div class=\"coos-col-12\"></div>");
			}

			if (datas != null) {
				var $select = $('<select class="option-select display-none" />');
				if ($input[0].tagName == 'SELECT') {
					$select = $input;
					$select.append('<option value="">请选择</option>');
				} else {
					this.$view.append($select);
					var inputtype = this.element.type;
					if (inputtype.indexOf('RADIO') >= 0) {
						if (this.forsearch) {
							$select.append('<option value="">全部</option>');
						}
					}
				}
				$(datas).each(function(index, data) {
					var option = $('<option />');
					for ( var n in data) {
						option.attr(n, data[n]);
					}
					option.text(data.text);
					$select.append(option);
				});
				if (!co.isEmpty(this.element.config.relationname)) {
					$input.attr('rule-relation', this.element.config.relationname);
				} else if (!co.isEmpty(this.element.relationname)) {
					$input.attr('rule-relation', this.element.relationname);
				}
			}
			if (this.place == 'FORM-SEARCH') {
				if (this.element.type == 'SLIDER') {
					var name = this.element.name;
					var startname = name + "_start";
					var endname = name + "_end";
					var $start = $('<input class="parameter "  style="display:none;" name="' + startname + '" need-full-change="true" value="0"/>');
					var $end = $('<input class="parameter"  style="display:none;" name="' + endname + '" need-full-change="true" value="100"/>');
					this.$view.append($start);
					this.$view.append($end);
					$input.attr('coos-is-interval-search', "true");
					$end.change(function() {
						var startvalue = $start.val();
						var endvalue = $end.val();
						$input.val(startvalue + "," + endvalue);
						$input.change();
					});
					var thisvalue = $input.val();
					if (!co.isEmpty(thisvalue) && thisvalue.indexOf(',') > 0) {
						var start = thisvalue.split(',')[0];
						var end = thisvalue.split(',')[1];

						$start.attr('value', start);
						$input.attr('value', thisvalue);
					} else {
						$input.attr('value', '0,100');
					}
				}

			}
		}
		if ($td != null && $input != null) {
			$input.attr('label-size', 0);
			$input.attr('column-size', 12);
			$td.addClass('pd-0');
		}
		this.$input = $input;
		this.$th = $th;
		this.$td = $td;
		if (!this.config.design) {
			this.bindEvent();
		}
		this.$view = this.$view.children();
		this.initViewAfter();
	};

	Element.prototype.initViewBefore = function() {
	};

	Element.prototype.initViewAfter = function() {
	};

	Element.prototype.appendFormValue = function(value) {
		var $input = this.$input;
		if ($input != null) {
			$input.val(this.getValue(value));
			$input.data('text-value', this.getTextValue(value));
			$input.change();
		}
	};
	Element.prototype.appendTdValue = function(value) {
		var $td = this.$td;
		if ($td != null) {
			if (this.$input != null) {
				this.appendFormValue(value);
			} else {

				$td.empty();
				$td.append(this.getTextValue(value));
			}
		}
	};

	Element.prototype.appendValue = function(dataConfig) {
		dataConfig = dataConfig || {};
		dataConfig.data = dataConfig.data || {};
		this.dataConfig = dataConfig;
		var data = dataConfig.data;
		var name = this.element.name;
		var value = data[name];

		if (this.place == ('TABLE-TD')) {
			this.appendTdValue(value);
		} else {
			this.appendFormValue(value);
		}
	};

	Element.prototype.getValue = function(value) {
		return this.getFormatValue(value);
	};
	Element.prototype.getTextValue = function(value) {
		if (this.textUseSelectData()) {

			if (this.$input && typeof (value) == "undefined") {
				if (!coos.isEmpty(this.$input.attr('defaultvalue'))) {
					value = this.$input.attr('defaultvalue');
				}
			}
			var textValue = this.getSelectDataText(value);
			return this.getFormatTextValue(value, textValue);
		}
		return this.getFormatValue(value);
	};

	Element.prototype.getFormatValue = function(value) {
		var formatvalue = this.element.config.formatvalue;
		if (!coos.isEmpty(formatvalue)) {
			var dataConfig = this.dataConfig;
			dataConfig.this_value = value;
			var resolveValue = coos.resolve.value({
				value : formatvalue,
				data : dataConfig
			});
			try {
				return resolveValue.getResult();
			} catch (e) {
				console.log(e);
				return formatvalue;
			}
		}
		if (this.$input && typeof (value) == "undefined") {
			if (!coos.isEmpty(this.$input.attr('defaultvalue'))) {
				return this.$input.attr('defaultvalue');
			}
		}
		return value;
	};
	Element.prototype.getFormatTextValue = function(value, valueText) {
		var formatvalue = this.element.config.formatvalue;
		if (!coos.isEmpty(formatvalue)) {
			var dataConfig = this.dataConfig;
			dataConfig.this_value = value;
			dataConfig.this_value_text = valueText;
			var resolveValue = coos.resolve.value({
				value : formatvalue,
				data : dataConfig
			});
			try {
				return resolveValue.getResult();
			} catch (e) {
				console.log(e);
				return formatvalue;
			}
		}
		return valueText;
	};

	Element.prototype.getView = function(place) {
		place = place || "FORM";
		this.place = place;
		if (this.place == 'FORM-SEARCH') {
			this.forsearch = true;
			this.element.config.userrequestmapfordefault = true;
			if (!this.design) {
			}
		}
		this.initView();
		return this.$view;
	};
	Element.prototype.bindEvent = function() {
		var this_ = this;
		$(this.element.events).each(function(index, event) {
			co.page.event.bind({
				event : event,
				$view : this_.$view,
				$input : this_.$input,
				$td : this_.$td,
				$th : this_.$th,
				design : this_.config.design,
				layout : this_.config.layout,
				layoutObject : this_.config.layoutObject,
				page : this_.config.page,
				pageObject : this_.config.pageObject,
				panel : this_.config.panel,
				panelObject : this_.config.panelObject
			});
		});
	};
	Element.prototype.initInput = function($input) {
	};

	co.page.panel.layout.element = {};
	co.page.panel.layout.element.Element = Element;
})(window, jQuery);