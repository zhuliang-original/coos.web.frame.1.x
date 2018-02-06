<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-form-select">选择框</h2>
<div class="doc-view">
	<div id="doc-form-select-view" class=" coos-row mgb-10">
<select label="标签" class="input-rule-group input-rule-select">
	<option value="">请选择</option>
	<option value="1值">1文本</option>
	<option value="12值">2文本</option>
	<option value="123值">3文本</option>
</select>
<select label="标签" class="input-rule-group input-rule-select" need-addon="true">
	<option value="">请选择</option>
	<option value="1值">1文本</option>
	<option value="12值">2文本</option>
	<option value="123值">3文本</option>
</select>
<input label="标签" class="input-rule-group input-rule-select" need-addon="true" placeholder="输入下拉框" />
<select class="option-select ">
	<option value="">请选择</option>
	<option value="1值">1文本</option>
	<option value="12值">2文本</option>
	<option value="123值">3文本</option>
</select>
	</div>
</div>
<pre class="doc-code " id="doc-form-select-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-form-select-view').html();
		$("#doc-form-select-code").text(code);
		$("#doc-form-select-code").snippet('html', codeConfig);
	})();
</script>
