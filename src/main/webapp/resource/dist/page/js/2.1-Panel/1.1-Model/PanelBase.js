(function(window, jQuery, coos) {
	var ThisPanel = function(config) {
		coos.page.panel.Panel.call(this, config);
	};
	(function() {
		var Super = function() {
		};
		Super.prototype = coos.page.panel.Panel.prototype;
		ThisPanel.prototype = new Super();
	})();

	ThisPanel.prototype.initContent = function() {
		var $view = $(ThisPanelConfig.html);
		var $content = this.$content;
		$content.append($view);

		var panel = this.panel;
		if (panel) {
			var config = panel.config;
			var bodertopcolor = config.bodertopcolor;
			var boderleftcolor = config.boderleftcolor;
			var headerbackgroundcolor = config.headerbackgroundcolor;
			var bodybackgroundcolor = config.bodybackgroundcolor;
			var hasheaderborder = config.hasheaderborder;
			var notitle = config.notitle;
			var title = panel.title;
			var body = panel.body;

			$content.find('.coos-panel').addClass('coos-panel-light');
			$content.find('.coos-panel').attr('panelid', panel.panelid);
			if (hasheaderborder) {
				$content.find('.coos-panel-header').addClass('bordered');
			}
			if (!coos.isEmpty(headerbackgroundcolor)) {
				if (headerbackgroundcolor == 'white') {
				} else {
					$content.find('.coos-panel').removeClass('coos-panel-light').addClass('coos-panel-dark');
				}
				$content.find('.coos-panel-header').addClass('coos-bg-' + headerbackgroundcolor);
			}
			if (!coos.isEmpty(bodybackgroundcolor)) {
				if (bodybackgroundcolor == 'white') {
				} else {
					$content.find('.coos-panel-body').addClass('coos-white');
				}
				$content.find('.coos-panel-body').addClass('coos-bg-' + bodybackgroundcolor);
			}
			if (!coos.isEmpty(bodertopcolor)) {
				$content.find('.coos-panel').addClass('coos-panel-bd-top coos-bdt-' + bodertopcolor);
			}
			if (!coos.isEmpty(boderleftcolor)) {
				$content.find('.coos-panel').addClass('coos-panel-bd-left coos-bdl-' + boderleftcolor);
			}
			if (!coos.isEmpty(title)) {
				$content.find('.coos-panel-title').text(title);
			} else {
				$content.find('.coos-panel-title').html('&nbsp;');
			}
			if (notitle) {
				$content.find('.coos-panel-title').html('&nbsp;');
			}
			if (config.noheader) {
				$content.find('.coos-panel-header').hide();
			}
			if (!coos.isEmpty(body)) {
				$content.find('.coos-panel-body').html(body);
			}
		}

	};

	var ThisPanelConfig = {
		html : '<div class="coos-panel ">' + '<div class="coos-panel-header ">' + '	<h3 class="coos-panel-title"></h3>' + '	<div class="coos-panel-menu">'
				+ '		<div class=" coos-menu baseMinimizeBtn">' + '			<i class="fa fa-minus"></i>' + '		</div>' + '		<div class=" coos-menu removePanelBtn">' + '			<i class="fa fa-remove"></i>'
				+ '		</div>' + '	</div>' + '</div>' + '<div class="coos-panel-body coos-layout-container"></div>' + '</div>',
		name : "基础面板",
		hasElement : false,
		columns : [ {
			text : "无头部",
			name : "noheader",
			inputtype : "switch"
		}, {
			text : "无标题",
			name : "notitle",
			inputtype : "switch"
		}, {
			text : "头部边框",
			name : "hasheaderborder",
			inputtype : "switch"
		}, {
			text : "顶部边框",
			name : "bodertopcolor",
			inputtype : "select",
			usecolor : true
		}, {
			text : "左侧边框",
			name : "boderleftcolor",
			inputtype : "select",
			usecolor : true
		}, {
			text : "头部背景",
			name : "headerbackgroundcolor",
			inputtype : "select",
			usecolor : true
		}, {
			text : "内容背景",
			name : "bodybackgroundcolor",
			inputtype : "select",
			usecolor : true
		} ],
		element : {}
	};
	coos.page.panel.model.defind("BASE", ThisPanelConfig, ThisPanel);
})(window, jQuery, coos);