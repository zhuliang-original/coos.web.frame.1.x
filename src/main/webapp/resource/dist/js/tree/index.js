(function() {
	var defaultConfig = {
		property : {
			id : "id",
			parentid : "parentid",
			text : "text",
			icon : "icon",
			image : "image",
			title : "title",
			haschild : "haschild"
		},
		topid : null,
		content : null,
		$content : null,
		showWindow : false,
		hasCheckbox : false,
		hasRadio : false,
		hasSearch : false,
		hasLoadChild : false,
		showLevel : true,
		treeUlHeight : 400,
		clickLineSelect : true,
		showLevelLine : false,
		checkboxDisabled : false, // 复选框禁用,
		radioDisabled : false, // 单选框禁用
		openSingleLevel : false,
		openHalfCheck : false,
		openSearchPrompt : false,
		openLazyRendering : false,
		openLazyLoadChildData : false,
		// 子项全部选中时候 自动选中父级是否需要确认
		findParentCheckNeedConfirm : false,
		// 搜索时候选中父级 当子项不匹配时候 自动选择之前需要确认 如果取消 则父级不能选中
		findMismatchChildNeedConfirm : false,
		size : 15,
		needSortable : false,
		noChildTextIcon : "",
		tablename : '',
		tableid : '',
		openLevel : '',
		buttons : [],
		checkedIds : [],
		openIds : [],
		checkedDeleteIds : [],
		checkedDeleteDatas : [],
		onClick : function() {

		},
		onLoadChild : function() {

		}
	};
	var TreeDataModel = function(topid, datas, property, treeConfig) {
		this.beanstartindex = 1000;
		this.topid = topid;
		this.datas = datas;
		this.property = property;
		this.treeConfig = treeConfig;
		this.init();
		return this;
	};
	TreeDataModel.prototype.init = function() {
		this.initBeans();
		this.initTopBeans();
		this.initChildBeans();
	};
	TreeDataModel.prototype.initBeans = function() {
		var topid = this.topid;
		var hasTopid = !co.isEmpty(topid);
		var datas = this.datas;
		var property = this.property;
		var beans = [];
		var cacheBeans = [];
		var topBean = null;
		this.idBeanMap = {};
		this.dataidBeanMap = {};
		var parentidBeansMap = {};
		var haschildname = property.haschild || "haschild";
		var parentidname = property.parentid || "parentid";
		for (var i = 0; i < datas.length; i++) {
			var data = datas[i];
			var bean = this.initBean(data);
			if (bean == null) {
				continue;
			}
			var id = bean.id;
			var parentid = bean.parentid;
			beans[beans.length] = bean;
			if (!co.isEmpty(parentid) && id != parentid) {
				var parentidBeans = parentidBeansMap[parentid];
				parentidBeans = parentidBeans || [];
				parentidBeans[parentidBeans.length] = bean;
				parentidBeansMap[parentid] = parentidBeans;
			}
			if (hasTopid && id == topid) {
				topBean = bean;
				continue;
			} else {
				cacheBeans[cacheBeans.length] = bean;
			}
		}
		this.topBean = topBean;
		this.beans = beans;
		this.cacheBeans = cacheBeans;
		this.parentidBeansMap = parentidBeansMap;
	};

	TreeDataModel.prototype.initBean = function(data, liConfig) {
		var thistreebeanid = this.beanstartindex;
		this.beanstartindex++;
		var property = this.property;
		var haschildname = property.haschild || "haschild";
		var parentidname = property.parentid || "parentid";
		var parentid = data[parentidname];
		var haschild = data[haschildname];

		if (data == null) {
			return null;
		}
		var id = data[property.id];

		if (co.isEmpty(id)) {
			return null;
		}
		data.thistreebeanid = thistreebeanid;
		var bean = {};
		bean.data = data;
		bean.id = id;
		bean.thistreebeanid = thistreebeanid;
		bean.parentid = parentid;
		if (typeof (haschild) == "undefined") {
			haschild = false;
		} else {
			if (!co.isBoolean(haschild)) {
				if (haschild == 'true' || haschild == '1') {
					haschild = true;
				} else {
					haschild = false;
				}
			}

		}
		bean.haschild = haschild;
		this.idBeanMap[thistreebeanid] = bean;
		this.initLiHtml(bean, liConfig);
		this.dataidBeanMap[id] = bean;
		return bean;
	};

	TreeDataModel.prototype.initLiHtml = function(bean, liConfig) {
		if (!this.treeConfigInited) {
			this.addClass_ = this.treeConfig.addClass;
			this.hasCheckbox_ = this.treeConfig.hasCheckbox;
			this.hasRadio_ = this.treeConfig.hasRadio;
			this.radioName_ = this.treeConfig.radioName;
			this.buttons_ = this.treeConfig.buttons;
			this.idName_ = this.treeConfig.property.id;
			this.textName_ = this.treeConfig.property.text;
			this.parentidName_ = this.treeConfig.property.parentid;
			this.iconName_ = this.treeConfig.property.icon;
			this.titleName_ = this.treeConfig.property.title;
			this.imageName_ = this.treeConfig.property.image;
			this.treeConfigInited = true;
		}
		var hasCheckbox = liConfig ? liConfig.hasCheckbox : this.hasCheckbox_;
		var hasRadio = liConfig ? liConfig.hasRadio : this.hasRadio_;
		var radioName = liConfig ? liConfig.radioName : this.radioName_;
		var buttons = liConfig ? liConfig.buttons : this.buttons_;
		var textName = liConfig ? liConfig.property.text : this.textName_;
		var parentidName = liConfig ? liConfig.property.parentid : this.parentidName_;
		var idName = liConfig ? liConfig.property.id : this.idName_;
		var iconName = liConfig ? liConfig.property.icon : this.iconName_;
		var imageName = liConfig ? liConfig.property.image : this.imageName_;
		var titleName = liConfig ? liConfig.property.title : this.titleName_;
		var addClass = liConfig ? liConfig.addClass : this.addClass_;
		var buttons = liConfig ? liConfig.buttons : this.buttons_;

		var data = bean.data;
		var text = data[textName];
		var id = data[idName];
		var parentid = data[parentidName];
		var image = data[imageName];
		var title = data[titleName];
		var icon = data[iconName];
		if (!co.isBoolean(hasCheckbox)) {
			hasCheckbox = false;
		}
		if (!co.isBoolean(hasRadio)) {
			hasRadio = false;
		}
		if (hasRadio && co.isEmpty(radioName)) {
			radioName = co.getNumber();
		}
		var liclass = '';
		if (!co.isEmpty(addClass)) {
			liclass = addClass;
		}
		var liattr = '';
		liattr += ' coos-recordid="' + id + '" ';
		liattr += ' coos-thistreebeanid="' + bean.thistreebeanid + '" ';

		if (!co.isEmpty(parentid)) {
			liattr += ' coos-recordparentid="' + parentid + '" ';
		}
		if (!co.isEmpty(title)) {
			liattr += ' title="' + title + '" ';
		}
		var leftinput = '';

		if (hasCheckbox) {
			liattr += ' has-checkbox="1" ';
			leftinput += '<input type="checkbox"/>';
		}
		if (hasRadio) {
			liattr += ' has-radio="1" ';
			leftinput += '<input type="radio" name="' + radioName + '"/>';
		}
		var dataicon = '';
		if (!co.isEmpty(icon)) {
			dataicon += '<i class="fa data-icon ' + icon + '"></i>';
		}
		if (!co.isEmpty(image)) {
			dataicon += '<img class="element-rule-image data-image" path="' + image + '"/>';
		}
		var datatext = '';
		datatext = text;
		var rightbutton = '';
		$(buttons).each(function(index, button) {
			if (!co.isEmpty(button.showrule)) {
				var showrule = button.showrule;

				var functionstr = 'function(){return ' + showrule + ';}';
				var one = data;
				var f = eval("(" + functionstr + ")")();
				if (!f) {
					return;
				}
			}
			if (co.isEmpty(button.outhtml)) {

				var html = button.html;
				if (co.isEmpty(html)) {
					var label = '';
					if (!co.isEmpty(button.label)) {
						label = button.label;
					}
					html = '<a class="tree-button  ">' + label + '</a>';
				}
				var $button = $(html);
				$button.attr('button-index', index);
				$button.addClass('tree-button');
				button.outhtml = $button.prop("outerHTML");
			}
			rightbutton += button.outhtml;

		});

		var li_html = '<li ' + liattr + ' li-level="#lilevel" class=" ' + liclass + ' ">';
		li_html += '<div class="coos-row coos-tree-row"><div class="tree-row-content">';
		li_html += '<div class="tree-row-left"><i class="fa icon li-icon"></i>' + leftinput + '</div>';
		li_html += '<div class="tree-row-center">' + dataicon + '<span class="data-text">' + datatext + '</span></div>';
		li_html += '<div class="tree-row-right"><div class="tree-button-group">' + rightbutton + '</div></div>';
		li_html += '</div></div></li>';
		bean.li_html = li_html;

	};

	TreeDataModel.prototype.initTopBeans = function() {
		var beans = this.beans;
		var cacheBeans = this.cacheBeans;
		var topBean = this.topBean;
		var dataidBeanMap = this.dataidBeanMap;
		var parentidBeansMap = this.parentidBeanMap;
		var topBeans = [];
		var cacheBeans_ = [];
		if (topBean != null) {
			for (var i = 0; i < cacheBeans.length; i++) {
				var bean = cacheBeans[i];
				var id = bean.id;
				var parentid = bean.parentid;
				// 父ID为空 或者父不存在 或者 父编号和编号相同
				if (co.isEmpty(parentid) || dataidBeanMap[parentid] == null || id == parentid || parentid == topBean.id) {
					topBeans[topBeans.length] = bean;
				} else {
					cacheBeans_[cacheBeans_.length] = bean;
				}
			}
		} else {
			for (var i = 0; i < cacheBeans.length; i++) {
				var bean = cacheBeans[i];
				var id = bean.id;
				var parentid = bean.parentid;
				if (co.isEmpty(parentid) || dataidBeanMap[parentid] == null || id == parentid) {
					topBeans[topBeans.length] = bean;
				} else {
					cacheBeans_[cacheBeans_.length] = bean;
				}
			}
		}
		this.topBeans = topBeans;
		this.cacheBeans = cacheBeans_;
	};

	TreeDataModel.prototype.initChildBeans = function() {
		var topBeans = this.topBeans;
		var topBean = this.topBean;
		for (var i = 0; i < topBeans.length; i++) {
			var bean = topBeans[i];
			if (topBean != null) {
				bean.parent = topBean;
			}
			this.initChildBean(bean);

		}
	};
	TreeDataModel.prototype.initChildBean = function(bean) {
		if (bean == null) {
			return;
		}
		var cacheBeans = this.cacheBeans;
		var parentidBeansMap = this.parentidBeansMap;
		var cacheBeans_ = [];
		var id = bean.id;
		var parentidBeans = parentidBeansMap[id];
		if (parentidBeans != null) {
			bean.childBeans = parentidBeans;
			for (var i = 0; i < bean.childBeans.length; i++) {
				var childBean = bean.childBeans[i];
				childBean.parent = bean;
				this.initChildBean(childBean);
			}
		}

	};
	TreeDataModel.prototype.appendChildDatas = function(bean, childDatas, liConfig) {
		if (bean) {
			bean.childBeans = bean.childBeans || [];
			var childBeans = [];
			var this_ = this;
			$(childDatas).each(function(index, childData) {
				this_.datas[this_.datas.length] = childData;
				var childBean = this_.initBean(childData, liConfig);
				if (childBean != null) {
					childBean.parent = bean;
					childBeans[childBeans.length] = childBean;
					bean.childBeans[bean.childBeans.length] = childBean;
				}
			});
			return childBeans;
		}
		return [];
	};
	TreeDataModel.prototype.getBeanById = function(thistreebeanid) {

		if (thistreebeanid) {
			var bean = this.idBeanMap[thistreebeanid];
			if (!co.isEmpty(this.topid) && this.topid == bean.id) {
				bean.childBeans = this.topBeans;
			}
			return bean;
		}
		return null;
	};
	TreeDataModel.prototype.getBean = function(data) {

		if (data) {
			var bean = this.idBeanMap[data.thistreebeanid];
			if (!co.isEmpty(this.topid) && this.topid == bean.id) {
				bean.childBeans = this.topBeans;
			}
			return bean;
		}
		return null;
	};
	TreeDataModel.prototype.getData = function(beans) {
		if (co.isArray(beans)) {
			var datas = [];
			for (var i = 0; i < beans.length; i++) {
				datas[datas.length] = beans[i].data;
			}
			return datas;
		} else {
			return beans.data;
		}
	}
	var Tree = function(config) {
		config.tree = this;
		defaultConfig.radioName = co.getNumber();
		this.config = jQuery.extend(true, {}, defaultConfig, config);
		var config = this.config;
		this.init();
		this.onClick = function($li) {
			if (config.onClick) {
				var data = $li.data('data');
				var hasChild = $li.find('ul').length > 0;
				config.onClick($li, data, hasChild);
			}
		}
		var this_ = this;
		this.onSearch = function(searchText, $content) {
			if (config.onSearch) {
				config.onSearch(searchText, $content);
			} else {
				return this_.searchContent(searchText, $content);
			}
		}
		return this;
	};
	/**
	 * TODO 创建UL
	 */
	function createUl(level) {
		level = level || 1;
		var $ul = $('<ul ul-level="' + level + '"></ul>');
		return $ul;
	}

	/**
	 * TODO 创建LI
	 */
	function createLi(bean, liConfig, level) {
		var data = bean.data;
		bean.viewed = true;

		var lilevel = '';
		if (level) {
			lilevel = level;
			// liattr += ' li-level="' + level + '" ';
		}
		bean.li_html = bean.li_html.replace('#lilevel', lilevel);
		var $li = $(bean.li_html);

		var $button_group = $li.find('.tree-button-group');
		var $buttons = $li.find('.tree-button');
		if ($buttons.length == liConfig.buttons.length) {
			$(liConfig.buttons).each(function(index, button) {
				$($buttons[index]).click(function() {
					if (button.onClick) {
						button.onClick(data, $li);
					}
				});
			});
		}

		$li.data('config', liConfig);
		$li.data('data', data);
		$li.data('bean', bean);
		$li.data('checked', false);
		return $li;
	}

	/**
	 * TODO 创建顶级项
	 */
	function createTopLi($ul, topBeans, liConfig) {
		$(topBeans).each(function(index, topBean) {
			var $li = createLi(topBean, liConfig);
			$ul.append($li);
		});

	}

	/**
	 * TODO 显示搜索到的子项
	 */
	function displayParentForSearch($li) {
		var $parentli = $li.closest('ul').closest('li');
		if ($parentli.length > 0) {
			$parentli.removeClass('tree-search-not-find');
			displayParentForSearch($parentli);
		}
	}

	// /**
	// * 复选框值改变
	// */
	// function liCheckboxChange($li, findParentCheckNeedConfirm,
	// findMismatchChildNeedConfirm, openHalfCheck) {
	//				
	//
	// }
	function getSearchFindLis($li) {
		return $li.find('ul li.tree-search-find');
	}
	Tree.prototype.createWindow = function() {
		var this_ = this;
		var windowConfig = {};
		if (this.config && this.config.window) {
			windowConfig = this.config.window;
		}
		windowConfig.html = "<div></div>";
		var buttons = windowConfig.buttons || [];
		if (windowConfig.defineCallback) {
			var button = {};
			button.label = co.config.label.define;
			button.className = "coos-box-define coos-button";
			button.callback = function() {
				var result = this_.getCheckedDatas();
				var result = windowConfig.defineCallback(result);
				if (!co.isBoolean(result) || result) {
					this_.hide();
				}
			}
			buttons[buttons.length] = button;
		}
		windowConfig.buttons = buttons;
		var boxWindow = co.box.window(windowConfig);
		return boxWindow;
	}

	Tree.prototype.show = function() {

		if (this.config.showWindow) {
			this.window.show();
		}
	};
	Tree.prototype.hide = function() {
		if (this.config.showWindow) {
			this.window.hide();
		}
	};
	Tree.prototype.remove = function() {
		if (this.config.showWindow) {
			this.window.remove();
		}
	};
	Tree.prototype.empty = function() {
		this.$content.empty();
	};
	Tree.prototype.destroy = function() {
		this.empty();
		this.remove();
	};
	Tree.prototype.refresh = function(datas) {
		if (datas) {
			this.config.datas = datas;
		}
		this.init();
	};
	/**
	 * TODO 初始化
	 */
	Tree.prototype.init = function() {
		if (this.$content == null) {
			if (this.config.showWindow) {
				this.window = this.createWindow(this.config);
				this.$content = this.window.$content;
			} else {
				this.$content = $(this.config.content);
			}
		} else {
			this.$content.empty();
		}
		var datas = this.config.datas;
		if (!co.isArray(datas)) {
			return;
		}

		this.dataModel = new TreeDataModel(this.config.topid, datas, this.config.property, this.config);
		// this.topData = getTopData(datas, this.config.topid,
		// this.config.property);
		// this.topDatas = getTopDatas(datas, this.topData,
		// this.config.property);
		this.checkedIds = this.config.checkedIds;
		var checkedIdMap = {};
		$(this.checkedIds).each(function(index, checkedId) {
			checkedIdMap[checkedId] = true;
		});
		this.checkedIdMap = checkedIdMap;
		this.checkedBeanMap = {};
		this.build();
		this.initLevel();
	};
	Tree.prototype.openLiByIds = function(ids) {
		var this_ = this;
		var dataModel = this.dataModel
		$(ids).each(function(index, id) {
			if (!co.isEmpty(id)) {
				var data = dataModel.dataidBeanMap[id];
				this_.openLiByData(data);
			}
		});
	};
	Tree.prototype.openLiByData = function(data) {
		if (data) {
			var bean = this.dataModel.getBean(data);
			this.openParentLiByBean(bean);
		}

	};
	Tree.prototype.openParentLiByBean = function(bean) {
		if (bean == null) {
			return;
		}
		if (bean.parent != null) {
			this.openParentLiByBean(bean.parent);
		}
		var thistreebeanid = bean.thistreebeanid;
		var $li = this.$tree.find('[coos-thistreebeanid="' + thistreebeanid + '"]');
		if ($li.length > 0) {
			$li.find('>.coos-tree-row .li-icon.fa-chevron-right').click();
		}
	};
	Tree.prototype.getScrollObject = function($object) {
		$object = $($object);
		if ($object[0].scrollHeight > $object[0].offsetHeight) {
			return $object;
		}
		var $parent = $($object.parent());

		if ($parent == null || $parent.length == 0 || $parent == $object || $parent[0].tagName == "BODY") {
			return $object;
		}
		return this.getScrollObject($parent);
	};
	Tree.prototype.showAndMoveToLiByData = function(data) {
		var bean = this.dataModel.getBean(data);
		this.openParentLiByBean(bean.parent);
		var thistreebeanid = bean.thistreebeanid;
		var $li = this.$tree.find('[coos-thistreebeanid="' + thistreebeanid + '"]');
		if ($li.length > 0) {
			$li.addClass('coos-tree-search-for-high-light');
			var $scrollObject = this.$scrollObject;
			var scrollTop = $li.offset().top - $scrollObject.offset().top - 60;
			$scrollObject.animate({
				scrollTop : scrollTop
			}, 300);
		}
		this.$searchPrompt.hide();
	};
	Tree.prototype.initSearchPrompt = function(searchDatas) {
		var $searchContainer = this.$searchContainer;
		var $searchPrompt = this.$searchPrompt;
		if ($searchPrompt == null) {
			this.$searchPrompt = $('<div class="coos-tree-search-prompt"><ul class=""></ul></div>');
			$searchPrompt = this.$searchPrompt;
			$searchContainer.append($searchPrompt);
		}
		var $ul = $searchPrompt.find('ul');
		$ul.empty();
		var $tree = this.$tree;
		var this_ = this;
		var $modelLi = $('<li></li>');
		$modelLi.append('<div class="coos-row coos-tree-row"></div>');
		$modelLi.find('.coos-tree-row').append('<div class="tree-row-content"></div>');
		$modelLi.find('.tree-row-content').append('<div class="tree-row-center"><span class="data-text"></span</div>');
		$modelLi.find('.tree-row-content').append('<div class="tree-row-right"></div>');
		var textname = this.config.property.text;
		var idname = this.config.property.id;
		var parentidname = this.config.property.parentid;
		if (searchDatas.length == 0) {
			var $li = $modelLi.clone();
			var $noDataLi = $('<li><div class="coos-no-matching-data">' + co.config.label.noMatchingData + '</div></li>');
			$ul.append($noDataLi);
		} else {
			$(searchDatas).each(function(index, searchData) {
				var $li = $modelLi.clone();
				$ul.append($li);
				var text = searchData[textname];
				$li.find('.data-text').append(text);
				$li.click(function() {
					var data = searchData;
					this_.showAndMoveToLiByData(data);
				});
			});
		}
		this.$searchPrompt.show();
	};
	Tree.prototype.searchLi = function(searchText, $content) {

		if (co.isEmpty(searchText)) {
			return [];
		}
		var $lis = [];
		var $texts = $content.find('li .data-text');
		$($texts).each(function(index, $text) {
			$text = $($text);
			var $li = $text.closest('li');
			var text = $text.text();
			if (co.has(text, searchText)) {
				$lis[$lis.length] = $li;
			}
		});
		return $lis;
	};
	Tree.prototype.searchData_ = function(searchText, $content, onlyData) {
		if (onlyData) {

		} else {
			$content.find('li').removeClass('tree-search-not-find tree-search-find');
			$content.find('li.coos-tree-has-child').addClass('open');
		}
		if (co.isEmpty(searchText)) {
			return [];
		}
		var datas = [];
		var $texts = $content.find('li .data-text');
		$($texts).each(function(index, $text) {
			$text = $($text);
			var $li = $text.closest('li');
			var text = $text.text();
			if (co.has(text, searchText)) {
				datas[datas.length] = $li.data('data');

				if (!onlyData) {
					$li.addClass('tree-search-find');
				}
			} else {
				if (!onlyData) {
					$li.addClass('tree-search-not-find');
				}
			}
		});
		if (!onlyData) {
			var $finds = $content.find('.tree-search-find');
			$($finds).each(function(index, $find) {
				$find = $($find);
				displayParentForSearch($find);
			});
		}
		return datas;
	};
	Tree.prototype.searchData = function(searchText) {
		if (co.isEmpty(searchText)) {
			return [];
		}
		var datas = this.dataModel.datas;
		var searchDatas = [];
		var idname = this.config.property.id;
		var textname = this.config.property.text;
		var parentidname = this.config.property.parentid;
		$(datas).each(function(index, data) {
			var text = data[textname];
			if (co.has(text, searchText)) {
				searchDatas[searchDatas.length] = data;
			}
		});
		return searchDatas;
	};
	Tree.prototype.searchContent = function(searchText, $content) {
		$content = $content || this.$tree;
		var searchDatas = this.searchData(searchText);
		$content.find('.coos-tree-search-for-high-light').removeClass('coos-tree-search-for-high-light');
		this.initSearchPrompt(searchDatas);
		if (co.isEmpty(searchText)) {
			this.$searchPrompt.hide();
		}
		return;
		if (this.config.openSearchPrompt) {
			var $lis = this.searchLi(searchText, $content);
			this.initSearchPrompt($lis);
			if ($lis.length == 0) {
				this.$searchPrompt.hide();
			}
		} else {
			var datas = this.searchData(searchText, $content);
			if (co.isEmpty(searchText)) {
				// this.$searchInput.val("");
			} else {
				// this.$searchInput.val(searchText);
			}
		}
		return datas;
	};
	Tree.prototype.search = function(searchText, $content) {
		$content = $content || this.$tree;
		var datas = this.onSearch(searchText, $content);
		return datas;
	};

	Tree.prototype.initLevel = function() {
		var $content = this.$tree;
		var this_ = this;
		if (co.isEmpty(this.closeLevelInited)) {
			this.closeLevelInited = true;
			if (!this.config.openSingleLevel) {

				var count = this.maxLevel || 1;
				if (!co.isEmpty(this.config.openLevel) && this.config.openLevel > 0) {
					count = this.config.openLevel;
				} else {
					count = 0;
				}

				if (count > 0) {
					for (var i = 1; i <= count; i++) {
						$($content.find('[li-level=' + i + '].coos-tree-has-child')).each(function(index, $li) {
							this_.opendOrCloseLi($($li), true);
						});
						// $content.find('[li-level=' + i +
						// '].coos-tree-has-child').addClass('open');
					}
				} else {
					$($content.find('li.coos-tree-has-child')).each(function(index, $li) {
						this_.opendOrCloseLi($($li), true);
					});
					// $content.find('li.coos-tree-has-child').addClass('open');
				}
				this.openLiByIds(this.config.openIds);
			} else {
				var $li = $content.find('li:first');
				$li.removeClass('open');
				// $li.find('.li-icon:first').addClass('fa fa-chevron-down');
				this.initSingleLevel($li);
			}

		}
		// if (!this.config.showLevelLine) {
		// setLiPadding($content, 0);
		// }

	};
	// function setLiPadding($ul, level) {
	// var $lis = $ul.find('>li');
	// $lis.each(function(index, $li) {
	// $li = $($li);
	// $li.find('.tree-row-content').css('margin-left', level * 25);
	// setLiPadding($li.find('ul:first'), level + 1);
	// });
	// }
	Tree.prototype.initLiLeftDistance = function($li) {
		if (!this.config.showLevelLine) {
			$li = $($li);
			var level = Number($li.attr('li-level'));
			$li.find('>.coos-row .tree-row-content').css('margin-left', (Number(level) - 1) * 25);
		}
	};

	Tree.prototype.initIcon = function($content) {
		$content = $content || this.$tree;

	};
	/**
	 * TODO 选中一个选项
	 */
	Tree.prototype.checkLi = function($li, checked) {
		if (!co.isBoolean(checked)) {
			checked = false;
		}
		$li = $($li);
		if ($li.length > 0) {
			var $input = $li.find('>.coos-row').find('input[type="checkbox"]:first');
			if ($input.length > 0) {
				$input[0].checked = checked;
			}
			var $input = $li.find('>.coos-row').find('input[type="radio"]:first');
			if ($input.length > 0) {
				$input[0].checked = checked;
			}
		}
		$li.data('checked', checked);
		var bean = this.getBean($li);
		if (bean) {
			if (checked) {
				this.checkedBeanMap[bean.id] = bean;
				if (this.checkedIdMap[bean.id]) {
					$li.removeAttr('delete-for-checkedid');
				}
			} else {
				if (this.checkedIdMap[bean.id]) {
					$li.attr('delete-for-checkedid', bean.id);
				}
				delete this.checkedBeanMap[bean.id];
			}
		}
	};
	/**
	 * TODO 选中父级
	 */
	Tree.prototype.checkParent = function($li) {
		$li = $($li);
		var checked = $li.data(checked);
		var $parentLi = $li.closest('ul').closest('li');
		if ($parentLi.length > 0) {
			//
			this.checkLi($parentLi, checked);
			this.checkedParent($parentLi);
		}
	};
	/**
	 * TODO 选中子集
	 */
	Tree.prototype.checkAllChild = function($li) {
		$li = $($li);
		var checked = $li.data('checked');

		var $childLis = $li.find('ul li');
		if ($childLis.length > 0) {
			var this_ = this;
			$childLis.each(function(index, $childLi) {
				$childLi = $($childLi);
				var bean = $childLi.data('bean');
				bean.mustcheckedchild = checked;
				this_.checkLi($childLi, checked);
			});
		}
	};
	Tree.prototype.validateForCheckParent = function($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck) {
		var $ul = $li.closest('ul');
		// 判断当前同级是否全部选中
		var $childlis = $ul.find('>li');
		var allChecked = true;
		var hasChecked = false;
		$childlis.each(function(index, $childli) {
			$childli = $($childli);
			if (!$childli.data('checked')) {
				allChecked = false;
			} else {
				hasChecked = true;
			}
		});
		var $parentLi = $ul.closest('li');
		if ($parentLi.length > 0) {
			if (allChecked) {
				if (!$parentLi.find('[type="checkbox"]:first')[0].checked) {
					if (findParentCheckNeedConfirm) {
						var this_ = this;
						co.box.confirm(co.config.label.confirmChecked + $parentLi.find('.data-text:first').text(), function() {
							this_.checkLi($parentLi, true);
							this_.validateForCheckParent($parentLi, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
						});
					} else {
						this.checkLi($parentLi, true);
						this.validateForCheckParent($parentLi, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
					}
				}
			} else {
				if (openHalfCheck && hasChecked) {
					this.checkLi($parentLi, true);
				} else {
					this.checkLi($parentLi, false);
				}
				this.validateForCheckParent($parentLi, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
			}
		}
	};
	Tree.prototype.liCheckboxChange = function($li) {
		var findParentCheckNeedConfirm = this.config.findParentCheckNeedConfirm;
		var findMismatchChildNeedConfirm = this.config.findMismatchChildNeedConfirm;
		var openHalfCheck = this.config.openHalfCheck;
		$li = $($li);
		var $input = $li.find('input[type="checkbox"]:first');
		if ($input.length == 0) {
			return;
		}
		var checked = $input[0].checked;
		var bean = this.getBean($li);
		if (checked) {
			bean.mustcheckedchild = true;
		} else {
			bean.mustcheckedchild = false;
		}
		this.checkLi($li, checked);
		if (checked) {
			var searchLis = getSearchFindLis($li);
			if (findMismatchChildNeedConfirm && searchLis.length > 0) {
				var this_ = this;
				co.box.confirm("选中该选项，会自动选中该项下的所有未展示子项", function() {
					this_.checkAllChild($li);
					this_.validateForCheckParent($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
				}, function() {
					this_.checkLi($li, false);
				});
			} else {
				this.checkAllChild($li);
				this.validateForCheckParent($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
			}
		} else {
			this.checkAllChild($li);
			this.validateForCheckParent($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
		}
	}
	Tree.prototype.initOpenOrCloseEvent = function($li) {

		$li.find('.tree-row-content .fa-circle-o-notch').unbind('click').on('click', function(e) {
		});
		$li.find('.tree-row-content .li-icon').unbind('click');
		var this_ = this;
		$li.find('.tree-row-content').find('.fa-chevron-down,.fa-chevron-right').on('click', function(e) {
			var $li = $(this).closest('li');
			this_.opendOrCloseLi($li);
			e.stopPropagation();
		});

	};
	Tree.prototype.initInputEvent = function($li) {
		var this_ = this;
		$li.find('.tree-row-content').unbind('click').on(
				'click',
				function(e) {
					var $target = $(e.target);
					if ($target.closest('.tree-row-right').length > 0) {
						return;
					}
					if ($target.closest('[type="checkbox"]').length > 0 || $target.closest('[type="radio"]').length > 0 || $target.closest('.icon').length > 0
							|| $target.closest('.tree-button-group').length > 0) {
						if ($target.closest('[type="radio"]').length > 0) {

						}
					} else {
						if (this_.config.clickLineSelect) {
							if ($(this).find('[type="radio"]').length > 0) {
								var $radio = $(this).find('[type="radio"]');
								if ($radio[0].checked) {
									$radio[0].checked = false;
								} else {
									$radio[0].checked = true;
								}
							}
							if ($(this).find('[type="checkbox"]').length > 0) {
								var $checkbox = $(this).find('[type="checkbox"]');
								$checkbox.click();
							}
						}
						this_.onClick($(this).closest('li'));
					}
				});
		$li.find('.tree-row-content input[type="checkbox"]').unbind('change').on('change', function() {
			this_.liCheckboxChange($(this).closest('li'));
			var checkedDeleteIds = [];
			var checkedDeleteDatas = [];
			$(this_.checkedIds).each(function(index, checkedId) {
				var $li = this_.$tree.find('li[coos-recordid="' + checkedId + '"]');
				if ($li.length > 0 && !$li.data('checked')) {
					checkedDeleteIds[checkedDeleteIds.length] = checkedId;
					checkedDeleteDatas[checkedDeleteDatas.length] = $li.data('data');
				}
			});
			this_.checkedDeleteIds = checkedDeleteIds;
			this_.checkedDeleteDatas = checkedDeleteDatas;
		});
		$li.find('.tree-row-content input[type="radio"]').unbind('click').on('click', function() {
			var $input = $(this);
		});
		if (this.config.checkboxDisabled) {
			$li.find('.tree-row-content input[type="checkbox"]').attr('disabled', 'disabled');
		}
		if (this.config.radioDisabled) {
			$li.find('.tree-row-content input[type="radio"]').attr('disabled', 'disabled');
		}
	};
	// Tree.prototype.initEvent = function($content) {
	//
	// var noChildTextIcon = this_.config.noChildTextIcon;
	// var $icons = $content.find('.li-icon ');
	// $icons.removeClass('fa-leaf fa-chevron-down fa-chevron-right
	// fa-circle-o-notch');
	// if (!co.isEmpty(noChildTextIcon)) {
	// $icons.removeClass(noChildTextIcon);
	// }
	// $content.find('.coos-tree-has-not-child
	// ').find('.li-icon:first').addClass(noChildTextIcon);
	// $content.find('.coos-tree-has-not-child
	// ').find('.li-icon:first').removeClass('coos-cursor-auto');
	// if (co.isEmpty(noChildTextIcon)) {
	// $content.find('.coos-tree-has-not-child
	// ').find('.li-icon:first').addClass('coos-cursor-auto');
	// }
	// $content.find('.coos-tree-has-child:not(.open)
	// ').find('.li-icon:first').addClass('fa fa-chevron-right');
	// if (!this_.config.openSingleLevel) {
	// $content.find('.coos-tree-has-child.open ').find('
	// .li-icon:first').addClass('fa fa-chevron-down');
	// } else {
	// $content.find('.coos-tree-has-child.open ').find('
	// .li-icon:first').addClass('fa fa-chevron-right');
	// }
	// $($childuls).each(function(liindex, $childul) {
	// $childul = $($childul);
	// var $icon = $childul.closest('li').find('.li-icon:first');
	// if ($childul.find('>li').length ==
	// $childul.find('>li.tree-search-not-find').length) {
	// $icon.removeClass('fa-leaf fa-chevron-down fa-chevron-right
	// fa-circle-o-notch');
	// if (!co.isEmpty(noChildTextIcon)) {
	// $icon.addClass(noChildTextIcon);
	// }
	// }
	// });
	// $content = $content || this.$tree;
	//
	// var $childuls = $content.find('.coos-tree-child');
	// var this_ = this;
	// $content.find('li .tree-row-content').unbind('click').on('click',
	// function(e) {
	// var $target = $(e.target);
	// if ($target.closest('.tree-row-right').length > 0) {
	// return;
	// }
	// if ($target.closest('[type="checkbox"]').length > 0 ||
	// $target.closest('[type="radio"]').length > 0 ||
	// $target.closest('.icon').length > 0 ||
	// $target.closest('.tree-button-group').length > 0) {
	// if ($target.closest('[type="radio"]').length > 0) {
	//
	// }
	// } else {
	// if (this_.config.clickLineSelect) {
	// if ($(this).find('[type="radio"]').length > 0) {
	// var $radio = $(this).find('[type="radio"]');
	// if ($radio[0].checked) {
	// $radio[0].checked = false;
	// } else {
	// $radio[0].checked = true;
	// }
	// }
	// if ($(this).find('[type="checkbox"]').length > 0) {
	// var $checkbox = $(this).find('[type="checkbox"]');
	// $checkbox.click();
	// }
	// }
	// this_.onClick($(this).closest('li'));
	// }
	// });
	//
	// }

	Tree.prototype.getData = function($li) {
		return this.getBean($li).data;
	};
	Tree.prototype.getBean = function($li) {
		var thistreebeanid = $li.attr('coos-thistreebeanid');
		var bean = this.dataModel.getBeanById(thistreebeanid);
		return bean;
	};
	Tree.prototype.getChildDatas = function($li) {
		var thisData = this.getData($li);
		var dataBean = this.dataModel.getBean(thisData);
		var childDatas = [];
		if (dataBean.childBeans) {
			$(dataBean.childBeans).each(function(index, childBean) {
				childDatas[childDatas.length] = childBean.data;
			});
		}
		return childDatas;
	};
	Tree.prototype.getChildBeans = function($li) {
		var thisData = this.getData($li);
		var dataBean = this.dataModel.getBean(thisData);
		var childBeans = dataBean.childBeans;
		return childBeans;
	};
	Tree.prototype.getNotViewChildBeans = function($li) {
		var thisData = this.getData($li);
		var dataBean = this.dataModel.getBean(thisData);
		var childBeans = [];
		$(dataBean.childBeans).each(function(index, childBean) {
			if (!childBean.viewed) {
				childBeans[childBeans.length] = childBean;
			}
		});
		return childBeans;
	};
	Tree.prototype.loadChildData = function($li, callback) {
		var bean = this.getBean($li);
		var this_ = this;
		var loadChildDataCallback = function(childDatas) {
			var childBeans = this_.dataModel.appendChildDatas(bean, childDatas);
			callback && callback(childBeans);
		};
		if (this.config.loadChildData) {
			this.config.loadChildData($li, bean.data, loadChildDataCallback);
		} else {
			loadChildDataCallback();
		}
	};
	Tree.prototype.appendChildBeansToLi = function($li, childBeans) {
		var property = this.config.property;
		var liConfig = {};
		liConfig.hasCheckbox = this.config.hasCheckbox;
		liConfig.hasRadio = this.config.hasRadio;
		liConfig.buttons = this.config.buttons;
		liConfig.radioName = this.config.radioName;
		liConfig.property = this.config.property;
		var openLazyRendering = this.config.openLazyRendering;

		var $lis = this.createChildUl($li, childBeans, {
			property : property,
			liConfig : liConfig,
			appendFront : false,
			openLazyRendering : openLazyRendering,
			isLazyRendering : true
		});
		var checkedIdMap = this.checkedIdMap;
		var this_ = this;
		var bean = this.getBean($li);
		if (bean.mustcheckedchild) {
			$($lis).each(function(index, $li_) {
				$li_ = $($li_);
				var recordid = $li_.attr('coos-recordid');
				var bean_ = $li_.data('bean');
				bean_.mustcheckedchild = true;
				this_.checkLi($li_, true);
			});
		} else {
			$($lis).each(function(index, $li_) {
				$li_ = $($li_);
				var recordid = $li_.attr('coos-recordid');
				if (checkedIdMap[recordid]) {
					if ($li_.closest('[delete-for-checkedid]').length < 1) {
						this_.checkLi($li_, true);
					}
				}
			});
		}
	}
	Tree.prototype.beforeOpen = function($li, callback) {
		var bean = this.getBean($li);
		var this_ = this;
		var beforeCallback = function() {
			if (this_.config.beforeOpen) {
				var thisData = this_.getData($li);
				var childDatas = this_.getChildDatas($li);
				this_.config.beforeOpen($li, thisData, childDatas);
			}
			callback && callback();
		};
		var needexecutecallback = true;
		if (this.config.openLazyLoadChildData) {
			if (!bean.lazyloadchilded) {
				bean.lazyloadchilded = true;
				if (bean.haschild) {
					needexecutecallback = false;
					var this_ = this;
					this.loadChildData($li, function(childBeans) {
						this_.appendChildBeansToLi($li, childBeans);
						beforeCallback();
					});
				}
			}
		}
		if (this.config.openLazyRendering) {
			if (!bean.lazyrenderinged) {
				bean.lazyrenderinged = true;
				this.appendChildBeansToLi($li, this.getNotViewChildBeans($li));
			}
		}
		if (needexecutecallback) {
			beforeCallback();
		}

	};
	Tree.prototype.afterOpen = function($li) {
		if (this.config.afterOpen) {
			var thisData = this.getData($li);
			var childDatas = this.getChildDatas($li);
			this.config.afterOpen($li, thisData, childDatas);
		}
	};
	Tree.prototype.beforeClose = function($li) {
	};
	Tree.prototype.afterClose = function($li) {
	};
	Tree.prototype.opendOrCloseLi = function($li, open) {
		if (!this.config.openSingleLevel) {

			if (!$li.hasClass('open') || open) {
				this.opendLi($li);
			} else {
				this.closeLi($li);
			}
		} else {
			this.opendLi($li);
		}
	};

	Tree.prototype.opendLi = function($li) {
		if (!$li.attr('coos-recordid')) {
			return;
		}
		if (!this.config.openSingleLevel) {
			if (!$li.hasClass('open')) {
				var this_ = this;
				this.beforeOpen($li, function() {
					var $icon = $li.find('>.coos-row .fa-chevron-down:first,>.coos-row .fa-chevron-right:first');
					$icon.removeClass('fa-chevron-down fa-chevron-right');
					$li.addClass('open');
					$icon.addClass('fa fa-chevron-down');
					var $parentli = $li.closest('ul').closest('li');
					if ($parentli.length > 0) {
						this_.opendLi($parentli);
					}
					this_.afterOpen($li);
				});

			}
		} else {
			$li.removeClass('open');

			this.initSingleLevel($li);
		}
		this.initOpenOrCloseEvent($li);
	};
	Tree.prototype.closeLi = function($li) {

		this.beforeClose($li);
		var $icon = $li.find('>.coos-row .fa-chevron-down:first,>.coos-row .fa-chevron-right:first');
		$icon.removeClass('fa-chevron-down fa-chevron-right');

		$li.removeClass('open');
		$icon.addClass('fa fa-chevron-right');
		this.afterClose($li);
		this.initOpenOrCloseEvent($li);
	};

	Tree.prototype.initParentSingleLevel = function($li) {
		// 打开单层
		if (this.config.openSingleLevel) {
			var parentid = $li.attr('coos-recordparentid');
			if (co.isEmpty(parentid)) {
				return;
			}
			var $parentli = $li.closest('ul').closest('[coos-recordid="' + parentid + '"]');
			if ($parentli.length > 0) {
				this.initSingleLevel($parentli);
			}
		}
	};
	Tree.prototype.initSingleLevel = function($li) {
		// 打开单层
		if (this.config.openSingleLevel) {
			this.initParentSingleLevel($li);
			if ($li.hasClass('open')) {

			} else {
				var this_ = this;
				this.beforeOpen($li, function() {
					var level = getLiLevel($li);
					$li.closest('ul').find('.coos-tree-has-child').css('margin-top', '0px');
					$li.closest('ul').find('li.open').removeClass('open');
					// this.$tree.find('li.open').removeClass('open');
					$li.addClass('open').css('margin-top', '0px');
					var $ul = $li.find('ul:first');
					var liHeight = $ul.find('>li:first').height();
					if (this_.liHeight == null) {
						this_.liHeight = 30;
					}
					$li.closest('ul').find('li').hide();
					$li.show();
					$ul.find('>li').show();
					$li.css('margin-top', -this_.liHeight * (1) + (1));

					this_.$onLineTree.empty();
					this_.$tree.find('li').removeClass('single-level-select');
					$li.addClass('single-level-select');
					appendOnLineTree(this_.$onLineTree, $li);
					this_.afterOpen($li);
				});

			}
		}
	};
	function appendOnLineTree($onLineTree, $handleLi, flag) {
		if ($handleLi.length < 1) {
			return;
		}
		var data = $handleLi.data('data');
		var bean = $handleLi.data('bean');
		var config = $handleLi.data('config');
		var $handleUl = $handleLi.closest('ul');
		config.hasCheckbox = false;
		config.hasRadio = false;
		var $li = createLi(bean, config);
		$li.find('.tree-row-right').remove();
		$li.find('.tree-row-left').remove();
		if (flag) {
			$li.addClass('can-point');
			$li.click(function() {
				$handleLi.find('.icon:first').click();
			});
		}
		$onLineTree.prepend($li);

		if (!$handleUl.hasClass('coos-tree')) {
			var $icon = $('<i class="right-icon fa fa-angle-right"></i>');
			$li.find('.tree-row-center').before($icon);
			appendOnLineTree($onLineTree, $handleUl.closest('li'), true);
		} else {
			var $lis = $onLineTree.find('>li');
			var width = 0;
			var lastLeft = 0;
			$($lis).each(function(index, $li) {
				$li = $($li);
				width += $li.width();
				if (index == ($lis.length - 1)) {
					lastLeft = width;
				}
			});
			$onLineTree.css('min-width', width + 20);
			var $lastLi = $onLineTree.find('>li:last');

			$onLineTree.parent().scrollLeft(lastLeft);
		}
	}
	function getLiLevel($li, level) {
		level = level || 1;
		var $ul = $li.closest('ul');
		if ($ul.hasClass('coos-tree')) {
			return level;
		} else {
			return getLiLevel($ul.closest('li'), level + 1);
		}
	}
	Tree.prototype.build = function() {
		var $ul = createUl();
		// if (this.config.openLazyLoadChildData ||
		// this.config.openLazyRendering) {
		// this.config.openSearchPrompt = true;
		// }
		this.$content.append($ul);
		$ul.addClass('coos-tree ');
		this.$scrollObject = this.config.$scrollObject;
		if (!co.isEmpty(this.config.treeUlHeight)) {
			$ul.css('height', this.config.treeUlHeight);
			this.$scrollObject = $ul;
		}
		if (this.$scrollObject == null) {
			this.$scrollObject = $('html,body');
		}
		if (!this.config.showLevelLine) {
			$ul.addClass('coos-tree-no-level-line');
		}
		if (!this.config.showLevel) {
			$ul.addClass('coos-tree-no-level');
		}

		if (this.config.hasSearch) {
			var $searchContainer = this.$searchContainer = $('<div class="coos-tree-search-container"></div>');
			this.$searchInput = $('<input class="coos-tree-search-input" />');
			this.$searchInput.attr('placeholder', this.config.searchInputPlaceholder || co.config.label.searchInputPlaceholder);
			this.$searchButton = $('<a class="coos-tree-search-button">' + co.config.label.search + '</a>');
			if (!co.isEmpty(this.config.searchButtonText)) {
				this.$searchButton.text(this.config.searchButtonText);
			} else {
				this.$searchButton.html("<i class='fa fa-search'></i>");
			}
			var $onLineTreeContent = $('<div class="coos-on-line-container"></div>');
			$searchContainer.append(this.$searchInput);
			$searchContainer.append(this.$searchButton);
			$ul.before($searchContainer);

			var this_ = this;
			this.$searchButton.click(function() {
				var searchText = this_.$searchInput.val();
				this_.search(searchText, this_.$tree);
			});
			if (this.config.openSearchPrompt) {
				var searchInputE = this.$searchInput[0];
				if (searchInputE.attachEvent) {
					searchInputE.attachEvent('onpropertychange', function() {
						var searchText = this_.$searchInput.val();
						this_.search(searchText, this_.$tree);
					});
				} else {
					var cpLock = false;
					searchInputE.addEventListener('compositionstart', function() {
						cpLock = true;
					})
					searchInputE.addEventListener('compositionend', function() {
						cpLock = false;
						if (!cpLock) {
							var searchText = this_.$searchInput.val();
							this_.search(searchText, this_.$tree);
						}
					})
					searchInputE.addEventListener('input', function() {
						if (!cpLock) {
							var searchText = this_.$searchInput.val();
							this_.search(searchText, this_.$tree);
						}
					});
				}

				// this.$searchInput.on('input', function(e) {
				// var searchText = this_.$searchInput.val();
				// this_.search(searchText, this_.$tree);
				// });
			}
			this.$searchInput.on('keydown', function(e) {
				var target, code, tag;
				if (!event) {
					event = window.event;
					target = event.srcElement;
					code = event.keyCode;
				} else {
					target = event.target;
					code = event.keyCode;
				}
				if (code == 13) {
					var searchText = this_.$searchInput.val();
					this_.search(searchText, this_.$tree);
				}

			});

		}
		if (this.config.openSingleLevel) {
			$ul.addClass('coos-tree-open-single-level');
			this.$onLineTree = $('<ul class="coos-on-line-tree"></ul>');
			var $onLineTreeContent = $('<div class="coos-on-line-container"></div>');
			$onLineTreeContent.append(this.$onLineTree);
			$ul.before($onLineTreeContent);
		}
		this.$tree = $ul;
		var datas = this.config.datas;
		if (datas.length > 0) {

			var liConfig = {};
			liConfig.hasCheckbox = this.config.hasCheckbox;
			liConfig.hasRadio = this.config.hasRadio;
			liConfig.buttons = this.config.buttons;
			liConfig.radioName = this.config.radioName;
			liConfig.property = this.config.property;
			var openLazyRendering = this.config.openLazyRendering;
			var dataModel = this.dataModel;
			var topBean = dataModel.topBean;
			var this_ = this;
			if (topBean != null) {
				var $li = createLi(topBean, liConfig, 1);
				$ul.append($li);
				this.createChildUl($li, dataModel.topBeans, {
					liConfig : liConfig,
					appendFront : false,
					openLazyRendering : openLazyRendering
				});
			} else {
				$(dataModel.topBeans).each(function(index, topBean) {
					var $li = createLi(topBean, liConfig, 1);
					$ul.append($li);
					this_.createChildUl($li, topBean.childBeans, {
						liConfig : liConfig,
						appendFront : false,
						openLazyRendering : openLazyRendering
					});
				});
			}
			co.element.init(this.$tree);
			this.initCheckeds();
		} else {
			var $noDataLi = $('<li><div class="coos-no-matching-data">' + co.config.label.noMatchingData + '</div></li>');
			$ul.append($noDataLi);
		}

	};
	/**
	 * TODO 创建子列表
	 */
	Tree.prototype.createChildUl = function($li, childBeans, config) {
		this.initInputEvent($li);
		this.initLiLeftDistance($li);
		var bean = this.getBean($li);
		config = config || {};
		var property = config.property || this.config.property;
		var haschild = bean.haschild;
		var liConfig = config.liConfig;
		var appendFront = config.appendFront;
		var openLazyRendering = config.openLazyRendering;
		var isLazyRendering = config.isLazyRendering;
		appendFront = appendFront || false;
		if (childBeans == null || childBeans.length == 0) {
			if (!this.config.openLazyLoadChildData || !haschild) {
				$li.addClass('coos-tree-has-not-child');
				return null;
			}
		}
		var level = $li.attr('li-level');
		level = level || 1;
		level++;
		this.maxLevel = this.maxLevel || level;
		if (level > this.maxLevel) {
			this.maxLevel = level;
		}
		var $ul = $li.find('>ul:first');
		var $firstli = null;
		if ($ul.length < 1) {
			$ul = createUl(level);
			$ul.addClass('coos-tree-child');
			$li.append($ul);
		} else {
			$firstli = $ul.find('>li:first');
			$firstli = $firstli.length < 1 ? null : $firstli;
		}
		var $lis = [];
		$li.addClass('coos-tree-has-child');
		$li.find('>.coos-tree-row .li-icon').addClass('fa-chevron-right');
		if (!openLazyRendering || isLazyRendering) {
			var this_ = this;
			bean.childLoaded = true;
			$(childBeans).each(function(index, childBean) {
				var $li = createLi(childBean, liConfig, level);
				$lis[$lis.length] = $li;
				if (!appendFront) {
					$ul.append($li);
				} else {
					if ($firstli == null) {
						$ul.append($li);
					} else {
						$firstli.before($li);
					}
				}
				this_.createChildUl($li, childBean.childBeans, {
					property : property,
					liConfig : liConfig,
					openLazyRendering : openLazyRendering
				});
			});
		}
		this.initOpenOrCloseEvent($li);
		return $lis;
	};
	Tree.prototype.initCheckeds = function() {
		var $tree = this.$tree;
		var checkedIds = this.config.checkedIds;
		var this_ = this;
		$(checkedIds).each(function(index, checkedId) {
			var $li = $tree.find('li[coos-recordid="' + checkedId + '"]');
			this_.checkLi($li, true);
		});
	};
	// 打开选中的节点
	Tree.prototype.openCheckedNode = function() {
		var $checkboxs = this.$tree.find('input[type="checkbox"]');
		var this_ = this;
		$checkboxs.each(function(index, $checkbox) {
			$checkbox = $($checkbox);
			if ($checkbox[0].checked) {
				var $li = $checkbox.closest('li');
				var $parentli = $li.closest('ul').closest('li');
				if ($parentli.length > 0) {
					this_.opendLi($parentli);
				}
			}
		});
	};
	Tree.prototype.append = function($li, datas, config, appendFront) {
		if (!datas || datas.length < 1) {
			return;
		}
		var bean = this.getBean($li);
		config = config || this.config;
		var property = config.property || this.config.property;
		var liConfig = {};
		liConfig.hasCheckbox = config.hasCheckbox;
		liConfig.addClass = config.addClass;
		liConfig.hasRadio = config.hasRadio;
		liConfig.buttons = config.buttons || this.config.buttons;
		liConfig.radioName = config.radioName || this.config.radioName;
		liConfig.property = property;
		var openLazyRendering = this.config.openLazyRendering;
		var childBeans = this.dataModel.appendChildDatas(bean, datas, liConfig);
		var $lis = this.createChildUl($li, childBeans, {
			property : property,
			liConfig : liConfig,
			appendFront : appendFront,
			openLazyRendering : false,
			isLazyRendering : true
		});
		this.initLevel();
		co.element.init($li);
		this.initSingleLevel($li);
		if ($li.hasClass('open')) {

		} else {
			$li.find('.li-icon:first').click();
		}
		return $lis;
	};
	Tree.prototype.appendChildLiEndInfos = function($li, infos) {
		var $lis = $li.find('>ul>li');
		if ($lis.length == infos.length) {
			var this_ = this;
			$($lis).each(function(index, $li) {
				this_.appendLiEndInfo($($li), infos[index]);
			});
		}
	};
	Tree.prototype.appendLiEndInfo = function($li, info) {
		var $row = $li.find('>.coos-row');
		var $rowright = $row.find('.tree-row-right');
		var hasButton = $row.find('.tree-button').length > 0;
		$rowright.removeClass('has-end-info');
		$rowright.removeClass('has-end-button');
		if (hasButton) {
			$rowright.addClass('has-end-button');
		}
		$rowright.find('.data-end-info').remove();
		if (!co.isEmpty(info)) {
			$rowright.addClass('has-end-info');
			var $info = $('<span class="data-end-info"></span>');
			$rowright.append($info);
			$info.append(info);
		}
	};
	Tree.prototype.getBeanChildDatas = function(bean) {

	};
	Tree.prototype.getAllChildDatas = function(bean) {
		var datas = [];
		var this_ = this;
		$(bean.childBeans).each(function(index, childBean) {
			datas[datas.length] = childBean.data;
			var childDatas = this_.getAllChildDatas(childBean);
			$(childDatas).each(function(index, childData) {
				datas[datas.length] = childData;
			});
		});
		return datas;
	};
	Tree.prototype.getCheckedDatas = function(needchilddata) {
		if (typeof (needchilddata) == "undefined") {
			needchilddata = true;
		}
		var result = {};

		var $lis = this.$tree.find('li');
		var datas = [];
		for ( var id in this.checkedBeanMap) {
			var bean = this.checkedBeanMap[id];
			var parentid = bean.parentid;
			var data = bean.data;
			datas[datas.length] = data;
			// 判断当前Bean子数据有没有被渲染
			if (bean.childLoaded) {

			} else {
				if (bean.mustcheckedchild) {
					var childDatas = this.getAllChildDatas(bean);
					$(childDatas).each(function(index, childData) {
						datas[datas.length] = childData;
					});
				}
			}
		}
		// var $checkboxs = this.$tree.find('input[type="checkbox"]');
		// $checkboxs.each(function(index, $checkbox) {
		// $checkbox = $($checkbox);
		// if ($checkbox[0].checked) {
		// var $li = $checkbox.closest('li');
		// var data = $li.data('data');
		// datas[datas.length] = data;
		// }
		// });
		var $radios = this.$tree.find('input[type="radio"]');
		var checkedData = {};
		$($radios).each(function(index, $radio) {
			$radio = $($radio);
			if ($radio[0].checked) {
				var $li = $radio.closest('li');
				var name = $radio.attr('name');
				checkedData[name] = $li.data('data');
			}
		});
		result.checkedDeleteIds = this.checkedDeleteIds || [];
		result.checkedDeleteDatas = this.checkedDeleteDatas || [];
		result.checkedDatas = datas;
		result.checkedData = checkedData;
		return result;
	};

	co.tree = function(config) {
		var start = new Date().getTime();
		var t = new Tree(config);
		var end = new Date().getTime();
		console.log('耗时：' + (end - start) + 'ms');
		return t;
	};

})();