<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-radio">单选框</h2>
<div class="doc-view">
	<div class=" coos-row mgb-10">
		<div class="coos-input coos-radio-group coos-col-12">
			<input name="type" type="radio">
			<span class="label">选项1</span>
			<input name="type" type="radio">
			<span class="label">选项2</span>
		</div>
	</div>
</div>
<pre class="doc-code " id="doc-input-radio-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = '';
		code += '<div class="coos-input coos-radio-group ">\n';
		code += '\t<input name="type" type="radio">\n';
		code += '\t<span class="label">选项1</span>\n';
		code += '\t<input name="type" type="radio">\n';
		code += '\t<span class="label">选项2</span>\n';
		code += '</div>\n';
		$("#doc-input-radio-code").text(code);
		$("#doc-input-radio-code").snippet('html', codeConfig);
	})();
</script>

