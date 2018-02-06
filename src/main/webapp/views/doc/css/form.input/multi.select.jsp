<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-form-multi-select">多选下拉框</h2>
<div class="doc-view">
	<div id="doc-form-multi-select-view" class=" coos-row mgb-10">
<input label="标签" class="input-rule-group input-rule-multi-select" placeholder="多选下拉框" />
<select class="option-select ">
	<option value="">请选择</option>
	<option value="1值">1文本</option>
	<option value="12值">2文本</option>
	<option value="123值">3文本</option>
</select>
<input label="标签" class="input-rule-group input-rule-multi-select" need-addon="true" placeholder="多选下拉框" />
<select class="option-select ">
	<option value="">请选择</option>
	<option value="1值">1文本</option>
	<option value="12值">2文本</option>
	<option value="123值">3文本</option>
</select>
	</div>
</div>
<pre class="doc-code " id="doc-form-multi-select-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-form-multi-select-view').html();
		$("#doc-form-multi-select-code").text(code);
		$("#doc-form-multi-select-code").snippet('html', codeConfig);
	})();
</script>

