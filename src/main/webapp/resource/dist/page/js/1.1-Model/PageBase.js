(function(window, jQuery, coos) {
	var html = '<div class=" coos-page"><div class="coos-page-header "><h1 class="coos-page-title"></h1><small class="coos-page-title-content"></small><div class="coos-panel-menu"></div></div><div class="coos-page-content coos-panel-container"></div></div>';

	var PageBase = function(config) {
		coos.page.Page.call(this, config);
	};
	(function() {
		var Super = function() {
		};
		Super.prototype = coos.page.Page.prototype;
		PageBase.prototype = new Super();
	})();

	PageBase.prototype.initContent = function() {
		var page = this.page;
		this.$view = $(html);
		$(this.config.container) && ($(this.config.container).append(this.$view));
		this.$content = this.$view.find('.coos-page-content');
		if (!coos.isEmpty(page.title)) {
			this.$view.find('.coos-page-title').text(page.title);

			if (!coos.isEmpty(page.config.titleplaces)) {
				$(page.config.titleplaces.split(',')).each(function(index, place) {
					if (!coos.isEmpty(place)) {
						if (place == ('WINDOW')) {
							coos.setTitle(page.title);
						} else if (place == ('HEADER')) {
							coos.frame.setTitle(page.title);
						}
					}
				});
			}
		}
		if (!coos.isEmpty(page.titlecontent)) {
			this.$view.find('.coos-page-title-content').text(page.titlecontent);
		}
		if (page.config.nopageheader) {
			this.$view.find('.coos-page-header:first').hide();
			this.$content.addClass('pdt-15');
		}
	};

	var PageBaseConfig = {
		name : "基础页面",
		hasElement : false,
		columns : [ {
			text : "无页面头部",
			name : "nopageheader",
			inputtype : "switch"
		}, {
			text : "标题位置",
			name : "titleplaces",
			inputtype : "select",
			datas : [ {
				value : "WINDOW,HEADER",
				text : "窗口和框架头部"
			}, {
				value : "WINDOW",
				text : "窗口"
			}, {
				value : "HEADER",
				text : "框架头部"
			} ]
		} ],
		element : {}
	};
	coos.page.model.defind("BASE", PageBaseConfig, PageBase);
})(window, jQuery, coos);