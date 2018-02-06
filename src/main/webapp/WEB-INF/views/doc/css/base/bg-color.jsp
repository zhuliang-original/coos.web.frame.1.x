<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-base-bg-color">背景颜色</h2>
<div class="doc-view" id="doc-base-bg-color-view">
	<span class="coos-bg-red coos-white">red</span>
	<span class="coos-bg-green coos-white">green</span>
	<span class="coos-bg-yellow coos-white">yellow</span>
	<span class="coos-bg-blue coos-white">blue</span>
	<span class="coos-bg-white coos-black">white</span>
	<span class="coos-bg-black coos-white">black</span>
	<span class="coos-bg-grey coos-white">grey</span>
	<span class="coos-bg-facebook coos-white">facebook</span>
	<span class="coos-bg-twitter coos-white">twitter</span>
	<span class="coos-bg-linkedin coos-white">linkedin</span>
	<span class="coos-bg-googleplus coos-white">googleplus</span>
	<span class="coos-bg-dark-red coos-white">dark-red</span>
	<span class="coos-bg-dark-green coos-white">dark-green</span>
	<span class="coos-bg-dark-blue coos-white">dark-blue</span>
	<span class="coos-bg-dark-yellow coos-white">dark-yellow</span>
	<span class="coos-bg-dark-grey coos-white">dark-grey</span>
	<span class="coos-bg-soft-red coos-white">soft-red</span>
	<span class="coos-bg-soft-green coos-white">soft-green</span>
	<span class="coos-bg-soft-blue coos-white">soft-blue</span>
	<span class="coos-bg-soft-yellow coos-white">soft-yellow</span>
	<span class="coos-bg-soft-grey coos-white">soft-grey</span>
</div>
<pre class="doc-code " id="doc-base-bg-color-code">
</pre>

<script type="text/javascript">
	(function() {
		var code = '';
		code += '<div class="coos-bg-*">red</div>\n';
		code += '如：\n';
		code += '<span class="coos-bg-red">red</span>\n';
		code += '或：\n';
		code += '<div class="bg-*">red</div>\n';
		code += '如：\n';
		code += '<span class="bg-red">red</span>\n';
		$("#doc-base-bg-color-code").text(code);
		$("#doc-base-bg-color-code").snippet('html', codeConfig);
	})();
</script>
