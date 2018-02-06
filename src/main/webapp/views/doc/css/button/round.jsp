<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-button-round">圆形按钮</h2>
<div class="doc-view">
	<div class=" coos-row">
		<a class="coos-btn coos-btn-round coos-btn-xs coos-bg-green ">
			<i class="fa fa-user "></i>
		</a>
		<a class="coos-btn coos-btn-round coos-btn-sm coos-bg-blue ">
			<i class="fa fa-user "></i>
		</a>
		<a class="coos-btn coos-btn-round coos-bg-red ">
			<i class="fa fa-user "></i>
		</a>
		<a class="coos-btn coos-btn-round coos-btn-lg coos-bg-yellow ">
			<i class="fa fa-user "></i>
		</a>
	</div>
	<div class=" coos-row">
		<a class="coos-btn coos-btn-round coos-btn-lg coos-blue coos-bd-blue ">
			<i class="fa fa-user "></i>
		</a>
		<a class="coos-btn coos-btn-round coos-red coos-bd-red ">
			<i class="fa fa-user "></i>
		</a>
		<a class="coos-btn coos-btn-round coos-btn-sm coos-yellow coos-bd-yellow ">
			<i class="fa fa-user "></i>
		</a>
		<a class="coos-btn coos-btn-round coos-btn-xs coos-green coos-bd-green ">
			<i class="fa fa-user "></i>
		</a>

	</div>
	<div class="coos-col-12"></div>
</div>
<pre class="doc-code " id="doc-button-round-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = '';
		code += '<a class="coos-btn coos-btn-round coos-btn-lg coos-bg-blue ">\n';
		code += '\t<i class="fa fa-user "></i>\n';
		code += '</a>\n';
		code += '<a class="coos-btn coos-btn-round coos-btn-lg coos-blue coos-bd-blue">\n';
		code += '\t<i class="fa fa-user "></i>\n';
		code += '</a>\n';
		$("#doc-button-round-code").text(code);
		$("#doc-button-round-code").snippet('html', codeConfig);
	})();
</script>

