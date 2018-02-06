<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-button-group">按钮组</h2>
<div class="doc-view">

	<div class=" coos-row mgb-10">
		<div class="coos-btn-group">
			<a class="coos-btn coos-bg-green">Green</a>
			<a class="coos-btn coos-bg-yellow">Yellow</a>
			<a class="coos-btn coos-bg-red">Red</a>
			<a class="coos-btn coos-bg-blue">Blue</a>
		</div>
	</div>

	<div class=" coos-row mgb-10">
		<div class="coos-btn-group coos-btn-group-xs">
			<a class="coos-btn coos-green coos-bd-green">Green</a>
			<a class="coos-btn coos-yellow coos-bd-yellow">Yellow</a>
			<a class="coos-btn coos-red coos-bd-red">Red</a>
			<a class="coos-btn coos-blue coos-bd-blue">Blue</a>
		</div>
	</div>

	<div class=" coos-row mgb-10">
		<div class="coos-btn-group">
			<a class="coos-btn coos-green coos-bd-green">Green</a>
			<a class="coos-btn coos-yellow coos-bd-yellow">Yellow</a>
			<a class="coos-btn coos-red coos-bd-red">Red</a>
			<a class="coos-btn coos-blue coos-bd-blue">Blue</a>
		</div>
	</div>
	<div class=" coos-row mgb-10">
		<div class="coos-btn-group coos-btn-group-lg">
			<a class="coos-btn coos-green coos-bd-green">Green</a>
			<a class="coos-btn coos-yellow coos-bd-yellow">Yellow</a>
			<a class="coos-btn coos-red coos-bd-red">Red</a>
			<a class="coos-btn coos-blue coos-bd-blue">Blue</a>
		</div>
	</div>
</div>
<pre class="doc-code " id="doc-button-group-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = '';
		code += '<div class="coos-btn-group ">\n';
		code += '\t<a class="coos-btn coos-green coos-bd-green">Green</a>\n';
		code += '\t<a class="coos-btn coos-yellow coos-bd-yellow">Yellow</a>\n';
		code += '\t<a class="coos-btn coos-red coos-bd-red">Red</a>\n';
		code += '\t<a class="coos-btn coos-blue coos-bd-blue">Blue</a>\n';
		code += '</div>\n';
		$("#doc-button-group-code").text(code);
		$("#doc-button-group-code").snippet('html', codeConfig);
	})();
</script>
