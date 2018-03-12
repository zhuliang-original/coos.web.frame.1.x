<%@ page trimDirectiveWhitespaces="true"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/views/base/base.jsp"%>

<h2 class="doc-part-header" id="doc-base-color">字体颜色</h2>
<div class="doc-view" id="doc-base-color-view">
<div class="coos-row">
<span class="coos-red">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-red-${status.index}">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-green">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-green-${status.index}">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-yellow">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-yellow-${status.index}">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-blue">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-blue-${status.index}">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-white coos-bg-black">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-white-${status.index} coos-bg-black">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-grey">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-grey-${status.index}">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-black">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-black-${status.index}">高级配色</span>
</c:forEach>
</div>
</div>
<pre class="doc-code " id="doc-base-color-code">
</pre>

<script type="text/javascript">
	(function() {
		var code = '<span class="coos-red">基础配色</span>\n';
		code+='<span class="coos-red-1">高级配色</span>\n';
		code+='<span class="coos-red-2">高级配色</span>\n';
		code+='<span class="coos-red-3">高级配色</span>\n';
		code+='<span class="coos-red-4">高级配色</span>\n';
		code+='<span class="coos-red-5">高级配色</span>\n';
		$("#doc-base-color-code").text(code);
		$("#doc-base-color-code").snippet('html', codeConfig);
	})();
</script>
