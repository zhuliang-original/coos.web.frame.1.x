<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="doc-chapter">
	<h1 class="doc-chapter-header" id="doc-form-validate">表单验证</h1>

	<pre class="doc-code " id="doc-form-validate-code">
	</pre>
	<script type="text/javascript">
		(function() {
			var code = '';
			code += '<!-- JS验证表单 -->\n';
			code += '< script type="text/javascript">\n';
			code += '\tcoos.form.validate($form);\n';
			code += '\tcoos.form.input.validate($input);\n';
			code += '</ script>\n';

			$("#doc-form-validate-code").text(code);
			$("#doc-form-validate-code").snippet('html', codeConfig);
		})();
	</script>
	<div class="doc-part">
		<jsp:include page="form.validate/no.jsp" />
		<jsp:include page="form.validate/not-null.jsp" />
		<jsp:include page="form.validate/length.jsp" />
		<jsp:include page="form.validate/number.jsp" />
		<jsp:include page="form.validate/integer.jsp" />
		<jsp:include page="form.validate/phone.jsp" />
		<jsp:include page="form.validate/mailbox.jsp" />
		<jsp:include page="form.validate/time.jsp" />
		<jsp:include page="form.validate/date.jsp" />
		<jsp:include page="form.validate/datetime.jsp" />
		<jsp:include page="form.validate/idcard.jsp" />
		<jsp:include page="form.validate/url.jsp" />
		<jsp:include page="form.validate/chinese.jsp" />
		<jsp:include page="form.validate/chinese-or-english.jsp" />
		<jsp:include page="form.validate/english.jsp" />
		<jsp:include page="form.validate/english-or-number.jsp" />
		<jsp:include page="form.validate/english-or-number-or-underline.jsp" />
		<jsp:include page="form.validate/english-or-number-or-underline-or-point.jsp" />
		<jsp:include page="form.validate/english-or-number-or-underline-or-slash.jsp" />
		<jsp:include page="form.validate/nosymbol.jsp" />
		<jsp:include page="form.validate/pattern.jsp" />

	</div>
</div>
