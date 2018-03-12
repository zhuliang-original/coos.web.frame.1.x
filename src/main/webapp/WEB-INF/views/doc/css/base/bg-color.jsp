<%@ page trimDirectiveWhitespaces="true"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/views/base/base.jsp"%>

<h2 class="doc-part-header" id="doc-base-bg-color">背景颜色</h2>
<div class="doc-view" id="doc-base-bg-color-view">
<div class="coos-row">
<span class="coos-bg-red coos-white">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-bg-red-${status.index} coos-white">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-bg-green coos-white">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-bg-green-${status.index} coos-white">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-bg-yellow coos-white">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-bg-yellow-${status.index} coos-white">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-bg-blue coos-white">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-bg-blue-${status.index} coos-white">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-bg-white">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-bg-white-${status.index}">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-bg-grey coos-white">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-bg-grey-${status.index} coos-white">高级配色</span>
</c:forEach>
</div>
<div class="coos-row">
<span class="coos-bg-black coos-white">基础配色</span>
<c:forEach begin="1" end="5" step="1" varStatus="status">
	<span class="coos-bg-black-${status.index} coos-white">高级配色</span>
</c:forEach>
</div>
</div>
<pre class="doc-code " id="doc-base-bg-color-code">
</pre>


<script type="text/javascript">
	(function() {
		var code = '<span class="coos-bg-red">基础配色</span>\n';
		code+='<span class="coos-bg-red-1">高级配色</span>\n';
		code+='<span class="coos-bg-red-2">高级配色</span>\n';
		code+='<span class="coos-bg-red-3">高级配色</span>\n';
		code+='<span class="coos-bg-red-4">高级配色</span>\n';
		code+='<span class="coos-bg-red-5">高级配色</span>\n';
		$("#doc-base-bg-color-code").text(code);
		$("#doc-base-bg-color-code").snippet('html', codeConfig);
	})();
</script>
