<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-loader-base">基础加载组件</h2>
<div class="doc-view">
	<div id="doc-loader-base-view" class=" coos-row mgb-10">
<div class="loader-base-start-btn coos-btn coos-yellow coos-bd-yellow">点击开始</div>
<script type="text/javascript">
	(function() {
		var config = {};
		config.title = "加载组件模型";
		config.models = [{
			title:'加载模型1',
			load: function(callback){
				//这里是加载代码
				
				//必须调用回调 否则无法触发下一步
				window.setTimeout(function(){
					callback && callback();
				}, 500);
			}
		},{
			title:'加载模型2',
			load: function(callback){
				//这里是加载代码
				
				//必须调用回调 否则无法触发下一步
				window.setTimeout(function(){
					callback && callback();
				}, 100);
			}
		},{
			title:'加载模型3',
			load: function(callback){
				//这里是加载代码
				
				//必须调用回调 否则无法触发下一步
				window.setTimeout(function(){
					callback && callback();
				}, 1000);
			}
		}];
		config.success = function(){
			coos.box.info('加载完成');
		};
		var loader = coos.component.loader(config);
		$('.loader-base-start-btn').click(function(){
			loader.start();
		});
	})();
</script>
	</div>
</div>
<pre class="doc-code " id="doc-loader-base-code">
</pre>
<script type="text/javascript">
	(function() {
		var code = $('#doc-loader-base-view').html();
		$("#doc-loader-base-code").text(code);
		$("#doc-loader-base-code").snippet('javascript', codeConfig);
	})();
</script>