<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-form-input-group">输入框组</h2>
<div class="doc-view">
	<div id="doc-form-input-group-view" class=" coos-row mgb-10">
<input label="标签1" class="input-rule-group" placeholder="这是默认的" />
<input label="标签2" group-type="2" class="input-rule-group" placeholder="输入框" help-info="这是输入帮助提示" />
<input label="标签3" group-type="3" class="input-rule-group" placeholder="输入框" help-info="这是输入帮助提示" />
<input label="标签4" group-type="4" class="input-rule-group" placeholder="输入框" />
<input label="标签5" group-type="5" class="input-rule-group" placeholder="输入框" help-info="这是输入帮助提示" />
<input label="标签6" group-type="6" class="input-rule-group" placeholder="输入框" help-info="这是输入帮助提示" />
	</div>
</div>
<pre class="doc-code " id="doc-form-input-group-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-form-input-group-view').html();
		$("#doc-form-input-group-code").text(code);
		$("#doc-form-input-group-code").snippet('html', codeConfig);

	})();
</script>

