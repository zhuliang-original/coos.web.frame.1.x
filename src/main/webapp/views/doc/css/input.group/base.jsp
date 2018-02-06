<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-group-base">基础输入框组</h2>
<div class="doc-view">
	<div class=" coos-row mgb-10">
		<div class="coos-input-group coos-col-12">
			<label class="coos-col-2 coos-label">
				标签
				<span class="font-transparent ">*</span>
			</label>
			<div class="coos-col-10 coos-input">
				<input placeholder="输入框" />
			</div>
		</div>
		<div class="coos-input-group coos-col-12">
			<label class="coos-col-2 coos-label">
				标签
				<span class="coos-red ">*</span>
			</label>
			<div class="coos-col-10 coos-input">
				<input placeholder="输入框" />
			</div>
		</div>
		<div class="coos-input-group coos-col-12">
			<label class="coos-col-12 coos-label text-left">
				标签
				<span class="coos-red ">*</span>
			</label>
			<div class="coos-col-12 coos-input">
				<input placeholder="输入框" />
			</div>
		</div>
	</div>
</div>
<pre class="doc-code " id="doc-input-group-base-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = '';
		code += '<div class="coos-input-group coos-col-12">\n';
		code += '\t<label class="coos-col-2 coos-label">标签</label>\n';
		code += '\t<div class="coos-col-10 coos-input">\n';
		code += '\t\t<input placeholder="输入框" />\n';
		code += '\t</div>\n';
		code += '</div>\n';
		$("#doc-input-group-base-code").text(code);
		$("#doc-input-group-base-code").snippet('html', codeConfig);
	})();
</script>

