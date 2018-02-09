(function() {

})();
var styleArr = [ "acid", "berries-dark", "berries-light", "bipolar", "blacknblue", "bright", "contrast", "darkblue",

"darkness", "desert", "dull", "easter", "emacs", "golden", "greenlcd", "ide-anjuta", "ide-codewarrior",

"ide-devcpp", "ide-eclipse", "ide-kdev", "ide-msvcpp", "kwrite", "matlab",

"navy", "nedit", "neon", "night", "pablo", "peachpuff", "print", "rand01", "the", "typical",

"vampire", "vim", "vim-dark", "whatis", "whitengrey", "zellner" ];

var codeStyle = "darkblue";

var codeConfig = {
	style : codeStyle,
	transparent : false,
	showNum : false
};

coos.page.pushLoadCallback(function() {
	var $chapters = $('.doc-chapter');
	var navs = [];
	$($chapters).each(function(index, chapter) {
		$chapter = $(chapter);
		var $one = $chapter.find('.doc-chapter-header');
		var id = $one.attr('id');
		var title = $one.text();
		var nav = {};
		nav.id = id;
		nav.title = title;
		var subs = [];
		var $subs = $chapter.find('.doc-part-header');

		$($subs).each(function(index, $sub) {
			$sub = $($sub);
			var id = $sub.attr('id');
			var title = $sub.text();
			var nav = {};
			nav.id = id;
			nav.title = title;
			subs[subs.length] = nav;
		});
		nav.subs = subs;
		navs[navs.length] = nav;
	});

	function fullNavData(navs, $ul) {
		$(navs).each(function(index, nav) {
			var $li = $('<li></li>');
			$li.append('<a href="#' + nav.id + '">' + nav.title + '</a>');
			$ul.append($li);

			if (nav.subs != null && nav.subs.length > 0) {
				var $subul = $('<ul></ul>');
				$li.append($subul);
				fullNavData(nav.subs, $subul);
			}
		});
	}
	var $nav = $('.doc-nav');
	fullNavData(navs, $nav);
	$(window).scroll(function() {
		initNavSelect();
	});
	var $parts = $('.doc-part-header');
	function initNavSelect() {
		if ($(window).scrollTop() >= $('.doc-guide').outerHeight()) {
			$nav.addClass('nav-fixed');
			$('.doc-content').addClass('coos-offset-3');
		} else {
			$nav.removeClass('nav-fixed');
			$('.doc-content').removeClass('coos-offset-3');
		}
		$('.doc-content').removeClass('coos-offset-xs-0').addClass('coos-offset-xs-0');
		for (var i = 0; i < $parts.length; i++) {
			var $part = $($parts[i]);
			var id = $part.attr('id');
			if (coos.isVisible($part)) {
				$nav.find('.active').removeClass('active');
				$nav.find('[href="#' + id + '"]').closest('li').addClass('active');
				$nav.find('[href="#' + id + '"]').closest('ul').closest('li').addClass('active');
				break;
			}
		}
	}
	initNavSelect();

});

$(function() {
	$('html').on('click', '.validateInputBtn', function() {
		var $form = $(this).closest('.doc-view');
		var data = coos.form.validate($form);
		coos.box.info('验证成功！结果：' + JSON.stringify(data));
	});
});
