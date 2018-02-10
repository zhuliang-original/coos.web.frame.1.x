<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-table-base">基础</h2>
<div class="doc-view">
	<div id="doc-table-base-view" class=" coos-row mgb-10">
		<div class="coos-col-12 table-responsive">
			<table class="coos-table">
				<thead>
					<tr>
						<th width="80px" class="text-center">序号</th>
						<th>列1</th>
						<th>列2</th>
						<th>列3</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class=" text-center">1</td>
						<td>a</td>
						<td>b</td>
						<td>c</td>
					</tr>
					<tr>
						<td class=" text-center">1</td>
						<td>a</td>
						<td>b</td>
						<td>c</td>
					</tr>
					<tr>
						<td class=" text-center">1</td>
						<td>a</td>
						<td>b</td>
						<td>c</td>
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
<pre class="doc-code " id="doc-table-base-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-table-base-view').html();
		$("#doc-table-base-code").text(code);
		$("#doc-table-base-code").snippet('html', codeConfig);
	})();
</script>
