<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-form-checkbox-tag">复选标签</h2>
<div class="doc-view">
	<div id="doc-form-checkbox-tag-view" class=" coos-row mgb-10">
<input label="标签" class="input-rule-group input-rule-checkbox-tag" name="checkbox_name" placeholder="输入下拉框" />
<select class="option-select ">
	<option value="1值">1文本</option>
	<option value="12值">2文本</option>
	<option value="123值">3文本</option>
</select>
	</div>
</div>
<pre class="doc-code " id="doc-form-checkbox-tag-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-form-checkbox-tag-view').html();
		$("#doc-form-checkbox-tag-code").text(code);
		$("#doc-form-checkbox-tag-code").snippet('html', codeConfig);
	})();
</script>
