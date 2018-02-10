(function() {
	co.element.bind("data-tables", function($selector) {
		co.plugin.load("data_tables", function() {
			var pagesize = 10;
			var viewrowindex = $selector.attr('viewrowindex');
			var viewpageindex = $selector.attr('viewpageindex') || 1;
			var datatable = $selector.dataTable({
				bSort : false
			});
			if (viewrowindex) {
				var pageindex = viewrowindex % pagesize == 0 ? viewrowindex / pagesize : Math.ceil(viewrowindex / pagesize);

			}
			if (viewpageindex) {
				pageindex = viewpageindex;
			}
			if (pageindex < 1) {
				pageindex = 1;
			} else if (pageindex > datatable.fnPagingInfo().iTotalPages) {
				pageindex = datatable.fnPagingInfo().iTotalPages;
			}
			datatable.fnPageChange(pageindex - 1);
		});
	});
})();