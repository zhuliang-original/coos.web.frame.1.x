<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="doc-chapter">
	<h1 class="doc-chapter-header" id="doc-form-input">表单元素组件</h1>

	<pre class="doc-code " id="doc-form-input-code">
	</pre>
	<script type="text/javascript">
		(function() {
			var code = '';
			code += '<!-- 输入框组件 插件会自动渲染定义的输入类型 -->\n';
			code += '<!-- 如果是动态追加元素，追加元素完成后添加以下js代码 -->\n';
			code += '< script type="text/javascript">\n';
			code += '\tcoos.input.init();\n';
			code += '</ script>\n';

			$("#doc-form-input-code").text(code);
			$("#doc-form-input-code").snippet('html', codeConfig);
		})();
	</script>
	<div class="doc-part">
		<jsp:include page="form.input/group.jsp" />
		<jsp:include page="form.input/select.jsp" />
		<jsp:include page="form.input/multi.select.jsp" />
		<jsp:include page="form.input/relation.select.jsp" />
		<jsp:include page="form.input/date.jsp" />
		<jsp:include page="form.input/color.jsp" />
		<jsp:include page="form.input/tag.jsp" />
		<jsp:include page="form.input/switch.jsp" />
		<jsp:include page="form.input/file.jsp" />
	</div>
</div>
