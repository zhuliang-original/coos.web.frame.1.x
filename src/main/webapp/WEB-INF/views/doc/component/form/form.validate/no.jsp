<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-validate-no">不验证</h2>
<div class="doc-view">
	<div id="doc-input-validate-no-view" class=" coos-row mgb-10">
<input label="输入框" name="name" class="input-rule-group parameter" need-addon="true" placeholder="不做任何验证" 
	/>
	</div>
	<a class="coos-btn coos-green coos-bd-green validateInputBtn">验证</a>
</div>
<pre class="doc-code " id="doc-input-validate-no-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-input-validate-no-view').html();
		$("#doc-input-validate-no-code").text(code);
		$("#doc-input-validate-no-code").snippet('html', codeConfig);
	})();
</script>

