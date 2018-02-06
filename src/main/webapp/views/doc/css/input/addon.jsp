<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-input-addon">带图标的输入框</h2>
<div class="doc-view">
	<div class=" coos-row mgb-10">
		<div class="coos-input  ">
			<input type="text">
			<span class="coos-input-addon coos-input-addon-after coos-pointer">
				<i class="fa fa-search"></i>
			</span>
		</div>
	</div>
	<div class=" coos-row mgb-10">
		<div class="coos-input coos-col-12">
			<select>
				<option>2</option>
				<option>3</option>
				<option>54</option>
			</select>
			<span class="coos-input-addon coos-input-addon-after coos-pointer">
				<i class="fa fa-search"></i>
			</span>
		</div>
	</div>
	<div class=" coos-row mgb-10">
		<div class="coos-input coos-col-12">
			<span class="coos-input-addon coos-input-addon-before coos-pointer">
				<i class="fa fa-user"></i>
			</span>
			<input type="text">
		</div>
	</div>
	<div class=" coos-row mgb-10">
		<div class="coos-input coos-col-12">
			<span class="coos-input-addon coos-input-addon-before coos-pointer">
				<i class="fa fa-user"></i>
			</span>
			<input type="text">
			<span class="coos-input-addon coos-input-addon-after coos-pointer">
				<i class="fa fa-search"></i>
			</span>
		</div>
	</div>
</div>
<pre class="doc-code " id="doc-input-addon-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = '';

		code += '<div class="coos-input  ">\n';
		code += '\t<span class="coos-input-addon coos-input-addon-before coos-pointer">\n';
		code += '\t\t<i class="fa fa-search"></i>\n';
		code += '\t</span>\n';
		code += '\t<input type="text">\n';
		code += '\t<span class="coos-input-addon coos-input-addon-after coos-pointer">\n';
		code += '\t\t<i class="fa fa-search"></i>\n';
		code += '\t</span>\n';
		code += '</div>\n';
		$("#doc-input-addon-code").text(code);
		$("#doc-input-addon-code").snippet('html', codeConfig);
	})();
</script>

