"use strict";
var PAGEID_PAGE_OBJECT_MAP = {};
var PANELID_PANEL_OBJECT_MAP = {};
var LAYOUTID_LAYOUT_OBJECT_MAP = {};
window.putPageObject = function(pageObject) {
	PAGEID_PAGE_OBJECT_MAP[pageObject.page.pageid] = pageObject;
};

window.getPageObject = function(pageid) {
	return PAGEID_PAGE_OBJECT_MAP[pageid];
};

window.putPanelObject = function(panelObject) {
	PANELID_PANEL_OBJECT_MAP[panelObject.panel.panelid] = panelObject;
};

window.getPanelObject = function(key) {
	if (PANELID_PANEL_OBJECT_MAP[key] != null) {
		return PANELID_PANEL_OBJECT_MAP[key];
	}
	var objects = [];
	var keys = [ key ];
	if (key.indexOf(',') >= 0) {
		keys = key.split(',');
	}
	var objects = [];
	var keys = [ key ];
	if (key.indexOf(',') >= 0) {
		keys = key.split(',');
	}
	$(keys).each(function(index, key) {
		if (!coos.isEmpty(key) && PANELID_PANEL_OBJECT_MAP[key] != null) {
			objects[objects.length] = PANELID_PANEL_OBJECT_MAP[key];
		}
	});

	return objects;
};

window.putLayoutObject = function(layoutObject) {
	LAYOUTID_LAYOUT_OBJECT_MAP[layoutObject.layout.layoutid] = layoutObject;
};

window.getLayoutObject = function(key) {
	if (LAYOUTID_LAYOUT_OBJECT_MAP[key] != null) {
		return LAYOUTID_LAYOUT_OBJECT_MAP[key];
	}
	var objects = [];
	var keys = [ key ];
	if (key.indexOf(',') >= 0) {
		keys = key.split(',');
	}
	$(keys).each(function(index, key) {
		if (!coos.isEmpty(key) && LAYOUTID_LAYOUT_OBJECT_MAP[key] != null) {
			objects[objects.length] = LAYOUTID_LAYOUT_OBJECT_MAP[key];
		}
	});

	return objects;
};

window.loadEntityPage = function(pageid, requestmap, design) {
	var action = "/coos/data/getPage.data";
	var page = null;
	// var data = requestmap || {};
	var data = jQuery.extend(true, {}, requestmap);
	data.coreentitypageid = pageid;
	if (design) {
		data["coos-page-design"] = true;
	}
	coos.POST(action, data, 'json', function(o) {
		var status = o.data;
		if (status.errcode != 0) {
			coos.box.info(status.errmsg);
		} else {
			page = status.result;
		}
	}, false);
	return page;
};

window.loadServiceData = function(serviceid, searchData, callback) {
	var config = {};
	config.id = serviceid;
	config.data = searchData || {};
	config.callback = function(result) {
		var map = {};
		if (result.errcode == 0) {
			map = result.result;
		} else {
			coos.box.info(result.errmsg);
		}
		callback && callback(map);
	}
	coos.executeService(config);
};
// TODO 默认空为false
window.initDataDefaultFalse = function(data, name) {
	var value = data[name];
	if (coos.isEmpty(value)) {
		value = false;
	} else {
		if (!coos.isBoolean(value)) {
			if ((value == "false" || value == "0")) {
				value = false;
			} else {
				value = true;
			}
		}
	}

	data[name] = value;
};
// TODO 默认空位true
window.initDataDefaultTrue = function(data, name) {
	var value = data[name];
	if (coos.isEmpty(value)) {
		value = true;
	} else {
		if (!coos.isBoolean(value)) {
			if ((value == "false" || value == "0")) {
				value = false;
			} else {
				value = true;
			}
		}
	}
	data[name] = value;
};
window.initElementsData = function(layout) {
	$(layout.elements).each(function(index, element) {
		initDataDefaultTrue(element, "display");
		initDataDefaultFalse(element, "needwrap");
		initDataDefaultTrue(element, "cannull");
		initDataDefaultFalse(element, "readonly");
		if (element.inputtype == 'SWITCH') {
			var datas = [];
			var data = {};
			data.value = 0;
			data.text = "否";
			datas[datas.length] = data;
			var data = {};
			data.value = 1;
			data.text = "是";
			datas[datas.length] = data;
			element.selectdatas = datas;
		}
	});
};