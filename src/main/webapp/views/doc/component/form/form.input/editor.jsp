<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-form-editor">编辑器</h2>
<div class="doc-view">
	<div id="doc-form-editor-view" class=" coos-row mgb-10">
<textarea label="标签" class="input-rule-group input-rule-editor" name="editor_name" placeholder="" /></textarea>
	</div>
</div>
<pre class="doc-code " id="doc-form-editor-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-form-editor-view').html();
		$("#doc-form-editor-code").text(code);
		$("#doc-form-editor-code").snippet('html', codeConfig);
	})();
</script>
