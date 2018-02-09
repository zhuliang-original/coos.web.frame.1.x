<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-validate-length">验证长度</h2>
<div class="doc-view">
	<div id="doc-input-validate-length-view" class=" coos-row mgb-10">
<input label="输入框" name="name" class="input-rule-group parameter" need-addon="true" placeholder="最小为2位，最大为5位" 
	minlength="2" maxlength="5" />
	</div>
	<a class="coos-btn coos-green coos-bd-green validateInputBtn">验证</a>
</div>
<pre class="doc-code " id="doc-input-validate-length-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-input-validate-length-view').html();
		$("#doc-input-validate-length-code").text(code);
		$("#doc-input-validate-length-code").snippet('html', codeConfig);
	})();
</script>

