<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-form-slider">滑块</h2>
<div class="doc-view">
	<div id="doc-form-slider-view" class=" coos-row mgb-10">
<input label="标签" class="input-rule-group input-rule-slider" name="slider_name" />
	</div>
</div>
<pre class="doc-code " id="doc-form-slider-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-form-slider-view').html();
		$("#doc-form-slider-code").text(code);
		$("#doc-form-slider-code").snippet('html', codeConfig);
	})();
</script>
