<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<h2 class="doc-part-header" id="doc-base-js-tool">基础工具函数</h2>
<pre class="doc-code " id="doc-base-js-tool-code">
//获取当前根URL
coos.getRootPath();

//判断是否为空  （null或者""）
coos.isEmpty(arg);

//判断是否是PC
coos.isPC();

//判断是否是字符串
coos.isString(arg);

//判断是否是数字
coos.isNumber(arg);

//判断是否是布尔
coos.isBoolean(arg);

//判断是否是整数
coos.isInteger(arg);

//判断是否是集合
coos.isArray(arg);

//判断是否是对象
coos.isObject(arg);

//判断是否是函数
coos.isFunction(arg);

//判断是否是手机号
coos.isPhone(arg);

//
coos.isArray(arg);

//判断是否是电话
coos.isTel(arg);

//判断是否是身份证
coos.isIDCard(arg);

//是否是链接
coos.isUrl(arg);

//判断是否是邮箱
coos.isMailbox(arg);

//判断是否是时间
coos.isTime(arg);

//判断是否是日期
coos.isDate(arg);

//判断是否是日期时间
coos.isDatetime(arg);

//获取当前时间
coos.getNowTime();

//获取当前日期
coos.getNowDate();

//获取当前日期时间
coos.getNowDatetime();

//元素是否可见
coos.isVisible(arg);

//获取当前页面不重复的字符串
coos.getNumber();
</pre>

<script type="text/javascript">
	(function() {
		$("#doc-base-js-tool-code").snippet('javascript', codeConfig);
	})();
</script>
