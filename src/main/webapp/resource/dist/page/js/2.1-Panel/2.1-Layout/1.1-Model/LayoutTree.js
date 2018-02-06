(function(window, jQuery) {
	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();
	ThisLayout.prototype.initData = function() {
		this.layout.config.idname = this.layout.config.idname || "id";
		this.layout.config.textname = this.layout.config.textname || "text";
	};
	ThisLayout.prototype.initContent = function() {

	};

	ThisLayout.prototype.initDemoView = function() {
		var data = {};
		data[this.layout.config.idname] = 1;
		data[this.layout.config.textname] = "文案";
		if (this.config.design) {
			this.appendData([ data ]);
		} else {

			this.appendData([]);
		}
	};
	ThisLayout.prototype.clear = function() {
		if (!this.config.design) {
			this.$content.empty();
			this.appendData([]);
		}
	}

	ThisLayout.prototype.appendData = function(list, config) {
		config = config || {};
		var resultMap = config.resultMap || {};
		var layout = this.layout;
		var treeConfig = {};
		if (!co.isEmpty(layout.config.treeulheight) && layout.config.treeulheight > 0) {
			treeConfig.treeUlHeight = layout.config.treeulheight;
		} else {
			treeConfig.treeUlHeight = null;
		}
		if (!co.isEmpty(layout.config.topid)) {
			treeConfig.topid = layout.config.topid;
		}
		if (!co.isEmpty(layout.config.openLevel)) {
			treeConfig.openLevel = layout.config.openlevel;
		} else {
			treeConfig.openLevel = 2;
		}
		treeConfig.openHalfCheck = layout.config.openhalfcheck;
		treeConfig.hasSearch = layout.config.hassearch;
		treeConfig.openSearchPrompt = layout.config.opensearchprompt;
		treeConfig.openLazyRendering = layout.config.openlazyrendering;
		treeConfig.openSingleLevel = layout.config.opensinglelevel;
		treeConfig.property = {
			id : this.layout.config.idname,
			parentid : this.layout.config.parentidname,
			text : this.layout.config.textname
		};

		if (this.layout.config.hascheckbox) {
			treeConfig.hasCheckbox = true;
			var checkedservicemodel = this.layout.config.checkedservicemodel;
			var checkedfieldname = this.layout.config.checkedfieldname;
			if (!co.isEmpty(checkedservicemodel) && !co.isEmpty(checkedfieldname)) {
				var checkedresult = resultMap[checkedservicemodel] || {};
				var checkedvalue = checkedresult;
				if (checkedresult && checkedresult.value) {
					checkedvalue = checkedresult.value;
				}
				var checkedIds = [];
				$(checkedvalue).each(function(index, checkedone) {
					if (checkedone && !co.isEmpty(checkedone[checkedfieldname])) {
						checkedIds[checkedIds.length] = checkedone[checkedfieldname];
					}
				});
				treeConfig.checkedIds = checkedIds;
			}
		}

		treeConfig.datas = list;
		this.$content.empty();
		treeConfig.content = this.$content;
		this.tree = co.tree(treeConfig);
		if (co.isEmpty(layout.config.treeulheight) || layout.config.treeulheight <= 0) {
			this.tree.$tree.css('border-bottom', '0px');
		}
		this.firstclicked = false;
		var this_ = this;
		$(this.$content.find('li')).each(function(index, $li) {
			$li = $($li);
			var data = $li.data('data');
			if (data) {
				var $one = $li.find('.coos-row:first');
				this_.bindChildLayout($one, data);
			}
		});
		this.initButton(config);

	};

	ThisLayout.prototype.initButton = function(config) {
		var $view = this.$view;
		var layout = this.layout;
		layout.buttons = layout.buttons || [];
		var buttons = layout.buttons;
		$view.find('.tree-button-group').addClass('coos-button-container');
		if (buttons.length == 0 && this.config.design) {
			$view.find('.coos-button-container').append('按钮组');
		}
		if (this.config.design) {
			$view.find('.coos-button-container').css('min-height', '100px').css('min-width', '100px');
		}
		var $lis = $view.find('li');
		var this_ = this;
		$($lis).each(function(index, $li) {
			$li = $($li);
			var data = $li.data('data');
			var config_ = {};
			config_.index = index;
			config_.data = data;
			this_.appendLiButton($li, config_);
		});

	};

	ThisLayout.prototype.appendLiButton = function($li, config) {
		config.$row = $li;
		for (var i = 0; i < this.buttonObjects.length; i++) {
			var buttonObject = this.buttonObjects[i];
			var $button = buttonObject.getView(this.getButtonPlace(buttonObject), config);
			$button.addClass('tree-button');
			$li.find('.coos-button-container:first').append($button);
		}
	};

	ThisLayout.prototype.getData = function($button, button, data) {
		return data;
	};

	ThisLayout.prototype.getData = function() {
		var data = {};
		if (this.clickData) {
			data = this.clickData;
		}
		if (this.layout.config.hascheckbox) {
			var result = this.tree.getCheckedDatas();
			var checkedData = result.checkedData;
			var checkedDatas = result.checkedDatas;
			var checkedDeleteIds = result.checkedDeleteIds;
			var checkedDeleteDatas = result.checkedDeleteDatas;
			if (this.layout.config.hascheckbox) {
				data[this.layout.name + "_checkeddatastr"] = JSON.stringify(checkedDatas);
				data[this.layout.name + "_checkeddeletedatastr"] = JSON.stringify(checkedDeleteDatas);
			} else {
				if (this.clickData) {
					return this.clickData;
				}
			}
		}
		return data;
	};
	var ThisLayoutConfig = {
		name : "树",
		hasElement : false,
		hasButton : true,
		columns : [ {
			text : "拖动排序",
			name : "hassortable",
			inputtype : "switch"
		}, {
			text : "是否有复选框",
			name : "hascheckbox",
			inputtype : "switch"
		}, {
			text : "是否有搜索",
			name : "hassearch",
			inputtype : "switch"
		}, {
			text : "开启半选中",
			name : "openhalfcheck",
			inputtype : "switch"
		}, {
			text : "开启搜索提示",
			name : "opensearchprompt",
			inputtype : "switch"
		}, {
			text : "开启懒渲染",
			name : "openlazyrendering",
			inputtype : "switch"
		}, {
			text : "开启单级树",
			name : "openSingleLevel",
			inputtype : "switch"
		}, {
			text : "树高度",
			name : "treeulheight",
			inputtype : "switch"
		}, {
			text : "打开层级",
			name : "openlevel"
		}, {
			text : "选中值服务模型",
			name : "checkedservicemodel"
		}, {
			text : "选中值字段名",
			name : "checkedfieldname"
		}, {
			text : "编号名称",
			name : "idname",
			inputtype : "text",
			cannull : false
		}, {
			text : "文案名称",
			name : "textname",
			inputtype : "text",
			cannull : false
		}, {
			text : "父名称",
			name : "parentidname",
			inputtype : "text",
			cannull : false
		} ]
	};
	co.page.panel.layout.model.defind("TREE", ThisLayoutConfig, ThisLayout);
})(window, jQuery);