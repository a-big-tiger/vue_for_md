/**
 * @author zhang wei
 * @date 2020-12-24 10:04
 */
import moment from "moment";

moment.locale("zh-cn");
/**
 * @param data
 * @return {string}
 */
export const getDataType = function (data) {
	let typeString = "";
	try {
		typeString = Object.prototype.toString.call(data).slice(8, -1);
	} catch (e) {
		throw new Error(`get type of data failed ：${e.message}`);
	}
	//是数字 在判断下是不是NaN
	if (typeString === "Number" && isNaN(Number(data))) typeString = "NaN";
	return typeString;
};
export const isEmpty = function (data) {
	let result = false;
	//判断是否为空对象或空数组
	switch (getDataType(data)) {
		case "Null":
		case "Undefined":
			result = true;
			break;
		case "String":
			result = data === "";
			break;
		case "Object":
		case "Array":
			result = Object.keys(data).length === 0;
			break;
		case "Set":
		case "Map":
			result = data.size === 0;
			break;
		default:
			result = false;
			break;
	}
	return result;
};
export const isNotEmpty = function (s) {
	return !isEmpty(s);
};
export const copyNotEmpty = function (s) {
	let result = "";
	if (isNotEmpty(s)) {
		result = deepClone(s);
	}
	return result;
};
export const deepClone = function (arg) {
	let argClone = null;
	//进行深拷贝的不能为空，并且是对象或者是
	if (typeof arg === "object" && arg !== null) {
		//判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
		argClone = Array.isArray(arg) ? [] : {};
		for (let key in arg) {
			if (Object.prototype.hasOwnProperty.call(arg, key)) {
				if (arg[key] !== null && typeof arg[key] === "object") {
					argClone[key] = deepClone(arg[key]);
				} else {
					argClone[key] = arg[key];
				}
			}
		}
	} else {
		argClone = arg;
	}
	return argClone;
};

export const getRandomNo = function () {
	let str1 = new Date().getTime();
	let numArr = [Math.ceil(Math.random() * 9), Math.ceil(Math.random() * 9), Math.ceil(Math.random() * 9), Math.ceil(Math.random() * 9)];
	let i = numArr.length;
	while (i) {
		let j = Math.floor(Math.random() * i--);
		[numArr[j], numArr[i]] = [numArr[i], numArr[j]];
	}
	let str2 = numArr.join("");
	if (Math.random() > 0.5) {
		return str1 + str2;
	}
	return str2 + str1;
};
export const getTodayDate = (format = "YYYY-MM-DD") => {
	return moment().format(format);
};

/***
 * @param func 输入完成的回调函数
 * @param delay 延迟时间
 */
export const debounce = function (func, delay) {
	let timer;
	return function (...args) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
};

export const getArgumentsByUrl = () => {
	let url = window.location.href;
	let urlSplitList = url.split("?");
	let argString = "";
	let argumentObj = {
		frontUrl: url
	};
	if (urlSplitList.length > 1) {
		argString = urlSplitList[1];
	}
	if (isNotEmpty(argString)) {
		let argList = argString.split("&");
		argList.forEach(item => {
			let list = item.split("=");
			if (list.length > 1) {
				argumentObj[list[0]] = list[1];
			}
		});
	}
	return argumentObj;
};
/**
 * @author zhang wei
 * @date 2020-11-10 14:04
 * @description 传入出生日期计算对应年龄信息 精度到岁月天
 * @param born 出生日期字符串或者数字 格式YYYY-MM-DD或者YYYYMMDD 例：1993-01-01，19930101
 * @rules 14岁及以上舍去月，日保留岁，1岁及以上且不足14岁舍去日保留岁，月，1岁一下舍去岁，保留月，日
 * @return {{age_years: string, age_months: string, age_days: string, detailInfo: {age_years: string, age_months: string, age_days: string}}}
 * @detailInfo 完整的岁月天信息 包含岁月天，和 单一的岁月天汇总
 * @age_year 岁
 * @age_month 月
 * @age_day 日
 */
