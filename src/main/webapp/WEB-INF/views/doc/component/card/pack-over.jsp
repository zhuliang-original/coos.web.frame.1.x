<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%><%@ include file="/WEB-INF/views/base/base.jsp"%>

<h2 class="doc-part-header" id="doc-card-pack-over">悬浮切换卡片</h2>
<div class="doc-view">
	<div id="doc-card-pack-over-view" class=" coos-row mgb-10">
<jsp:useBean id="pack" class="java.util.HashMap" scope="page"/>
<jsp:useBean id="over_hide_content" class="java.util.HashMap" scope="page"/>
<jsp:useBean id="over_show_content" class="java.util.HashMap" scope="page"/>
	<c:set target="${pack }"  property="add_class" value="coos-col-3" />
	<c:set target="${pack }"  property="over_hide_content" value="${over_hide_content }" />
	<c:set target="${over_hide_content }"  property="label" value="标签" />
	<c:set target="${over_hide_content }"  property="image" value="/resource/coos/images/favicon.png" />
	<c:set target="${pack }"  property="over_show_content" value="${over_show_content }" />
	<c:set target="${over_show_content }"  property="text" value="这里是文案" />
	<c:set target="${over_show_content }"  property="remark" value="这里是备注" />
	<c:set target="${over_show_content }"  property="title" value="这里是标题" />
	<c:set target="${over_show_content }"  property="buttons">
		<div class="coos-yellow coos-bd-yellow  coos-btn coos-btn-xs">修改</div>
		<div class="coos-red coos-bd-red  coos-btn coos-btn-xs ">停用</div>
		<div class="coos-green coos-bd-green  coos-btn coos-btn-xs ">公开</div>
		<div class="coos-red coos-bd-red  coos-btn coos-btn-xs ">删除</div>
	</c:set>
<%@ include file="/WEB-INF/views/tool/create-pack-one.jsp"%>


<c:set var="pack_type" value="1" />
<c:set var="pack_text" value="这里是文案" />
	</div>
</div>
<pre class="doc-code " id="doc-card-pack-over-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-card-pack-over-view').html();
		$("#doc-card-pack-over-code").text(code);
		$("#doc-card-pack-over-code").snippet('html', codeConfig);
	})();
</script>
