<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ page import="java.util.*"%>
<div class="coos-text-icon  ${pack_content_add_class }">
	<div class="coos-text-icon-box">
		<div class="coos-middle-box">
			<div class="coos-middle-box-conent">
				<c:if test="${pack_content.image!=null }">
					<div class="pack-image element-rule-image" path="${pack_content.image }" not-find-path="${pack_content.not_find_image }" no-path="${pack_content.no_image }" use-file-server-url="${pack_content.use_file_server }"></div>
				</c:if>
				<c:if test="${pack_content.text!=null }">
					<div class="pack-text">${pack_content.text }</div>
				</c:if>
				<c:if test="${pack_content.remark!=null }">
					<div class="pack-remark">${pack_content.remark }</div>
				</c:if>
			</div>
		</div>
	</div>
	<c:if test="${pack_content.label!=null }">
		<div class="pack-label">${pack_content.label }</div>
	</c:if>
	<c:if test="${pack_content.buttons!=null }">
		<div class="pack-button-group">${pack_content.buttons }</div>
	</c:if>
</div>