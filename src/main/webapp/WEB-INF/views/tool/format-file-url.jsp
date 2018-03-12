<%@ page trimDirectiveWhitespaces="true"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/WEB-INF/views/core/base/base.jsp"%>
<c:if test="${url == nulll || url == '' }">
</c:if>
<c:if test="${url != nulll && url != '' }">
	<c:if test="${fn:indexOf(url, 'http')!=0}">
	</c:if>
</c:if>