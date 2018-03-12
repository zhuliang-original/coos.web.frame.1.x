<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-tab-no-bd">无边框</h2>
<div class="doc-view">
	<div id="doc-tab-no-bd-view" class=" coos-row mgb-10">
<div class="coos-tab coos-tab-no-bd">
	<ul class="coos-tab-buttons">
		<li coos-target=".doc-tab-no-bd-span-1" class="active"><a>标签1 </a></li>
		<li coos-target=".doc-tab-no-bd-span-2"><a>标签2 <span class="coos-flag">0</span></a></li>
		<li coos-target=".doc-tab-no-bd-span-3"><a>标签3</a></li>
	</ul>
	<div class="coos-tab-spans" >
		<div class="doc-tab-no-bd-span-1 coos-tab-span">
			标签页1<br/>标签页1<br/>标签页1<br/>标签页1<br/>
		</div>
		<div class="doc-tab-no-bd-span-2 coos-tab-span">
			标签页2<br/>标签页2
		</div>
		<div class="doc-tab-no-bd-span-3 coos-tab-span">
			标签页3<br/>标签页3<br/>标签页3<br/>
		</div>
	</div>
</div>
	</div>
</div>
<pre class="doc-code " id="doc-tab-no-bd-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-tab-no-bd-view').html();
		$("#doc-tab-no-bd-code").text(code);
		$("#doc-tab-no-bd-code").snippet('html', codeConfig);
	})();
</script>
