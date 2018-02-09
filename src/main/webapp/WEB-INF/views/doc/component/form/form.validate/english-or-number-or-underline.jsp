<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-validate-en-or-num-ul">验证英文、数字或下划线</h2>
<div class="doc-view">
	<div id="doc-input-validate-en-or-num-ul-view" class=" coos-row mgb-10">
<input label="输入框" name="name" class="input-rule-group parameter" need-addon="true" placeholder="验证英文、数字或下划线" 
	isen-or-num-or-ul />
	</div>
	<a class="coos-btn coos-green coos-bd-green validateInputBtn">验证</a>
</div>
<pre class="doc-code " id="doc-input-validate-en-or-num-ul-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-input-validate-en-or-num-ul-view').html();
		$("#doc-input-validate-en-or-num-ul-code").text(code);
		$("#doc-input-validate-en-or-num-ul-code").snippet('html', codeConfig);
	})();
</script>

