(function() {
	co.element.initDataTables = function(content) {
		content = content || $('body');
		var elements = $(content).find('.core-need-init-data-tables');
		if (elements.length > 0) {
			co.plugins.load("data_tables", function() {
				$(elements).each(function(index, element) {
					if (co.element.isInited(element, 'core-need-init-data-tables')) {
						return;
					}

					element = $(element);
					var pagesize = 10;
					var viewrowindex = element.attr('viewrowindex');
					var viewpageindex = element.attr('viewpageindex');
					var datatable = element.dataTable({
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
		}
	};
})();