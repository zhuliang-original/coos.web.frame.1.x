<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-base-size">字体大小</h2>
<div class="doc-view" id="doc-base-size-view">
<span class="font-xs ">font-xs</span>
<span class="font-sm ">font-sm</span>
<span class="font-md ">font-md</span>
<span class="font-lg ">font-lg</span>
</div>
<pre class="doc-code " id="doc-base-size-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-base-size-view').html();
		$("#doc-base-size-code").text(code);
		$("#doc-base-size-code").snippet('html', codeConfig);
	})();
</script>
