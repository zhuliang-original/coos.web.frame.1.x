(function() {

	var sortableindex = 1;
	co.element.initSortable = function(content) {
		content = content || $('body');

		var sortables = $(content).find('.core-need-init-sortable');
		if (sortables.length > 0) {
			co.plugins.load("jquery_sortable", function() {

				$(sortables).each(function(index, sortable) {
					sortable = $(sortable);
					sortableindex++;
					var thisindex = sortableindex;
					var sortable_one = sortable.attr('sortable-one');
					var ones = sortable.find(sortable_one);
					if (ones.length < 0) {
						return;
					}
					sortable.attr('sortableindex', thisindex);
					sortable.sortable({
						opacity : 0.35,
						update : function(e, t) {
							var tablename = sortable.attr('tablename');
							var tableid = sortable.attr('tableid');
							var sequencecolumnname = sortable.attr('sequencecolumnname');
							var primarykeycolumnname = sortable.attr('primarykeycolumnname');
							sequencecolumnname = sequencecolumnname || 'sequence';
							var idstr = '';
							ones = $("[sortableindex=" + thisindex + "]").find(sortable_one);
							ones.each(function(index, one) {
								idstr += $(one).attr('core-recordid') + ",";
								$(one).find('[name="' + sequencecolumnname + '"]').val(index + 1);
							});
							if (((tablename != null && tablename != '') || (tableid != null && tableid != '')) && idstr != null && idstr != '') {
								var data = {};
								if (tablename != null && tablename != '') {
									data.tablename = tablename;
								}
								if (tableid != null && tableid != '') {
									data.tableid = tableid;
								}
								data.primarykeycolumnname = primarykeycolumnname;
								data.sequencecolumnname = sequencecolumnname;
								data.idstr = idstr;
								var action = "core/data/sortable.data";
								co.POST(action, data, 'json', function(o) {
									if (sortable.data('sortableChange')) {
										sortable.data('sortableChange')(e, t);
									}
								});
							} else {
								if (sortable.data('sortableChange')) {
									sortable.data('sortableChange')(e, t);
								}
							}
						}
					});

				});

			});
		}
	};
})();