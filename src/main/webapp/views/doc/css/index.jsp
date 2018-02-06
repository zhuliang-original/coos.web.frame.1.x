<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="doc-guide">
	<div class="doc-container">
		<h1>COOS Frame 基础CSS</h1>
		<p class="doc-lead">基本样式包括，颜色，按钮，字体，输入框等</p>
	</div>

</div>
<div class="doc-container">
	<div class="coos-col-12">
		<div class=" coos-col-3 display-xs-none">
			<jsp:include page="../doc.nav.jsp" />
		</div>
		<div class="doc-content coos-col-9 coos-col-xs-12 coos-offset-xs-0">
			<jsp:include page="base.jsp" />
			<jsp:include page="button.jsp" />
			<jsp:include page="input.jsp" />
			<div style="height: 200px;"></div>
		</div>
	</div>
</div>
