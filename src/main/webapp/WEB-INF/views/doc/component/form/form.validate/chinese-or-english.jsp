<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-validate-chinese-or-english">验证中文或英文</h2>
<div class="doc-view">
	<div id="doc-input-validate-chinese-or-english-view" class=" coos-row mgb-10">
<input label="输入框" name="name" class="input-rule-group parameter" need-addon="true" placeholder="验证中文或英文" 
	iscn-or-en />
	</div>
	<a class="coos-btn coos-green coos-bd-green validateInputBtn">验证</a>
</div>
<pre class="doc-code " id="doc-input-validate-chinese-or-english-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-input-validate-chinese-or-english-view').html();
		$("#doc-input-validate-chinese-or-english-code").text(code);
		$("#doc-input-validate-chinese-or-english-code").snippet('html', codeConfig);
	})();
</script>

