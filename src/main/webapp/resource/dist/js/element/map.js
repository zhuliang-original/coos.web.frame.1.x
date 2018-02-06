(function() {
	co.element.initLocation = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-location');

		elements.each(function(index, element) {
			element = $(element);

			if (co.element.isInited(element, 'inputtype-location')) {
				return;
			}

			var isreadonly = element.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;

			var id = 'map_' + element.attr('id');

			var mapPanel = $('<div style="width: 100%;height: 300px;margin-bottom: 10px;">这里插入百度地图</div>');
			var utilPanel = $('<div style="width: 100%;height: 50px;" class="col-sm-12"></div>');
			utilPanel.append('<label class=" control-label">检索：</label>');
			utilPanel.append('<input style="display: initial;width: 150px;" class="searchtext form-control" placeholder="输入检索信息" success="true">');
			utilPanel.append('<a style="margin-left: 5px;margin-top: -5px;" class="searchbtn btn btn-xs vd_bg-green vd_white" >检索</a>');
			utilPanel.append('<span class="vd_red">&nbsp;&nbsp;点击地图即可设定位置哦！</span>');
			utilPanel.append('<span class="vd_green">&nbsp;&nbsp;当前选中:</span>');
			utilPanel.append('<span class="vd_blue thisaddress">&nbsp;&nbsp;</span>');
			utilPanel.find('.searchbtn').attr('mapid', id);
			mapPanel.attr('id', id);
			element.before(utilPanel);
			element.before(mapPanel);
			// 百度地图API功能
			maps[id] = new BMap.Map(id); // 创建Map实例
			maps[id].utilPanel = utilPanel;
			maps[id].mapid = id;
			var locationinfo = element.val();
			if (locationinfo != null && locationinfo != '' && locationinfo.indexOf(',') > 0) {
				var locationinfos = locationinfo.split(',');
				var point = new BMap.Point(locationinfos[0], locationinfos[1]);
				maps[id].centerAndZoom(point, 15);
				point.mapid = maps[id].mapid;
				showLocationInfo(point, maps[id].utilPanel.find('.thisaddress'));
			} else {
				maps[id].centerAndZoom('南京', 15);// 初始化地图,设置中心点坐标和地图级别
			}

			maps[id].enableScrollWheelZoom(true);// 开启鼠标滚轮缩放
			maps[id].addEventListener("click", function(e) {
				var locationinfo = e.point.lng + "," + e.point.lat;

				if (!isreadonly) {
					element.val(locationinfo);
				}
				var point = e.point;
				point.mapid = this.mapid;
				showLocationInfo(point, this.utilPanel.find('.thisaddress'));
			});
			utilPanel.find('.searchbtn').click(function() {
				var mapid = $(this).attr('mapid');
				var searchtext = $(this).parent().find('.searchtext').val();
				if (searchtext != null && searchtext != '') {
					var map = maps[mapid];
					var local = new BMap.LocalSearch(map, {
						renderOptions : {
							map : map
						}
					});
					local.search(searchtext);
				}

			});
		});

	}
	function showLocationInfo(point, thisaddress) {
		var geoc = new BMap.Geocoder();
		geoc.getLocation(point, function(rs) {
			var addComp = rs.addressComponents;
			var addressinfo = addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
			thisaddress.text(addressinfo);
		});

		var mapid = point.mapid;
		maps[mapid].clearOverlays();
		var marker = new BMap.Marker(point); // 创建标注
		maps[id].addOverlay(marker); // 将标注添加到地图中
		// marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

	}

})();