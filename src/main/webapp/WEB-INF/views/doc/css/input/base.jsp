<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-base">基础输入框</h2>
<div class="doc-view">
	<div class=" coos-row mgb-10">
		<div class="coos-input coos-col-12">
			<input placeholder="这是输入框" />
		</div>
	</div>
	<div class=" coos-row mgb-10">
		<div class="coos-input coos-col-12">
			<select>
				<option>2</option>
				<option>3</option>
				<option>54</option>
			</select>
		</div>
	</div>
	<div class=" coos-row mgb-10">
		<div class="coos-input coos-col-12">
			<textarea rows="5" cols="5" placeholder="这是文本域"></textarea>
		</div>
	</div>
	<div class=" coos-row mgb-10">
		<div class="coos-input coos-col-12">
			<input type="file" />
		</div>
	</div>
</div>
<pre class="doc-code " id="doc-input-base-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = '';
		code += '<div class="coos-input">\n';
		code += '\t<input placeholder="这是输入框" />\n';
		code += '</div>\n';
		$("#doc-input-base-code").text(code);
		$("#doc-input-base-code").snippet('html', codeConfig);
	})();
</script>

