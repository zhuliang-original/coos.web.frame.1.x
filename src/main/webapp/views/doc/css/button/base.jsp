<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-button-base">基础按钮</h2>
<div class="doc-view">
	<div class=" coos-row">
		<a class="coos-btn coos-btn-default">Default</a>
		<a class="coos-btn coos-bg-green coos-disabled">Green</a>
		<a class="coos-btn coos-bg-yellow coos-disabled">Yellow</a>
		<a class="coos-btn coos-bg-red">Red</a>
		<a class="coos-btn coos-bg-blue">Blue</a>
		<a class="coos-btn coos-bg-grey">Grey</a>
		<a class="coos-btn coos-bg-black">Black</a>
	</div>
	<div class=" coos-row mgt-10">
		<a class="coos-btn coos-bg-green coos-btn-xs">Green</a>
		<a class="coos-btn coos-bg-yellow coos-btn-sm">Yellow</a>
		<a class="coos-btn coos-bg-red coos-btn-md">Red</a>
		<a class="coos-btn coos-bg-blue coos-btn-lg">Blue</a>
	</div>
	<div class=" coos-row mgt-10">
		<a class="coos-btn coos-green coos-bd-green">Green</a>
		<a class="coos-btn coos-yellow coos-bd-yellow">Yellow</a>
		<a class="coos-btn coos-red coos-bd-red">Red</a>
		<a class="coos-btn coos-blue coos-bd-blue">Blue</a>
		<a class="coos-btn coos-grey coos-bd-grey">Grey</a>
		<a class="coos-btn coos-black coos-bd-black">Black</a>
	</div>
	<div class=" coos-row mgt-10">
		<a class="coos-btn coos-green">Green</a>
		<a class="coos-btn coos-yellow">Yellow</a>
		<a class="coos-btn coos-red">Red</a>
		<a class="coos-btn coos-blue">Blue</a>
		<a class="coos-btn coos-grey">Grey</a>
		<a class="coos-btn coos-black">Black</a>

	</div>
	<div class=" coos-row mgt-10">
		<a class="coos-btn coos-btn-link ">Link</a>
		<a class="coos-btn coos-btn-link coos-green">Green</a>
		<a class="coos-btn coos-btn-link coos-yellow">Yellow</a>
		<a class="coos-btn coos-btn-link coos-red">Red</a>
		<a class="coos-btn coos-btn-link coos-blue">Blue</a>
		<a class="coos-btn coos-btn-link coos-grey">Grey</a>
		<a class="coos-btn coos-btn-link coos-black">Black</a>
	</div>
	<div class=" coos-row mgt-10">
		<a class="coos-btn coos-bg-green coos-btn-block ">Block</a>
	</div>
	<div class=" coos-row mgt-10">
		<a class="coos-btn coos-yellow coos-bd-yellow coos-btn-block ">Block</a>
	</div>
	<div class=" coos-row mgt-10">
		<a class="coos-btn coos-bg-green">
			<i class="fa fa-user"> </i> User
		</a>
		<a class="coos-btn coos-bg-yellow">
			<i class="fa fa-user"> </i> User
		</a>
		<a class="coos-btn coos-green coos-bd-green">
			<i class="fa fa-user"> </i> User
		</a>
		<a class="coos-btn coos-yellow coos-bd-yellow">
			<i class="fa fa-user"> </i> User
		</a>
	</div>
	<div class=" coos-row mgt-10">
		<a class="coos-btn coos-bg-green">
			<i class="fa fa-user"> </i>
		</a>
		<a class="coos-btn coos-bg-yellow">
			<i class="fa fa-user"> </i>
		</a>
		<a class="coos-btn coos-green coos-bd-green">
			<i class="fa fa-user"> </i>
		</a>
		<a class="coos-btn coos-yellow coos-bd-yellow">
			<i class="fa fa-user"> </i>
		</a>
	</div>
</div>
<pre class="doc-code " id="doc-button-base-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = '';
		code += '<a class="coos-btn coos-btn-default">Default</a>\n';
		code += '<a class="coos-btn coos-bg-green">Green</a>\n';
		code += '<a class="coos-btn coos-green coos-bd-green">Green</a>\n';
		code += '<a class="coos-btn coos-green">Green</a>\n';
		code += '<a class="coos-btn coos-btn-link coos-green">Green</a>\n';
		$("#doc-button-base-code").text(code);
		$("#doc-button-base-code").snippet('html', codeConfig);
	})();
</script>

