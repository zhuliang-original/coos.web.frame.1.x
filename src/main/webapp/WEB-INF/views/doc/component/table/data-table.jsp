<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-table-data-table">DataTable</h2>
<div class="doc-view">
	<div id="doc-table-data-table-view" class=" coos-row mgb-10">
<div class="table-responsive">
	<table class="coos-table element-rule-data-tables" >
		<thead>
			<tr>
				<th>标题1</th><th>标题2</th><th>标题3</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>值1</td><td>值2</td><td>值3</td>
			</tr>
			<tr>
				<td>值1</td><td>值2</td><td>值3</td>
			</tr>
			<tr>
				<td>值1</td><td>值2</td><td>值3</td>
			</tr>
		</tbody>
	</table>
</div>
	</div>
</div>
<pre class="doc-code " id="doc-table-data-table-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-table-data-table-view').html();
		$("#doc-table-data-table-code").text(code);
		$("#doc-table-data-table-code").snippet('html', codeConfig);
	})();
</script>
