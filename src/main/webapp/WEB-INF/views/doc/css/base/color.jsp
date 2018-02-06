<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-base-color">字体颜色</h2>
<div class="doc-view" id="doc-base-color-view">
	<span class="coos-red">red</span>
	<span class="coos-green">green</span>
	<span class="coos-yellow">yellow</span>
	<span class="coos-blue">blue</span>
	<span class="coos-white coos-bg-black">white</span>
	<span class="coos-black">black</span>
	<span class="coos-grey">grey</span>
	<span class="coos-facebook">facebook</span>
	<span class="coos-twitter">twitter</span>
	<span class="coos-linkedin">linkedin</span>
	<span class="coos-googleplus">googleplus</span>
	<span class="coos-dark-red">dark-red</span>
	<span class="coos-dark-green ">dark-green</span>
	<span class="coos-dark-blue ">dark-blue</span>
	<span class="coos-dark-yellow ">dark-yellow</span>
	<span class="coos-dark-grey ">dark-grey</span>
	<span class="coos-soft-red">soft-red</span>
	<span class="coos-soft-green ">soft-green</span>
	<span class="coos-soft-blue ">soft-blue</span>
	<span class="coos-soft-yellow ">soft-yellow</span>
	<span class="coos-soft-grey ">soft-grey</span>
</div>
<pre class="doc-code " id="doc-base-color-code">
</pre>

<script type="text/javascript">
	(function() {
		var code = '';
		code += '<div class="coos-*">red</div>\n';
		code += '如：\n';
		code += '<span class="coos-red">red</span>\n';
		code += '或：\n';
		code += '<div class="color-*">red</div>\n';
		code += '如：\n';
		code += '<span class="color-red">red</span>\n';
		$("#doc-base-color-code").text(code);
		$("#doc-base-color-code").snippet('html', codeConfig);
	})();
</script>
