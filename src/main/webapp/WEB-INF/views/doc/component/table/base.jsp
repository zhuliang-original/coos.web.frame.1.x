<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-table-base">基础</h2>
<div class="doc-view">
	<div id="doc-table-base-view" class=" coos-row mgb-10">
<div class="">
	<table class="coos-table" >
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
<pre class="doc-code " id="doc-table-base-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-table-base-view').html();
		$("#doc-table-base-code").text(code);
		$("#doc-table-base-code").snippet('html', codeConfig);
	})();
</script>
