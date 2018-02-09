<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-form-input-form">输入框表单</h2>
<div class="doc-view">
	<div id="doc-form-input-form-view" class=" coos-row mgb-10">
<div class="coos-form">
	<input label="标签" group-type="4" column-size="4" class="input-rule-group" placeholder="输入框" />
	<input label="标签" group-type="4" column-size="4" class="input-rule-group" placeholder="输入框" />
	<input label="标签" group-type="4" column-size="4" class="input-rule-group " placeholder="输入框" />
	<select label="标签" group-type="4" column-size="4" class="input-rule-group input-rule-select">
		<option value="">请选择</option>
	</select>
	<select label="标签" group-type="4" column-size="4" class="input-rule-group input-rule-select">
		<option value="">请选择</option>
	</select>
	<input label="标签" group-type="4" column-size="4" class="input-rule-group " placeholder="输入框" />
	<select label="标签" group-type="4" column-size="4" class="input-rule-group input-rule-select">
		<option value="">请选择</option>
	</select>
	<select label="标签" group-type="4" column-size="4" class="input-rule-group input-rule-select">
		<option value="">请选择</option>
	</select>
</div>
	</div>
</div>
<pre class="doc-code " id="doc-form-input-form-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-form-input-form-view').html();
		$("#doc-form-input-form-code").text(code);
		$("#doc-form-input-form-code").snippet('html', codeConfig);

	})();
</script>

