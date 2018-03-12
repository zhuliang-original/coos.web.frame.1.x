<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-group-other">其它</h2>
<div class="doc-view">
	<div class=" coos-row mgb-10">
		<div class="coos-input-group coos-col-12">
			<label class="coos-col-2 coos-col-xs-12 text-xs-left coos-col-lg-2 text-lg-right coos-label">
				标签
				<span class="color-transparent ">*</span>
			</label>

			<div class="coos-col-10 coos-col-xs-12 coos-col-lg-6 coos-input">
				<input placeholder="输入框" />
			</div>
			<span class="coos-offset-2 coos-offset-xs-0 coos-offset-lg-0 coos-col-lg-4 coos-input-help">这是响应式输入框组</span>
		</div>
	</div>
</div>
<pre class="doc-code " id="doc-input-group-other-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = '';
		code += '<div class="coos-input-group coos-col-12">\n';
		code += '\t<label class="coos-col-2 coos-col-xs-12 text-xs-left coos-col-lg-2 text-lg-right coos-label">\n';
		code += '\t\t标签\n';
		code += '\t\t<span class="color-transparent ">*</span>\n';
		code += '\t</label>\n';
		code += '\t<div class="coos-col-10 coos-col-xs-12 coos-col-lg-6 coos-input">\n';
		code += '\t\t<input placeholder="输入框" />\n';
		code += '\t</div>\n';
		code += '\t<span class="coos-offset-2 coos-offset-xs-0 coos-offset-lg-0 coos-col-lg-4 coos-input-help">这是响应式输入框组</span>\n';
		code += '</div>\n';
		$("#doc-input-group-other-code").text(code);
		$("#doc-input-group-other-code").snippet('html', codeConfig);
	})();
</script>

