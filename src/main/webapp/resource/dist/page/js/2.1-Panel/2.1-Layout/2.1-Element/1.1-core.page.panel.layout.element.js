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

		if (this.element.type == 'SWITCH') {

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

	Element.prototype.initAttribute = function() {

		var config = this.element.config;
		var helpinfo = config.helpinfo;
		var minlength = config.minlength;
		var maxlength = config.maxlength;
		var readonly = config.readonly;
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
		if (this.forsearch && (inputtype == 'SWITCH' || inputtype == 'RADIO')) {
			inputtype = "SELECT";
		}
		inputtype = inputtype.toLowerCase();
		if (inputtype == 'IMAGE' || inputtype == 'IMAGES') {
			this.$input.addClass('input-rule-file-image');
		} else {
			this.$input.addClass('input-rule-' + inputtype);
		}

		this.$input.attr('elementid', this.element.elementid);
		this.$input.attr('addClass', 'coos-one-element');
		this.$input.attr('need-addon', 'true');
		if (!co.isEmpty(config.pattern)) {
			this.$input.attr('pattern', config.pattern);
		}
		if (!co.isEmpty(config.eq)) {
			this.$input.attr('eq', config.eq);
		}
		if (!co.isEmpty(config.eqto)) {
			this.$input.attr('eqto', config.eqto);
		}
		if (!co.isEmpty(config.gt)) {
			this.$input.attr('gt', config.gt);
		}
		if (!co.isEmpty(config.gtto)) {
			this.$input.attr('gtto', config.gtto);
		}
		if (!co.isEmpty(config.gte)) {
			this.$input.attr('gte', config.gte);
		}
		if (!co.isEmpty(config.gteto)) {
			this.$input.attr('gteto', config.gteto);
		}
		if (!co.isEmpty(config.lt)) {
			this.$input.attr('lt', config.lt);
		}
		if (!co.isEmpty(config.ltto)) {
			this.$input.attr('ltto', config.ltto);
		}
		if (!co.isEmpty(config.beforeaddon)) {
			this.$input.attr('before-addon', config.beforeaddon);
		}
		if (!co.isEmpty(config.afteraddon)) {
			this.$input.attr('after-addon', config.afteraddon);
		}
		if (!co.isEmpty(config.beforeaddononclick)) {
			this.$input.attr('before-addon-click', config.beforeaddononclick);
		}
		if (!co.isEmpty(config.afteraddononclick)) {
			this.$input.attr('after-addon-click', config.afteraddononclick);
		}
		this.$input.attr('helpinfo', helpinfo);
		this.$input.attr('name', name);
		this.$input.attr('label', label);
		this.$input.attr('label-size', labelsize);
		this.$input.attr('filtermode', config.filtermode);
		this.$input.attr('linkagename', linkagename);
		this.$input.attr('placeholder', config.oldlabel);
		this.$input.attr('minlength', minlength);
		if (maxlength > 0) {
			this.$input.attr('maxlength', maxlength);
		}
		this.$input.attr('cannull', cannull);
		this.$input.attr('column-size', columnsize);
		this.$input.attr('group-type', inputgrouptype);
		this.$input.attr('isreadonly', readonly);
		this.$input.attr('display', display);
		this.$input.attr('inputtype', inputtype);
		this.$input.attr('coos-validate', config.jsvalidate);
		this.$input.attr('coos-click', config.onclick);
		this.$input.attr('need-full-change', "true");
		this.$input.attr('need-addon', true);
		this.$input.addClass('parameter');
		this.$input.addClass('input-rule-group');
		this.$input.attr('need-addon', true);
		if (!co.isEmpty(this.element.config.defaultvalue)) {
			this.$input.attr("defaultvalue", this.element.config.defaultvalue);
		}
		if (!this.config.design && this.config.pageObject.config.requestmap && this.element.config.userrequestmapfordefault) {
			if (this.config.pageObject.config.requestmap[name] != null) {
				this.$input.attr('defaultvalue', this.config.pageObject.config.requestmap[name]);
			}
		}
		if (!co.isEmpty(this.element.thisvalue)) {
			this.$input.attr("defaultvalue", this.element.thisvalue);
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

		if (this.place == ('TABLE-TH')) {
			this.$input = this.getTableThView();
		} else if (this.place == ('TABLE-TD')) {
			this.$input = this.getTableTdView();
		} else {
			this.$input = this.getInput();
		}
		this.initContent();
		this.$view.append(this.$input);
		if (this.place.indexOf('FORM') >= 0) {
			this.initAttribute();
			var datas = this.element.selectdatas;
			if (this.element.config.needwrap) {
				this.$input.before("<div class=\"coos-col-12\"></div>");
			}

			if (datas != null) {
				var $select = $('<select class="option-select display-none" />');
				if (this.$input[0].tagName == 'SELECT') {
					$select = this.$input;
					$select.append('<option value="">请选择</option>');
				} else {
					this.$view.append($select);
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
					this.$input.attr('rule-relation', this.element.config.relationname);
				} else if (!co.isEmpty(this.element.relationname)) {
					this.$input.attr('rule-relation', this.element.relationname);
				}
			}
			if (this.place == 'FORM-SEARCH') {
				if (this.element.type == 'SLIDER') {
					var $input = this.$input;
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

		this.$view = this.$view.children();
		this.initViewAfter();
	};

	Element.prototype.initViewBefore = function() {
	};

	Element.prototype.initViewAfter = function() {
	};

	Element.prototype.appendFormValue = function(value) {
		this.$input.val(this.getValue(value));
		this.$input.data('text-value', this.getTextValue(value));
		this.$input.change();
	};
	Element.prototype.appendTdValue = function(value) {
		this.$input.empty();
		this.$input.append(this.getTextValue(value));
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

	Element.prototype.getTextValue = function(value) {
		if (this.textUseSelectData()) {
			return this.getSelectDataText(this.getValue(value));
		}
		return value;
	};

	Element.prototype.getValue = function(value) {
		return value;
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

	Element.prototype.initContent = function() {
	};

	co.page.panel.layout.element = {};
	co.page.panel.layout.element.Element = Element;
})(window, jQuery);