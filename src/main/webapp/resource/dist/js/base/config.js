(function() {
	co.config = new Object();
	co.config = {
	};

	co.config.result = {
		errcode : "data.errcode",
		errmsg : "data.errmsg",
		result : "data.result",
		successcode : 0
	};
	co.config.action = {
		toIndex : "index/toIndex.do",
		toLogin : "login/toLogin.do",
		doLogin : "login/doLogin.do",
		doUpload : "core/file/file.upload",
		uploadProgress : "core/file/file.progress",
		coreSocket : "core/websocket",
		error : {
			404 : "error/404.do",
			500 : "error/500.do",
			toNoAccess : "error/toNoAccess.do",
			toNotOnline : "error/toNotOnline.do"
		}
	};
	co.config.label = {
		define : "确定",
		cancel : "取消",
		title : "标题",
		alertBoxTitle : "提示信息",
		confirmBoxTitle : "确认信息",
		search : "搜索",
		searchInputPlaceholder : "请输入搜索内容",
		confirmChecked : "是否选中",
		noMatchingData : "暂无匹配数据"
	};
	co.config.error = {
		// 全局错误
		connectionTimedOut : {
			code : 10001,
			info : "链接超时",
			show : "链接超时，请检查网络环境！"
		},
		noNetwork : {
			code : 10002,
			info : "无网络",
			show : "无法连接服务器，请检查网络环境！"
		},

		// 表单元素验证错误
		isNull : {
			code : 30001,
			info : "输入值为空",
			show : "$label值不能为空！"
		},
		patternMismatch : {
			code : 30002,
			info : "输入值格式不匹配",
			show : "请输入正确$label格式！"
		},
		isLong : {
			code : 30003,
			info : "输入值太长",
			show : "$label的字符数不能超过$maxlength个字符！"
		},
		isShort : {
			code : 30004,
			info : "输入值太短",
			show : "$label的字符数不能少于$minlength个字符！"
		},
		isMin : {
			code : 30005,
			info : "输入值太小",
			show : "$label不能小于$min！"
		},
		isMax : {
			code : 30006,
			info : "输入值太大",
			show : "$label不能大于$max！"
		},
		isNotUrl : {
			code : 30007,
			info : "输入值不是有效的链接",
			show : "$label请输入正确的链接！"
		},
		isNotMail : {
			code : 30008,
			info : "输入值不是有效的邮箱",
			show : "$label请输入正确的邮箱！"
		},
		isNotNumber : {
			code : 30009,
			info : "输入值不是有效的数字",
			show : "$label请输入正确的数字！"
		},
		isNotInteger : {
			code : 30010,
			info : "输入值不是有效的整数",
			show : "$label请输入正确的整数！"
		},
		isNotDate : {
			code : 30011,
			info : "输入值不是有效的日期",
			show : "$label请输入正确的日期！"
		},
		isNotDatetime : {
			code : 30012,
			info : "输入值不是有效的日期时间",
			show : "$label请输入正确的日期时间！"
		},
		isNotPhone : {
			code : 30013,
			info : "输入值不是有效的手机号",
			show : "$label请输入正确的手机号码！"
		},
		isNotIDCard : {
			code : 30014,
			info : "输入值不是有效的身份证",
			show : "$label请输入正确的身份证！"
		},
		isNotTel : {
			code : 30015,
			info : "输入值不是有效的座机",
			show : "$label请输入正确的座机号码！"
		},
		isNotTime : {
			code : 30016,
			info : "输入值不是有效的时间",
			show : "$label请输入正确的时间！"
		},
		isNotImageFile : {
			code : 30017,
			info : "无效的图片文件",
			show : "$label请上传正确的图片文件！"
		},
		isNotAudioFile : {
			code : 30018,
			info : "无效的音频文件",
			show : "$label请上传正确的音频文件！"
		},
		isNotVideoFile : {
			code : 30019,
			info : "无效的视频文件",
			show : "$label请上传正确的视频文件！"
		},
		isNotOtherFile : {
			code : 30020,
			info : "请上传格式为$filetype类型的文件",
			show : "$label请上传正确的视频文件！"
		},
		isToLongFile : {
			code : 30021,
			info : "文件不能大于$maxfilelengthM",
			show : "$label文件不能大于$maxfilelengthM"
		},
		notEq : {
			code : 300022,
			info : "输入值不等于$eq",
			show : "$label必须等于$eq！"
		},
		notGt : {
			code : 300023,
			info : "输入值必须大于$gt",
			show : "$label不能小于等于$gt！"
		},
		notGte : {
			code : 300023,
			info : "输入值必须大于等于$gte",
			show : "$label不能小于$gte！"
		},
		notLt : {
			code : 300023,
			info : "输入值必须小于$lt",
			show : "$label不能大于等于$lt！"
		},
		notLte : {
			code : 300023,
			info : "输入值必须小于等于$lte",
			show : "$label不能大于$lte！"
		}
	};

	co.config.server = {
		fileServerUrl : basePath + "upload/file"
	};

	co.config.rules = {
		time : /^(\d{2})[:时 ]?(\d{2})[:分 ]?$/,
		date : /^(\d{4})[-\/年 ]?(\d{2})[-\/月 ]?(\d{2})[日]?$/,
		datetime : /^(\d{4})[-\/年 ]?(\d{2})[-\/月 ]?(\d{2})[ |日]?(\d{2})[:时 ]?(\d{2})[:分 ]?$/,
		mailbox : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		url : /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=% :\/~+#]*[\w\-\@?^=% \/~+#])?$/,
		idcard : /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
		phone : /^1[3|4|5|7|8]\d{9}$/,
		tel : /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
	};
})();