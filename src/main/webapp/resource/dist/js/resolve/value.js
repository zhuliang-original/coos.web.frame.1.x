(function() {
	var ResolveValue = function(config) {
		this.config = config;
		this.init();
	};

	ResolveValue.prototype.init = function() {

	};

	ResolveValue.prototype.getResult = function(config) {
		config = config || {};
		var value = config.value || this.config.value;
		this.dataConfig = config.data || this.config.data || {};
		var result = value;
		if (co.isEmpty(value)) {
		} else {
			var this_ = this;
			var reg = /(#{)[^\\}]+(})/g;
			var array = result.match(reg);
			$(array).each(function(index, matchParam) {
				var matchRule = matchParam.replace("#{", "");
				matchRule = matchRule.replace("}", "");
				var resolverResult = this_.resolverResult(matchRule);
				if (resolverResult == null) {
					resolverResult = "";
				}
				result = result.replace(matchParam, resolverResult);
			});

		}
		return result;
	};
	ResolveValue.prototype.resolverResult = function(matchRule) {
		if (co.isEmpty(matchRule)) {
			return null;
		}
		if (matchRule.toLowerCase().indexOf('now_date'.toLowerCase()) == 0) {
			return this.resolverNowDate(matchRule);
		}
		var toNumber = false;
		if (matchRule.indexOf('toNumber(') == 0) {
			matchRule = matchRule.replace('toNumber(', '');
			matchRule = matchRule.replace(')', '');
			toNumber = true;
		}

		var dataConfig = this.dataConfig;
		var dataMapStr = "";
		for ( var name in dataConfig) {
			dataMapStr += 'var ' + name + ' = dataConfig.' + name + ';';
			// console.log(dataMapStr)
		}
		var funstr = "function(){" + dataMapStr + " return " + matchRule + "; }";
		var value = eval('(0,' + funstr + ')')();
		if (!co.isEmpty(value) && toNumber) {
			value = ('' + value).replace(/[^\d\.]/g, '');
		}
		return value;

	};

	ResolveValue.prototype.resolverNowDate = function(rule) {
		if (co.isEmpty(rule)) {
			return null;
		}
		var format = "yyyy-MM-dd HH:mm:ss";
		var first = rule.indexOf("(");
		var end = rule.indexOf(")");

		if (first > 0 && end > first) {
			format = rule.substring(first + 1, end);
		}
		var date = new Date();

		return coos.date.format(date, format.trim())
	};

	co.resolve.value = function(config) {
		return new ResolveValue(config);
	};

	// var r = co.resolve.value({
	// value :
	// "#{data.name}提交：#{data.count1+data.count2+data.count3}份文件，提交时间：#{now_date(yyyy-MM-dd)} 9:00",
	// data : {
	// data : {
	// name : "张三",
	// count1 : 10,
	// count2 : 2,
	// count3 : 5
	// }
	// }
	// });
	// console.log(r.getResult());
})();