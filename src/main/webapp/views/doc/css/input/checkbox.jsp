<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-checkbox">复选框</h2>
<div class="doc-view">
	<div class=" coos-row mgb-10">

		<div class="coos-input coos-checkbox-group coos-col-12">
			<input name="type" type="checkbox">
			<span class="label">选项1</span>
			<input name="type" type="checkbox">
			<span class="label">选项2</span>
		</div>
	</div>
</div>
<pre class="doc-code " id="doc-input-checkbox-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = '';
		code += '<div class="coos-input coos-checkbox-group ">\n';
		code += '\t<input name="type" type="checkbox">\n';
		code += '\t<span class="label">选项1</span>\n';
		code += '\t<input name="type" type="checkbox">\n';
		code += '\t<span class="label">选项2</span>\n';
		code += '</div>\n';
		$("#doc-input-checkbox-code").text(code);
		$("#doc-input-checkbox-code").snippet('html', codeConfig);
	})();
</script>

