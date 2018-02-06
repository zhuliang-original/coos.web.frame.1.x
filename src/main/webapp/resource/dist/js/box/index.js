(function() {

	co.box = co.box || {};

	co.box.error = function(arg1) {

	};
	co.box.html = {};
	co.box.html.info = "<div class='coos-box coos-box-info text-center'>" + "	<div class='coos-box-content'>" + "		<div class='coos-box-cover'></div>" + "		<div class='coos-box-center'>"
			+ "			<div class='coos-box-info'></div>" + "		</div>" + "	</div>" + "</div>";
	co.box.html.alert = "<div class='coos-box text-center'>" + "	<div class='coos-box-content'>" + "		<div class='coos-box-cover'></div>" + "		<div class='coos-box-header'>"
			+ "			<div class='coos-box-close coos-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"coos-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='coos-box-center'>"
			+ "			<div class='coos-box-info'></div>" + "		</div>" + "		<div class='coos-box-footer'>" + "			<a type=\"button\" class=\" coos-btn coos-box-button coos-box-define\">确定</a>" + "		</div>"
			+ "	</div>" + "</div>";
	co.box.html.confirm = "<div class='coos-box text-center'>" + "	<div class='coos-box-content'>" + "		<div class='coos-box-cover'></div>" + "		<div class='coos-box-header'>"
			+ "			<div class='coos-box-close coos-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"coos-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='coos-box-center'>"
			+ "			<div class='coos-box-info'></div>" + "		</div>" + "		<div class='coos-box-footer'>" + "			<a type=\"button\" class=\"coos-btn coos-box-button coos-box-define\">确定</a>"
			+ "			<a type=\"button\" class=\"coos-btn coos-box-button coos-box-cancel\">取消</a>" + "		</div>" + "	</div>" + "</div>";
	co.box.html.other = "<div class='coos-box'>" + "	<div class='coos-box-content'>" + "		<div class='coos-box-cover'></div>" + "		<div class='coos-box-header'>"
			+ "			<div class='coos-box-close coos-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"coos-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='coos-box-center'>"
			+ "			<div class='coos-box-info'></div>" + "		</div>" + "		<div class='coos-box-footer'>" + "			<a type=\"button\" class=\"coos-btn coos-box-button coos-box-cancel\">取消</a>" + "		</div>"
			+ "	</div>" + "</div>";
	co.box.html.window = "<div class='coos-box coos-box-window '>" + "	<div class='coos-box-content'>" + "		<div class='coos-box-cover'></div>" + "		<div class='coos-box-header'>"
			+ "			<div class='coos-box-close coos-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"coos-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='coos-box-center'>"
			+ "		</div>" + "		<div class='coos-box-footer'>" + "			<a type=\"button\" class=\"coos-btn coos-box-button coos-box-cancel\">取消</a>" + "		</div>" + "	</div>" + "</div>";
	co.box.info = function(arg1) {
		var w = co.getWidth();
		var h = co.getHeight();
		var $model = $(co.box.html.info);
		$('body').append($model);
		var t = (h - 50) / 2 - 50;
		$model.find('.coos-box-content').css("top", t);
		$model.find('.coos-box-info').html(arg1);
		$model.fadeIn();
		window.setTimeout(function() {
			$model.fadeOut();
			window.setTimeout(function() {
				$model.remove();
			}, 100);
		}, 800);
	};
	co.box.alert = function(arg1, arg2, arg3) {
		var w = co.getWidth();
		var h = co.getHeight();
		var $model = $(co.box.html.alert);
		$model.find('.coos-box-title').text(co.config.label.alertBoxTitle);
		$model.find('.coos-box-footer .coos-box-define').text(co.config.label.define);
		$model.find('.coos-box-footer .coos-box-cancel').text(co.config.label.cancel);
		$('body').append($model);
		var t = (h - 50) / 2 - 120;
		$model.find('.coos-box-content').css("top", t);
		$model.find('.coos-box-info').html(arg1);
		if (arg3) {
			$model.find('.coos-box-title').html(arg3);
		}
		$model.fadeIn();
		$model.find('.coos-box-define').click(function() {
			$model.remove();
			arg2 && arg2();
		});
		$model.find('.coos-box-cancel').click(function() {
			$model.remove();
			arg2 && arg2();
		});
	};
	co.box.confirm = function(arg1, arg2, arg3, arg4) {
		var w = co.getWidth();
		var h = co.getHeight();
		var $model = $(co.box.html.confirm);
		$('body').append($model);
		var t = (h - 50) / 2 - 120;
		$model.find('.coos-box-title').text(co.config.label.confirmBoxTitle);
		$model.find('.coos-box-footer .coos-box-define').text(co.config.label.define);
		$model.find('.coos-box-footer .coos-box-cancel').text(co.config.label.cancel);
		$model.find('.coos-box-content').css("top", t);
		$model.find('.coos-box-info').html(arg1);
		if (arg4) {
			$model.find('.coos-box-title').html(arg4);
		}
		$model.fadeIn();
		$model.find('.coos-box-define').click(function() {
			$model.remove();
			arg2 && arg2();
		});
		$model.find('.coos-box-cancel').click(function() {
			$model.remove();
			arg3 && arg3();
		});
	};
	co.box.other = function(arg1, arg2, arg3, arg4) {
		var w = co.getWidth();
		var h = co.getHeight();
		var $model = $(co.box.html.other);
		$('body').append($model);
		var t = (h - 50) / 2 - 120;
		$model.find('.coos-box-title').text(co.config.label.title);
		$model.find('.coos-box-footer .coos-box-define').text(co.config.label.define);
		$model.find('.coos-box-footer .coos-box-cancel').text(co.config.label.cancel);
		$model.find('.coos-box-content').css("top", t);
		$model.find('.coos-box-info').html(arg1);
		if (arg4) {
			$model.find('.coos-box-title').html(arg4);
		}
		$model.fadeIn();
		$model.find('.coos-box-cancel').click(function() {
			$model.remove();
			arg2 && arg2();
		});
		$(arg3).each(function(index, button) {
			var $button = $("<button type=\"button\" class=\"coos-btn coos-box-button \">" + button.label + "</button>");
			$button.attr('style', button.style);
			$model.find('.coos-box-footer .coos-box-cancel').before($button);
			$button.click(function() {
				$model.remove();
				button.callback && button.callback();
			});
		});
	};

})();