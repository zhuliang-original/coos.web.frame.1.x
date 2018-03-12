(function(window, jQuery) {
	var html_map = {
		"1" : '<div class="coos-tab"><ul class="coos-tab-buttons"></ul><div class="coos-tab-spans"></div></div>'
	}

	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();

	ThisLayout.prototype.appendTabOneSpan = function(text) {
		if (!coos.isEmpty(text)) {
			var className = "tag-span-" + coos.getNumber();
			var $li = $('<li coos-target=".' + className + '" ><a>' + text + '</a></li>');
			this.$tag.find('.coos-tab-buttons:first').append($li);
			var $span = $('<div class=" coos-tab-span coos-layout-container ' + className + '"></div>');
			this.$tag.find('.coos-tab-spans:first').append($span);
		}

	};
	ThisLayout.prototype.initContent = function() {
		var type = this.layout.config.type || "1";
		var $tag = $(html_map[type]);
		this.$tag = $tag;
		var texts = this.layout.config.texts || "标签";
		var this_ = this;
		$(texts.split(',')).each(function(index, text) {
			this_.appendTabOneSpan(text);
		});
		this.$content.append($tag);
		$tag.find('li:first').addClass('active');
	};

	ThisLayout.prototype.getNewOneContainerView = function(config) {
		return this.$tag.find('.coos-tab-span:first');
	};

	// ThisLayout.prototype.getSearchData = function() {
	// var requestmap = this.config.pageObject.config.requestmap || {};
	// requestmap = jQuery.extend(true, {}, requestmap);
	// return requestmap;
	// };

	ThisLayout.prototype.getData = function() {
		var data = co.form.validate(this.$view);
		return data;
	};

	var ThisLayoutConfig = {
		name : "标签",
		columns : [ {
			text : "显示标题",
			name : "displaytitle",
			inputtype : "switch"
		}, {
			text : "只读",
			name : "readonly",
			inputtype : "switch"
		}, {
			text : "显示返回",
			name : "displayback",
			inputtype : "switch"
		} ]
	};
	co.page.panel.layout.model.defind("TAG", ThisLayoutConfig, ThisLayout);
})(window, jQuery);