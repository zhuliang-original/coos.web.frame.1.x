<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-form-select-relation">级联下拉框</h2>
<div class="doc-view">
	<div id="doc-form-select-relation-view" class="   coos-row mgb-10">
<select label="省份" name="s" class="input-rule-group input-rule-select">
	<option value="">请选择</option>
	<option value="001">北京</option>
	<option value="002">江苏</option>
	<option value="003">河北</option>
</select>
<select label="市" name="c" class="input-rule-group input-rule-select" rule-relation="[name='s']" need-addon="true">
	<option value="">请选择</option>
	<option value="00101" relationvalue="001">北京-01</option>
	<option value="00102" relationvalue="001">北京-02</option>
	<option value="00201" relationvalue="002">江苏-01</option>
	<option value="00202" relationvalue="002">江苏-02</option>
	<option value="00203" relationvalue="002">江苏-03</option>
	<option value="00301" relationvalue="003">河北-01</option>
	<option value="00302" relationvalue="003">河北-02</option>
</select>
<input label="省份" name="s1" class="input-rule-group input-rule-select" need-addon="true" placeholder="输入下拉框" />
<select class="option-select ">
	<option value="">请选择</option>
	<option value="001">北京</option>
	<option value="002">江苏</option>
	<option value="003">河北</option>
</select>
<input label="市" name="c1" class="input-rule-group input-rule-select" rule-relation="[name='s1']" need-addon="true" placeholder="输入下拉框" />
<select class="option-select ">
	<option value="">请选择</option>
	<option value="00101" relationvalue="001">北京-01</option>
	<option value="00102" relationvalue="001">北京-02</option>
	<option value="00103" relationvalue="001">北京-03</option>
	<option value="00104" relationvalue="001">北京-04</option>
	<option value="00201" relationvalue="002">江苏-01</option>
	<option value="00202" relationvalue="002">江苏-02</option>
	<option value="00203" relationvalue="002">江苏-03</option>
	<option value="00301" relationvalue="003">河北-01</option>
	<option value="00302" relationvalue="003">河北-02</option>
	<option value="00303" relationvalue="003">河北-03</option>
	<option value="00304" relationvalue="003">河北-04</option>
</select>
	</div>
</div>
<pre class="doc-code " id="doc-form-select-relation-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-form-select-relation-view').html();
		$("#doc-form-select-relation-code").text(code);
		$("#doc-form-select-relation-code").snippet('html', codeConfig);
	})();
</script>

