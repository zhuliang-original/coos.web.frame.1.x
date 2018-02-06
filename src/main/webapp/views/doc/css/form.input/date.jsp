<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-form-date">日期</h2>
<div class="doc-view">
	<div id="doc-form-date-view" class=" coos-row mgb-10">
<input label="时间" class="input-rule-group input-rule-time" need-addon="true" placeholder="时间" />
<input label="日期" class="input-rule-group input-rule-date" need-addon="true" placeholder="日期" />
<input label="时间日期" class="input-rule-group input-rule-datetime" need-addon="true" placeholder="时间日期" />
	</div>
</div>
<pre class="doc-code " id="doc-form-date-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-form-date-view').html();
		$("#doc-form-date-code").text(code);
		$("#doc-form-date-code").snippet('html', codeConfig);
	})();
</script>

