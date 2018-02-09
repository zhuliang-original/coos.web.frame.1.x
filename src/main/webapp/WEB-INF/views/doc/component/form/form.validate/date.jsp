<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-validate-date">验证日期</h2>
<div class="doc-view">
	<div id="doc-input-validate-date-view" class=" coos-row mgb-10">
<input label="输入框" name="name" class="input-rule-group parameter" need-addon="true" placeholder="验证日期" 
	isdate/>
	</div>
	<a class="coos-btn coos-green coos-bd-green validateInputBtn">验证</a>
</div>
<pre class="doc-code " id="doc-input-validate-date-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-input-validate-date-view').html();
		$("#doc-input-validate-date-code").text(code);
		$("#doc-input-validate-date-code").snippet('html', codeConfig);
	})();
</script>

