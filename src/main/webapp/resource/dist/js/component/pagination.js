(function() {

	co.component.getPaginationUl = function(model, callback) {
		var currentpage = model.currentpage;
		currentpage = currentpage == null ? 1 : currentpage;
		var totalpages = model.totalpages;
		totalpages = totalpages == null ? 0 : totalpages;
		var totalcount = model.totalcount;
		totalcount = totalcount == null ? 0 : totalcount;
		var pagesize = model.pagesize;
		pagesize = pagesize == null ? 0 : pagesize;
		var uppage = model.uppage;
		if (!uppage) {
			uppage = currentpage - 1;
			if (uppage < 1) {
				uppage = 1;
			}
		}
		var nextpage = model.nextpage;
		if (!nextpage) {
			nextpage = currentpage + 1;
			if (nextpage > totalpages) {
				nextpage = totalpages;
			}
		}
		nextpage = nextpage == null ? 0 : nextpage;
		var ul = $("<ul class=\"pagination pagination-sm\" ></ul>");
		var li = $("<li ><a href=\"javascript:;\" >|&lt;</a></li>");
		ul.append(li);
		if (currentpage <= 1) {
			li.addClass('disabled');
		}
		if (currentpage > 1) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('pagesize', 1);
			li.find('a').attr('currentpage', 1);
		}
		li = $("<li ><a href=\"javascript:;\" >&lt;</a></li>");
		ul.append(li);
		if (currentpage <= 1) {
			li.addClass('disabled');
		}
		if (currentpage > 1) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('currentpage', uppage);
		}
		if (totalpages > 6) {
			if (currentpage <= 3) {
				var pageIndex = 1;
				for (var i = 1; i <= 6; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
			}
			if (currentpage > 3 && currentpage < (totalpages - 3)) {
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
				var pageIndex = currentpage - 2;
				for (var i = 1; i <= 6; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
			}
			if (currentpage >= (totalpages - 3)) {
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
				var pageIndex = totalpages - 5;
				for (var i = 1; i <= 6; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
			}
		} else {
			if (totalpages <= 6) {
				var pageIndex = 1;
				for (var i = 1; i <= totalpages; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
			}
		}
		li = $("<li ><a href=\"javascript:;\" >&gt;</a></li>");
		ul.append(li);
		if (currentpage >= totalpages) {
			li.addClass('disabled');
		}
		if (currentpage < totalpages) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('currentpage', nextpage);
		}
		li = $("<li ><a href=\"javascript:;\" >&gt;|</a></li>");
		ul.append(li);
		if (currentpage >= totalpages) {
			li.addClass('disabled');
		}
		if (currentpage < totalpages) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('currentpage', totalpages);
		}
		li = ("<li class=\"disabled\"><a href=\"javascript:;\" >" + currentpage + "/" + totalpages + "</a></li>");
		ul.append(li);
		li = ("<li class=\"disabled\"><a href=\"javascript:;\" >" + pagesize + "条/页</a></li>");
		ul.append(li);
		li = ("<li class=\"disabled\"><a href=\"javascript:;\" >共" + totalcount + "条</a></li>");
		ul.append(li);
		ul.find('.pageSearchBtn').click(function() {
			var currentpage = $(this).attr('currentpage');
			if (callback) {
				callback(currentpage);
			}
		});
		return ul;
	};
})();