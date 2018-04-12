// 是否包含字符串
String.prototype.has = function(arg1) {
	var value = this.valueOf();
	if (co.isEmpty(value) || co.isEmpty(arg1)) {
		return false;
	}
	if (value.indexOf(arg1) != -1) {
		return true;
	}
	return false;
};

String.prototype.replaceAll = function(arg1, arg2) {
	var value = this.valueOf();
	if (co.isEmpty(value) || co.isEmpty(arg1)) {
		return value;
	}
	return ("" + value).replace(eval(arg1 + "g"), arg2);
};
