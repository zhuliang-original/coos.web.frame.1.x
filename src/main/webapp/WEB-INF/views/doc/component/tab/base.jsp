<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-tab-base">基础</h2>
<div class="doc-view">
	<div id="doc-tab-base-view" class=" coos-row mgb-10">
<div class="coos-tab">
	<ul class="coos-tab-buttons">
		<li coos-target=".doc-tab-base-span-1" class="active"><a>标签1</a></li>
		<li coos-target=".doc-tab-base-span-2"><a>标签2</a></li>
		<li coos-target=".doc-tab-base-span-3"><a>标签3</a></li>
	</ul>

	<div class="coos-tab-spans" >
		<div class="doc-tab-base-span-1 coos-tab-span">
			标签页1<br/>标签页1<br/>标签页1<br/>标签页1<br/>
		</div>
		<div class="doc-tab-base-span-2 coos-tab-span">
			标签页2<br/>标签页2
		</div>
		<div class="doc-tab-base-span-3 coos-tab-span">
			标签页3<br/>标签页3<br/>标签页3<br/>
		</div>
	</div>
</div>
	</div>
</div>
<pre class="doc-code " id="doc-tab-base-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-tab-base-view').html();
		$("#doc-tab-base-code").text(code);
		$("#doc-tab-base-code").snippet('html', codeConfig);
	})();
</script>
