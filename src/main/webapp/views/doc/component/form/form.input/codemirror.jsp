<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-form-codemirror">代码编辑器</h2>
<div class="doc-view">
	<div id="doc-form-codemirror-view" class=" coos-row mgb-10">
<textarea label="标签" class="input-rule-group input-rule-codemirror" name="codemirror_name" placeholder="" /></textarea>
	</div>
</div>
<pre class="doc-code " id="doc-form-codemirror-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-form-codemirror-view').html();
		$("#doc-form-codemirror-code").text(code);
		$("#doc-form-codemirror-code").snippet('html', codeConfig);
	})();
</script>
