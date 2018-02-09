<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-validate-nosymbol">验证不包含特殊字符</h2>
<div class="doc-view">
	<div id="doc-input-validate-nosymbol-view" class=" coos-row mgb-10">
<input label="输入框" name="name" class="input-rule-group parameter" need-addon="true" placeholder="验证不包含特殊字符" 
	isnosymbol />
	</div>
	<a class="coos-btn coos-green coos-bd-green validateInputBtn">验证</a>
</div>
<pre class="doc-code " id="doc-input-validate-nosymbol-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-input-validate-nosymbol-view').html();
		$("#doc-input-validate-nosymbol-code").text(code);
		$("#doc-input-validate-nosymbol-code").snippet('html', codeConfig);
	})();
</script>

