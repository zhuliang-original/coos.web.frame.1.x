(function() {
	co.page.config.event = {
		loadSuccess : function(config) {
			var html = config.html;
			var animation = config.animation;
			var showtype = config.showtype;

			var pageContent = $(co.page.config.frame.content);
			var pageWindow = null;
			var oldContent = $(co.page.config.frame.oldcontent);
			oldContent.empty();
			if (co.page.config.animation) {
				pageContent.children().appendTo(oldContent);
			}
			pageContent.empty();
			var $page = $(html);
			$page.appendTo(pageContent);

			co.frame && co.frame.changeFull($('#coos-need-full-page').length > 0 && $('#coos-need-full-page').closest('.coos-box-window').length == 0);

			if (co.page.config.animation) {
				if (window['istoaction']) {
					animation = 1;
				} else {
					animation = null;
				}
				window['istoaction'] = false;
				if (animation) {
					// 需要执行动画设置统一高度
					var oldHeight = oldContent.height();
					var pageHeight = pageContent.height();
					oldContent.css('height', pageHeight + 'px');

					$('body').removeClass('page-animation-1 page-animation-2');
					window.setTimeout(function() {
						$('body').addClass('page-animation-' + animation);
					}, 100);
				}
			}

			var hash = '' + window.location.hash;
			hash = decodeURIComponent(hash);
			if (!co.isEmpty(hash)) {
				var $element = pageContent.find(hash);
				if ($element.length > 0) {
					var top = $element.offset().top;
					$("body").animate({
						scrollTop : top
					}, 300);
				}
			}

		}
	};
	(function() {
		var PageLoad = function(config) {
			this.config = config;
			this.action = config.action;
			this.toPage = config.toPage;
			this.callback = config.callback;
			this.data = config.data;
			this.url = co.url.format(config.action);
			return this;
		};
		PageLoad.prototype.load = function() {
			var this_ = this;
			this.start();
			if (this.toPage) {
				window.location.href = url;
				return;
			}
			$.ajax({
				url : this.url,
				data : this.data || {},
				type : 'post',
				dataType : 'html',
				async : true, // 异步请求
				beforeSend : function() {
					this_.beforeSend();
				},
				success : function(html) {
					this_.end(html);
				},
				complete : function(request, status) {
					this_.complete(request, status);
				},
				error : function(request, status, thrown) {
					this_.error(request, status, thrown);
				}
			});
		};
		PageLoad.prototype.beforeSend = function() {
		};
		PageLoad.prototype.complete = function(request, status) {
		};
		PageLoad.prototype.start = function() {
			co.cover.showLoading();
			$('.coos-box-window').remove();
		};

		PageLoad.prototype.end = function(html) {
			co.cover.hideLoading();
			var config_ = this.config || {};
			var $page = $(html);
			if ($page.length > 0 && !$page[0].tagName) {
				$page = $('<div></div>');
				$page.append(html);
			}
			var content = $page.find(co.page.config.frame.content);
			if (content.length > 0) {
				html = content.html();
			}
			if (this.callback != null) {
				if (!co.page.validate($page, url)) {
					return;
				}
				this.callback(html);
			} else {
				config_.html = html;
				config_.url = this.url;
				co.page.config.event.loadSuccess(config_);
			}
			co.page.loaded();
		};

		PageLoad.prototype.error = function(request, status, error) {
			co.cover.hideLoading();
			if (request.status == 500) {
				var erroraction = co.config.action.error['500'];
				if (this.action.indexOf(erroraction) < 0) {
					window['istoaction'] = true;
					this.config.action = erroraction;
					co.page.load(this.config);
				}
			} else if (request.status == 404) {
				var erroraction = co.config.action.error['404'];
				if (action.indexOf(erroraction) < 0) {
					window['istoaction'] = true;
					this.config.action = erroraction;
					co.page.load(this.config);
				}
			}
		};
		co.page.load = function(config) {
			var pageLoad = new PageLoad(config);
			return pageLoad.load();
		};
	})();

	co.page.validate = function(html, url) {
		var $page = null;
		try {
			$page = $(html);
		} catch (e) {
			return true;
		}
		var error = 0;
		$page.each(function(index, element) {
			var $element = $(element);
			if ($element.find('#coos-is-login-page').length > 0) {
				error = 1;
				return false;
			} else if ($element.find('#coos-is-404-page').length > 0) {
				error = 2;
				return false;
			} else if ($element.find('#coos-is-500-page').length > 0) {
				error = 3;
				return false;
			} else if ($element.find('#coos-is-not-online-page').length > 0) {
				error = 4;
				return false;
			} else if ($element.find('#coos-is-no-access-page').length > 0) {
				error = 5;
				return false;
			}
		});
		if (error > 0) {
			var config = {};
			config.toPage = true;
			if (error == 1) {
				config.action = (coos.config.action.toLogin);
			} else if (error == 2) {
				config.action = (coos.config.action.error['404']);
				coos.box.alert(url + " 404 Error!");
				return false;
			} else if (error == 3) {
				config.action = (coos.config.action.error['500']);
				coos.box.alert(url + " 500 Error!");
				return false;
			} else if (error == 4) {
				config.action = (coos.config.action.error.toNotOnline);
			} else if (error == 5) {
				config.action = (coos.config.action.error.toNoAccess);
			}
			co.page.load(config);
			return false;
		}
		return true;
	};

	co.page.reload = function() {
		if (co.page.config.openSinglePage) {
			var action = co.url.getCurrentUrl();
			var config = {};
			config.action = action;
			co.page.load(config);
		} else {
			window.location.reload();
		}
	};
})();