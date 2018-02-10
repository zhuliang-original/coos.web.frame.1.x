<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="doc-chapter">
	<h1 class="doc-chapter-header" id="doc-card">卡片组件</h1>

	<pre class="doc-code " id="doc-card-code">
	</pre>
	<script type="text/javascript">
		(function() {
			var code = '';
			code += '<!-- 调用以下代码会自动渲染元素组件 -->\n';
			code += '< script type="text/javascript">\n';
			code += '\tcoos.element.init();\n';
			code += '</ script>\n';

			$("#doc-card-code").text(code);
			$("#doc-card-code").snippet('html', codeConfig);
		})();
	</script>
	<div class="doc-part">
		<jsp:include page="base.jsp" />

	</div>
</div>
