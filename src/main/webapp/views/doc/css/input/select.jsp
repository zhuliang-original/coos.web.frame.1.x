<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-select">下拉框</h2>
<div class="doc-view">
	<div class=" coos-row mgb-10">
		<div class="coos-input coos-col-12">
			<select>
				<option>2</option>
				<option>3</option>
				<option>54</option>
			</select>
		</div>
	</div>
</div>
<pre class="doc-code " id="doc-input-select-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = '';
		code += '<div class="coos-input">\n';
		code += '\t<select>\n';
		code += '\t\t<option>1</option>\n';
		code += '\t\t<option>2</option>\n';
		code += '\t</select>\n';
		code += '</div>\n';
		$("#doc-input-select-code").text(code);
		$("#doc-input-select-code").snippet('html', codeConfig);
	})();
</script>

