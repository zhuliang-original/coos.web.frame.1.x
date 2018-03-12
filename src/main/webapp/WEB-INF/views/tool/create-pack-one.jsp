<%@ page trimDirectiveWhitespaces="true"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%>
<div class="coos-pack-one ${pack.add_class } ">
	<div class="coos-pack-one-box">

		<c:if test="${pack.content != null }">
			<c:set var="pack_content" value="${pack.content }" />
			<%@ include file="pack/pack-1.jsp"%>
		</c:if>
		<c:if test="${pack.over_hide_content != null}">
			<c:set var="pack_content" value="${pack.over_hide_content }" />
			<c:set var="pack_content_add_class" value="coos-hover-hide" />
			<%@ include file="pack/pack-1.jsp"%>
			<c:set var="pack_content_add_class" />
		</c:if>
		<c:if test="${pack.over_show_content != null}">
			<c:set var="pack_content" value="${pack.over_show_content }" />
			<c:set var="pack_content_add_class" value="coos-hover-show" />
			<%@ include file="pack/pack-1.jsp"%>
			<c:set var="pack_content_add_class" />
		</c:if>
	</div>
	<c:if test="${pack.title!=null && pack.title != ''}">
		<div class="pack-title">${pack.title }</div>
	</c:if>
</div>