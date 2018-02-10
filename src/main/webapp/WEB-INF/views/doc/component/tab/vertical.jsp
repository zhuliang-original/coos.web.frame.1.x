<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-tab-vertical">竖着排列</h2>
<div class="doc-view">
	<div id="doc-tab-vertical-view" class=" coos-row mgb-10">
<div class="coos-tab coos-tab-vertical">
	<div class="coos-tab-one">
		<div coos-target=".doc-tab-vertical-span-1" class="coos-tab-button active"><a>标签1</a></div>
		<div class="doc-tab-vertical-span-1 coos-tab-span">
			标签页1<br/>标签页1<br/>标签页1<br/>标签页1<br/>
		</div>
	</div>
	<div class="coos-tab-one">
		<div coos-target=".doc-tab-vertical-span-2" class="coos-tab-button"><a>标签2</a></div>
		<div class="doc-tab-vertical-span-2 coos-tab-span">
			标签页2<br/>标签页2<br/>标签页2<br/>标签页2<br/>
		</div>
	</div>
	<div class="coos-tab-one">
		<div coos-target=".doc-tab-vertical-span-3" class="coos-tab-button"><a>标签3</a></div>
		<div class="doc-tab-vertical-span-3 coos-tab-span">
			标签页3<br/>标签页3<br/>标签页3<br/>标签页3<br/>
		</div>
	</div>
</div>
	</div>
</div>
<pre class="doc-code " id="doc-tab-vertical-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-tab-vertical-view').html();
		$("#doc-tab-vertical-code").text(code);
		$("#doc-tab-vertical-code").snippet('html', codeConfig);
	})();
</script>
