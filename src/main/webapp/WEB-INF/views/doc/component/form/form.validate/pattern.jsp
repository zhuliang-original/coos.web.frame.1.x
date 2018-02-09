<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-validate-pattern">自定义正则验证</h2>
<div class="doc-view">
	<div id="doc-input-validate-pattern-view" class=" coos-row mgb-10">
<input label="输入框" name="name" class="input-rule-group parameter" need-addon="true" placeholder="匹配：必须包含A" 
	pattern="[A]+"/>
	</div>
	<a class="coos-btn coos-green coos-bd-green validateInputBtn">验证</a>
</div>
<pre class="doc-code " id="doc-input-validate-pattern-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-input-validate-pattern-view').html();
		$("#doc-input-validate-pattern-code").text(code);
		$("#doc-input-validate-pattern-code").snippet('html', codeConfig);
	})();
</script>

