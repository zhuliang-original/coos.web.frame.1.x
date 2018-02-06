<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-form-file">文件</h2>
<div class="doc-view">
	<div id="doc-form-file-view" class=" coos-row mgb-10">
<div label="上传" class="input-rule-group">
	<input class=" " name="file_" placeholder="文件" />
	<div class="mgt-5 coos-btn coos-green coos-bd-green button-rule-upload" input="[name='file_']">点击上传</div>
</div>
<input label="文件" class="input-rule-group input-rule-file" need-addon="true" placeholder="文件" />
<input label="图片" class="input-rule-group input-rule-file-image" need-addon="true" placeholder="图片" />
<input label="附件" class="input-rule-group input-rule-file-annex" need-addon="true" placeholder="附件" />
<input label="视频" class="input-rule-group input-rule-file-video" need-addon="true" placeholder="视频" />
<input label="音频" class="input-rule-group input-rule-file-audio" need-addon="true" placeholder="音频" />
	</div>
</div>
<pre class="doc-code " id="doc-form-file-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-form-file-view').html();
		$("#doc-form-file-code").text(code);
		$("#doc-form-file-code").snippet('html', codeConfig);
	})();
</script>

