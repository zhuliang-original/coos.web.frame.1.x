<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-validate-en-or-num-ul-po">验证英文、数字、下划线或点</h2>
<div class="doc-view">
	<div id="doc-input-validate-en-or-num-ul-po-view" class=" coos-row mgb-10">
<input label="输入框" name="name" class="input-rule-group parameter" need-addon="true" placeholder="验证英文、数字、下划线或点" 
	isen-or-num-or-ul-or-po />
	</div>
	<a class="coos-btn coos-green coos-bd-green validateInputBtn">验证</a>
</div>
<pre class="doc-code " id="doc-input-validate-en-or-num-ul-po-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-input-validate-en-or-num-ul-po-view').html();
		$("#doc-input-validate-en-or-num-ul-po-code").text(code);
		$("#doc-input-validate-en-or-num-ul-po-code").snippet('html', codeConfig);
	})();
</script>

