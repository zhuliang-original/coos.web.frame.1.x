<%@ page trimDirectiveWhitespaces="true"%><%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%><%@ include file="/views/base/base.jsp"%>
<!DOCTYPE html >
<html>
<head>
<title>COOS</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0 , user-scalable=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="shortcut icon" type="image/x-icon" href="${basePath }/resource/core/images/favicon.png" media="screen" />

<link rel="stylesheet" type="text/css" href="${basePath }/resource/css/doc.guide.css" />

<script type="text/javascript">
	var basePath = '${basePath}';
	var fileServerUrl = '${fileServerUrl}';
</script>
<%@ include file="frame/csspath.jsp"%>
<%@ include file="frame/jspath.jsp"%>
<link rel="stylesheet" type="text/css" href="${basePath }/resource/plugins/jquery/snippet/jquery.snippet.css" media="screen" />
<script type="application/javascript" src="${basePath }/resource/plugins/jquery/snippet/jquery.snippet.js"></script>
<script type="application/javascript" src="${basePath }/resource/js/doc.guide.js"></script>
<script type="application/javascript" src="${basePath }/resource/js/index.main.js"></script>

</head>
<body>
	<div id="page-body-content">
		<jsp:include page="${THIS_PAGE_ID }" flush="false" />
	</div>
</body>
</html>