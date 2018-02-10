<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-table-pagination">带分页表格</h2>
<div class="doc-view">
	<div id="doc-table-pagination-view" class=" coos-row mgb-10">
<div class=" table-responsive">
	<table class="coos-table">
		<thead>
			<tr>
				<th width="80px" class="text-center">序号</th><th>列1</th><th>列2</th><th>列3</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class=" text-center">1</td><td>a</td><td>b</td><td>c</td>
			</tr>
			<tr>
				<td class=" text-center">2</td><td>a</td><td>b</td><td>c</td>
			</tr>
			<tr>
				<td class=" text-center">3</td><td>a</td><td>b</td><td>c</td>
			</tr>
		</tbody>
	</table>
	<ul class="pagination pagination-sm mgb-0">
		<li class="disabled">
			<a href="javascript:;">|&lt;</a>
		</li>
		<li class="disabled">
			<a href="javascript:;">&lt;</a>
		</li>
		<li class="active">
			<a href="javascript:;" currentpage="1">1</a>
		</li>
		<li class="disabled">
			<a href="javascript:;">&gt;</a>
		</li>
		<li class="disabled">
			<a href="javascript:;">&gt;|</a>
		</li>
		<li class="disabled">
			<a href="javascript:;">1/1</a>
		</li>
		<li class="disabled">
			<a href="javascript:;">20条/页</a>
		</li>
		<li class="disabled">
			<a href="javascript:;">共1条</a>
		</li>
	</ul>
</div>
	</div>
</div>
<pre class="doc-code " id="doc-table-pagination-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-table-pagination-view').html();
		$("#doc-table-pagination-code").text(code);
		$("#doc-table-pagination-code").snippet('html', codeConfig);
	})();
</script>
