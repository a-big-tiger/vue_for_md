/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-23 15:17
 */
import projectConfig from "../../../project.config";

const settingHeader = () => {
	let deviceWidth = document.documentElement.clientWidth;
	let fontSize = deviceWidth / (7.5);
	document.documentElement.style.fontSize = fontSize + "px";
	let browser = {
		versions: function () {
			let u = navigator.userAgent;
			return {//移动终端浏览器版本信息
				trident: u.indexOf("Trident") > -1, //IE内核
				presto: u.indexOf("Presto") > -1, //opera内核
				webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
				gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") === -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
				iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf("iPad") > -1, //是否iPad
				webApp: u.indexOf("Safari") === -1 //是否web应该程序，没有头部与底部
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	};
	if (projectConfig.app_config.appSetting.statusBarAppearance) {//在statusBarAppearance为true情况下添加透明状态栏样式
		if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
			document.documentElement.className = "ios";
		} else if (browser.versions.android) {
			document.documentElement.className = "android";
		}
	}
};
export default () => {
	settingHeader();
	window.addEventListener("resize", settingHeader);
}
