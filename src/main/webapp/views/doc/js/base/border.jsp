<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-base-border">边框</h2>
<div class="doc-view">
	<div class="coos-bdt coos-bdt-red pd-10"></div>
	<div class="coos-bdt coos-bdt-green pd-10"></div>
	<div class="coos-bdt coos-bdt-yellow pd-10"></div>
	<div class="coos-bd coos-bdt-red coos-bdr-green coos-bdb-yellow coos-bdl-green pd-10"></div>


</div>
<pre class="doc-code " id="doc-base-border-code">
</pre>

<script type="text/javascript">
	(function() {
		var code = '';
		code += '<div class="coos-bdt">...</div>\n';
		code += '<div class="coos-bd">...</div>\n';
		code += '<div class="coos-bd coos-bd-red">...</div>\n';
		code += '<div class="coos-bd coos-bdt-red coos-bdr-green coos-bdb-yellow coos-bdl-green pd-10">...</div>\n';
		$("#doc-base-border-code").text(code);
		$("#doc-base-border-code").snippet('html', codeConfig);
	})();
</script>
