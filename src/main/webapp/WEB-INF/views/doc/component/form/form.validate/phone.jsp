<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-validate-phone">验证手机</h2>
<div class="doc-view">
	<div id="doc-input-validate-phone-view" class=" coos-row mgb-10">
<input label="输入框" name="name" class="input-rule-group parameter" need-addon="true" placeholder="验证手机" 
	isphone/>
	</div>
	<a class="coos-btn coos-green coos-bd-green validateInputBtn">验证</a>
</div>
<pre class="doc-code " id="doc-input-validate-phone-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-input-validate-phone-view').html();
		$("#doc-input-validate-phone-code").text(code);
		$("#doc-input-validate-phone-code").snippet('html', codeConfig);
	})();
</script>

