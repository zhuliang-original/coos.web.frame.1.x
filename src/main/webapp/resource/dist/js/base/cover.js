(function() {
	co.init.bind(function() {
		co.cover.init();
	});
	co.cover = new Object();
	co.cover.config = {
		model : {
			cover : " <div class='coos-cover-window' ></div>",
			loading : "  <div class='coos-cover-loading-window'  ><div class='coos-cover-mask' >" +

			"<div class='coos-cover-loading-image'></div><div class='coos-cover-mask-font'>Loading</div>"

			+ "</div></div>",
			uploading : "  <div class='coos-cover-uploading-window'  ><div class='coos-cover-mask' >" +

			"<div class='coos-cover-uploading-image'></div><div class='coos-cover-mask-font'>Uploading</div>"

			+ "</div></div>"
		}
	};

	co.cover.model = {};

	co.cover.option = function(config) {

	};

	co.cover.init = function() {
		if (co.cover.model.cover == null) {
			co.cover.model.cover = $(co.cover.config.model.cover);
			co.cover.model.cover.hide();
			co.cover.model.loading = $(co.cover.config.model.loading);

			co.cover.model.loading.hide();
			co.cover.model.uploading = $(co.cover.config.model.uploading);

			co.cover.model.uploading.hide();

			var $head = $($('head').get(0));

			$head.before(co.cover.model.cover);
			$head.before(co.cover.model.loading);
			$head.before(co.cover.model.uploading);
		}

	}

	co.cover.showLoadingIndex = 0;
	co.cover.showUploadingIndex = 0;
	co.cover.showCoverIndex = 0;
	co.cover.show = function(config) {
		co.cover.init();
		co.cover.showCoverIndex++;
		window.setTimeout(function() {
			co.cover.model.cover.css('display', 'block');
		}, 0);
	};

	co.cover.hide = function(place) {
		co.cover.init();
		co.cover.showCoverIndex--;
		if (co.cover.showCoverIndex == 0) {
			window.setTimeout(function() {
				co.cover.model.cover.css('display', 'none');
			}, 0);
		}
	};

	co.cover.showLoading = function(config) {
		config = config || {};
		co.cover.show(config);
		co.cover.showLoadingIndex++;
		co.cover.model.loading.css('display', 'block');
	};

	co.cover.hideLoading = function(config) {
		co.cover.showLoadingIndex--;
		if (co.cover.showLoadingIndex == 0) {
			window.setTimeout(function() {
				co.cover.hide(config);
				co.cover.model.loading.css('display', 'none');
			}, 200);
		} else {
			co.cover.hide(config);
		}
	};

	co.cover.showUploading = function(config) {
		co.cover.show(config);
		co.cover.showUploadingIndex++;
		co.cover.model.uploading.css('display', 'block');
	};

	co.cover.hideUploading = function(config) {
		co.cover.showUploadingIndex--;
		if (co.cover.showUploadingIndex == 0) {
			window.setTimeout(function() {
				co.cover.hide(config);
				co.cover.model.uploading.css('display', 'none');
			}, 200);
		} else {
			co.cover.hide(config);
		}
	};
})();