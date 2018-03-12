<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<c:set var="fileServerUrl" value="${CORE_CONFIG.server.file_server_url }" />
<c:set var="basePath" value="${pageContext.request.contextPath}" />
<c:set var="coos_css_path" value="${basePath}/resource/coos/merge/coos.css" />
<c:set var="coos_less_path" value="${basePath}/resource/coos/merge/coos.less" />
<c:set var="coos_js_path" value="${basePath}/resource/coos/merge/coos.js" />
<c:set var="coos_frame_css_path" value="${basePath}/resource/coos/merge/coos.frame.css" />
<c:set var="coos_frame_less_path" value="${basePath}/resource/coos/merge/coos.frame.less" />
<c:set var="coos_frame_js_path" value="${basePath}/resource/coos/merge/coos.frame.js" />
<c:set var="coos_page_css_path" value="${basePath}/resource/coos/merge/coos.page.css" />
<c:set var="coos_page_less_path" value="${basePath}/resource/coos/merge/coos.page.less" />
<c:set var="coos_page_js_path" value="${basePath}/resource/coos/merge/coos.page.js" />