export const getAgeInfoByBirthday = (born) => {
	//返回值
	let result = {
		age_years: "",
		age_months: "",
		age_days: "",
		detailInfo: {
			age_years: "",
			age_months: "",
			age_days: ""
		}
	};
	let reg1 = /^(\d{4})(-)(\d{2})(-)(\d{2})$/;
	let reg2 = /^\d{8}$/;
	let bornStr = born.toString();
	//传入生日格式不正确
	if (!reg1.test(bornStr) && !reg2.test(bornStr)) {
		throw new Error("传入出生日期不符合规定格式！请传入,YYYY-MM-DD 或者YYYYMMDD,例如：1993-01-01或者19930101");
	}
	//传入格式符合YYYYMMDD 格式化成YYYY-MM-DD
	if (reg2.test(bornStr)) {
		let year = bornStr.substring(0, 4);
		let month = bornStr.substring(4, 6);
		let day = bornStr.substring(6);
		bornStr = [year, month, day].join("-");
	}
	//验证日期是否有效
	let valid = moment(bornStr).isValid();
	if (valid) {
		let bornMoment = moment(bornStr, "YYYY-MM-DD");//出生日期moment实例
		let nowMoment = moment();//当前日期moment实例
		let diff_year = nowMoment.diff(bornMoment, "years");//出生日期距离当前日期的年数差值
		let ageInfo = {
			age_years: 0,
			age_months: 0,
			age_days: 0,
			single_age_years: 0,
			single_age_months: 0,
			single_age_days: 0
		};//年龄信息
		ageInfo.single_age_years = diff_year;
		ageInfo.single_age_months = nowMoment.diff(bornMoment, "months");
		ageInfo.single_age_days = nowMoment.diff(bornMoment, "days");
		ageInfo.age_years = diff_year;//获得年数
		ageInfo.age_months = nowMoment.diff(bornMoment.add(diff_year, "y"), "months");//出生日期上加年数差获得月数差
		ageInfo.age_days = nowMoment.diff(bornMoment.add(ageInfo.age_months, "M"), "days");//再加上月数差获得天数差
		//最终获得该出生日期到当前的岁月天
		//给返回值赋值，完整信息
		result.detailInfo = JSON.parse(JSON.stringify(ageInfo));
		//规则判断 14及以上只有岁 1及1-14岁月，不到1月天 赋值规则下的年龄
		if (ageInfo.age_years >= 14) {
			result.age_years = ageInfo.age_years;
		} else if (ageInfo.age_years >= 1 && ageInfo.age_years < 14) {
			result.age_years = ageInfo.age_years;
			result.age_months = ageInfo.age_months ? ageInfo.age_months : "";
		} else {
			result.age_months = ageInfo.age_months ? ageInfo.age_months : "";
			result.age_days = ageInfo.age_days ? ageInfo.age_days : "";
		}
	} else {
		throw new Error("传入出生日期无效");
	}
	return result;
};
/**
 * @author zhang wei
 * @date 2020-11-11 16:04
 * @description 传入年龄获得生日
 * 入参顺序1 岁 月 天 getBirthdayByAgeInfo(10,10,10) 十岁十个月零10天
 * 入参顺序2 [岁 月 天] getBirthdayByAgeInfo(["","",90]) 90天
 * @return {string}
 */
export const getBirthdayByAgeInfo = function () {
	let years = 0;
	let months = 0;
	let days = 0;
	//如果第一个参数啊数组，取数组前三个作为岁月天 undefined 默认0
	if (arguments[0] instanceof Array) {
		years = arguments[0][0] ? Number(arguments[0][0].toString()) : 0;
		months = arguments[0][1] ? Number(arguments[0][1].toString()) : 0;
		days = arguments[0][2] ? Number(arguments[0][2].toString()) : 0;
	} else {
		years = arguments[0] ? Number(arguments[0].toString()) : 0;
		months = arguments[1] ? Number(arguments[1].toString()) : 0;
		days = arguments[2] ? Number(arguments[2].toString()) : 0;
	}
	let birthdayString = "";
	let errorMsg = [];
	getDataType(years) !== "Number" || years < 0 ? errorMsg.push("传入年龄(岁)不合法") : "";
	getDataType(months) !== "Number" || months < 0 ? errorMsg.push("传入年龄(月)不合法") : "";
	getDataType(days) !== "Number" || days < 0 ? errorMsg.push("传入年龄(天)不合法") : "";
	if (errorMsg.length) {
		throw new Error(errorMsg.join("、"));
	}
	if (!years && !months && !days) {
		birthdayString = "";
	} else {
		let nowMoment = moment();
		birthdayString = nowMoment.subtract(days, "d").subtract(months, "M").subtract(years, "y").format("YYYY-MM-DD");
	}
	return birthdayString;
};

export const getBoundingClientRect = ($el) => {
	let style = $el.style;
	if (style.display === "none") { //display为none的元素没有物理尺寸，所以采用jQuery的方法，先将其脱离文档流设为隐藏，获得尺寸后还原
		let _addCss = {
			position: "absolute",
			visibility: "hidden",
			display: ""
		};
		let _oldCss = {};
		for (let i in _addCss) {
			_oldCss[i] = style[i];
			style[i] = _addCss[i];
		}
		let clientRect = $el.getBoundingClientRect();
		for (let i in _oldCss) {
			style[i] = _oldCss[i];
		}
		return clientRect;
	}
	return $el.getBoundingClientRect();
};
